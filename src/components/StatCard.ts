import type { StatCardProps } from '../types';
import { html } from "../utils/html";

export function renderStatCard({ id, value, label, valueClass = '', icon = '' }: StatCardProps): string {
  return html`
    <div class="stat-card" id="${id}">
      <div class="stat-card-value ${valueClass}" id="${id}-value">${value}</div>
      <div class="stat-card-label">
        ${icon}
        ${label}
      </div>
    </div>
  `;
}
