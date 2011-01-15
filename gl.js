
function initGL(canvas) {
    var gl;
    try {
        gl = canvas.getContext("experimental-webgl");
        gl.viewportWidth = canvas.width;
        gl.viewportHeight = canvas.height;
        return gl;
    } catch (e) {
    }
    if (!gl) {
        alert("Unable to initialize WebGL");
    }
}
