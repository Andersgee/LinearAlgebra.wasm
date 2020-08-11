const { store } = require("../webassembly.js");

test("wasm.dot", () => {
  return fetchwasm.then((wasm) => {
    let a = store([1, 2, 3, 4, 5, 6], [3, 2]);
    let b = store([4, 5, 6, 7, 8, 9], [3, 2]);
    let gold = 154;
    let res = wasm.dot(a, b);
    expect(res).toBeCloseTo(gold);

    let a2 = store([1.3, 1.5, 1.7]);
    let b2 = store([5.1, 6.2, 9.9]);
    let gold2 = 32.760000000000005;
    let res2 = wasm.dot(a2, b2);
    expect(res2).toBeCloseTo(gold2);
  });
});
