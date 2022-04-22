interface DropdownAnythingProps {
    triggerBuilder: (isOpen: boolean, setIsOpen: (open: boolean) => any) => any;
    builder: (computed: any, close: () => any) => any;
    height?: number;
    compute?: (rect: DOMRect) => any;
    barrierDismissible?: boolean;
}
export declare const DropdownAnything: (props: DropdownAnythingProps) => JSX.Element;
export {};
