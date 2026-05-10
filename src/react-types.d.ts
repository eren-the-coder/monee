declare namespace React {
  function useState<T>(initialState: T | (() => T)): [T, (value: T | ((val: T) => T)) => void];
  function useEffect(effect: () => void | (() => void), deps?: any[]): void;
  function useCallback<T extends (...args: any[]) => any>(callback: T, deps: any[]): T;
  function useMemo<T>(factory: () => T, deps?: any[]): T;
  function useRef<T>(initialValue: T): any;
  function createContext<T>(defaultValue: T): any;
  function useContext<T>(context: any): T;
  const Fragment: any;
  const StrictMode: any;
  type ReactNode = any;
  type ReactElement = any;
  type PropsWithChildren<P = {}> = P & { children?: ReactNode };
  interface FunctionComponent<P = {}> {
    (props: PropsWithChildren<P>): ReactElement | null;
    displayName?: string;
  }
  type FC<P = {}> = FunctionComponent<P>;
  interface DragEvent extends Event {
    dataTransfer: DataTransfer;
    preventDefault(): void;
  }
  interface TouchEvent extends Event {
    touches: any[];
    changedTouches: any[];
    targetTouches: any[];
    preventDefault(): void;
  }
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
    interface IntrinsicAttributes {
      [key: string]: any;
    }
  }
}

declare module 'react' {
  export = React;
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
