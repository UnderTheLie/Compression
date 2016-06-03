class FractalInformation {
    private _coeffitients: FractalCoeffitients;
    private _rangeIndex: number;
    private _domainIndex: number;

    constructor(coeffitients: FractalCoeffitients, rangeIndex: number, domainIndex: number) {
        this._coeffitients = coeffitients;
        this._rangeIndex = rangeIndex;
        this._domainIndex = domainIndex;
    }

    get coeffitients() {
        return this._coeffitients;
    }
    get rangeIndex() {
        return this._rangeIndex;
    }
    get domainIndex() {
        return this._domainIndex;
    }
}
