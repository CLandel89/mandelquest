// Functions for mouse event handling.
// "down" events are picked up in the canvas, "up" and "move" in the document.
// This assures that mouse dragging is handled as the user would
// expect, even if the pointer leaves the canvas in the process.
// To achieve this, I followed parts of the following (German) tutorial:
// https://viscircle.de/webgl-grundlagen-11-kugeln-rotationsmatrizen-und-mouse-events/

"use strict";

let mouseDown=false, lastMouseX=null, lastMouseY=null;

function handleMouseDown(ev) {
    mouseDown = true;
    lastMouseX = ev.clientX;
    lastMouseY = ev.clientY;
}

function handleMouseUp(ev) {
    mouseDown = false;
}

function handleMouseMove(ev) {
    if (mouseDown) {
        handleMouseDrag(ev);
        return;
    }
}

function handleMouseDrag(ev) {
    const newX = ev.clientX, newY = ev.clientY;
    const deltaX = newX-lastMouseX, deltaY = newY-lastMouseY;

    //Recycle some values calculated for the shaders.
    const offsetR = uniformTypeVal['offsetR'][1];
    const offsetH = uniformTypeVal['offsetH'][1];
    //Put it together such that you can drag around the fractals.
    //Note the differences between canvas and OpenGL:
    //(0,0): upper left corner vs. middle
    //Y axis: points downwards vs. upwards
    scene.pos = scene.pos.sub(offsetR.smul(2*deltaX/canvas.width));
    scene.pos = scene.pos.add(offsetH.smul(2*deltaY/canvas.height));
    drawScene();

    lastMouseX = newX;
    lastMouseY = newY;
}