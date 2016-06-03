var FractalDecompressor = (function () {
    function FractalDecompressor(rangeFactory, domainFactory, context, fractalInformation) {
        this.rangeFactory = rangeFactory;
        this.domainFactory = domainFactory;
        this.context = context;
        this.fractalInformation = fractalInformation;
    }
    FractalDecompressor.prototype.run = function () {
        var imgData = this.context.getImageData(0, 0, 512, 512);
        var ranges = this.rangeFactory.run(imgData);
        var domains = this.domainFactory.run(imgData);
        for (var i = 0; i < this.fractalInformation.length; ++i) {
            var information = this.fractalInformation[i];
            var rangeIndex = information.rangeIndex;
            var domainIndex = information.domainIndex;
            var range = ranges[rangeIndex];
            var domain = domains[domainIndex];
            this.updateImage(range, domain, information);
        }
    };
    FractalDecompressor.prototype.updateImage = function (range, domain, information) {
        var imgData = domain.toImageData();
        var updatedData = this.applyCoeffitients(imgData, information.coeffitients);
        var outerX = range.start.x;
        var outerY = range.start.y;
        this.context.putImageData(updatedData, outerX, outerY);
    };
    FractalDecompressor.prototype.applyCoeffitients = function (imgData, fractalCoeffitients) {
        var size = imgData.height;
        var updatedData = new ImageData(size, size);
        for (var x = 0; x < size; ++x) {
            for (var y = 0; y < size; ++y) {
                var index = (y * size + x) * 4;
                var color = imgData.data[index];
                var updatedColor = color * fractalCoeffitients.contrast + fractalCoeffitients.brightness;
                updatedData.data[index] = updatedColor;
                updatedData.data[++index] = updatedColor;
                updatedData.data[++index] = updatedColor;
                updatedData.data[++index] = 255;
            }
        }
        return updatedData;
    };
    return FractalDecompressor;
}());
//# sourceMappingURL=FractalDecompressor.js.map