const { store, view } = require("../webassembly.js");

test("wasm.dot", () => {
  return fetchwasm.then((wasm) => {
    let a = store([1, 2, 3]);
    let b = store([4, 5, 6]);
    let v = store([0.5, 1.0, 0.75]);

    let y = wasm.mix(a, b, v);
    let gold = [2.5, 5, 5.25];
    expect([...view(y)]).toEqual(expect.arrayContaining(gold));

    let t = 0.75;
    let y2 = wasm.mixscalar(a, b, t);
    let gold2 = [3.25, 4.25, 5.25];
    expect([...view(y2)]).toEqual(expect.arrayContaining(gold2));
  });
});
