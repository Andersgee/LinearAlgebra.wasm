const { store } = require("../webassembly.js");

test("wasm.dot", () => {
  return fetchwasm.then((wasm) => {
    let a = store([1, 2, 3]);
    let b = store([4, 5, 6]);
    let res = wasm.requiredpages();
    let gold = 1;
    expect(res).toEqual(gold);

    let c = new Float32Array(64000 / 4);
    c = store(c);
    let res2 = wasm.requiredpages();
    let gold2 = 2;
    expect(res2).toEqual(gold2);
  });
});
