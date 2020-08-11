const { storeview, copyview, view } = require("../webassembly.js");

test("wasm.dot", () => {
  return fetchwasm.then((wasm) => {
    let [a, av] = storeview([1, 2, 3]);
    let [b, bv] = copyview(a);
    expect([...bv]).toEqual(expect.arrayContaining([...av]));

    let c = wasm.copy(a);
    expect([...view(c)]).toEqual(expect.arrayContaining([...av]));
  });
});
