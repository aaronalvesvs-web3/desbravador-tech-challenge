import axios from 'axios';
import type { GitHubUserTypes, GitHubRepoTypes, GitHubRepoDetailTypes } from '../types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export async function fetchUser(username: string): Promise<GitHubUserTypes> {
  const { data } = await api.get<GitHubUserTypes>(`/users/${username}`);
  return data;
}

export async function fetchUserRepos(username: string): Promise<GitHubRepoTypes[]> {
  const { data } = await api.get<GitHubRepoTypes[]>(`/users/${username}/repos`, {
    params: { per_page: 100 },
  });

  return data.sort((a, b) => b.stargazers_count - a.stargazers_count);
}

export async function fetchRepo(fullName: string): Promise<GitHubRepoDetailTypes> {
  const { data } = await api.get<GitHubRepoDetailTypes>(`/repos/${fullName}`);
  return data;
}
