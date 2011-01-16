
function myLoadContent() {
    shaderProgram = loadShaders();
    myTexture = loadTexture();
    vertexBuffer = createBuffer(loadVertices());
    colorBuffer = createBuffer(loadColors());
    textureCoordBuffer = createBuffer(loadTextureCoordinates());
    indexBuffer = createUintBuffer(loadVertexIndices());
}

var squareRotation = 0.0;

function myUpdate(elapsedTime) {
    squareRotation += (100 * elapsedTime) / 1000.0;

    var fps = 1000 / elapsedTime;
    document.getElementById("fps").innerHTML = fps.toPrecision(4).toString();
}

function myDraw(gl) {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    perspectiveMatrix = makePerspective(45, 1.0, 0.1, 100.0);

    loadIdentity();
    mvPushMatrix();
    mvTranslate([0.0, 0.0, -5.0]);
    mvRotate(squareRotation, [0.5, 1, 0]);
    setShaderUniformParameters();

    bindBuffer(vertexBuffer, vertexPositionAttribute, 3);
    bindBuffer(colorBuffer, vertexColorAttribute, 4);
    bindBuffer(textureCoordBuffer, textureCoordAttribute, 2);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, myTexture);

    gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);

    mvPopMatrix();
}

function setShaderUniformParameters() {
    var pUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
    gl.uniformMatrix4fv(pUniform, false, new Float32Array(perspectiveMatrix.flatten()));

    var mvUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
    gl.uniformMatrix4fv(mvUniform, false, new Float32Array(mvMatrix.flatten()));

    gl.uniform1i(gl.getUniformLocation(shaderProgram, "uSampler"), 0);
}

function startMyGame() {
    jfGame.loadContent = myLoadContent;
    jfGame.update = myUpdate;
    jfGame.draw = myDraw;
    jfGame.run("glCanvas");
}

