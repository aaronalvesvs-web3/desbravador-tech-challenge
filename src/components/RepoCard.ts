import type { GitHubRepoTypes } from '../types';
import { fmtNumber, langClass } from '../utils/formatters';
import { html } from '../utils/html';

export function renderRepoCard(repo: GitHubRepoTypes, username: string): string {
  return html`
    <a
      href="#/user/${username}/repo/${repo.name}"
      class="repo-card"
      id="repo-card-${repo.name}"
      aria-label="Ver detalhes de ${repo.name}"
    >
      <div class="d-flex align-items-start justify-content-between gap-2 mb-1">
        <div>
          <span class="repo-card-name">${repo.name}</span>
          <span class="repo-card-visibility">Public</span>
        </div>
      </div>

      <p class="repo-card-desc mb-0">${repo.description ?? 'Sem descrição.'}</p>

      <div class="repo-meta mt-2">
        ${repo.language ? `
          <span class="repo-meta-item">
            <span class="lang-dot ${langClass(repo.language)}"></span>
            ${repo.language}
          </span>
        ` : ''}

        <span class="repo-meta-item repo-stars" aria-label="${repo.stargazers_count} estrelas">
          <img src="/icons/star.svg" />
          ${fmtNumber(repo.stargazers_count)}
        </span>

        <span class="repo-meta-item" aria-label="${repo.forks_count} forks">
          <img src="/icons/fork.svg" />
          ${fmtNumber(repo.forks_count)}
        </span>

        <span class="repo-meta-item ms-auto" style="font-size: 0.72rem;">
          Atualizado ${new Date(repo.updated_at).toLocaleDateString('pt-BR')}
        </span>
      </div>
    </a>
  `;
}
