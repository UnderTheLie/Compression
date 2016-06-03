class FractalDecompressor {
    constructor(
        private rangeFactory: RangeFactory,
        private domainFactory: DomainFactory,
        private context: CanvasRenderingContext2D,
        private fractalInformation: FractalInformation[]) { }

    public run() {
        let imgData = this.context.getImageData(0, 0, 512, 512);
        let ranges = this.rangeFactory.run(imgData);
        let domains = this.domainFactory.run(imgData);

        for (let i = 0; i < this.fractalInformation.length; ++i) {
            let information = this.fractalInformation[i];
            let rangeIndex = information.rangeIndex;
            let domainIndex = information.domainIndex;
            let range = ranges[rangeIndex];
            let domain = domains[domainIndex];

            this.updateImage(range, domain, information);
        }
    }

    private updateImage(range: Entity, domain: Entity, information: FractalInformation) {
        let imgData = domain.toImageData();
        let updatedData = this.applyCoeffitients(imgData, information.coeffitients);
        let outerX = range.start.x;
        let outerY = range.start.y;

        this.context.putImageData(updatedData, outerX, outerY);
    }

    private applyCoeffitients(imgData: ImageData, fractalCoeffitients: FractalCoeffitients): ImageData {
        let size = imgData.height;
        let updatedData = new ImageData(size, size);

        for (let x = 0; x < size; ++x) {
            for (let y = 0; y < size; ++y) {
                let index = (y * size + x) * 4;
                let color = imgData.data[index];
                let updatedColor = color * fractalCoeffitients.contrast + fractalCoeffitients.brightness;

                updatedData.data[index] = updatedColor;
                updatedData.data[++index] = updatedColor;
                updatedData.data[++index] = updatedColor;
                updatedData.data[++index] = 255;
            }
        }

        return updatedData;
    }
}
