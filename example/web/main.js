function main(mat) {
  console.log("available methods: ", mat);
  example1(mat);
  example2(mat);
  example3(mat);
}

function example1(mat) {
  let W = mat.store([1, 2, 3, 4, 5, 6], [2, 3]); //store(matrix, size)
  let x = mat.store([1, 2, 3]); //store(vector) aka matrix with a single column

  let y = mat.mul(W, x); //matrix multiplication (julia: y = W*x)

  console.log("example1: ", mat.view(y)); //since y is just a pointer to the array, use view() to see the array.
}

function example2(mat) {
  let W = mat.store([1, 2, 3, 4, 5, 7], [2, 3]);
  let x = mat.store([1, 2, 3]);
  let y = mat.store([0, 0]); //preallocate output

  mat.mul_(y, W, x); //matrix multiplication with preallocated output (julia: mul!(y,W,x) )

  console.log("example2: ", mat.view(y));
}

function example3(mat) {
  let W1 = mat.randn(5, 10);
  let b1 = mat.zeros(5, 1);

  let W2 = mat.randn(2, 5);
  let b2 = mat.zeros(2, 1);

  let x = mat.randn(10, 4);

  let z1 = mat.muladd(W1, x, b1); //(julia: z1 = W1*x .+ b1)
  let z2 = mat.muladd(W2, z1, b2); //(julia: z2 = W2*z1 .+ b2)

  console.log("example3: z2: ", mat.view(z2));
  console.log("example3: size(z2): ", mat.size(z2));
}

window.onload = instantiate("LinearAlgebra.wasm").then((mat) => main(mat));
