export type ListedItem = { label: string; value: number | string };

export interface GithubTree {
	sha: string;
	url: string;
	tree: Tree[];
	truncated: boolean;
}

export interface Tree {
	path: string;
	mode: string;
	type: Type;
	sha: string;
	size?: number;
	url: string;
}

export enum Type {
	Blob = "blob",
	Tree = "tree",
}

export interface GithubTag {
	name: string;
	commit: Commit;
	zipballURL: string;
	tarballURL: string;
	nodeID: string;
}

export interface Commit {
	sha: string;
	url: string;
}

export interface GithubBranch {
	name: string;
	commit: Commit;
	protected: boolean;
	protection: Protection;
	protectionURL: string;
}

export interface Commit {
	sha: string;
	url: string;
}

export interface Protection {
	enabled: boolean;
	requiredStatusChecks: RequiredStatusChecks;
}

export interface RequiredStatusChecks {
	enforcementLevel: string;
	contexts: any[];
	checks: any[];
}

export interface GithubRepo {
	id: number;
	nodeID: string;
	name?: string;
	fullName: string;
	private: boolean;
	owner: Owner;
	htmlURL: string;
	description: null;
	fork: boolean;
	url: string;
	forksURL: string;
	keysURL: string;
	collaboratorsURL: string;
	teamsURL: string;
	hooksURL: string;
	issueEventsURL: string;
	eventsURL: string;
	assigneesURL: string;
	branchesURL: string;
	tagsURL: string;
	blobsURL: string;
	gitTagsURL: string;
	gitRefsURL: string;
	treesURL: string;
	statusesURL: string;
	languagesURL: string;
	stargazersURL: string;
	contributorsURL: string;
	subscribersURL: string;
	subscriptionURL: string;
	commitsURL: string;
	gitCommitsURL: string;
	commentsURL: string;
	issueCommentURL: string;
	contentsURL: string;
	compareURL: string;
	mergesURL: string;
	archiveURL: string;
	downloadsURL: string;
	issuesURL: string;
	pullsURL: string;
	milestonesURL: string;
	notificationsURL: string;
	labelsURL: string;
	releasesURL: string;
	deploymentsURL: string;
	createdAt: Date;
	updatedAt: Date;
	pushedAt: Date;
	gitURL: string;
	sshURL: string;
	cloneURL: string;
	svnURL: string;
	homepage: null;
	size: number;
	stargazersCount: number;
	watchersCount: number;
	language: null;
	hasIssues: boolean;
	hasProjects: boolean;
	hasDownloads: boolean;
	hasWiki: boolean;
	hasPages: boolean;
	forksCount: number;
	mirrorURL: null;
	archived: boolean;
	disabled: boolean;
	openIssuesCount: number;
	license: null;
	allowForking: boolean;
	isTemplate: boolean;
	topics: any[];
	visibility: string;
	forks: number;
	openIssues: number;
	watchers: number;
	defaultBranch: string;
	permissions: Permissions;
}

export interface Owner {
	login: string;
	id: number;
	nodeID: string;
	avatarURL: string;
	gravatarID: string;
	url: string;
	htmlURL: string;
	followersURL: string;
	followingURL: string;
	gistsURL: string;
	starredURL: string;
	subscriptionsURL: string;
	organizationsURL: string;
	reposURL: string;
	eventsURL: string;
	receivedEventsURL: string;
	type: string;
	siteAdmin: boolean;
}

export interface Permissions {
	admin: boolean;
	maintain: boolean;
	push: boolean;
	triage: boolean;
	pull: boolean;
}
