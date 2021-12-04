#!/usr/bin/env node
import React from "react";
import { render } from "ink";
import meow from "meow";
import App from "./App";

const cli = meow(
	`
	Usage
	  $ github-fetcher-ink

	Options
		--packageName  Your name

	Examples
	  $ github-fetcher-ink --package=Jane
	  Hello, Jane
`,
	{
		flags: {
			packageName: {
				type: "string",
			},
		},
	}
);

render(<App packageName={cli.flags.packageName} />);
