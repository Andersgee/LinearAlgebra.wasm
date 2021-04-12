async function instantiate(path) {
  const imports = {
    memory: new WebAssembly.Memory({ initial: 1, maximum: 1 }), //default 1 page of memory. Call wasm.requiredpages() after storing data for appropriate number here.
    println: (x) => console.log(x),
    "^": (a, p) => Math.pow(a, p),
    rand: (a) => Math.random(a),
    atan2: (a, b) => Math.atan2(a, b),
    sin: (a) => Math.sin(a),
    cos: (a) => Math.cos(a),
    tan: (a) => Math.tan(a),
    asin: (a) => Math.asin(a),
    acos: (a) => Math.acos(a),
    atan: (a) => Math.atan(a),
    sinh: (a) => Math.sinh(a),
    cosh: (a) => Math.cosh(a),
    tanh: (a) => Math.tanh(a),
    asinh: (a) => Math.asinh(a),
    acosh: (a) => Math.acosh(a),
    atanh: (a) => Math.atanh(a),
    cbrt: (a) => Math.cbrt(a),
    exp: (a) => Math.exp(a),
    expm1: (a) => Math.expm1(a),
    log: (a) => Math.log(a),
    log1p: (a) => Math.log1p(a),
    log10: (a) => Math.log10(a),
    log2: (a) => Math.log2(a),
    sign: (a) => Math.sign(a),
  };

  const readWasm = await Deno.readFile(path);
  const bin = new Uint8Array(readWasm);
  const mod = new WebAssembly.Module(bin);
  const instance = new WebAssembly.Instance(mod, { imports });
  const wasm = { ...instance.exports };
  wasm.mem = new Float32Array(imports.memory.buffer);
  wasm.allocate_init(); //keep first index to count used memory

  //utils
  wasm.store = (M, size = [M.length, 1]) => {
    let ptr = wasm.allocate(size[0], size[1]);
    wasm.setsize(ptr, size[0], size[1]);

    let N = size[0] * size[1];
    for (let i = 0; i < N; i++) {
      wasm.setlinearindex(ptr, M[i], i + 1);
    }
    return ptr;
  };

  wasm.view = (ptr) => {
    let N = wasm.length(ptr);
    return new Float32Array(wasm.mem.buffer, ptr + 8, N);
  };

  wasm.storeview = (M, size = [M.length, 1]) => {
    let ptr = wasm.store(M, size);
    let v = wasm.view(ptr);
    return [ptr, v];
  };
  /*
  wasm.copy = (ptr) => {
    return wasm.copy(ptr);
  };*/

  wasm.copyview = (ptr) => {
    let newptr = wasm.copy(ptr);
    let v = wasm.view(newptr);
    return [newptr, v];
  };

  return wasm;
}

const mat = await instantiate("./LinearAlgebra.wasm");

let W = mat.store([1, 2, 3, 4, 5, 6], [2, 3]); //2x3 matrix
let x = mat.store([5, 6, 7], [3, 1]); //3x1 matrix
let y = mat.mul(W, x); //matrix multiplication (this will allocate new memory to hold y)

let v = mat.zeros(2, 1); //preallocate
mat.mul_(v, W, x); //this operation will not allocate any new memory

console.log("(bytelocation in memory) y: ", y);
console.log("(bytelocation in memory) v: ", v);
console.log("(get value) y: ", mat.view(y));
console.log("(get value) v: ", mat.view(v));

/*

deno run --allow-read --allow-write --allow-net --watch --unstable  app.js

*/
