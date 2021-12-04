import { Octokit } from "octokit";
import { GithubBranch, GithubTag } from "../../types";
interface BranchAndTagListProps {
    branches: GithubBranch[];
    octokit?: Octokit | null;
    onBranchOrTagSelected: ({ branch, tag, }: {
        branch?: GithubBranch;
        tag?: GithubTag;
    }) => void;
    tags: GithubTag[];
}
declare const BranchAndTagList: ({ branches, onBranchOrTagSelected, octokit, tags, }: BranchAndTagListProps) => JSX.Element;
export default BranchAndTagList;
