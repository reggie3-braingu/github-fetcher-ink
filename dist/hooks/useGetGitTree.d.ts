import { Octokit } from "octokit";
import { GithubTree } from "../types";
interface Props {
    commitSha: string;
    octokit?: Octokit | null;
    repoName?: string;
    repoOwner?: string;
}
declare const useGetGitTree: ({ commitSha, octokit, repoName, repoOwner }: Props) => {
    tree: GithubTree | undefined;
};
export default useGetGitTree;
