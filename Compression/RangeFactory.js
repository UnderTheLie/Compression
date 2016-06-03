var RangeFactory = (function () {
    function RangeFactory(size) {
        this.size = size;
    }
    RangeFactory.prototype.run = function (imgData) {
        var ranges = new Array();
        var max = imgData.width / this.size;
        for (var n = 0; n < max; ++n) {
            for (var m = 0; m < max; ++m) {
                var point = new Point(n * this.size, m * this.size);
                var range = new Entity(imgData, point, this.size);
                ranges.push(range);
            }
        }
        return ranges;
    };
    return RangeFactory;
}());
//# sourceMappingURL=RangeFactory.js.map