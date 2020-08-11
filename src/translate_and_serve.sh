#!/bin/bash
source "/home/andy/.bash_aliases"
shopt -s expand_aliases

julia jl2wat.jl LinearAlgebra.jl LinearAlgebra.wat
wat2wasm LinearAlgebra.wat -o LinearAlgebra.wasm
wasm-opt --enable-multivalue -O4 LinearAlgebra.wasm -o LinearAlgebra.wasm

node serve.js