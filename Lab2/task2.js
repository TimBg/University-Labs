const progonka = (a, b, c, d) => {
    let x = [], q, i, n = b.length - 1;

    for (i = 1; i <= n; ++i) {
        q = a[i] / b[i - 1];
        b[i] = b[i] - c[i - 1] * q;
        d[i] = d[i] - d[i - 1] * q;
    }

    q = d[n] / b[n];
    x[n] = q;

    for (i = n - 1; i >= 0; --i) {
        q = (d[i] - c[i] * q) / b[i];
        x[i] = q;
    }

    return x;
}

const coef = coefMatrix => {
    let a = [], b = [], c = [], n = coefMatrix.length - 1;

    a[0] = 0;
    c[n] = 0;

    for (let i = 0; i <= n; ++i) {
        if (i !== 0) a[i] = coefMatrix[i][i - 1];
        b[i] = coefMatrix[i][i];
        if (i !== n) c[i] = coefMatrix[i][i + 1];
    }

    return {
        a: a,
        b: b,
        c: c
    }
}

const solver = (coefMatrix, rigthvectorVector) => {
    const result = coef(coefMatrix);
    return progonka(result.a, result.b, result.c, rigthvectorVector);
}

let arr = [[1, 2, 0], [2, 2, 3], [0, 3, 2]];
let b = [5, 6, 12];

console.log(solver(arr, b));