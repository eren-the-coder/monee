declare global {
    namespace JSX {
        interface Element {
            type: any;
            props: any;
            key: any;
        }
        interface ElementClass { }
        interface IntrinsicAttributes {
            [key: string]: any;
        }
        interface IntrinsicClassAttributes<T> {
            [key: string]: any;
        }
        interface IntrinsicElements {
            [elemName: string]: any;
        }
        interface ElementChildrenAttribute {
            children: any;
        }
    }
}

export { };
