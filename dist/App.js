"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const Login_1 = __importDefault(require("./components/Login/Login"));
const ink_1 = require("ink");
const RepoList_1 = __importDefault(require("./components/RepoList/RepoList"));
const useGetBranches_1 = __importDefault(require("./hooks/useGetBranches"));
const useGetTags_1 = __importDefault(require("./hooks/useGetTags"));
const BranchAndTagList_1 = __importDefault(require("./components/BranchAndTagList/BranchAndTagList"));
const useGetGitTree_1 = __importDefault(require("./hooks/useGetGitTree"));
// Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
const App = ({ packageName }) => {
    const [userName, setUserName] = (0, react_1.useState)("");
    const [octokit, setOctokit] = (0, react_1.useState)(null);
    const [isLoggedIn, setIsLoggedIn] = (0, react_1.useState)(false);
    const [selectedRepo, setSelectedRepo] = (0, react_1.useState)();
    const { branches } = (0, useGetBranches_1.default)({ octokit, repo: selectedRepo });
    const { tags } = (0, useGetTags_1.default)({ octokit, repo: selectedRepo });
    const [selectedCommitSha, setSelectedCommitSha] = (0, react_1.useState)("");
    const { tree: githubTree } = (0, useGetGitTree_1.default)({
        commitSha: selectedCommitSha,
        octokit: octokit,
        repoName: selectedRepo === null || selectedRepo === void 0 ? void 0 : selectedRepo.name,
        repoOwner: selectedRepo === null || selectedRepo === void 0 ? void 0 : selectedRepo.owner.login,
    });
    (0, react_1.useEffect)(() => {
        if (userName && octokit && !isLoggedIn) {
            setIsLoggedIn(true);
        }
    }, [userName, octokit, isLoggedIn]);
    const onRepoSelected = (repo) => {
        setSelectedRepo(repo);
    };
    const onBranchOrTagSelected = ({ branch, tag, }) => {
        console.log(branch !== null && branch !== void 0 ? branch : tag);
        if (branch || tag) {
            setSelectedCommitSha((branch || tag).commit.sha);
        }
    };
    return (react_1.default.createElement(ink_1.Box, { display: "flex", flexDirection: "column" },
        !isLoggedIn && (react_1.default.createElement(Login_1.default, { setUserName: setUserName, setOctokit: setOctokit })),
        !!userName && (react_1.default.createElement(ink_1.Text, null,
            "Hello, ",
            react_1.default.createElement(ink_1.Text, { color: "green" }, userName))),
        !!isLoggedIn && (react_1.default.createElement(RepoList_1.default, { octokit: octokit, onRepoSelected: onRepoSelected })),
        !!isLoggedIn && (!!branches.length || !!tags.length) && !githubTree && (react_1.default.createElement(BranchAndTagList_1.default, { octokit: octokit, branches: branches, tags: tags, onBranchOrTagSelected: onBranchOrTagSelected }))));
};
module.exports = App;
exports.default = App;
