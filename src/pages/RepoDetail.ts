import { fmtNumber, langClass } from '../utils/formatters';
import { renderNavbar } from '../components/Navbar';
import { renderStatCard } from '../components/StatCard';
import { html } from '../utils/html';
import { fetchRepo } from '../api/axios';
import { attachNavSearch } from '../utils/attachNavSearch';
import axios from 'axios';

export function renderRepoDetail(username: string, _repoName: string): string {
  return html`
    ${renderNavbar()}
    <main class="container py-4 py-md-5" id="repo-detail-main">
      <div class="mb-4">
        <a href="#/user/${username}" class="btn-back" id="btn-back-to-user">
          <img src="/icons/arrow-left.svg" />
          Voltar para ${username}
        </a>
      </div>
      <div class="repo-detail-header animate-fade">
        <div class="skeleton skeleton-text w-25 mb-3"></div>
        <div class="skeleton skeleton-text w-75 mb-2"></div>
        <div class="skeleton skeleton-text w-50 mb-4"></div>
        <div class="d-flex gap-3">
          <div class="skeleton skeleton-card" style="height:90px;width:140px;"></div>
          <div class="skeleton skeleton-card" style="height:90px;width:140px;"></div>
        </div>
      </div>
    </main>
  `;
}

export async function mountRepoDetail(username: string, repoName: string): Promise<void> {
  attachNavSearch();

  const main = document.getElementById('repo-detail-main')!;

  try {
    const fullName = `${username}/${repoName}`;
    const repo = await fetchRepo(fullName);

    main.innerHTML = html`
      <div class="mb-4">
        <a href="#/user/${username}" class="btn-back" id="btn-back-to-user" aria-label="Voltar ao perfil de ${username}">
          <img src="/icons/arrow-left.svg" />
          Voltar para ${username}
        </a>
      </div>

      <div class="repo-detail-header animate-fade">
        <div class="repo-breadcrumb" id="repo-breadcrumb" aria-label="Caminho do repositório">
          <a href="#/user/${username}" id="breadcrumb-user">${username}</a>
          <span>/</span>
          <strong id="breadcrumb-repo" style="color: var(--gh-text);">${repo.name}</strong>
        </div>

        <h1 class="repo-detail-name" id="repo-detail-name">${username} / ${repo.name}</h1>

        <p class="repo-detail-desc" id="repo-detail-desc">${repo.description ?? 'Sem descrição.'}</p>

        ${repo.language ? `
          <div class="d-flex align-items-center gap-2 mb-3" id="repo-language">
            <span class="lang-dot ${langClass(repo.language)}" style="width:13px;height:13px;"></span>
            <span style="font-size:0.85rem; color:var(--gh-muted);">${repo.language}</span>
          </div>
        ` : ''}

        <div class="d-inline-block mb-4" id="repo-stars">
          ${renderStatCard({ id: 'stat-stars', value: fmtNumber(repo.stargazers_count), label: 'Estrelas', valueClass: 'star' })}
        </div>

        <div>
          <a
            id="repo-github-link"
            href="${repo.html_url}"
            target="_blank"
            rel="noopener noreferrer"
            class="repo-open-btn"
            aria-label="Abrir ${repo.name} no GitHub"
          >
            <img src="/icons/link.svg" />
            Ver no GitHub
          </a>
        </div>
      </div>
    `;

  } catch (err) {
    const isNotFound = axios.isAxiosError(err) && err.response?.status === 404;

    main.innerHTML = html`
      <div class="not-found-page animate-fade">
        <div class="not-found-code">${isNotFound ? '404' : '⚠'}</div>
        <h2 class="mt-3 fw-semibold" style="color: var(--gh-text);">
          ${isNotFound ? `Repositório "${repoName}" não encontrado` : 'Erro ao carregar repositório'}
        </h2>
        <p style="color: var(--gh-muted); max-width: 360px;" class="mt-2">
          ${isNotFound
        ? 'O repositório pode não existir ou ter sido removido.'
        : 'Verifique sua conexão ou aguarde alguns instantes.'}
        </p>
        <a href="#/user/${username}" class="btn search-main-btn mt-4" style="border-radius:6px !important; padding:0.5rem 1.25rem !important;">
          Voltar ao perfil
        </a>
      </div>
    `;
  }
}
