import { navigate } from './navigate';

export function attachNavSearch(): void {
  const input = document.getElementById('nav-search-input') as HTMLInputElement | null;
  const btn = document.getElementById('nav-search-btn') as HTMLButtonElement | null;

  if (!input || !btn) return;

  const doSearch = (): void => {
    const val = input.value.trim();
    if (val) navigate(`/user/${encodeURIComponent(val)}`);
  };

  btn.addEventListener('click', doSearch);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') doSearch();
  });
}
