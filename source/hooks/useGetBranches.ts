import { Octokit } from "octokit";
import React, { useEffect, useState } from "react";
import { GithubBranch, GithubRepo } from "../types";

interface Props {
	octokit?: Octokit | null;
	repo?: GithubRepo;
}

const useGetBranches = ({ repo, octokit }: Props) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>("");
	const [branches, setBranches] = useState<GithubBranch[]>([]);

	useEffect(() => {
		if (repo && repo.name) {
			octokit?.rest.repos
				.listBranches({
					accept: "application/vnd.github.v3+json",
					repo: repo.name,
					owner: repo.owner.login,
				})
				.then(({ data: newBranches, status }) => {
					setBranches(newBranches as GithubBranch[]);
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

	return { branches };
};

export default useGetBranches;
