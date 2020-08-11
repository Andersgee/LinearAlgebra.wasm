const { store, view } = require("../webassembly.js");

test("wasm.dot", () => {
  return fetchwasm.then((wasm) => {
    let a = new Float32Array([1, 2, 3, 4, 5, 6]);
    let b = new Float32Array([4, 5, 6, 7, 8, 9]);
    a = store(a, [3, 2]);
    b = store(b, [3, 2]);

    let av = view(a);
    expect([...av]).toEqual(expect.arrayContaining([1, 2, 3, 4, 5, 6]));

    let bv = view(b);
    expect([...bv]).toEqual(expect.arrayContaining([4, 5, 6, 7, 8, 9]));
  });
});
