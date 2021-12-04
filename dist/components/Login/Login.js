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
const react_1 = __importStar(require("react"));
const ink_1 = require("ink");
function Login({ octokit }) {
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    const [userName, setUserName] = (0, react_1.useState)("");
    const [errorMessage, setErrorMessage] = (0, react_1.useState)("");
    (0, react_1.useEffect)(() => {
        octokit.rest.users
            .getAuthenticated()
            .then((res) => {
            const { data: { login }, } = res;
            console.log("Hello, %s", login);
            setUserName(login);
        })
            .catch((error) => {
            setErrorMessage(error);
        })
            .finally(() => {
            setIsLoading(true);
        });
    }, []);
    if (isLoading) {
        return react_1.default.createElement(ink_1.Text, { color: "aliceblue" }, "Loading");
    }
    if (!!errorMessage) {
        return react_1.default.createElement(ink_1.Text, { color: "red" }, errorMessage);
    }
    return (react_1.default.createElement(ink_1.Text, null,
        "Hello, ",
        react_1.default.createElement(ink_1.Text, { color: "green" }, userName)));
}
exports.default = Login;
