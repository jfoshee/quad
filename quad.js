function main() {
//    var canvas = document.getElementsByTagName("canvas");
    var canvas = document.getElementById("glCanvas");
    var gl = initGL(canvas);

    gl.clearColor(0.0, 0.5, 1.0, 1.0);
    gl.clearDepth(1.0);

    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);

    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}
