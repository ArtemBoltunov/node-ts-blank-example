import Example from './index';

console.log = jest.fn();

test('Example run display message', () => {
  Example.run();
  expect(console.log).toBeCalledWith('configuration is working');
});
