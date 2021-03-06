"use strict";

{

let $MB = $CLandel89.Mandelbrot;

$MB.palette = function* (n_iter, colors) {
    if (!colors)
        colors = [
            [1,1,1],
            [0,0,1],
            [0,1,0],
            [1,0,0],
            [0,0,0],
        ];
    for (let i=0; i<n_iter; i++) {
        //index for the first of two colors (with fractional part)
        let ic = i * (colors.length-1) / n_iter;
        //factors for interpolation
        let ib = ic%1, ia = 1-ib;
        //remove fractional part from ic
        ic = Math.floor(ic);
        let color = [];
        for (let c=0; c<3; c++)
            color.push(ia*colors[ic][c] + ib*colors[ic+1][c]);
        yield color;
    }
};

$MB.paletteArr = function (n_iter, colors) {
    return Float32Array.from(function* () {
        for (let color of $MB.palette(n_iter, colors))
            for (let c of color)
                yield c;
    }());
};

}