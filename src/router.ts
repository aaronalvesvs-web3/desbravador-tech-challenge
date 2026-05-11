import type { Route, RouteHandler, MountFn } from './types';
import { renderHome, mountHome } from './pages/Home';
import { renderUserProfile, mountUserProfile } from './pages/UserProfile';
import { renderRepoDetail, mountRepoDetail } from './pages/RepoDetail';
import { html } from './utils/html';

const routes: Route[] = [];

function addRoute(path: string, handler: RouteHandler, mount?: MountFn): void {
  const keys: string[] = [];
  const pattern = new RegExp(
    '^' + path.replace(/:(\w+)/g, (_, key) => { keys.push(key); return '([^/]+)'; }) + '$'
  );
  routes.push({ pattern, keys, handler, mount });
}

function getPath(): string {
  return window.location.hash.slice(1) || '/';
}

export function navigate(path: string): void {
  window.location.hash = path;
}

function render(container: HTMLElement): void {
  const path = getPath();

  for (const route of routes) {
    const match = path.match(route.pattern);
    if (match) {
      const params: Record<string, string> = {};
      route.keys.forEach((key, i) => { params[key] = decodeURIComponent(match[i + 1]); });

      container.innerHTML = route.handler(params);
      window.scrollTo({ top: 0, behavior: 'smooth' });

      if (route.mount) {
        route.mount(params).catch(console.error);
      }
      return;
    }
  }

  container.innerHTML = html`
    <div class="not-found-page" id="not-found-page">
      <div class="not-found-code">404</div>
      <h2 class="mt-3 fw-semibold" style="color: var(--gh-text);">Página não encontrada</h2>
      <p style="color: var(--gh-muted); max-width: 360px;" class="mt-2">
        A rota que você tentou acessar não existe.
      </p>
      <a href="#/" class="btn search-main-btn mt-4" style="border-radius: 6px !important; padding: 0.5rem 1.25rem !important;">
        Voltar ao início
      </a>
    </div>
  `;
}

export function initRouter(container: HTMLElement): void {
  addRoute('/',
    () => renderHome(),
    (p) => mountHome(p)
  );
  addRoute('/user/:username/repo/:repoName',
    (p) => renderRepoDetail(p.username, p.repoName),
    (p) => mountRepoDetail(p.username, p.repoName)
  );
  addRoute('/user/:username',
    (p) => renderUserProfile(p.username),
    (p) => mountUserProfile(p.username)
  );

  window.addEventListener('hashchange', () => render(container));
  render(container);
}
