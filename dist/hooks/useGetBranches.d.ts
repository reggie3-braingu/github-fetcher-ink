import { Octokit } from "octokit";
import { GithubBranch, GithubRepo } from "../types";
interface Props {
    octokit?: Octokit | null;
    repo?: GithubRepo;
}
declare const useGetBranches: ({ repo, octokit }: Props) => {
    branches: GithubBranch[];
};
export default useGetBranches;
