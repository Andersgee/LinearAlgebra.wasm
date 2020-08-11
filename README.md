# LinearAlgebra.wasm

Some matrix algebra compiled to WebAssembly. See the example folder for an example website. There you can also find the actual LinearAlgebra.wasm file.

## Function reference

Since this is translated from julia; Unittesting gold is what the equivalent call in julia would return.

- [x] dot(**a, b**)
- [x] cross(**a, b**)
- [x] mul(**W, X**)
- [x] muladd(**W, X, b**)
- [x] rmul(**v**, s)
- [x] rdiv(**v**, s)
- [x] norm2(**v**)
- [x] norm(**v**, p)
- [x] normalize(**v**)
- [x] transpose(**M**)
- [x] copy(**M**)
- [x] size(**M**)
- [x] tr(**M**)
- [x] mix(**a, b, v**)
- [x] mixscalar(**a, b**, t)
- [x] triu(**M**)
- [ ] tril(**M**)
- [ ] svd(**M**)
- [ ] kron(**M**)
- [ ] det(**M**)
- [ ] eigen(**M**)
- [ ] eigvals(**M**)
- [ ] eigmin(**M**)
- [ ] eigmax(**M**)
