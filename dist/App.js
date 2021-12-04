"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const octokit_1 = require("octokit");
const Login_1 = __importDefault(require("./components/Login/Login"));
const ink_1 = require("ink");
// Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
const octokit = new octokit_1.Octokit({
    auth: `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`,
    userAgent: "github-fetcher/v0.0.1",
});
const App = ({ packageName }) => {
    console.log("packageName", packageName);
    return (react_1.default.createElement(ink_1.Box, { margin: 2 },
        react_1.default.createElement(Login_1.default, { octokit: octokit })));
};
module.exports = App;
exports.default = App;
