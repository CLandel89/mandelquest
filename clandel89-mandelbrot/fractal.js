"use strict";

// "Fractal" class and any directly related definitions.

{

let $MB = $CLandel89.Mandelbrot;

//helper function that prevents reference chaos
function copyVal (val) {
    if (val instanceof $MB.Complex)
        return new $MB.Complex(val.re, val.im);
    return val;
}

$MB.Fractal = class
{
    constructor (definition)
    {
        // fractal definition: all parameters that have any graphical impact
        // and their default values
        if (!$MB.Fractal.DEFAULTS) {
            $MB.Fractal.DEFAULTS = {
                n_iter: 170,
                trans1: 0,
                trans2: 0,
                pos: new $MB.Complex(0,0),
                width: 400,
                height: 300,
                pert: new $MB.Complex(0,0), // add perturbation
                φ: 0.0, // turn the fractal a bit or around
                l: 2.0, // the length (in the fractal pane) from pos to the nearest edge of the canvas
                julia: 0.0, // you can transform the fractal into a Julia set - partly or whole
                cut: 0.0, // you can apply an effect that looks like a round cut
            };
        }
        if (definition === undefined) definition = {};
        if (definition instanceof $MB.Fractal) definition = definition.definition();
        for (let [dkey, dvalue] of Object.entries($MB.Fractal.DEFAULTS))
            this[dkey] = copyVal(dvalue);
        for (let [dkey, dvalue] of Object.entries(definition)) {
            if (! (dkey in $MB.Fractal.DEFAULTS))
                throw new Error(`Unknown Fractal parameter ${dkey}!`);
            this[dkey] = copyVal(dvalue);
        }
    }

    definition () {
        let result = {};
        for (let dkey in $MB.Fractal.DEFAULTS)
            result[dkey] = copyVal(this[dkey]);
        return result;
    }
};

}