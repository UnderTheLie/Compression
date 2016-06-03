var Entity = (function () {
    function Entity(imgData, start, size, shrinkRate) {
        this._start = start;
        this._size = size;
        if (!!shrinkRate) {
            this.setupMap(imgData, shrinkRate);
        }
        else {
            this.setupMap(imgData, 1);
        }
        this.setupAverage();
        this.setupDelta();
    }
    Entity.prototype.setupMap = function (imgData, shrinkRate) {
        this._map = [];
        for (var x = 0; x < this._size; ++x) {
            this._map[x] = [];
            for (var y = 0; y < this._size; ++y) {
                this._map[x][y] = this.getColorFromImageData(imgData, x, y, shrinkRate);
            }
        }
    };
    Entity.prototype.getColorFromImageData = function (imgData, x, y, shrinkRate) {
        var avg = 0;
        for (var innerX = 0; innerX < shrinkRate; ++innerX) {
            for (var innerY = 0; innerY < shrinkRate; ++innerY) {
                var outerX = this.start.x + shrinkRate * x + innerX;
                var outerY = this.start.y + shrinkRate * y + innerY;
                var index = (outerY * imgData.width + outerX) * 4;
                var color = imgData.data[index];
                avg += color;
            }
        }
        avg /= shrinkRate * shrinkRate;
        return avg;
    };
    Entity.prototype.setupAverage = function () {
        var avg = 0;
        for (var x = 0; x < this._size; ++x) {
            for (var y = 0; y < this._size; ++y) {
                avg += this._map[x][y];
            }
        }
        avg /= this._size * this._size;
        this._average = avg;
    };
    Entity.prototype.setupDelta = function () {
        this._delta = [];
        for (var x = 0; x < this._size; ++x) {
            this._delta[x] = [];
            for (var y = 0; y < this._size; ++y) {
                this._delta[x][y] = this._map[x][y] - this._average;
            }
        }
    };
    Object.defineProperty(Entity.prototype, "map", {
        get: function () {
            return this._map;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "delta", {
        get: function () {
            return this._delta;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "average", {
        get: function () {
            return this._average;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "start", {
        get: function () {
            return this._start;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "size", {
        get: function () {
            return this._size;
        },
        enumerable: true,
        configurable: true
    });
    Entity.prototype.toImageData = function () {
        var imgData = new ImageData(this._size, this._size);
        for (var x = 0; x < this._size; ++x) {
            for (var y = 0; y < this._size; ++y) {
                var index = (y * this._size + x) * 4;
                var color = this._map[x][y];
                imgData.data[index] = color;
                imgData.data[++index] = color;
                imgData.data[++index] = color;
                imgData.data[++index] = 255;
            }
        }
        return imgData;
    };
    return Entity;
}());
//# sourceMappingURL=Entity.js.map