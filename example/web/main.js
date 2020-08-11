function main(wasm) {
  example1(wasm);
  example2(wasm);
  example3(wasm);
}

function example1(wasm) {
  let W = store([1, 2, 3, 4, 5, 6], [2, 3]); //store(matrix, size)
  let x = store([1, 2, 3]); //store(vector) aka matrix with a single column

  let y = wasm.mul(W, x); //matrix multiplication (julia: y = W*x)

  console.log("example1: ", view(y)); //since y is just a pointer to the array, use view() to see the array.
}

function example2(wasm) {
  let W = store([1, 2, 3, 4, 5, 6], [2, 3]);
  let x = store([1, 2, 3]);
  let y = store([0, 0]); //preallocate output

  wasm.mul_(y, W, x); //matrix multiplication with preallocated output (julia: mul!(y,W,x) )

  console.log("example2: ", view(y));
}

function example3(wasm) {
  let W1 = wasm.randn(5, 10);
  let b1 = wasm.zeros(5, 1);

  let W2 = wasm.randn(2, 5);
  let b2 = wasm.zeros(2, 1);

  let x = wasm.randn(10, 4);

  let z1 = wasm.muladd(W1, x, b1); //(julia: z1 = W1*x .+ b1)
  let z2 = wasm.muladd(W2, z1, b2); //(julia: z2 = W2*z1 .+ b2)

  console.log("example3: z2: ", view(z2));
  console.log("example3: size(sz): ", wasm.size(z2));
}

window.onload = instantiate("LinearAlgebra.wasm").then((wasm) => main(wasm));
