const { store, view } = require("../webassembly.js");

test("wasm.dot", () => {
  return fetchwasm.then((wasm) => {
    let W = store([1, 2, 3, 4, 5, 6], [3, 2]);
    let WT = wasm.transpose(W);
    let gold = [1, 4, 2, 5, 3, 6];
    expect([...view(WT)]).toEqual(expect.arrayContaining(gold));
  });
});
