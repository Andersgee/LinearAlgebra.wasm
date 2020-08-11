using Pkg; Pkg.activate("/home/andy/.julia/dev/WebAssemblyText.jl/")
using WebAssemblyText

function translate(infile, outfile)
    wat = jl2wat(infile)
    open(outfile, "w") do io
        write(io, wat)
    end
end

translate(ARGS[1], ARGS[2])