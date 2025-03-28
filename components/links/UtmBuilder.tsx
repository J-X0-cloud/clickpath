"use client";

import { useMemo, useState, type FormEvent } from "react";
import type { UtmKey, UtmParams, UtmTemplate } from "@/types/links";
import { BUILDER_DEFAULTS, UTM_TEMPLATES, WORKSPACE_DOMAINS } from "@/lib/data/links";
import {
  SLUG_PATTERN,
  allowedSources,
  buildFinalUrl,
  isValidDestination,
  normalizeUtmValue,
  slugify,
  validateAgainstTemplate,
} from "@/lib/utm";
import { AppWindow } from "@/components/ui/AppWindow";
import { QrCode } from "./QrCode";

type Options = typeof BUILDER_DEFAULTS.options;
type SubmitState = { kind: "idle" } | { kind: "saving" } | { kind: "done"; shortUrl: string } | { kind: "error"; message: string };

const OPTION_LABELS: Record<keyof Options, string> = {
  tracking: "Conversion tracking",
  deviceRouting: "iOS / Android routing",
  expireAfterCampaign: "Expire after campaign",
  password: "Password",
};

function templateById(id: string): UtmTemplate {
  return UTM_TEMPLATES.find((t) => t.id === id) ?? UTM_TEMPLATES[0]!;
}

function SelectField({
  value,
  options,
  onChange,
  label,
}: {
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
  label: string;
}) {
  return (
    <div className="inp sel">
      <select aria-label={label} value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <span className="pre">▾</span>
    </div>
  );
}

/**
 * The "New link" form. Sources and mediums come from the selected naming template, free-text
 * values are normalised as you type, and the final URL is assembled live so people can see
 * exactly what the ad platform will receive.
 */
