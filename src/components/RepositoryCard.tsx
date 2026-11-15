import type { Repository } from "../interfaces/Repository";

type RepositoryCardProps = {
  repo: Repository;
};

const RepositoryCard = ({ repo }: RepositoryCardProps) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        border: "1px solid grey",
        borderRadius: "8px",
      }}
    >
      <p>{repo.name}</p>
      <p>{repo?.description}</p>
      <p>{repo?.language}</p>
      <p>{repo?.stargazers_count}</p>
    </div>
  );
};

export default RepositoryCard;
