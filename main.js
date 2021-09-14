function main(){
    var canvas = document.getElementById("myCanvas");
    var gl = canvas.getContext("webgl");

    // Mendefinisikan Vertex
    /**
     * A (0.0, 0.5), 
     * B (0.5, -0.5), 
     * C (-0.5, -0.5)
     */
    // Digunakan untuk membuat persegi panjang dengan 2 segitiga (A,B,C) dan (C,D,A)
    var vertices = [
        0.5, 0.5,    // A
        0.5, -0.5,   // B
        -0.5, -0.5,   // C
        -0.5, -0.5,   // C
        -0.5, 0.5,    // D
        0.5, 0.5    // A
    ];

    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    var vertextShaderCode =`
    attribute vec2 a_Position;
    void main(){
        gl_Position = vec4(a_Position, 0.0, 1.0);
        gl_PointSize = 20.0;
    }
    `;

    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertextShaderCode);
    gl.compileShader(vertexShader);

    // Mendefinisikan Fragment
    var fragmentShaderCode = `
    void main(){
        gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
    }
    `;

    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderCode);
    gl.compileShader(fragmentShader);

    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    var aPosition = gl.getAttribLocation(shaderProgram, "a_Position");
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition);

    gl.clearColor(1.0, 1.0, 1.0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    //gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    //gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
 
    //gl.lines digunakan hanya untuk membuat garis berbentuk segitiga
    //gl.drawArrays(gl.LINES, 0, 4);
    
    // Membuat Persegi Panjang dengan 2 Buah segitiga
    gl.drawArrays(gl.TRIANGLES, 0, 6);
}