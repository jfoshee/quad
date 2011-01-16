
var jfGame = new function () {

    // user functions
    this.updateGameState = null;
    this.loadAssets = null;
    this.drawScene = null;

    // public
    this.run = function (canvasId) {
        initializeGraphicsDevice(canvasId);
        this.loadAssets();
        setInterval("jfGame.tick()", 1000 / 60.0);
    }

    this.tick = function () {
        var elapsedTime = updateTime();
        this.updateGameState(elapsedTime);
        this.drawScene(gl);
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

