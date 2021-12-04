"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const useGetBranches = ({ repo, octokit }) => {
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const [errorMessage, setErrorMessage] = (0, react_1.useState)("");
    const [branches, setBranches] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        if (repo && repo.name) {
            octokit === null || octokit === void 0 ? void 0 : octokit.rest.repos.listBranches({
                accept: "application/vnd.github.v3+json",
                repo: repo.name,
                owner: repo.owner.login,
            }).then(({ data: newBranches, status }) => {
                setBranches(newBranches);
            }).catch((error) => {
                setErrorMessage(error);
                console.error(error);
            }).finally(() => {
                setIsLoading(false);
            });
        }
    }, [repo]);
    return { branches };
};
exports.default = useGetBranches;
