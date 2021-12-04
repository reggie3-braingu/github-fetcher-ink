import React, { useEffect, useState } from "react";
import { Octokit } from "octokit";
import Login from "./components/Login/Login";
import { Box, Text } from "ink";
import _Header from "./components/Header/Header";
import PackageList from "./components/PackageList/PackageList";

// Create a personal access token at https://github.com/settings/tokens/new?scopes=repo

const App = ({ packageName }: { packageName?: string }) => {
	const [userName, setUserName] = useState<string>("");
	const [octokit, setOctokit] = useState<Octokit | null>(null);
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

	useEffect(() => {
		if (userName && octokit && !isLoggedIn) {
			setIsLoggedIn(true);
		}
	}, [userName, octokit, isLoggedIn]);

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
			{!!isLoggedIn && <PackageList octokit={octokit} />}
		</Box>
	);
};

module.exports = App;
export default App;
