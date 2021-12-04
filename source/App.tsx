import React, { useEffect, useState } from "react";
import { Octokit } from "octokit";
import Login from "./components/Login/Login";
import { Box, Text } from "ink";
import _Header from "./components/Header/Header";
import RepoList from "./components/RepoList/RepoList";
import { GithubBranch, GithubRepo, GithubTag } from "./types";
import useGetBranches from "./hooks/useGetBranches";
import useGetTags from "./hooks/useGetTags";
import BranchAndTagList from "./components/BranchAndTagList/BranchAndTagList";
import useGetGitTree from "./hooks/useGetGitTree";

// Create a personal access token at https://github.com/settings/tokens/new?scopes=repo

const App = ({ packageName }: { packageName?: string }) => {
	const [userName, setUserName] = useState<string>("");
	const [octokit, setOctokit] = useState<Octokit | null>(null);
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const [selectedRepo, setSelectedRepo] = useState<GithubRepo>();
	const { branches } = useGetBranches({ octokit, repo: selectedRepo });
	const { tags } = useGetTags({ octokit, repo: selectedRepo });
	const [selectedCommitSha, setSelectedCommitSha] = useState<string>("");

	const { tree: githubTree } = useGetGitTree({
		commitSha: selectedCommitSha,
		octokit: octokit,
		repoName: selectedRepo?.name,
		repoOwner: selectedRepo?.owner.login,
	});

	useEffect(() => {
		if (userName && octokit && !isLoggedIn) {
			setIsLoggedIn(true);
		}
	}, [userName, octokit, isLoggedIn]);

	const onRepoSelected = (repo: GithubRepo) => {
		setSelectedRepo(repo);
	};

	const onBranchOrTagSelected = ({
		branch,
		tag,
	}: {
		branch?: GithubBranch;
		tag?: GithubTag;
	}) => {
		console.log(branch ?? tag);
		if (branch || tag) {
			setSelectedCommitSha((branch || tag)!.commit.sha);
		}
	};

	return (
		<Box display="flex" flexDirection="column">
			{/* <Header /> */}
			{!isLoggedIn && (
				<Login setUserName={setUserName} setOctokit={setOctokit} />
			)}
			{!!userName && (
				<Text>
					Hello, <Text color="green">{userName}</Text>
				</Text>
			)}
			{!!isLoggedIn && (
				<RepoList octokit={octokit} onRepoSelected={onRepoSelected} />
			)}
			{!!isLoggedIn && (!!branches.length || !!tags.length) && !githubTree && (
				<BranchAndTagList
					octokit={octokit}
					branches={branches}
					tags={tags}
					onBranchOrTagSelected={onBranchOrTagSelected}
				/>
			)}
		</Box>
	);
};

module.exports = App;
export default App;
