import { middlewareFunction } from './types';

export default class Middleware<C, E> {
  constructor(ctx: C, starter: () => E) {
    this.context = ctx;
    this.starter = starter;
  }

  private middlewares = [];
  private context: C;
  private chain = () => { };
  private starter: () => E;

  public applyMiddleware(...middlewares: middlewareFunction<C>[]) {
    this.middlewares = [...middlewares];
    const collection = this.middlewares.map(middleware => middleware(this.context));
    this.chain = collection.reduce((a, b) => {
      return a(b(this.starter));
    });
    return this;
  }
  public async run() {
    return this.chain();
  }
}
