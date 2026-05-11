import { html } from '../utils/html';
import { navigate } from '../utils/navigate';

export function renderHome(): string {
  return html`
    <div class="home-hero animate-fade">
      <div class="hero-icon mb-4">
        <img src="/images/github.svg" />
      </div>

      <div class="text-center mb-5 animate-fade">
        <h1 class="hero-title display-5 mb-3">GitHub Explorer</h1>
        <p class="hero-subtitle fs-6 mb-0">Encontre perfis e explore repositórios do GitHub</p>
      </div>

      <div class="search-wrapper animate-slide">
        <div class="input-group input-group-lg search-group shadow-lg">
          <span class="input-group-text search-icon-wrap" aria-hidden="true">
            <img src="/icons/search.svg" />
          </span>
          <input
            id="home-search-input"
            type="text"
            class="form-control search-main-input"
            placeholder="Digite o usuário do GitHub..."
            aria-label="Nome de usuário no GitHub"
            autocomplete="off"
            spellcheck="false"
          />
          <button
            id="home-search-btn"
            class="btn search-main-btn"
            type="button"
          >
            Buscar
          </button>
        </div>

        <p class="text-center mt-3 mb-0" style="font-size: 0.8rem; color: var(--gh-muted);">
          Experimente:
          <a href="#/user/torvalds"     class="suggestion-link ms-1">torvalds</a>,
          <a href="#/user/gaearon"      class="suggestion-link">gaearon</a>,
          <a href="#/user/sindresorhus" class="suggestion-link">sindresorhus</a>,
          <a href="#/user/tj"           class="suggestion-link">tj</a>
        </p>
      </div>

    </div>
  `;
}

export async function mountHome(_params: Record<string, string>): Promise<void> {
  const input = document.getElementById('home-search-input') as HTMLInputElement;
  const btn = document.getElementById('home-search-btn') as HTMLButtonElement;

  const doSearch = (): void => {
    const val = input.value.trim();
    if (val) navigate(`/user/${encodeURIComponent(val)}`);
  };

  btn.addEventListener('click', doSearch);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') doSearch();
  });

  input.focus();
}
