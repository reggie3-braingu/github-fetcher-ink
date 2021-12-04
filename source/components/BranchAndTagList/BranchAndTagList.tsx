import { Octokit } from "octokit";
import React, { useEffect, useState } from "react";
import { Box, Text } from "ink";
import SelectInput from "ink-select-input";
import Divider from "ink-divider";

import { GithubBranch, GithubRepo, GithubTag, ListedItem } from "../../types";

interface BranchAndTagListProps {
	branches: GithubBranch[];
	octokit?: Octokit | null;
	onBranchOrTagSelected: ({
		branch,
		tag,
	}: {
		branch?: GithubBranch;
		tag?: GithubTag;
	}) => void;
	tags: GithubTag[];
}

const BranchAndTagList = ({
	branches,
	onBranchOrTagSelected,
	octokit,
	tags,
}: BranchAndTagListProps) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>("");
	const [listItems, setListItems] = useState<ListedItem[]>([]);
	const [selectedItem, setSelectedItem] = useState<GithubBranch | GithubTag>();

	useEffect(() => {
		if (!!branches.length || !!tags.length) {
			const newItems: ListedItem[] = [];
			(branches ?? []).forEach((branch, index) => {
				newItems.push({
					label: `Branch - ${branch.name}  (sha - ${branch.commit.sha})`,
					value: branch.commit.sha + "||" + index,
				});
			});

			(tags ?? []).forEach((tag, index) => {
				newItems.push({
					label: `Tag - ${tag.name}  (sha - ${tag.commit.sha})`,
					value: tag.commit.sha + "||" + index,
				});
			});
			setListItems(newItems);
		}
	}, [branches, tags]);

	const onSelect = (item: ListedItem) => {
		if (item.label.toLowerCase().indexOf("branch") !== -1) {
			onBranchOrTagSelected({
				branch: branches.find(
					(branch) =>
						branch.commit.sha === (item.value as string).split("||")[0]
				),
			});
		} else if (item.label.toLowerCase().indexOf("tag") !== -1) {
			onBranchOrTagSelected({
				tag: tags.find(
					(tag) => tag.commit.sha === (item.value as string).split("||")[0]
				),
			});
		}
	};

	if (!selectedItem) {
		return (
			<Box display="flex" flexDirection="column" marginTop={1}>
				<Divider title="Select a Branch or Tag" dividerColor="dodgerblue" />
				<SelectInput items={listItems} onSelect={onSelect} initialIndex={0} />
			</Box>
		);
	}

	return (
		<Box display="flex" flexDirection="column" marginTop={1}>
			<Text color="yellow">{setSelectedItem.name} selected</Text>
		</Box>
	);
};

export default BranchAndTagList;
