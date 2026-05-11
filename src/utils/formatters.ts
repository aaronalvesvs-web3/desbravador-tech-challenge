export function fmtNumber(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'k';
  return String(n);
}

export function langClass(lang: string): string {
  const map: Record<string, string> = {
    TypeScript: 'lang-typescript',
    JavaScript: 'lang-javascript',
    Python: 'lang-python',
    Java: 'lang-java',
    Go: 'lang-go',
    Rust: 'lang-rust',
    'C++': 'lang-cpp',
    C: 'lang-cpp',
    CSS: 'lang-css',
    HTML: 'lang-html',
    PHP: 'lang-php',
  };
  return map[lang] ?? 'lang-default';
}
