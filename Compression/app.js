function setup() {
    setupCanvases();
    setupButtons();
}
function setupCanvases() {
    var compressCanvas = document.getElementById("CompressCanvas");
    var compressContext = compressCanvas.getContext("2d");
    var compressImage = new Image();
    compressImage.src = "images/3.jpg";
    compressImage.onload = function () { return compressContext.drawImage(compressImage, 0, 0); };
    var decompressCanvas = document.getElementById("DecompressCanvas");
    var decompressContext = decompressCanvas.getContext("2d");
    var decompressImage = new Image();
    decompressImage.src = "images/0.png";
    decompressImage.onload = function () { return decompressContext.drawImage(decompressImage, 0, 0); };
}
function setupButtons() {
    var buttons = document.getElementsByTagName("button");
    buttons[0].onclick = function () { grayscale(); };
    buttons[1].onclick = function () { compress(); };
    buttons[2].onclick = function () { decompress(); };
    updateButtons(0);
}
function grayscale() {
    var compressCanvas = document.getElementById("CompressCanvas");
    var compressContext = compressCanvas.getContext("2d");
    var grayscale = new Grayscale(compressContext);
    grayscale.run();
    updateButtons(1);
}
function compress() {
    var compressCanvas = document.getElementById("CompressCanvas");
    var compressContext = compressCanvas.getContext("2d");
    var fractalCompressor = new FractalCompressor(new RangeFactory(SIZE), new DomainFactory(SIZE, 2), compressContext);
    fractalCompressor.run();
    console.log(OUTPUT);
    updateButtons(2);
}
function decompress() {
    var decompressCanvas = document.getElementById("DecompressCanvas");
    var decompressContext = decompressCanvas.getContext("2d");
    var fractalDecompressor = new FractalDecompressor(new RangeFactory(SIZE), new DomainFactory(SIZE, 2), decompressContext, OUTPUT);
    fractalDecompressor.run();
}
function updateButtons(buttonToEnable) {
    var buttons = document.getElementsByTagName("button");
    for (var i = 0; i < buttons.length; ++i) {
        buttons[i].disabled = i != buttonToEnable;
    }
}
function updateProgressBar(now, end) {
    console.log(now + "/" + end);
}
///
var SIZE = 4;
var OUTPUT;
///
window.onload = function () { setup(); };
//# sourceMappingURL=app.js.map