import { Octokit } from "octokit";
import { GithubRepo } from "../../types";
interface RepoListProps {
    octokit?: Octokit | null;
    onRepoSelected: (repo: GithubRepo) => void;
}
declare const RepoList: ({ octokit, onRepoSelected }: RepoListProps) => JSX.Element;
export default RepoList;
