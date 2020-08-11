async function instantiate(filename) {
  let imports = {
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

  let { instance } = await WebAssembly.instantiateStreaming(fetch(filename), {
    imports,
  });
  wasm = { ...instance.exports };
  wasm.mem = new Float32Array(imports.memory.buffer);
  wasm.allocate_init(); //keep first index to count used memory
  return wasm;
}

//utils
function store(M, size = [M.length, 1]) {
  let ptr = wasm.allocate(size[0], size[1]);
  wasm.setsize(ptr, size[0], size[1]);

  let N = size[0] * size[1];
  for (let i = 0; i < N; i++) {
    wasm.setlinearindex(ptr, M[i], i + 1);
  }
  return ptr;
}

function view(ptr) {
  let N = wasm.length(ptr);
  return new Float32Array(wasm.mem.buffer, ptr + 8, N);
}

function storeview(M, size = [M.length, 1]) {
  let ptr = store(M, size);
  let v = view(ptr);
  return [ptr, v];
}

function copy(ptr) {
  return wasm.copy(ptr);
}

function copyview(ptr) {
  let newptr = wasm.copy(ptr);
  let v = view(wasm, newptr);
  return [newptr, v];
}
