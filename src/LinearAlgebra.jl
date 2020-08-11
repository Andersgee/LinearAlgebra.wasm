# y = dot(a,b)
function dot(a, b)
    s = 0.0
    N = length(a)
    for i = 1:N
        s += a[i] * b[i]
    end
    return s
end

# y = cross(a,b)
cross(a, b) = cross_(zeros(3,1), a, b)
function cross_(y, a, b)
    # cross only defined for vec3
    y[1] = a[2] * b[3] - a[3] * b[2]
    y[2] = a[3] * b[1] - a[1] * b[3]
    y[3] = a[1] * b[2] - a[2] * b[1]
    return y
end

# y = W*X
mul(W, X) = mul_(zeros(size(W,1), size(X,2)), W, X)
function mul_(y, W, X)
    szW = size(W)
    szX = size(X)
    s = 0.0
    for n = 1:szX[2]
        for i = 1:szW[1]
            s = 0.0
            for j = 1:szW[2]
                s += W[i,j] * X[j,n]
            end
            y[i,n] = s
        end
    end
    return y
end


# y = W*X .+ b
muladd(W, X, b) = muladd_(zeros(size(W,1), size(X,2)), W, X, b)
function muladd_(y, W, X, b)
    szW = size(W)
    szX = size(X)
    s = 0.0
    for n = 1:szX[2]
        for i = 1:szW[1]
            s = 0.0
            for j = 1:szW[2]
                s += W[i,j] * X[j,n]
            end
            y[i,n] = s + b[i]
        end
    end
    return y
end

#y = x .* s
rmul(x, s) = rmul_(zero(x), x , s)
function rmul_(y, x, s)
    N=length(x)
    for i = 1:N
        y[i] = x[i] * s
    end
    return y
end

#y = x ./ s
rdiv(x, s) = rdiv_(zero(x), x , s)
function rdiv_(y, x, s)
    N=length(x)
    for i = 1:N
        y[i] = x[i] / s
    end
    return y
end

#norm(x)
function norm2(x)
    s = 0.0
    N = length(x)
    for i = 1:N
        s += x[i] * x[i]
    end
    return sqrt(s)
end

#norm(x, p)
function norm(x, p)
    s = 0.0
    N = length(x)
    for i = 1:N
        s += x[i]^p
    end
    return s^(1.0 / p)
end

#normalize!(y,x)
normalize(x) = normalize_(zero(x), x)
function normalize_(y, x)
    s = norm2(x)
    N = length(x)
    for i = 1:N
        y[i] = x[i] / s
    end
    return y
end

#y = a.*(1.0 .- v) + b.*v
mix(a,b,v) = mix_(zero(a), a, b, v)
function mix_(y, a, b, v)
    N = length(y)
    for i = 1:N
        y[i] = a[i] * (1.0 - v[i]) + b[i] * v[i]
    end
    return y
end

#y = a*(1-t) + b*t
mixscalar(a,b,s) = mixscalar_(zero(a), a, b, s)
function mixscalar_(y, a, b, s)
    k = 1.0 - s
    N = length(y)
    for i = 1:N
        y[i] = a[i] * k + b[i] * s
    end
    return y
end

#WT = W'
transpose(W) = transpose_(zeros(size(W,2),size(W,1)), W)
function transpose_(WT, W)
    sz=size(W)
    n = 1
    for i = 1:sz[1]
        for j = 1:sz[2]
            WT[n] = W[i,j]
            n += 1
        end
    end
    return WT
end


###########################

#trace
function tr(A)
    s = 0.0
    sz = size(A)
    for i=1:sz[1]
        s += A[i,i]
    end
    return s
end

#triangular upper
triu(M, k) = triu_(copy(M), M, k)
function triu_(Y, M, k)
    sz = size(M)
    m = sz[1]
    n = sz[2]
    J = min(n, m + k)
    for j = 1:J
        for i = max(1, j - k + 1):m
            Y[i,j] = 0.0
        end
    end
    return Y
end


# Notes:
#only functions that are at some point called will get translated.
#by WebAssemblyText.jl (except the "exports" function)
#see LinearAlgebra.wat to see how this julia file turns out in webassembly text format
#that file is then converted with WABT to .wasm which can be used on websites.

function exports()
    #define some variables to call functions with
    #scalars
    s = 3.14
    t = 0.7

    #vectors
    y = rand(3,1)
    a = rand(3,1)
    b = rand(3,1)
    v = rand(3,1)
    
    #matrices
    W = rand(3, 2)
    WT = rand(2, 3)
    X = rand(2, 4)
    Y = rand(3, 4)
    M = rand(4,4)

    #Exported functions

    k = dot(a, b)

    #cross(y,a,b)
    A = cross(a,b)

    #mul(Y,W,X)
    A = mul(W,X)

    #muladd(Y,W,X,b)
    A = muladd(W,X,b)

    #rmul(y,a,s)
    A = rmul(a,s)

    #rdiv(y,a,s)
    A = rdiv(a,s)

    k = norm2(a)

    #normalize(y,b)
    A = normalize(b)

    k = norm(b, 2.5)

    #mix(y, a, b, v)
    A = mix(a, b, v)

    #mixscalar(y, a, b, t)
    A = mixscalar(a, b, t)

    #transpose(WT, W)
    A = transpose(W)

    #triu(M, M, 0)
    A = triu(M, 0)

    #existing julia functions (but not existing in this file) will become imports instead of exports
    k = cos(2.5)
    k = log(2.5)
    k = rand()
end

exports()
