//These two are not needed in a browser
const fetch = require("node-fetch");
const { instantiateStreaming } = require("wasm-instantiate-streaming");
WebAssembly.instantiateStreaming = instantiateStreaming;

async function instantiate_withimports(filename) {
  const imports = {
    memory: new WebAssembly.Memory({ initial: 1, maximum: 1 }), //64kB per page
    println: (x) => console.log(x),
    "^": (a) => Math.pow(a),
    rand: (a) => Math.random(a),
    atan2: (a, b) => Math.atan2(a, b),
    sin: (a) => Math.sin(a),
    cos: (a) => Math.cos(a),
    tan: (a) => Math.tan(a),
    asin: (a) => Math.asin(a),
    acos: (a) => Math.acos(a),
    atan: (a) => Math.atan(a),
    sinh: () => Math.sinh(a),
    cosh: (a) => Math.cosh(a),
    tanh: () => Math.tanh(a),
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

  return await instantiate(filename, imports);
}

async function instantiate(filename, imports) {
  let { instance } = await WebAssembly.instantiateStreaming(fetch(filename), {
    imports,
  });
  let wasm = { ...instance.exports };
  wasm.mem = new Float32Array(imports.memory.buffer);
  wasm.mem[0] = 1;
  return wasm;
}

//utils

function requiredpages(wasm) {
  return Math.ceil(wasm.mem[0] / 16000); //64k bytes per page is 16k f32s per page
}

function storearray(wasm, size, v) {
  let idx = wasm.mem[0]; //f32 index of first free memory
  let ptr = idx * 4; //bytepointer
  wasm.setsize(ptr, size[0], size[1]);
  let N = v.length;
  for (let i = 0; i < N; i++) {
    wasm.mem[idx + i + 2] = v[i]; //plus 2 for size values
  }
  wasm.mem[0] += N + 2; //count used memory plus 2 for size values
  return ptr;
}

function storearrays(wasm, arrays) {
  let p = {};
  for (let k in arrays) {
    p[k] = storearray(wasm, arrays[k].size, arrays[k].array);
  }
  return p;
}

function arrayview(wasm, ptr) {
  let N = wasm.length(ptr);
  return new Float32Array(wasm.mem.buffer, ptr + 8, N);
}

function arrayviews(wasm, ptrs) {
  let view = {};
  for (let ptr in ptrs) {
    view[ptr] = arrayview(wasm, ptrs[ptr]);
  }
  return view;
}

const getwasm = instantiate_withimports("http://localhost:8080");

getwasm.then((wasm) => {
  /*
  let arrays = {
    a: { size: [3, 2], array: new Float32Array([1, 2, 3, 4, 5, 6]) },
    b: { size: [3, 2], array: new Float32Array([4, 5, 6, 7, 8, 9]) },
  };
  let ptrs = storearrays(wasm, arrays);
  let res = wasm.dot(ptrs.a, ptrs.b);

  let views = arrayviews(wasm, ptrs);
  console.log("res: ", res);
  console.log("view: ", view);
  */
  let a = storearray(wasm, [3, 2], new Float32Array([1, 2, 3, 4, 5, 6]));
  let b = storearray(wasm, [3, 2], new Float32Array([4, 5, 6, 7, 8, 9]));
  let res = wasm.dot(a, b);
  console.log("res: ", res);
});
