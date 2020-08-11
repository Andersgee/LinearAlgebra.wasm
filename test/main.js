function setup() {
  const imports = {
    memory: new WebAssembly.Memory({ initial: 1, maximum: 1 }), //64kB per page
    println: (x) => console.log(x),
    "^": (x) => Math.exp(x),
    rand: () => Math.random(),
    tanh: (x) => Math.tanh(x),
  };

  webassembly("../LinearAlgebra.wasm", imports).then(({ wasm, mem }) =>
    main(wasm, mem)
  );
}

function main(wasm, mem) {
  let data = {
    z: [0, 0, 0, 0],
    W: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    x: [1, 2, 3, 4],
    y: [0, 0, 0],
    a: [1, 2, 3],
    b: [4, 5, 6],
    c: [0.1, 0.2, 0.3],
  };

  let ptr = storearrays(mem, data);
  data = arrayviews(mem, ptr);
  //modifying data.x now changes the actual WebAssembly memory.

  //to pass data.x to a wasm function, use ptr.x:
  //wasm.myfunc1(ptr.y, ptr.W, ptr.x)

  //normal numbers can be passed as is:
  //eg wasm.myfunc2(2)

  //so a real example might look like this:
  //wasm.mix(ptr.y, ptr.a, ptr.b, 0.7)

  console.log("data.W: ", data.W);

  //console.log(wasm.mul(2,3));
  console.log(wasm.sigm(2.1));
}

window.onload = setup();
