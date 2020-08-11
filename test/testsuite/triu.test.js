const { store, view } = require("../webassembly.js");

test("wasm.dot", () => {
  return fetchwasm.then((wasm) => {
    let M = store([1, 2, 3, 4, 5, 6, 7, 8, 9], [3, 3]);
    let U = wasm.triu(M, 0);
    let gold = [1, 0, 0, 4, 5, 0, 7, 8, 9];
    expect([...view(U)]).toEqual(expect.arrayContaining(gold));

    let U2 = wasm.triu(M, 1);
    let gold2 = [0, 0, 0, 4, 0, 0, 7, 8, 0];
    expect([...view(U2)]).toEqual(expect.arrayContaining(gold2));
  });
});
