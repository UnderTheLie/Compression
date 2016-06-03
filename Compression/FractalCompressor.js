var FractalCompressor = (function () {
    function FractalCompressor(rangeFactory, domainFactory, context) {
        this.rangeFactory = rangeFactory;
        this.domainFactory = domainFactory;
        this.context = context;
    }
    FractalCompressor.prototype.run = function () {
        var imgData = this.context.getImageData(0, 0, 512, 512);
        var ranges = this.rangeFactory.run(imgData);
        var domains = this.domainFactory.run(imgData);
        var fractalInformation = this.getFractalInformation(ranges, domains);
        OUTPUT = fractalInformation.splice(0);
    };
    FractalCompressor.prototype.getFractalInformation = function (ranges, domains) {
        var information = new Array();
        for (var i = 0; i < ranges.length; ++i) {
            var range = ranges[i];
            var minDifference = Infinity;
            var minDomainIndex = void 0;
            var minCoeffitients = void 0;
            for (var j = 0; j < domains.length; ++j) {
                var domain = domains[j];
                var coeffitients = this.getCoeffitients(range, domain);
                var difference = this.getDifference(range, domain, coeffitients);
                if (difference < minDifference) {
                    minDifference = difference;
                    minDomainIndex = j;
                    minCoeffitients = coeffitients;
                }
            }
            var fractalInformation = new FractalInformation(minCoeffitients, i, minDomainIndex);
            information.push(fractalInformation);
            updateProgressBar(i, ranges.length);
        }
        return information;
    };
    FractalCompressor.prototype.getCoeffitients = function (range, domain) {
        var alpha = this.getAlpha(range, domain);
        var betha = this.getBetha(domain);
        var contrast = alpha / betha;
        var brightness = range.average - contrast * domain.average;
        return new FractalCoeffitients(contrast, brightness);
    };
    FractalCompressor.prototype.getAlpha = function (range, domain) {
        var result = 0;
        for (var x = 0; x < range.size; ++x) {
            for (var y = 0; y < range.size; ++y) {
                var rangeDelta = range.delta[x][y];
                var domainDelta = domain.delta[x][y];
                result += rangeDelta * domainDelta;
            }
        }
        return result;
    };
    FractalCompressor.prototype.getBetha = function (domain) {
        var result = 0;
        for (var x = 0; x < domain.size; ++x) {
            for (var y = 0; y < domain.size; ++y) {
                var domainDelta = domain.delta[x][y];
                result += domainDelta * domainDelta;
            }
        }
        return result;
    };
    FractalCompressor.prototype.getDifference = function (range, domain, coeffitients) {
        var result = 0;
        for (var x = 0; x < range.size; ++x) {
            for (var y = 0; y < range.size; ++y) {
                var rangeColor = range.map[x][y];
                var domainColor = domain.map[x][y] * coeffitients.contrast + coeffitients.brightness;
                var difference = rangeColor - domainColor;
                result += difference * difference;
            }
        }
        return result;
    };
    return FractalCompressor;
}());
//# sourceMappingURL=FractalCompressor.js.map