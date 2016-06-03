var DomainFactory = (function () {
    function DomainFactory(size, shrinkRate) {
        this.size = size;
        this.shrinkRate = shrinkRate;
    }
    DomainFactory.prototype.run = function (imgData) {
        var domains = new Array();
        var max = 2 * imgData.width / (this.size * this.shrinkRate);
        for (var n = 0; n < max; ++n) {
            for (var m = 0; m < max; ++m) {
                var point = new Point(n / 2 * this.size * this.shrinkRate, m / 2 * this.size * this.shrinkRate);
                var domain = new Entity(imgData, point, this.size, this.shrinkRate);
                domains.push(domain);
            }
        }
        return domains;
    };
    return DomainFactory;
}());
//# sourceMappingURL=DomainFactory.js.map