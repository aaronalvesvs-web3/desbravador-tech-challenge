import type { GitHubRepoTypes } from '../types';
import { fmtNumber } from '../utils/formatters';
import { renderNavbar } from '../components/Navbar';
import { renderRepoCard } from '../components/RepoCard';
import { html } from '../utils/html';
import { fetchUser, fetchUserRepos } from '../api/axios';
import { attachNavSearch } from '../utils/attachNavSearch';
import axios from 'axios';

export function renderUserProfile(_username: string): string {
  return html`
    ${renderNavbar()}
    <main class="container py-4 py-md-5" id="user-profile-main">
      <div class="row g-4">
        <div class="col-lg-3 col-md-4">
          <div class="profile-card text-center">
            <div class="skeleton skeleton-avatar mx-auto mb-3"></div>
            <div class="skeleton skeleton-text w-75 mx-auto mb-2"></div>
            <div class="skeleton skeleton-text w-50 mx-auto mb-4"></div>
            <div class="skeleton skeleton-text w-100 mb-2"></div>
            <div class="skeleton skeleton-text w-100 mb-2"></div>
          </div>
        </div>
        <div class="col-lg-9 col-md-8">
          <div class="skeleton skeleton-text w-25 mb-4"></div>
          <div class="skeleton skeleton-card mb-2"></div>
          <div class="skeleton skeleton-card mb-2"></div>
          <div class="skeleton skeleton-card mb-2"></div>
        </div>
      </div>
    </main>
  `;
}

export async function mountUserProfile(username: string): Promise<void> {
  attachNavSearch();

  const main = document.getElementById('user-profile-main')!;

  try {
    const [user, repos] = await Promise.all([
      fetchUser(username),
      fetchUserRepos(username),
    ]);

    let currentSort = 'stars';

    function sortRepos(sort: string): GitHubRepoTypes[] {
      switch (sort) {
        case 'forks': return [...repos].sort((a, b) => b.forks_count - a.forks_count);
        case 'name': return [...repos].sort((a, b) => a.name.localeCompare(b.name));
        case 'update': return [...repos].sort((a, b) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );
        default: return [...repos];
      }
    }

    function repoListHtml(list: GitHubRepoTypes[]): string {
      if (!list.length) return `<p style="color:var(--gh-muted);font-size:.875rem;">Nenhum repositório público encontrado.</p>`;
      return list.map(r => renderRepoCard(r, username)).join('');
    }

    main.innerHTML = html`
      <div class="row g-4 animate-fade">
        <div class="col-lg-3 col-md-4" id="profile-sidebar">
          <div class="profile-card">
            <img
              id="profile-avatar"
              src="${user.avatar_url}"
              alt="Avatar de ${username}"
              class="profile-avatar"
              width="200" height="200"
            />
            <h1 class="profile-name">${user.name ?? username}</h1>
            <p class="profile-username">${user.login}</p>
            ${user.bio ? `<p class="profile-bio">${user.bio}</p>` : ''}
            <div class="profile-stats mb-3">
              <span id="profile-followers">
                <strong>${fmtNumber(user.followers)}</strong> seguidores
              </span>
              <span id="profile-following">
                <strong>${fmtNumber(user.following)}</strong> seguindo
              </span>
            </div>
            ${user.email ? `
              <div class="profile-detail" id="profile-email">
                <svg viewBox="0 0 16 16" fill="currentColor" width="14" height="14" aria-hidden="true">
                  <path d="M1.75 2h12.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0 1 14.25 14H1.75A1.75 1.75 0 0 1 0 12.25v-8.5C0 2.784.784 2 1.75 2ZM1.5 12.251c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25V5.329L8.22 9.71a.75.75 0 0 1-.44.14.75.75 0 0 1-.44-.14L1.5 5.33v6.921Zm13-8.181v-.32a.25.25 0 0 0-.25-.25H1.75a.25.25 0 0 0-.25.25v.32L8 8.87l6.5-4.8Z"/>
                </svg>
                <a href="mailto:${user.email}" style="color:var(--gh-accent);text-decoration:none;">${user.email}</a>
              </div>
            ` : ''}
          </div>
        </div>

        <div class="col-lg-9 col-md-8" id="repos-section">
          <div class="repos-header">
            <span class="repos-count" id="repos-count-label">
              Repositórios <span class="badge-count" id="repos-badge">${repos.length}</span>
            </span>
            <div class="sort-controls" id="sort-controls" role="group" aria-label="Ordenar repositórios">
              <span class="sort-label">Ordenar por:</span>
              <button class="btn sort-btn active" id="sort-stars"  data-sort="stars">⭐ Estrelas</button>
              <button class="btn sort-btn"         id="sort-forks"  data-sort="forks">Forks</button>
              <button class="btn sort-btn"         id="sort-name"   data-sort="name">Nome</button>
              <button class="btn sort-btn"         id="sort-update" data-sort="update">Atualização</button>
            </div>
          </div>
          <div id="repos-list">
            ${repoListHtml(repos)}
          </div>
        </div>

      </div>
    `;

    document.querySelectorAll<HTMLButtonElement>('.sort-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const sort = btn.dataset.sort ?? 'stars';
        if (sort === currentSort) return;
        currentSort = sort;

        document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const reposList = document.getElementById('repos-list')!;
        reposList.innerHTML = repoListHtml(sortRepos(sort));
      });
    });

  } catch (err) {
    const isNotFound = axios.isAxiosError(err) && err.response?.status === 404;

    main.innerHTML = html`
      <div class="not-found-page animate-fade">
        <div class="not-found-code">${isNotFound ? '404' : '⚠'}</div>
        <h2 class="mt-3 fw-semibold" style="color: var(--gh-text);">
          ${isNotFound ? `Usuário "${username}" não encontrado` : 'Erro ao carregar perfil'}
        </h2>
        <p style="color: var(--gh-muted); max-width: 360px;" class="mt-2">
          ${isNotFound
        ? 'Verifique se o nome de usuário está correto e tente novamente.'
        : 'Pode ser um limite de requisições da API ou falha de rede. Tente em instantes.'}
        </p>
        <a href="#/" class="btn search-main-btn mt-4" style="border-radius:6px !important; padding:0.5rem 1.25rem !important;">
          Voltar ao início
        </a>
      </div>
    `;
  }
}
