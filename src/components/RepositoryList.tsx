import type { Repository } from "../interfaces/Repository";
import RepositoryCard from "./RepositoryCard";

type RepositoryListProps = {
  repos: Repository[];
};
const RepositoryList = ({ repos }: RepositoryListProps) => {
  return (
    <>
      {repos.map((repo) => (
        <RepositoryCard key={repo.id} repo={repo} />
      ))}
    </>
  );
};

export default RepositoryList;
