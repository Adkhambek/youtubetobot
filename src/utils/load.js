module.exports = (func, time) =>
    new Promise((res) => setTimeout(() => res(func()), time));
