const webassembly = require("../webassembly.js");

test("fetch wasm from http://localhost:8080", () => {
  return expect(fetchwasm).resolves.not.toBe(
    "this doesnt matter. test will fail if not resolved"
  );
});
