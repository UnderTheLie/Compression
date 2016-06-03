class Entity {
    private _map: number[][];
    private _delta: number[][];
    private _average: number;
    private _start: Point;
    private _size: number;

    constructor(imgData: ImageData, start: Point, size: number, shrinkRate?: number) {
        this._start = start;
        this._size = size;
        if (!!shrinkRate) {
            this.setupMap(imgData, shrinkRate);
        } else {
            this.setupMap(imgData, 1);
        }
        this.setupAverage();
        this.setupDelta();
    }

    private setupMap(imgData: ImageData, shrinkRate: number) {
        this._map = [];

        for (let x = 0; x < this._size; ++x) {
            this._map[x] = [];
            for (let y = 0; y < this._size; ++y) {
                this._map[x][y] = this.getColorFromImageData(imgData, x, y, shrinkRate);
            }
        }
    }

    private getColorFromImageData(imgData: ImageData, x: number, y: number, shrinkRate: number): number {
        let avg = 0;

        for (let innerX = 0; innerX < shrinkRate; ++innerX) {
            for (let innerY = 0; innerY < shrinkRate; ++innerY) {
                let outerX = this.start.x + shrinkRate * x + innerX;
                let outerY = this.start.y + shrinkRate * y + innerY;
                let index = (outerY * imgData.width + outerX) * 4;
                let color = imgData.data[index];

                avg += color;
            }
        }

        avg /= shrinkRate * shrinkRate;

        return avg;
    }

    private setupAverage() {
        let avg = 0;

        for (let x = 0; x < this._size; ++x) {
            for (let y = 0; y < this._size; ++y) {
                avg += this._map[x][y];
            }
        }

        avg /= this._size * this._size;

        this._average = avg;
    }

    private setupDelta() {
        this._delta = [];

        for (let x = 0; x < this._size; ++x) {
            this._delta[x] = [];
            for (let y = 0; y < this._size; ++y) {
                this._delta[x][y] = this._map[x][y] - this._average;
            }
        }
    }

    get map() {
        return this._map;
    }
    get delta() {
        return this._delta;
    }
    get average() {
        return this._average;
    }
    get start() {
        return this._start;
    }
    get size() {
        return this._size;
    }

    public toImageData(): ImageData {
        let imgData = new ImageData(this._size, this._size);

        for (let x = 0; x < this._size; ++x) {
            for (let y = 0; y < this._size; ++y) {
                let index = (y * this._size + x) * 4;
                let color = this._map[x][y];

                imgData.data[index] = color;
                imgData.data[++index] = color;
                imgData.data[++index] = color;
                imgData.data[++index] = 255;
            }
        }

        return imgData;
    }
}
