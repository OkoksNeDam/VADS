class UniversalHashFunctions {
    constructor(numberOfFunctions) {
        this.numberOfFunctions = numberOfFunctions;
    }
    /**
     * Generates array of universal hash functions.
     * @returns Array of hash functions.
     */
    generateFunctions() {
        let p = 115249;
        let functions = [];
        for (let index = 0; index < this.numberOfFunctions; ++index) {
            let a = Math.floor(Math.random() * (p - 1) + 1);
            let b = Math.floor(Math.random() * p);
            let newFunction = value => {
                return [(a * value + b) % p, a, b, p];
            }
            functions[index] = newFunction;
        }
        return functions;
    }
}