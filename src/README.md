# Source

The WebAssembly is produced by translating LinearAlgebra.jl with [WebAssemblyText.jl](https://github.com/Andersgee/WebAssemblyText.jl). The produced .wat is then converted to .wasm with [WebAssembly Binary Toolkit](https://github.com/WebAssembly/wabt) and optimized with [Binaryen](https://github.com/WebAssembly/binaryen).

#Unit testing
For local unit testing purposes: fetching with node must use absolute paths, so serve LinearAlgebra.wasm with a simple http server (node serve.js) and get it with `fetch("http://localhost:8080")`. A real website could just do `fetch("./LinearAlgebra.wasm")` or wherever the file is.

`translate_and_serve.sh`:

```bash
#!/bin/bash
source "/home/andy/.bash_aliases"
shopt -s expand_aliases

julia jl2wat.jl LinearAlgebra.jl LinearAlgebra.wat
wat2wasm LinearAlgebra.wat -o LinearAlgebra.wasm
wasm-opt LinearAlgebra.wasm -o LinearAlgebra.wasm -O4

node serve.js
```

so unit testing the .wasm produced from translating LinearAlgebra.jl locally looks like this:

```bash
./translate_and_serve.sh
npm test
```
