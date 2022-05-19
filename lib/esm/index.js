var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
var DropdownContainer = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: fixed;\n  z-index: 999;\n"], ["\n  position: fixed;\n  z-index: 999;\n"])));
var TriggerContainer = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n"], ["\n"])));
export var DropdownAnything = function (props) {
    var _a;
    var trRef = useRef(null);
    var ddRef = useRef(null);
    var _b = useState(false), isOpen = _b[0], setIsOpen = _b[1];
    var _c = useState(0), rerender = _c[0], setRerender = _c[1];
    var update = useCallback(function () {
        if (!ddRef.current || !trRef.current)
            return;
        setRerender(Math.random());
    }, []);
    var dependencies = props.dependencies || [];
    useEffect(function () {
        update();
    }, dependencies);
    useEffect(function () {
        if (!trRef.current || !isOpen)
            return;
        var resizeObserver = new ResizeObserver(function (entries) { return update(); });
        resizeObserver.observe(trRef.current);
        return function () { return resizeObserver.disconnect(); };
    }, [isOpen, trRef.current]);
    useEffect(function () {
        if (!isOpen)
            return;
        document.addEventListener('scroll', update, true);
        window.addEventListener('resize', update, true);
        return function () {
            document.removeEventListener('scroll', update, true);
            document.removeEventListener('resize', update, true);
        };
    }, [isOpen, update]);
    var _d = useState(0), yOffset = _d[0], setYOffset = _d[1];
    var trRect = (_a = trRef.current) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
    if (trRect && yOffset)
        trRect = new DOMRect(trRect.x, trRect.y + yOffset, trRect.width, trRect.height);
    var computed = isOpen && trRect && props.compute && props.compute(trRect);
    var trigger = useMemo(function () { return props.triggerBuilder(isOpen, function (v) { return setIsOpen(v); }); }, [isOpen, props.triggerBuilder]);
    var dropdown = useMemo(function () { return isOpen && props.builder(computed, function () { return setIsOpen(false); }); }, [props.builder, computed]);
    useEffect(function () {
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
    return React.createElement(React.Fragment, null,
        React.createElement(TriggerContainer, { ref: trRef }, trigger),
        isOpen && trRect && React.createElement(DropdownContainer, { ref: ddRef, style: {
                top: trRect.bottom + 'px',
                left: trRect.left + 'px',
                width: trRect.width + 'px',
            } }, dropdown),
        isOpen && props.barrierDismissible && React.createElement("div", { onClick: function () { return setIsOpen(false); }, style: {
                position: 'fixed',
                top: '0',
                bottom: '0',
                left: '0',
                right: '0',
                zIndex: '998',
            } }));
};
var templateObject_1, templateObject_2;
