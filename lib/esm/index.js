var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
var DropdownContainer = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: fixed;\n  width: 100%;\n  height: 100%;\n  z-index: 999;\n"], ["\n  position: fixed;\n  width: 100%;\n  height: 100%;\n  z-index: 999;\n"])));
var TriggerContainer = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n"], ["\n"])));
export var DropdownAnything = function (props) {
    var _a;
    var ref = useRef(null);
    var ddRef = useRef(null);
    var _b = useState(false), isOpen = _b[0], setIsOpen = _b[1];
    var _c = useState(0), _ = _c[0], setRerender = _c[1];
    var update = useCallback(function () {
        if (!ddRef.current || !ref.current)
            return;
        setRerender(Math.random());
    }, []);
    var dependencies = props.dependencies || [];
    useEffect(function () {
        update();
    }, dependencies);
    useEffect(function () {
        if (!ref.current || !isOpen)
            return;
        var resizeObserver = new ResizeObserver(function (entries) { return update(); });
        resizeObserver.observe(ref.current);
        return function () { return resizeObserver.disconnect(); };
    }, [isOpen, ref.current]);
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
    var rect = (_a = ref.current) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
    var computed = isOpen && rect && props.compute && props.compute(rect);
    var trigger = useMemo(function () { return props.triggerBuilder(isOpen, function (v) { return setIsOpen(v); }); }, [isOpen, props.triggerBuilder]);
    var dropdown = useMemo(function () { return isOpen && props.builder(computed, function () { return setIsOpen(false); }); }, [props.builder, computed]);
    return React.createElement(React.Fragment, null,
        React.createElement(TriggerContainer, { ref: ref }, trigger),
        isOpen && rect && React.createElement(DropdownContainer, { ref: ddRef },
            React.createElement("div", { style: {
                    marginTop: rect.bottom + 'px',
                    marginLeft: rect.left + 'px',
                    width: rect.width + 'px',
                } }, dropdown)),
        isOpen && props.barrierDismissible && React.createElement("div", { onClick: function () { return setIsOpen(false); }, style: {
                position: 'fixed',
                width: '100%',
                height: '100%',
                zIndex: '998',
            } }));
};
var templateObject_1, templateObject_2;
