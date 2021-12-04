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
const PackageList = ({ octokit }) => {
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const [packages, setPackages] = (0, react_1.useState)([]);
    const [errorMessage, setErrorMessage] = (0, react_1.useState)("");
    const [items, setItems] = (0, react_1.useState)([]);
    const [selectedPackage, setSelectedPackage] = (0, react_1.useState)();
    (0, react_1.useEffect)(() => {
        if (octokit) {
            octokit.rest.repos
                .listForOrg({
                org: "braingu",
            })
                .then(({ data: newPackages, status }) => {
                // @ts-ignore
                setPackages(newPackages);
            })
                .catch((error) => {
                setErrorMessage(error);
            })
                .finally(() => {
                setIsLoading(false);
            });
        }
    }, []);
    (0, react_1.useEffect)(() => {
        if (packages.length) {
            const items = [];
            packages.forEach((packageItem) => {
                var _a;
                items.push({
                    label: `${packageItem.name} - ${(_a = packageItem.description) !== null && _a !== void 0 ? _a : "no description"}`,
                    value: packageItem.id,
                });
            });
            setItems(items);
        }
    }, [packages]);
    const onSelect = (item) => {
        console.log(item);
        setSelectedPackage(packages.find((packageItem) => packageItem.id === item.value));
    };
    if (!!isLoading) {
        return react_1.default.createElement(ink_1.Text, { color: "aliceblue" }, "Loading Packages");
    }
    if (!!errorMessage) {
        return react_1.default.createElement(ink_1.Text, { color: "red" }, errorMessage);
    }
    if (!selectedPackage) {
        return (react_1.default.createElement(ink_1.Box, { display: "flex", flexDirection: "column" },
            react_1.default.createElement(ink_divider_1.default, { title: "Select a Package", dividerColor: "dodgerblue" }),
            react_1.default.createElement(ink_select_input_1.default, { items: items, onSelect: onSelect, initialIndex: 0 })));
    }
    return (react_1.default.createElement(ink_1.Box, { display: "flex", flexDirection: "column", marginTop: 1 },
        react_1.default.createElement(ink_1.Text, null, selectedPackage.name)));
};
exports.default = PackageList;
