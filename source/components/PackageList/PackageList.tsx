import { Octokit } from "octokit";
import React, { useEffect, useState } from "react";
import { Box, Text } from "ink";
import SelectInput from "ink-select-input";
import Divider from "ink-divider";

import { GithubPackage } from "../../types";

interface PackageListProps {
	octokit?: Octokit | null;
}

type ListedItem = { label: string; value: number };

const PackageList = ({ octokit }: PackageListProps) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [packages, setPackages] = useState<GithubPackage[]>([]);
	const [errorMessage, setErrorMessage] = useState<string>("");
	const [items, setItems] = useState<ListedItem[]>([]);
	const [selectedPackage, setSelectedPackage] = useState<GithubPackage>();

	useEffect(() => {
		if (octokit) {
			octokit.rest.repos
				.listForOrg({
					org: "braingu",
				})
				.then(({ data: newPackages, status }) => {
					// @ts-ignore
					setPackages(newPackages);
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
		if (packages.length) {
			const items: ListedItem[] = [];
			packages.forEach((packageItem) => {
				items.push({
					label: `${packageItem.name} - ${
						packageItem.description ?? "no description"
					}`,
					value: packageItem.id,
				});
			});
			setItems(items);
		}
	}, [packages]);

	const onSelect = (item: ListedItem) => {
		console.log(item);
		setSelectedPackage(
			packages.find((packageItem) => packageItem.id === item.value)
		);
	};

	if (!!isLoading) {
		return <Text color="aliceblue">Loading Packages</Text>;
	}

	if (!!errorMessage) {
		return <Text color="red">{errorMessage}</Text>;
	}

	if (!selectedPackage) {
		return (
			<Box display="flex" flexDirection="column">
				<Divider title="Select a Package" dividerColor="dodgerblue" />
				<SelectInput items={items} onSelect={onSelect} initialIndex={0} />
			</Box>
		);
	}

	return (
		<Box display="flex" flexDirection="column" marginTop={1}>
			<Text>{selectedPackage.name}</Text>
		</Box>
	);
};

export default PackageList;
