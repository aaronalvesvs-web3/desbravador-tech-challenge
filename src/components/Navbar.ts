import { html } from "../utils/html";

export function renderNavbar(): string {
  return html`
    <nav class="navbar navbar-expand-lg gh-navbar sticky-top" id="main-navbar">
      <div class="container">
        <a class="navbar-brand" href="#/" id="nav-brand">
          <img src="/icons/github.svg" />
          GitHub Explorer
        </a>

        <button
          class="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Abrir menu"
          style="color: var(--gh-muted);"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarContent">
          <div class="nav-search-wrap ms-auto d-flex gap-2">
            <input
              id="nav-search-input"
              type="text"
              class="form-control form-control-sm nav-search-input"
              placeholder="Buscar usuário..."
              aria-label="Buscar usuário no GitHub"
            />
            <button id="nav-search-btn" class="btn nav-search-btn" type="button">
              Buscar
            </button>
          </div>
        </div>
      </div>
    </nav>
  `;
}
