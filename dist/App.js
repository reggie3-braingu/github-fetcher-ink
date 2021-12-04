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
const PackageList_1 = __importDefault(require("./components/PackageList/PackageList"));
// Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
const App = ({ packageName }) => {
    const [userName, setUserName] = (0, react_1.useState)("");
    const [octokit, setOctokit] = (0, react_1.useState)(null);
    const [isLoggedIn, setIsLoggedIn] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        if (userName && octokit && !isLoggedIn) {
            setIsLoggedIn(true);
        }
    }, [userName, octokit, isLoggedIn]);
    return (react_1.default.createElement(ink_1.Box, { display: "flex", flexDirection: "column" },
        !userName && react_1.default.createElement(Login_1.default, { setUserName: setUserName, setOctokit: setOctokit }),
        !!userName && (react_1.default.createElement(ink_1.Text, null,
            "Hello, ",
            react_1.default.createElement(ink_1.Text, { color: "green" }, userName))),
        !!isLoggedIn && react_1.default.createElement(PackageList_1.default, { octokit: octokit })));
};
module.exports = App;
exports.default = App;
