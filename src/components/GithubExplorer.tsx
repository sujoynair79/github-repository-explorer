import { useRef, useState } from "react";
import { fetchRepositories } from "../services/fetchRepositories";
import SearchFilter from "./SearchFilter";
import type { Repository } from "../interfaces/Repository";
import RepositoryList from "./RepositoryList";

const GithubExplorer = () => {
  const [username, setUsername] = useState("");
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const controllerRef = useRef<AbortController | null>(null);

  const handleSearch = async () => {
    const trimmedUsername = username.trim();
    if (!trimmedUsername) return;

    controllerRef.current?.abort();

    const conroller = new AbortController();
    controllerRef.current = conroller;

    setHasSearched(true);
    setLoading(true);
    setError(null);
    try {
      const data = await fetchRepositories(trimmedUsername, conroller.signal);
      if (!conroller.signal.aborted) {
        setRepos(data);
      }
    } catch (e) {
      if (!conroller.signal.aborted) {
        setError(e instanceof Error ? e.message : "Something went wrong");
      }
    } finally {
      if (!conroller.signal.aborted) {
        setLoading(false);
      }
    }
  };

  const showContent = () => {
    if (loading) {
      return <>Loading Repos...</>;
    }
    if (error) {
      return <>{error}</>;
    }
    if (!hasSearched) return <p>Enter a GitHub username.</p>;

    return repos.length === 0 ? <div>No repos found</div> : <RepositoryList repos={repos} />;
  };

  return (
    <div>
      <p>GitHub Repository Explorer</p>
      <SearchFilter
        username={username}
        onSearch={(e) => setUsername(e.target.value)}
        onInitiateSearch={handleSearch}
      />
      {showContent()}
    </div>
  );
};

export default GithubExplorer;
