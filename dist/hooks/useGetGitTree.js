"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const useGetGitTree = ({ commitSha, octokit, repoName, repoOwner }) => {
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const [errorMessage, setErrorMessage] = (0, react_1.useState)("");
    const [tree, setTree] = (0, react_1.useState)();
    (0, react_1.useEffect)(() => {
        if (!!commitSha && !!repoName && !!octokit && repoOwner) {
            octokit.rest.git
                .getTree({
                owner: repoOwner,
                repo: repoName,
                tree_sha: commitSha,
                recursive: "1",
            })
                .then(({ data }) => {
                console.log(JSON.stringify(data));
                setTree(data);
            })
                .catch((error) => {
                console.error(error);
                setErrorMessage(error);
            })
                .finally(() => {
                setIsLoading(false);
            });
        }
    }, [commitSha, repoName, repoOwner]);
    return { tree };
};
exports.default = useGetGitTree;
