import React from "react";
import { Octokit } from "octokit";
import Login from "./components/Login/Login";
import { Box } from "ink";
import Header from "./components/Header/Header";

// Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
const octokit = new Octokit({
	auth: `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`,
	userAgent: "github-fetcher/v0.0.1",
});

const App = ({ packageName }: { packageName?: string }) => {
	console.log("packageName", packageName);

	return (
		<Box margin={2}>
			<Header />
			<Login octokit={octokit} />
		</Box>
	);
};

module.exports = App;
export default App;
