import { Octokit } from "octokit";
import React, { useEffect, useState } from "react";
import { GithubTree } from "../types";

interface Props {
	commitSha: string;
	octokit?: Octokit | null;
	repoName?: string;
	repoOwner?: string;
}

const useGetGitTree = ({ commitSha, octokit, repoName, repoOwner }: Props) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>("");
	const [tree, setTree] = useState<GithubTree>();

	useEffect(() => {
		if (!!commitSha && !!repoName && !!octokit && repoOwner) {
			octokit.rest.git
				.getTree({
					owner: repoOwner,
					repo: repoName,
					tree_sha: commitSha,
					recursive: "1",
				})
				.then(({ data }) => {
					console.log(JSON.stringify(data));
					setTree(data as GithubTree);
				})
				.catch((error: any) => {
					console.error(error);
					setErrorMessage(error);
				})
				.finally(() => {
					setIsLoading(false);
				});
		}
	}, [commitSha, repoName, repoOwner]);

	return { tree };
};

export default useGetGitTree;
