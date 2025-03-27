/**
 * Tiny syntax highlighter for the marketing code samples. It only needs to colour
 * keywords, strings, comments, numbers, calls and properties for three languages, so a
 * single-pass tokenizer beats shipping a full grammar engine to the browser.
 */

export type Language = "ts" | "python" | "bash";
export type TokenKind = "k" | "s" | "c" | "f" | "n" | "plain";

export interface Token {
  kind: TokenKind;
  text: string;
}

const KEYWORDS: Record<Language, ReadonlySet<string>> = {
  ts: new Set(["import", "from", "const", "let", "await", "async", "new", "return", "export", "function", "if", "else"]),
  python: new Set(["import", "from", "def", "return", "await", "async", "if", "else", "with", "as", "None", "True", "False"]),
  bash: new Set(["curl"]),
};

const PATTERNS: Record<Language, RegExp> = {
  ts: /(\/\/[^\n]*)|("(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|`(?:[^`\\]|\\.)*`)|(\b\d[\d_]*(?:\.\d+)?\b)|([A-Za-z_$][\w$]*)/g,
  python: /(#[^\n]*)|("(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|f"(?:[^"\\\n]|\\.)*")|(\b\d[\d_]*(?:\.\d+)?\b)|([A-Za-z_][\w]*)/g,
  bash: /((?:^|(?<=\s))#[^\n]*)|("(?:[^"\\]|\\.)*"|'[^']*')|(\b\d+\b)|([A-Za-z_][\w-]*)/gm,
};

export function tokenize(code: string, language: Language): Token[] {
  const tokens: Token[] = [];
  const pattern = new RegExp(PATTERNS[language]);
  let last = 0;

  const push = (kind: TokenKind, text: string) => {
    const prev = tokens[tokens.length - 1];
    if (prev && prev.kind === kind) prev.text += text;
    else tokens.push({ kind, text });
  };

  for (const match of code.matchAll(pattern)) {
    const index = match.index ?? 0;
    if (index > last) push("plain", code.slice(last, index));
    const [text, comment, string, number, word] = match;

    if (comment) push("c", text);
    else if (string) push("s", text);
    else if (number) push("n", text);
    else if (word) {
      const before = code.slice(0, index);
      const after = code.slice(index + text.length);
      if (KEYWORDS[language].has(word)) push("k", text);
      else if (/^\s*\(/.test(after) || /\bnew\s+$/.test(before)) push("f", text);
      else if (/\.$/.test(before) || /^[A-Z][A-Z0-9_]{2,}$/.test(word)) push("n", text);
      else push("plain", text);
    }
    last = index + text.length;
  }
  if (last < code.length) push("plain", code.slice(last));
  return tokens;
}
