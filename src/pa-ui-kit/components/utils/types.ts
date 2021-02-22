// Source: https://dev.to/mapleleaf/indexing-objects-in-typescript-1cgi
export function hasObjectKey<T>(obj: T, key: unknown): key is keyof T {
    return (key as string) in obj;
}

// Source: https://stackoverflow.com/a/59187769
export type ElementOf<T> = T extends (infer E)[] ? E : T extends readonly (infer F)[] ? F : never;

// Source: https://github.com/Microsoft/TypeScript/issues/25760#issuecomment-614417742
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<T>;

// Pick an object property type
export type PickPropType<T, P extends keyof T> = T[P];
