let abs = Math.abs;

const fillArray = n => {
    let a = [];
    for (let i = 0; i < n; ++i) a.push(0);
    return a;
}

const gauss = (A, x) => {
    let i, k, j;

    for (i = 0; i < A.length; ++i) A[i].push(x[i]);

    let n = A.length;

    for (i = 0; i < n; ++i) {
        let maxEl = abs(A[i][i]), maxRow = i;

        for (k = i + 1; k < n; ++k) {
            if (abs(A[k][i]) > maxEl) {
                maxEl = abs(A[k][i]);
                maxRow = k;
            }
        }

        for (k = i; k < n + 1; ++k) {
            let tmp = A[maxRow][k];
            A[maxRow][k] = A[i][k];
            A[i][k] = tmp;
        }

        for (k = i + 1; k < n; ++k) {
            let c = -A[k][i] / A[i][i];
            for (j = i; j < n + 1; ++j) {
                if (i === j) {
                    A[k][j] = 0;
                } else {
                    A[k][j] += c * A[i][j];
                }
            }
        }
    }

    x = fillArray(n);

    for (i = n - 1; i > -1; --i) {
        x[i] = A[i][n] / A[i][i];
        for (k = i - 1; k > -1; k--) A[k][n] -= A[k][i] * x[i];
    }

    return x;
}



/* 4x = 8 */

const test_one = _ => {
    $A = [[4]];
    $x = [8];
    $result = gauss($A, $x);
    console.log($result);
}


/*
    x1 + x2 = 10
    2x1 + x2 = 16
*/

const test_two = _ => {
    $A = [[1, 1], [2, 1]];
    $x = [10, 16];
    $result = gauss($A, $x);
    console.log($result);

}


/*
    7x1 + 2x2 + 3x3 = 20
    3x2 + 2x3 + 6x4 = 36
    2x1 + 5x2 + x3  = 15
    x2 + 4x3 + 2x4  = 22
*/

const test_three = _ => {
    $A = [[7, 2, 3, 0], [0, 3, 2, 6],
    [2, 5, 1, 0], [0, 1, 4, 2]];
    $x = [20, 36, 15, 22];
    $result = gauss($A, $x);
    $result = $result.map(x => Math.round(x));
    console.log($result);
}

test_one();
test_two();
test_three();