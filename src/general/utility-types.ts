export type MapProps<T, V> = {
    [P in keyof T]: V
};

export type SubtractType<T, U> = Pick<T, Exclude<keyof T, keyof U>>;
