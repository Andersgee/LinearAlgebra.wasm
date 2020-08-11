const { store, view } = require("../webassembly.js");

test("wasm.dot", () => {
  return fetchwasm.then((wasm) => {
    let W = store([1, 2, 3, 4, 5, 6], [3, 2]);
    let X = store([1, 2, 3, 4, 5, 6, 7, 8], [2, 4]);
    let b = store([1, 2, 3], [3, 1]);
    let Y = wasm.muladd(W, X, b);
    let gold = [10, 14, 18, 20, 28, 36, 30, 42, 54, 40, 56, 72];
    expect([...view(Y)]).toEqual(expect.arrayContaining(gold));

    let X2 = store([1, 2]);
    let Y2 = wasm.muladd(W, X2, b);
    let gold2 = [10, 14, 18];
    expect([...view(Y2)]).toEqual(expect.arrayContaining(gold2));
  });
});
