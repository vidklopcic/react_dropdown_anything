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
    var trRef = (0, react_1.useRef)(null);
    var ddRef = (0, react_1.useRef)(null);
    var _b = (0, react_1.useState)(false), isOpen = _b[0], setIsOpen = _b[1];
    var _c = (0, react_1.useState)(0), rerender = _c[0], setRerender = _c[1];
    var update = (0, react_1.useCallback)(function () {
        if (!ddRef.current || !trRef.current)
            return;
        setRerender(Math.random());
    }, []);
    var dependencies = props.dependencies || [];
    (0, react_1.useEffect)(function () {
        update();
    }, dependencies);
    (0, react_1.useEffect)(function () {
        if (!trRef.current || !isOpen)
            return;
        var resizeObserver = new ResizeObserver(function (entries) { return update(); });
        resizeObserver.observe(trRef.current);
        return function () { return resizeObserver.disconnect(); };
    }, [isOpen, trRef.current]);
    (0, react_1.useEffect)(function () {
        if (!isOpen)
            return;
        document.addEventListener('scroll', update, true);
        window.addEventListener('resize', update, true);
        return function () {
            document.removeEventListener('scroll', update, true);
            document.removeEventListener('resize', update, true);
        };
    }, [isOpen, update]);
    var _d = (0, react_1.useState)(0), yOffset = _d[0], setYOffset = _d[1];
    var trRect = (_a = trRef.current) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
    if (trRect && yOffset)
        trRect = new DOMRect(trRect.x, trRect.y + yOffset, trRect.width, trRect.height);
    var computed = isOpen && trRect && props.compute && props.compute(trRect);
    var trigger = (0, react_1.useMemo)(function () { return props.triggerBuilder(isOpen, function (v) { return setIsOpen(v); }); }, [isOpen, props.triggerBuilder]);
    var dropdown = (0, react_1.useMemo)(function () { return isOpen && props.builder(computed, function () { return setIsOpen(false); }); }, [props.builder, computed]);
    (0, react_1.useEffect)(function () {
        var _a, _b;
        // iOS keyboard fix
        var trRect = (_a = trRef.current) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
        var ddRect = (_b = ddRef.current) === null || _b === void 0 ? void 0 : _b.getBoundingClientRect();
        if (!ddRect || !trRect)
            return;
        var positionError = trRect.bottom - ddRect.top;
        if (positionError) {
            setYOffset(yOffset + positionError);
        }
    }, [rerender]);
    return react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(TriggerContainer, { ref: trRef }, trigger),
        isOpen && trRect && react_1.default.createElement(DropdownContainer, { ref: ddRef, style: {
                top: trRect.bottom + 'px',
                left: trRect.left + 'px',
                width: trRect.width + 'px',
            } }, dropdown),
        isOpen && props.barrierDismissible && react_1.default.createElement("div", { onClick: function () { return setIsOpen(false); }, style: {
                position: 'fixed',
                top: '0',
                bottom: '0',
                left: '0',
                right: '0',
                zIndex: '998',
            } }));
};
exports.DropdownAnything = DropdownAnything;
var templateObject_1, templateObject_2;
