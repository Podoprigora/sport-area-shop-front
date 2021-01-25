// Source: https://dev.to/mapleleaf/indexing-objects-in-typescript-1cgi

export function hasObjectKey<T>(obj: T, key: unknown): key is keyof T {
    return (key as string) in obj;
}
