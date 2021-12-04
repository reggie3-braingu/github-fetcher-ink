import { Octokit } from "octokit";
import React, { useEffect, useState } from "react";
import { GithubBranch, GithubRepo } from "../types";

interface Props {
	octokit?: Octokit | null;
	repo?: GithubRepo;
}

const useGetTags = ({ repo, octokit }: Props) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>("");
	const [tags, setTags] = useState<any[]>([]);

	useEffect(() => {
		if (repo && repo.name) {
			octokit?.rest.repos
				.listTags({
					accept: "application/vnd.github.v3+json",
					repo: repo.name,
					owner: repo.owner.login,
				})
				.then(({ data: newTags, status }) => {
					setTags(newTags);
				})
				.catch((error: any) => {
					setErrorMessage(error);
					console.error(error);
				})
				.finally(() => {
					setIsLoading(false);
				});
		}
	}, [repo]);

	useEffect(() => {
		if (repo && repo.name) {
			octokit?.rest.repos
				.listTags({
					accept: "application/vnd.github.v3+json",
					repo: repo.name,
					owner: repo.owner.login,
				})
				.then(({ data: newTags, status }) => {
					console.log(JSON.stringify(newTags));
					// setBranches(
					// 	// @ts-ignore
					// 	newRepos.filter((repo) => repo.name.indexOf("react") !== -1)
					// );
				})
				.catch((error: any) => {
					setErrorMessage(error);
					console.error(error);
				})
				.finally(() => {
					setIsLoading(false);
				});
		}
	}, [repo]);

	return { tags };
};

export default useGetTags;
