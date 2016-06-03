var FractalInformation = (function () {
    function FractalInformation(coeffitients, rangeIndex, domainIndex) {
        this._coeffitients = coeffitients;
        this._rangeIndex = rangeIndex;
        this._domainIndex = domainIndex;
    }
    Object.defineProperty(FractalInformation.prototype, "coeffitients", {
        get: function () {
            return this._coeffitients;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FractalInformation.prototype, "rangeIndex", {
        get: function () {
            return this._rangeIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FractalInformation.prototype, "domainIndex", {
        get: function () {
            return this._domainIndex;
        },
        enumerable: true,
        configurable: true
    });
    return FractalInformation;
}());
//# sourceMappingURL=FractalInformation.js.map