import { Octokit } from "octokit";
import React, { ReactElement, useEffect, useState } from "react";
import { Text } from "ink";

interface Props {
	octokit: Octokit;
}

function Login({ octokit }: Props): ReactElement {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [userName, setUserName] = useState<string>("");
	const [errorMessage, setErrorMessage] = useState<string>("");

	useEffect(() => {
		octokit.rest.users
			.getAuthenticated()
			.then((res) => {
				const {
					data: { login },
				} = res;
				console.log("Hello, %s", login);
				setUserName(login);
			})
			.catch((error: any) => {
				setErrorMessage(error);
			})
			.finally(() => {
				setIsLoading(true);
			});
	}, []);

	if (isLoading) {
		return <Text color="aliceblue">Loading</Text>;
	}

	if (!!errorMessage) {
		return <Text color="red">{errorMessage}</Text>;
	}
	return (
		<Text>
			Hello, <Text color="green">{userName}</Text>
		</Text>
	);
}

export default Login;
