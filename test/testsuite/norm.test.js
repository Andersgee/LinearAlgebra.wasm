const { store } = require("../webassembly.js");

test("wasm.dot", () => {
  return fetchwasm.then((wasm) => {
    let y = store([0, 0, 0, 0, 0, 0]);
    let a = store([3, 4]);

    let res = wasm.norm2(a);
    let gold = 5;
    expect(res).toBeCloseTo(gold);
    let res2 = wasm.norm(a, 2);
    expect(res2).toBeCloseTo(gold);

    let res3 = wasm.norm(a, 3.5);
    let gold3 = 4.372215289689355;
    expect(res3).toBeCloseTo(gold3);
  });
});
