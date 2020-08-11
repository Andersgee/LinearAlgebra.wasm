# LinearAlgebra.wasm

_Why_ - Working with matrices in javascript is annoying.
_How_ - Write julia, translate to WebAssembly.
_Goal_ - Same functionality as julias LinearAlgebra.jl, but in your browser.

## Function reference

Unittesting gold is what the equivalent call in julia would return.

This also serves as a function reference of intended use
Matrix - bold upper case (for example: **M, W, X**)
vector - bold lower case (for example: **v, a, b**)
scalar - lower case (for example: s, t, k)

| WebAssembly Function      | Implemented | has unittest |
| ------------------------- | ----------- | ------------ |
| c = dot(**a, b**)         | ✓           | ✓            |
| cross(**y, a, b**)        | ✓           | ✓            |
| mul(**Y, W, X**)          | ✓           | ✓            |
| mul(**y, W, x**)          | ✓           | ✓            |
| muladd(**Y, W, X, b**)    | ✓           | ✓            |
| rmul(**y, v**, k)         | ✓           | ✓            |
| rdiv(**y, v**, k),        | ✓           | ✓            |
| n = norm(**v**, p)        | ✓           | ✓            |
| n = norm2(**v**)          | ✓           | ✓            |
| normalize(**v**)          | ✓           | ✓            |
| transpose(**T, M**)       | ✓           | ✓            |
| mix(**y, a, b, t**)       | ✓           | ✓            |
| mixscalar(**y, a, b**, t) | ✓           | ✓            |
| axpy!                     |             |              |
| axpby!                    |             |              |
| bunchkaufman              |             |              |
| cholesky                  |             |              |
| cond                      |             |              |
| condskeel                 |             |              |
| copyto                    |             |              |
| copy_transpose            |             |              |
| adjoint                   |             |              |
| det                       |             |              |
| diag                      |             |              |
| diagind                   |             |              |
| diagm                     |             |              |
| eigen                     |             |              |
| eigmax                    |             |              |
| eigmin                    |             |              |
| eigvals                   |             |              |
| eigvecs                   |             |              |
| factorize                 |             |              |
| givens                    |             |              |
| hessenberg                |             |              |
| isdiag                    |             |              |
| ishermitian               |             |              |
| isposdef                  |             |              |
| issuccess                 |             |              |
| issymmetric               |             |              |
| istril                    |             |              |
| istriu                    |             |              |
| kron                      |             |              |
| ldiv                      |             |              |
| ldlt                      |             |              |
| logabsdet                 |             |              |
| logdet                    |             |              |
| lowrankdowndate           |             |              |
| lowrankupdate             |             |              |
| lu                        |             |              |
| lyap                      |             |              |
| nullspace                 |             |              |
| ordschur                  |             |              |
| pinv                      |             |              |
| qr                        |             |              |
| lq                        |             |              |
| opnorm                    |             |              |
| rank                      |             |              |
| schur                     |             |              |
| svd                       |             |              |
| svdvals                   |             |              |
| sylvester                 |             |              |
| tr                        |             |              |
| tril                      |             |              |
| triu                      |             |              |
