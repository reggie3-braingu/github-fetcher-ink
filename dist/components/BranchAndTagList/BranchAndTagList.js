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
const ink_1 = require("ink");
const ink_select_input_1 = __importDefault(require("ink-select-input"));
const ink_divider_1 = __importDefault(require("ink-divider"));
const BranchAndTagList = ({ branches, onBranchOrTagSelected, octokit, tags, }) => {
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const [errorMessage, setErrorMessage] = (0, react_1.useState)("");
    const [listItems, setListItems] = (0, react_1.useState)([]);
    const [selectedItem, setSelectedItem] = (0, react_1.useState)();
    (0, react_1.useEffect)(() => {
        if (!!branches.length || !!tags.length) {
            const newItems = [];
            (branches !== null && branches !== void 0 ? branches : []).forEach((branch, index) => {
                newItems.push({
                    label: `Branch - ${branch.name}  (sha - ${branch.commit.sha})`,
                    value: branch.commit.sha + "||" + index,
                });
            });
            (tags !== null && tags !== void 0 ? tags : []).forEach((tag, index) => {
                newItems.push({
                    label: `Tag - ${tag.name}  (sha - ${tag.commit.sha})`,
                    value: tag.commit.sha + "||" + index,
                });
            });
            setListItems(newItems);
        }
    }, [branches, tags]);
    const onSelect = (item) => {
        if (item.label.toLowerCase().indexOf("branch") !== -1) {
            onBranchOrTagSelected({
                branch: branches.find((branch) => branch.commit.sha === item.value.split("||")[0]),
            });
        }
        else if (item.label.toLowerCase().indexOf("tag") !== -1) {
            onBranchOrTagSelected({
                tag: tags.find((tag) => tag.commit.sha === item.value.split("||")[0]),
            });
        }
    };
    if (!selectedItem) {
        return (react_1.default.createElement(ink_1.Box, { display: "flex", flexDirection: "column", marginTop: 1 },
            react_1.default.createElement(ink_divider_1.default, { title: "Select a Branch or Tag", dividerColor: "dodgerblue" }),
            react_1.default.createElement(ink_select_input_1.default, { items: listItems, onSelect: onSelect, initialIndex: 0 })));
    }
    return (react_1.default.createElement(ink_1.Box, { display: "flex", flexDirection: "column", marginTop: 1 },
        react_1.default.createElement(ink_1.Text, { color: "yellow" },
            setSelectedItem.name,
            " selected")));
};
exports.default = BranchAndTagList;
