import { Octokit } from "octokit";
import React, { useEffect, useState } from "react";
import { Box, Text } from "ink";
import SelectInput from "ink-select-input";
import Divider from "ink-divider";

import { GithubRepo, ListedItem } from "../../types";

interface RepoListProps {
	octokit?: Octokit | null;
	onRepoSelected: (repo: GithubRepo) => void;
}

const RepoList = ({ octokit, onRepoSelected }: RepoListProps) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>("");
	const [repos, setRepos] = useState<GithubRepo[]>([]);
	const [items, setItems] = useState<ListedItem[]>([]);
	const [selectedRepo, setSelectedRepo] = useState<GithubRepo>();

	useEffect(() => {
		if (octokit) {
			octokit.rest.repos
				.listForOrg({
					org: "braingu",
				})
				.then(({ data: newRepos, status }) => {
					setRepos(
						// @ts-ignore
						newRepos.filter((repo) => repo.name.indexOf("react") !== -1)
					);
				})
				.catch((error: any) => {
					setErrorMessage(error);
				})
				.finally(() => {
					setIsLoading(false);
				});
		}
	}, []);

	useEffect(() => {
		if (repos.length) {
			const newItems: ListedItem[] = [];
			repos.forEach((repoItem) => {
				newItems.push({
					label: `${repoItem.name} - ${
						repoItem.description ?? "no description"
					}`,
					value: repoItem.id,
				});
			});
			setItems(newItems);
		}
	}, [repos]);

	useEffect(() => {
		if (selectedRepo) {
			onRepoSelected(selectedRepo);
		}
	}, [selectedRepo]);

	const onSelect = (item: ListedItem) => {
		setSelectedRepo(repos.find((repoItem) => repoItem.id === item.value));
	};

	if (!!isLoading) {
		return <Text color="aliceblue">Loading Repos</Text>;
	}

	if (!!errorMessage) {
		return <Text color="red">{errorMessage}</Text>;
	}

	if (!selectedRepo) {
		return (
			<Box display="flex" flexDirection="column" marginTop={1}>
				<Divider title="Select a Repo" dividerColor="dodgerblue" />
				<SelectInput items={items} onSelect={onSelect} initialIndex={0} />
			</Box>
		);
	}

	return (
		<Box display="flex" flexDirection="column" marginTop={1}>
			<Text color="yellow">{selectedRepo.name} selected</Text>
		</Box>
	);
};

export default RepoList;
