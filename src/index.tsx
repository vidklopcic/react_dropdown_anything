import React, {Ref, useCallback, useEffect, useMemo, useRef, useState} from "react";
import styled from "styled-components";


interface DropdownAnythingProps {
    triggerBuilder: (isOpen: boolean, setIsOpen: (open: boolean) => any) => any;
    builder: (computed: any, close: () => any) => any;
    height?: number;
    compute?: (rect: DOMRect) => any;
    barrierDismissible?: boolean;
    dependencies?: any[];
}

const DropdownContainer = styled.div`
  position: fixed;
  z-index: 999;
`;

const TriggerContainer = styled.div`
`;

export const DropdownAnything = (props: DropdownAnythingProps) => {
    const trRef = useRef<HTMLDivElement>(null);
    const ddRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [rerender, setRerender] = useState(0);

    const update = useCallback(function () {
        if (!ddRef.current || !trRef.current) return;
        setRerender(Math.random());
    }, []);

    const dependencies = props.dependencies || [];
    useEffect(() => {
        update();
    }, dependencies);


    useEffect(() => {
        if (!trRef.current || !isOpen) return;
        const resizeObserver = new ResizeObserver((entries) => update());
        resizeObserver.observe(trRef.current);
        return () => resizeObserver.disconnect();
    }, [isOpen, trRef.current]);

    useEffect(() => {
        if (!isOpen) return;
        document.addEventListener('scroll', update, true);
        window.addEventListener('resize', update, true);
        return () => {
            document.removeEventListener('scroll', update, true);
            document.removeEventListener('resize', update, true);
        }
    }, [isOpen, update]);

    const [yOffset, setYOffset] = useState(0);
    let trRect = trRef.current?.getBoundingClientRect();
    if (trRect && yOffset) trRect = new DOMRect(trRect.x, trRect.y + yOffset, trRect.width, trRect.height);
    const computed = isOpen && trRect && props.compute && props.compute(trRect);

    const trigger = useMemo(
        () => props.triggerBuilder(isOpen, (v) => setIsOpen(v)),
        [isOpen, props.triggerBuilder]
    );

    const dropdown = useMemo(
        () => isOpen && props.builder(computed, () => setIsOpen(false)),
        [props.builder, computed]
    );

    useEffect(() => {
        // iOS keyboard fix
        let trRect = trRef.current?.getBoundingClientRect();
        let ddRect = ddRef.current?.getBoundingClientRect();
        if (!ddRect || !trRect) return;
        const positionError = trRect.bottom - ddRect.top;
        if (positionError) {
            setYOffset(positionError);
        }
    }, [rerender]);

    return <>
        <TriggerContainer ref={trRef}>
            {trigger}
        </TriggerContainer>
        {isOpen && trRect && <DropdownContainer ref={ddRef} style={{
            top: trRect.bottom + 'px',
            left: trRect.left + 'px',
            width: trRect.width + 'px',
        }}>
            {dropdown}
        </DropdownContainer>}
        {isOpen && props.barrierDismissible && <div
            onClick={() => setIsOpen(false)}
            style={{
                position: 'fixed',
                top: '0',
                bottom: '0',
                left: '0',
                right: '0',
                zIndex: '998',
            }}/>}
    </>
};