const { store, view } = require("../webassembly.js");

test("wasm.dot", () => {
  return fetchwasm.then((wasm) => {
    let b = store([3, 4]);
    let y = wasm.normalize(b);
    let yv = view(y);
    expect(yv[0]).toBeCloseTo(0.6);
    expect(yv[1]).toBeCloseTo(0.8);
  });
});
