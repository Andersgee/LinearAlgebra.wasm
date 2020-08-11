const { store, view } = require("../webassembly.js");

test("wasm.dot", () => {
  return fetchwasm.then((wasm) => {
    let a = store([1, 2, 3, 4, 5, 6]);
    let y = wasm.rmul(a, 2.5);
    let gold = [2.5, 5, 7.5, 10, 12.5, 15];
    expect([...view(y)]).toEqual(expect.arrayContaining(gold));

    let y2 = wasm.rdiv(a, 2);
    let gold2 = [0.5, 1, 1.5, 2, 2.5, 3];
    expect([...view(y2)]).toEqual(expect.arrayContaining(gold2));
  });
});
