var FractalCoeffitients = (function () {
    function FractalCoeffitients(contrast, brightness) {
        this._contrast = contrast;
        this._brightness = brightness;
    }
    Object.defineProperty(FractalCoeffitients.prototype, "contrast", {
        get: function () {
            return this._contrast;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FractalCoeffitients.prototype, "brightness", {
        get: function () {
            return this._brightness;
        },
        enumerable: true,
        configurable: true
    });
    return FractalCoeffitients;
}());
//# sourceMappingURL=FractalCoeffitients.js.map