async function instantiate(path) {
  const imports = {
    memory: new WebAssembly.Memory({ initial: 1, maximum: 1 }), //default 1 page of memory. Call wasm.requiredpages() after storing data for appropriate number here.
    rand: (a) => Math.random(a),
    cos: (a) => Math.cos(a),
    log: (a) => Math.log(a),
    "^": (a, p) => Math.pow(a, p),
  };

  const mod = await WebAssembly.instantiateStreaming(fetch(path), {
    imports,
  });
  const wasm = { ...mod.instance.exports };
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
