"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
exports.DropdownAnything = void 0;
var react_1 = __importStar(require("react"));
var styled_components_1 = __importDefault(require("styled-components"));
var DropdownContainer = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: fixed;\n  z-index: 999;\n"], ["\n  position: fixed;\n  z-index: 999;\n"])));
var TriggerContainer = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n"], ["\n"])));
var DropdownAnything = function (props) {
    var _a;
    var ref = (0, react_1.useRef)(null);
    var ddRef = (0, react_1.useRef)(null);
    var _b = (0, react_1.useState)(false), isOpen = _b[0], setIsOpen = _b[1];
    var _c = (0, react_1.useState)(0), _ = _c[0], setRerender = _c[1];
    var update = (0, react_1.useCallback)(function () {
        if (!ddRef.current || !ref.current)
            return;
        setRerender(Math.random());
    }, []);
    (0, react_1.useEffect)(function () {
        if (!ref.current || !isOpen)
            return;
        var resizeObserver = new ResizeObserver(function (entries) { return update(); });
        resizeObserver.observe(ref.current);
        return function () { return resizeObserver.disconnect(); };
    }, [isOpen, ref.current]);
    (0, react_1.useEffect)(function () {
        if (!isOpen)
            return;
        document.addEventListener('scroll', update, true);
        return function () { return document.removeEventListener('scroll', update, true); };
    }, [isOpen, update]);
    var rect = (_a = ref.current) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
    var computed = isOpen && rect && props.compute && props.compute(rect);
    var trigger = (0, react_1.useMemo)(function () { return props.triggerBuilder(isOpen, function (v) { return setIsOpen(v); }); }, [isOpen, props.triggerBuilder]);
    var dropdown = (0, react_1.useMemo)(function () { return isOpen && props.builder(computed, function () { return setIsOpen(false); }); }, [props.builder, computed]);
    return react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(TriggerContainer, { ref: ref }, trigger),
        isOpen && rect && react_1.default.createElement(DropdownContainer, { ref: ddRef, style: {
                top: rect.bottom + 'px',
                left: rect.left + 'px',
                width: rect.width + 'px',
            } }, dropdown));
};
exports.DropdownAnything = DropdownAnything;
var templateObject_1, templateObject_2;