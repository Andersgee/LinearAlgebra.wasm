const { store, storeview, view } = require("../webassembly.js");

test("wasm.dot", () => {
  return fetchwasm.then((wasm) => {
    let a = store([1, 2, 3]);
    let b = store([4, 5, 6]);
    let y = wasm.cross(a, b);
    let gold = [-3, 6, -3];
    expect([...view(y)]).toEqual(expect.arrayContaining(gold));

    let a2 = store([11, 2, 3]);
    let b2 = store([4, 15, 6]);
    let y2 = wasm.cross(a2, b2);
    let gold2 = [-33, -54, 157];
    expect([...view(y2)]).toEqual(expect.arrayContaining(gold2));
  });
});
