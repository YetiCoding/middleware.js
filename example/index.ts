import Middleware from '../src/index';

const middleware = new Middleware({}, () => 1);
middleware.applyMiddleware(() => (next) => async () => {
  console.log('run middle a');
  const value = await next();
  console.log('second result:', value);
  return value + 1;
}, () => (next) => async () => {
  console.log('run middle b');
  const value = await next();
  console.log('first result:', value);
  return value + 1;
});

middleware.run().then((result) => {
  console.log('final result', result);
});
