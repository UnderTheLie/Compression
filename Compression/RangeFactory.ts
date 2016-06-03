class RangeFactory {
    constructor(private size: number) { }

    public run(imgData: ImageData): Entity[] {
        let ranges = new Array<Entity>();
        let max = imgData.width / this.size;

        for (let n = 0; n < max; ++n) {
            for (let m = 0; m < max; ++m) {
                let point = new Point(n * this.size, m * this.size);
                let range = new Entity(imgData, point, this.size);
                ranges.push(range);
            }
        }

        return ranges;
    }
}
