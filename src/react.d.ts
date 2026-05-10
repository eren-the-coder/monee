declare module 'react/jsx-runtime' {
  export const Fragment: any;
  export const jsx: any;
  export const jsxs: any;
}

declare global {
  namespace JSX {
    interface ElementClass { }
    interface Element {
      type: any;
      props: any;
      key: any;
    }
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
