const { storeview } = require("../webassembly.js");

test("wasm.dot", () => {
  return fetchwasm.then((wasm) => {
    let [a, av] = storeview([1, 2, 0, 4, 5, 6], [3, 2]);
    let [b, bv] = storeview([0, 5, 6, 7, 8, 9], [3, 2]);
    av[2] = 3;
    bv[0] = 4;
    let gold = 154;
    let res = wasm.dot(a, b);
    expect(res).toBeCloseTo(gold);
  });
});
