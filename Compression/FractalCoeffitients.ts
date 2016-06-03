class FractalCoeffitients {
    private _contrast: number;
    private _brightness: number;

    constructor(contrast: number, brightness: number) {
        this._contrast = contrast;
        this._brightness = brightness;
    }

    get contrast() {
        return this._contrast;
    }
    get brightness() {
        return this._brightness;
    }
}
