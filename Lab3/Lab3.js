const e = 0.0001;

const priblij = (a, y, n) => {
    let h, max, k, index;
    const e = 0.001;
    h = new Array(n);
    k = 0;
    while (k < n) {
        max = Math.abs(a[k][k]);
        index = k;
        for (let i = k + 1; i < n; ++i) {
            if (Math.abs(a[i][k]) > max) {
                max = Math.abs(a[i][k]);
                index = i;
            }
        }
        if (max < e) { return 0; }
        for (let j = 0; j < n; ++j) {
            let temp = a[k][j];
            a[k][j] = a[index][j];
            a[index][j] = temp;
        }
        let temp = y[k];
        y[k] = y[index];
        y[index] = temp;
        k++;
    }
    let sum = 0;
    for (let s = 0; s < n; ++s) {
        for (let r = 0; r < n; ++r) {
            if (s != r) {
                sum += a[s][r];
            }
            if (a[s][s] <= sum) sum = 0;
        }
    }
    for (let t = 0; t < n; ++t) {
        h[t] = y[t] / a[t][t];
    }
    return h;
}

const converge = (xk, xkp, n) => {
    let norm = 0;
    for (let i = 0; i < n; ++i) norm += (xk[i] - xkp[i]) * (xk[i] - xkp[i]);
    return (Math.sqrt(norm) < e);
}

const Jacobi = (A, B, X, N) => {
    let TempX = Array(N), norm;
    do {
        for (let i = 0; i < N; ++i) {
            TempX[i] = B[i];
            for (let g = 0; g < N; ++g) {
                if (i != g) TempX[i] -= A[i][g] * X[g];
            }
            TempX[i] /= A[i][i];
        }
        norm = Math.abs(X[0] - TempX[0]);
        for (let h = 0; h < N; ++h) {
            if (X[h] - TempX[h] > norm) norm = Math.abs(X[h] - TempX[h]);
            X[h] = TempX[h];
        }
    } while (norm > e);
    return X.map(item => Math.round(item));
}

const Zeydel = (A, B, X, N) => {
    let P = new Array(N);
    do {
        for (let i = 0; i < N; ++i) P[i] = X[i];
        for (let i = 0; i < N; ++i) {
            let v = 0;
            for (let j = 0; j < i; ++j) v += (A[i][j] * X[j]);
            for (let j = i + 1; j < N; ++j) v += (A[i][j] * P[j]);
            X[i] = (B[i] - v) / A[i][i];
        }
    } while (!converge(X, P, N));
    return X.map(item => Math.round(item));
}

console.log(Zeydel(
    [[4, 0, 1, 0], [0, 3, 0, 2], [1, 0, 5, 1], [0, 2, 1, 4]],
    [7, 14, 20, 23],
    priblij(
        [[4, 0, 1, 0], [0, 3, 0, 2], [1, 0, 5, 1], [0, 2, 1, 4]],
        [7, 14, 20, 23],
        4
    ),
    4
));

console.log(Jacobi(
    [[3, 1, 1, 0], [1, 4, 0, 2], [1, 0, 3, 1], [0, 2, 1, 5]],
    [8, 17, 14, 27],
    priblij(
        [[3, 1, 1, 0], [1, 4, 0, 2], [1, 0, 3, 1], [0, 2, 1, 5]],
        [8, 17, 14, 27],
        4
    ),
    4
));
