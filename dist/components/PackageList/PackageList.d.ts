import { Octokit } from "octokit";
interface PackageListProps {
    octokit?: Octokit | null;
}
declare const PackageList: ({ octokit }: PackageListProps) => JSX.Element;
export default PackageList;
