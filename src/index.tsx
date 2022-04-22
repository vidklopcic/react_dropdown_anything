import React, {Ref, useCallback, useEffect, useMemo, useRef, useState} from "react";
import styled from "styled-components";


interface DropdownAnythingProps {
    triggerBuilder: (isOpen: boolean, setIsOpen: (open: boolean) => any) => any;
    builder: (computed: any, close: () => any) => any;
    height?: number;
    compute?: (rect: DOMRect) => any;
    barrierDismissible?: boolean;
}

const DropdownContainer = styled.div`
  position: fixed;
  z-index: 999;
`;

const TriggerContainer = styled.div`
`;

export const DropdownAnything = (props: DropdownAnythingProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const ddRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [_, setRerender] = useState(0);

    const update = useCallback(function () {
        if (!ddRef.current || !ref.current) return;
        setRerender(Math.random());
    }, []);


    useEffect(() => {
        if (!ref.current || !isOpen) return;
        const resizeObserver = new ResizeObserver((entries) => update());
        resizeObserver.observe(ref.current);
        return () => resizeObserver.disconnect();
    }, [isOpen, ref.current]);

    useEffect(() => {
        if (!isOpen) return;
        document.addEventListener('scroll', update, true);
        return () => document.removeEventListener('scroll', update, true);
    }, [isOpen, update]);

    const rect = ref.current?.getBoundingClientRect();
    const computed = isOpen && rect && props.compute && props.compute(rect);

    const trigger = useMemo(
        () => props.triggerBuilder(isOpen, (v) => setIsOpen(v)),
        [isOpen, props.triggerBuilder]
    );

    const dropdown = useMemo(
        () => isOpen && props.builder(computed, () => setIsOpen(false)),
        [props.builder, computed]
    );

    return <>
        <TriggerContainer ref={ref}>
            {trigger}
        </TriggerContainer>
        {isOpen && rect && <DropdownContainer ref={ddRef} style={{
            top: rect.bottom + 'px',
            left: rect.left + 'px',
            width: rect.width + 'px',
        }}>
            {dropdown}
        </DropdownContainer>}
        {props.barrierDismissible && <div
            onClick={() => setIsOpen(false)}
            style={{
                top: '0',
                bottom: '0',
                left: '0',
                right: '0',
                zIndex: '998',
            }}/>}
    </>
};