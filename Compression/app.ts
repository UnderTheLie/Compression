function setup() {
    setupCanvases();
    setupButtons();
}

function setupCanvases() {
    let compressCanvas = <HTMLCanvasElement>document.getElementById("CompressCanvas");
    let compressContext = compressCanvas.getContext("2d");
    let compressImage = new Image();
    compressImage.src = "images/3.jpg";
    compressImage.onload = () => compressContext.drawImage(compressImage, 0, 0);

    let decompressCanvas = <HTMLCanvasElement>document.getElementById("DecompressCanvas");
    let decompressContext = decompressCanvas.getContext("2d");
    let decompressImage = new Image();
    decompressImage.src = "images/0.png";
    decompressImage.onload = () => decompressContext.drawImage(decompressImage, 0, 0);
}

function setupButtons() {
    let buttons = document.getElementsByTagName("button");
    buttons[0].onclick = () => { grayscale() };
    buttons[1].onclick = () => { compress() };
    buttons[2].onclick = () => { decompress() };
    updateButtons(0);
}

function grayscale() {
    let compressCanvas = <HTMLCanvasElement>document.getElementById("CompressCanvas");
    let compressContext = compressCanvas.getContext("2d");
    let grayscale = new Grayscale(compressContext);

    grayscale.run();

    updateButtons(1);
}

function compress() {
    let compressCanvas = <HTMLCanvasElement>document.getElementById("CompressCanvas");
    let compressContext = compressCanvas.getContext("2d");
    let fractalCompressor = new FractalCompressor(new RangeFactory(SIZE), new DomainFactory(SIZE, 2), compressContext);

    fractalCompressor.run();

    console.log(OUTPUT);

    updateButtons(2);
}

function decompress() {
    let decompressCanvas = <HTMLCanvasElement>document.getElementById("DecompressCanvas");
    let decompressContext = decompressCanvas.getContext("2d");
    let fractalDecompressor = new FractalDecompressor(new RangeFactory(SIZE), new DomainFactory(SIZE, 2), decompressContext, OUTPUT);

    fractalDecompressor.run();
}

function updateButtons(buttonToEnable: number) {
    let buttons = document.getElementsByTagName("button");

    for (let i = 0; i < buttons.length; ++i) {
        buttons[i].disabled = i != buttonToEnable;
    }
}

function updateProgressBar(now: number, end: number) {
    console.log(now + "/" + end);
}

///
const SIZE = 4;
var OUTPUT: any;
///
window.onload = () => { setup(); };
