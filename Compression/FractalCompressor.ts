class FractalCompressor {
    constructor(
        private rangeFactory: RangeFactory,
        private domainFactory: DomainFactory,
        private context: CanvasRenderingContext2D) { }

    public run() {
        let imgData = this.context.getImageData(0, 0, 512, 512);
        let ranges = this.rangeFactory.run(imgData);
        let domains = this.domainFactory.run(imgData);

        let fractalInformation = this.getFractalInformation(ranges, domains);

        OUTPUT = fractalInformation.splice(0);
    }

    private getFractalInformation(ranges: Entity[], domains: Entity[]): FractalInformation[] {
        let information = new Array<FractalInformation>();

        for (let i = 0; i < ranges.length; ++i) {
            let range = ranges[i];
            let minDifference = Infinity;
            let minDomainIndex: number;
            let minCoeffitients: FractalCoeffitients; 

            for (let j = 0; j < domains.length; ++j) {
                let domain = domains[j];
                let coeffitients = this.getCoeffitients(range, domain);
                let difference = this.getDifference(range, domain, coeffitients);

                if (difference < minDifference) {
                    minDifference = difference;
                    minDomainIndex = j;
                    minCoeffitients = coeffitients;
                }
            }

            let fractalInformation = new FractalInformation(minCoeffitients, i, minDomainIndex);
            information.push(fractalInformation);
            updateProgressBar(i, ranges.length);
        }

        return information;
    }

    private getCoeffitients(range: Entity, domain: Entity): FractalCoeffitients {
        let alpha = this.getAlpha(range, domain);
        let betha = this.getBetha(domain);
        let contrast = alpha / betha;
        let brightness = range.average - contrast * domain.average;

        return new FractalCoeffitients(contrast, brightness);
    }

    private getAlpha(range: Entity, domain: Entity): number {
        let result = 0;

        for (let x = 0; x < range.size; ++x) {
            for (let y = 0; y < range.size; ++y) {
                let rangeDelta = range.delta[x][y];
                let domainDelta = domain.delta[x][y];
                result += rangeDelta * domainDelta;
            }
        }

        return result;
    }

    private getBetha(domain: Entity): number {
        let result = 0;

        for (let x = 0; x < domain.size; ++x) {
            for (let y = 0; y < domain.size; ++y) {
                let domainDelta = domain.delta[x][y];
                result += domainDelta * domainDelta;
            }
        }

        return result;
    }

    private getDifference(range: Entity, domain: Entity, coeffitients: FractalCoeffitients): number {
        let result = 0;

        for (let x = 0; x < range.size; ++x) {
            for (let y = 0; y < range.size; ++y) {
                let rangeColor = range.map[x][y];
                let domainColor = domain.map[x][y] * coeffitients.contrast + coeffitients.brightness;
                let difference = rangeColor - domainColor;

                result += difference * difference;
            }
        }

        return result;
    }
}
