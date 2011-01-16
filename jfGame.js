
var jfGameElapsedTime = 0;
var jfGame = new function () {

    // user functions
    this.updateGameState = null;
    this.loadAssets = null;
    this.drawScene = null;

    // public
    this.run = function () {
        initializeTimer();
        initializeGraphicsDevice();
        this.loadAssets();
        setInterval("jfGame.tick()", 1000 / 60.0);
    }

    this.tick = function () {
        updateTime();
        this.updateGameState(jfGameElapsedTime);
        this.drawScene(gl);
    }

    // internal
    var gl;

    var initializeGraphicsDevice = function () {
        var canvas = document.getElementById("glCanvas");
        gl = initGL(canvas);
        gl.clearColor(0.0, 0.5, 1.0, 1.0);
        gl.clearDepth(1.0);
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }

    var initializeTimer = function () {
        jfGameElapsedTime = 0.0;
        this.lastTime = 0.0;
    }

    var updateTime = function () {
        var currentTime = (new Date).getTime();
        if (this.lastTime) {
            jfGameElapsedTime = currentTime - this.lastTime;
        }
        this.lastTime = currentTime;
    }

}

