class UniversalHashFunctions {
    constructor(numberOfFunctions) {
        this.numberOfFunctions = numberOfFunctions;
    }
    /**
     * Generates array of universal hash functions.
     * @returns Array of hash functions.
     */
    generateFunctions() {
        let p = 35742549198872617291353508656626642567;
        let functions = [];
        for (let index = 0; index < this.numberOfFunctions; ++index) {
            let a = Math.random() * (p - 1) + 1;
            let b = Math.random() * p;
            let newFunction = value => {
                return (a * value + b) % p;
            }
            functions[index] = newFunction;
        }
        return functions;
    }
}