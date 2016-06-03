var Grayscale = (function () {
    function Grayscale(context) {
        this.context = context;
    }
    Grayscale.prototype.run = function () {
        var imgData = this.context.getImageData(0, 0, 512, 512);
        for (var i = 0; i < imgData.data.length; i += 4) {
            var avg = 0.299 * imgData.data[i + 0]
                + 0.587 * imgData.data[i + 1]
                + 0.114 * imgData.data[i + 2];
            imgData.data[i + 0] = avg;
            imgData.data[i + 1] = avg;
            imgData.data[i + 2] = avg;
            imgData.data[i + 3] = 255;
        }
        this.context.putImageData(imgData, 0, 0);
    };
    return Grayscale;
}());
//# sourceMappingURL=Grayscale.js.map