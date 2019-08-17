export type middlewareFunction<CTX> = (ctx: CTX) => (next: () => Promise<any>) => () => Promise<any>;
