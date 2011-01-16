
function initShaders() {
    var fragmentShader = getShader(gl, "shader-fs");
    var vertexShader = getShader(gl, "shader-vs");

    // Create the shader program
    shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    // If creating the shader program failed, alert
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("Unable to initialize the shader program.");
    }

    gl.useProgram(shaderProgram);

    vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(vertexPositionAttribute);

    vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");
    gl.enableVertexAttribArray(vertexColorAttribute);
}

function initBuffers() {
    var vertices = [
        1.0, 1.0, -10.0,
        -1.0, 1.0, -10.0,
        1.0, -1.0, 0.0,
        -1.0, -1.0, 0.0
    ];
    squareVerticesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    var colors = [
        1.0,  1.0,  1.0,  1.0,    // white
        1.0,  0.0,  0.0,  1.0,    // red
        0.0,  1.0,  0.0,  1.0,    // green
        0.0,  0.0,  1.0,  1.0     // blue
  ]; 
  squareVerticesColorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesColorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
}

var elapsedTime = 0.0;
var lastTime = 0.0;
var squareRotation = 0.0;

function updateGameState() {
    squareRotation += (30 * elapsedTime) / 1000.0;
}

function drawScene() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    perspectiveMatrix = makePerspective(45, 1.0, 0.1, 100.0);

    loadIdentity();
    mvPushMatrix();
    mvTranslate([0.0, 0.0, -5.0]);  // To Center of quad
    mvRotate(squareRotation, [0, 1, 0]);
    mvTranslate([0.0, 0.0, +5.0]);  // From Center of quad

    mvTranslate([0.0, 0.0, -3.0]);

    gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesBuffer);
    gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesColorBuffer);
    gl.vertexAttribPointer(vertexColorAttribute, 4, gl.FLOAT, false, 0, 0);

    setMatrixUniforms();
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    mvPopMatrix();
}

var mvMatrix;
var mvMatrixStack = [];

function loadIdentity() {
    mvMatrix = Matrix.I(4);
}

function multMatrix(m) {
    mvMatrix = mvMatrix.x(m);
}

function mvTranslate(v) {
    multMatrix(Matrix.Translation($V([v[0], v[1], v[2]])).ensure4x4());
}

function mvPushMatrix(m) {
    if (m) {
        mvMatrixStack.push(m.dup());
        mvMatrix = m.dup();
    } else {
        mvMatrixStack.push(mvMatrix.dup());
    }
}

function mvPopMatrix() {
    if (!mvMatrixStack.length) {
        throw ("Can't pop from an empty matrix stack.");
    }

    mvMatrix = mvMatrixStack.pop();
    return mvMatrix;
}

function mvRotate(angle, v) {
    var inRadians = angle * Math.PI / 180.0;

    var m = Matrix.Rotation(inRadians, $V([v[0], v[1], v[2]])).ensure4x4();
    multMatrix(m);
}

function setMatrixUniforms() {
    var pUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
    gl.uniformMatrix4fv(pUniform, false, new Float32Array(perspectiveMatrix.flatten()));

    var mvUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
    gl.uniformMatrix4fv(mvUniform, false, new Float32Array(mvMatrix.flatten()));
}

function updateTime() {
    var currentTime = (new Date).getTime();
    if (lastTime) {
        elapsedTime = currentTime - lastTime;
    }
    lastTime = currentTime;
}

function updateGame() {
    updateTime();
    updateGameState();
    drawScene();
}

function main() {
    var canvas = document.getElementById("glCanvas");
    var gl = initGL(canvas);
    initShaders();
    initBuffers();

    gl.clearColor(0.0, 0.5, 1.0, 1.0);
    gl.clearDepth(1.0);

    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);

    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    setInterval("updateGame()", 1000 / 60.0);
}
