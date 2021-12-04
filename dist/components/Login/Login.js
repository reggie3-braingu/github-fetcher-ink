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
Object.defineProperty(exports, "__esModule", { value: true });
const octokit_1 = require("octokit");
const react_1 = __importStar(require("react"));
const ink_1 = require("ink");
const ink_text_input_1 = require("ink-text-input");
function Login({ setOctokit, setUserName }) {
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const [errorMessage, setErrorMessage] = (0, react_1.useState)("");
    const [authToken, setAuthToken] = (0, react_1.useState)("");
    const [localUserName, setLocalName] = (0, react_1.useState)("");
    (0, react_1.useEffect)(() => {
        if (authToken) {
            setIsLoading(true);
            const octokit = new octokit_1.Octokit({
                // auth: `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`,
                auth: authToken,
                userAgent: "github-fetcher/v0.0.1",
            });
            octokit.rest.users
                .getAuthenticated()
                .then((res) => {
                const { data: { login }, } = res;
                setIsLoading(false);
                setLocalName(login);
            })
                .catch((error) => {
                setErrorMessage(error);
            })
                .finally(() => {
                setIsLoading(false);
            });
            setOctokit(octokit);
        }
    }, [authToken]);
    (0, react_1.useEffect)(() => {
        if (localUserName && !isLoading) {
            setUserName(localUserName);
        }
    }, [isLoading, localUserName]);
    const onAuthTokenSubmit = (value) => {
        setAuthToken(value);
    };
    if (isLoading) {
        return react_1.default.createElement(ink_1.Text, { color: "aliceblue" }, "Loading");
    }
    if (!!errorMessage) {
        return react_1.default.createElement(ink_1.Text, { color: "red" }, errorMessage);
    }
    return (react_1.default.createElement(ink_1.Box, { display: "flex", flexDirection: "column" },
        react_1.default.createElement(ink_1.Text, null, "Enter your authToken: "),
        react_1.default.createElement(ink_text_input_1.UncontrolledTextInput, { onSubmit: onAuthTokenSubmit })));
}
exports.default = Login;