export function UtmBuilder() {
  const [templateId, setTemplateId] = useState(BUILDER_DEFAULTS.templateId);
  const [destination, setDestination] = useState(BUILDER_DEFAULTS.destination);
  const [domain, setDomain] = useState<string>(BUILDER_DEFAULTS.domain);
  const [slug, setSlug] = useState(BUILDER_DEFAULTS.slug);
  const [utm, setUtm] = useState<UtmParams>(BUILDER_DEFAULTS.utm);
  const [options, setOptions] = useState<Options>(BUILDER_DEFAULTS.options);
  const [submit, setSubmit] = useState<SubmitState>({ kind: "idle" });

  const template = templateById(templateId);
  const sources = allowedSources(template);
  const freeFormSource = sources.some((s) => s.includes("{"));

  const finalUrl = useMemo(() => buildFinalUrl(destination, utm), [destination, utm]);
  const issues = useMemo(() => validateAgainstTemplate(template, utm), [template, utm]);
  const issueFor = (field: UtmKey) => issues.find((i) => i.field === field)?.message;

  const destinationValid = isValidDestination(destination);
  const slugValid = SLUG_PATTERN.test(slug);
  const blocked = !destinationValid || !slugValid || (template.enforcement === "Required" && issues.length > 0);
  const shortUrl = `https://${domain}/${slug}`;

  function setParam(key: UtmKey, value: string) {
    setUtm((current) => ({ ...current, [key]: normalizeUtmValue(value) }));
    setSubmit({ kind: "idle" });
  }

  function changeTemplate(id: string) {
    const next = templateById(id);
    const firstSource = allowedSources(next)[0] ?? "";
    setTemplateId(id);
    setUtm((current) => ({
      ...current,
      utm_source: firstSource.includes("{") ? firstSource.slice(0, firstSource.indexOf("{")) : firstSource,
      utm_medium: next.medium,
    }));
    setSubmit({ kind: "idle" });
  }

  async function createLink(event: FormEvent) {
    event.preventDefault();
    if (blocked) return;
    setSubmit({ kind: "saving" });
    try {
      const response = await fetch("/api/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          domain,
          slug,
          destination,
          utm,
          templateId,
          tracking: options.tracking,
          deviceRouting: options.deviceRouting,
          expireAfterCampaign: options.expireAfterCampaign,
          password: options.password,
        }),
      });
      const body = (await response.json()) as { shortUrl?: string; error?: string };
      if (!response.ok || !body.shortUrl) throw new Error(body.error ?? "Could not create the link");
      setSubmit({ kind: "done", shortUrl: body.shortUrl });
    } catch (error) {
      setSubmit({ kind: "error", message: error instanceof Error ? error.message : "Could not create the link" });
    }
  }

  return (
    <AppWindow url="app.clickpath.com/halcyon/links/new">
      <form className="main bld" onSubmit={createLink} noValidate>
        <div>
          <div className="main-h">
            <h4>New link</h4>
            <label className="chip">
              Template:{" "}
              <select value={templateId} onChange={(e) => changeTemplate(e.target.value)}>
                {UTM_TEMPLATES.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="fld">
            <label htmlFor="utm-destination">Destination URL</label>
            <input
              id="utm-destination"
              className="inp"
              type="url"
              value={destination}
              aria-invalid={!destinationValid}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>

          <div className="fld">
            <label htmlFor="utm-slug">Short link</label>
            <div className="two slug">
              <SelectField label="Domain" value={domain} options={WORKSPACE_DOMAINS} onChange={setDomain} />
              <input
                id="utm-slug"
                className="inp"
                value={slug}
                aria-invalid={!slugValid}
                onChange={(e) => setSlug(slugify(e.target.value))}
              />
            </div>
          </div>

          <div className="two">
            <div className="fld">
              <label htmlFor="utm-source">utm_source</label>
              {freeFormSource ? (
                <input
                  id="utm-source"
                  className="inp"
                  value={utm.utm_source ?? ""}
                  aria-invalid={Boolean(issueFor("utm_source"))}
                  onChange={(e) => setParam("utm_source", e.target.value)}
                />
              ) : (
                <SelectField
                  label="utm_source"
                  value={utm.utm_source ?? ""}
                  options={sources}
                  onChange={(v) => setParam("utm_source", v)}
                />
              )}
              {issueFor("utm_source") && <span className="hint">{issueFor("utm_source")}</span>}
            </div>
            <div className="fld">
              <label>utm_medium</label>
              <SelectField
                label="utm_medium"
                value={utm.utm_medium ?? ""}
                options={[template.medium]}
                onChange={(v) => setParam("utm_medium", v)}
              />
            </div>
          </div>

          <div className="two">
            <div className="fld">
              <label htmlFor="utm-campaign">utm_campaign</label>
              <input
                id="utm-campaign"
                className="inp"
                value={utm.utm_campaign ?? ""}
                placeholder={template.campaignPattern}
                aria-invalid={Boolean(issueFor("utm_campaign"))}
                onChange={(e) => setParam("utm_campaign", e.target.value)}
              />
              {issueFor("utm_campaign") && <span className="hint">{issueFor("utm_campaign")}</span>}
            </div>
            <div className="fld">
              <label htmlFor="utm-content">utm_content</label>
              <input
                id="utm-content"
                className="inp"
                value={utm.utm_content ?? ""}
                onChange={(e) => setParam("utm_content", e.target.value)}
              />
            </div>
          </div>

          <div className="fld">
            <label>Final URL</label>
            <div className="final" aria-live="polite">
              {finalUrl.parts.map((part, i) => (part.param ? <em key={i}>{part.text}</em> : <span key={i}>{part.text}</span>))}
            </div>
          </div>
        </div>

        <div className="bld-side">
          <div className="card pad flat qr-card">
            <div className="qr-h">QR code</div>
            <QrCode value={shortUrl} />
            <div className="muted qr-cap">Brand color · logo center · SVG / PNG</div>
          </div>
          <div className="card pad flat opts">
            {(Object.keys(OPTION_LABELS) as (keyof Options)[]).map((key) => (
              <div className="opt" key={key}>
                {OPTION_LABELS[key]}
                <button
                  type="button"
                  role="switch"
                  aria-checked={options[key]}
                  aria-label={OPTION_LABELS[key]}
                  className={options[key] ? "toggle" : "toggle off"}
                  onClick={() => setOptions((o) => ({ ...o, [key]: !o[key] }))}
                />
              </div>
            ))}
          </div>
          <button className="btn btn-p block" type="submit" disabled={blocked || submit.kind === "saving"}>
            {submit.kind === "saving" ? "Creating…" : "Create link"}
          </button>
          {submit.kind === "done" && <p className="bld-status muted">Created {submit.shortUrl.replace("https://", "")}</p>}
          {submit.kind === "error" && <p className="bld-status hint">{submit.message}</p>}
        </div>
      </form>
    </AppWindow>
  );
}
