import { Octokit } from "octokit";
import { GithubRepo } from "../types";
interface Props {
    octokit?: Octokit | null;
    repo?: GithubRepo;
}
declare const useGetTags: ({ repo, octokit }: Props) => {
    tags: any[];
};
export default useGetTags;
