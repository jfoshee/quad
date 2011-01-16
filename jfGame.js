
var jfGame = new function () {

    // user functions
    this.loadContent = null;
    this.update = null;
    this.draw = null;

    // public
    this.run = function (canvasId) {
        initializeGraphicsDevice(canvasId);
        this.loadContent();
        setInterval("jfGame.tick()", 1000 / 60.0);
    }

    this.tick = function () {
        var elapsedTime = updateTime();
        this.update(elapsedTime);
        this.draw(gl);
    }

    // internal
    var gl;
    var lastTime = 0.0;

    var initializeGraphicsDevice = function (canvasId) {
        var canvas = document.getElementById(canvasId);
        gl = initGL(canvas);
        gl.clearColor(0.0, 0.5, 1.0, 1.0);
        gl.clearDepth(1.0);
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }

    var updateTime = function () {
        var currentTime = (new Date).getTime();
        var elapsedTime = 0;
        if (lastTime) {
            elapsedTime = currentTime - lastTime;
        }
        lastTime = currentTime;
        return elapsedTime;
    }

}

