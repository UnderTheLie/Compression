class DomainFactory {
    constructor(private size: number, private shrinkRate: number) { }

    public run(imgData: ImageData): Entity[] {
        let domains = new Array<Entity>();
        let max = 2 * imgData.width / (this.size * this.shrinkRate);

        for (let n = 0; n < max; ++n) {
            for (let m = 0; m < max; ++m) {
                let point = new Point(n / 2 * this.size * this.shrinkRate, m / 2 * this.size * this.shrinkRate);
                let domain = new Entity(imgData, point, this.size, this.shrinkRate);
                domains.push(domain);
            }
        }

        return domains;
    }
}
