import { Octokit } from "octokit";
import React, { ReactElement, useEffect, useState } from "react";
import { Box, Text } from "ink";
import { UncontrolledTextInput } from "ink-text-input";

interface LoginProps {
	setOctokit: (octokit: Octokit) => void;
	setUserName: (userName: string) => void;
}

function Login({ setOctokit, setUserName }: LoginProps): ReactElement {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>("");
	const [authToken, setAuthToken] = useState<string>("");
	const [localUserName, setLocalName] = useState<string>("");

	useEffect(() => {
		setTimeout(
			() => setAuthToken(`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`),
			1000
		);
	}, []);
	useEffect(() => {
		if (authToken) {
			setIsLoading(true);
			const octokit = new Octokit({
				// auth: `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`,
				auth: authToken,
				userAgent: "github-fetcher/v0.0.1",
			});

			octokit.rest.users
				.getAuthenticated()
				.then((res) => {
					const {
						data: { login },
					} = res;
					setIsLoading(false);
					setLocalName(login);
				})
				.catch((error: any) => {
					setErrorMessage(error);
				})
				.finally(() => {
					setIsLoading(false);
				});
			setOctokit(octokit);
		}
	}, [authToken]);

	useEffect(() => {
		if (localUserName && !isLoading) {
			setUserName(localUserName);
		}
	}, [isLoading, localUserName]);

	const onAuthTokenSubmit = (value: string) => {
		setAuthToken(value);
	};

	if (isLoading) {
		return <Text color="aliceblue">Loading</Text>;
	}

	if (!!errorMessage) {
		return <Text color="red">{errorMessage}</Text>;
	}

	return (
		<Box display="flex" flexDirection="column">
			<Text>Enter your authToken: </Text>

			<UncontrolledTextInput onSubmit={onAuthTokenSubmit} />
		</Box>
	);
}

export default Login;
