import type { Repository } from "../interfaces/Repository";

export const fetchRepositories = async (
  username: string,
  signal: AbortSignal,
): Promise<Repository[]> => {
  const response = await fetch(
    `https://api.github.com/users/${encodeURIComponent(username)}/repos`,
    { signal },
  );
  if (!response.ok) {
    throw new Error("Error fetching repos");
  }
  const repos = await response.json();
  return repos as Repository[];
};
