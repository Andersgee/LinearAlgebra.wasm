const { store, storeview, view } = require("../webassembly.js");

test("wasm.dot", () => {
  return fetchwasm.then((wasm) => {
    let W = store([1, 2, 3, 4, 5, 6], [3, 2]);
    let X = store([1, 2, 3, 4, 5, 6, 7, 8], [2, 4]);
    let Y = wasm.mul(W, X);
    let gold = [9, 12, 15, 19, 26, 33, 29, 40, 51, 39, 54, 69];
    expect([...view(Y)]).toEqual(expect.arrayContaining(gold));

    let X2 = store([1, 2]);
    let Y2 = wasm.mul(W, X2);
    let gold2 = [9, 12, 15];
    expect([...view(Y2)]).toEqual(expect.arrayContaining(gold2));
  });
});
