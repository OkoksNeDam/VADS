/**
 * Building an interface for the Bloom filter header.
 */
 function fillTheCapBloomFilter() {
    // DIV containing all header elements.
    let elementsPlaygroundCap = document.getElementById('elements-playground-cap');

    // Creating settings for input filter size.
    let inputFilterSize = createInputFilterSize(elementsPlaygroundCap);

    // Creating settings for input number of hesh.
    let inputNumberOfHash = createInputNumberOfHash(elementsPlaygroundCap);

    // Add button for building the filter.
    let buttonBuildFilter = createButtonBuldingTheFilter(elementsPlaygroundCap);

    addEventWhenButtonBuildFilterWasClicked(buttonBuildFilter, inputFilterSize, inputNumberOfHash);
}

function addEventWhenButtonBuildFilterWasClicked(buttonBuildFilter, inputFilterSize, inputNumberOfHash) {
    buttonBuildFilter.addEventListener('click', () => {
        if (!Number.isInteger(inputFilterSize.value) && inputFilterSize.value <= 13 && inputFilterSize.value >= 0 &&
            !Number.isInteger(inputNumberOfHash.value && inputNumberOfHash.value <= 13 && inputNumberOfHash.value >= 0)) {
            // Reset the main playground.
            document.getElementById('playground-main').innerHTML = '';

            // Creating shell for filter.
            createFilterArray();
            // Creating shell for hash functions.
            createHashFunctions();

            buildBloomFilter(inputFilterSize.value);

            // Elements to be added to the bloom filter.
            let addedElementsList = [];

            // Creating universal hash functions.
            let hashFunctions = new UniversalHashFunctions(inputNumberOfHash.value).generateFunctions();
            buildListOfHashFunctions(inputNumberOfHash.value, hashFunctions);
            createButtonAddElement();
            createInputAddElement();
            createButtonCheckElementAvailability();

            document.getElementById('add-element-button').onclick = () => {
                if (!addedElementsList.includes(document.getElementById('add-element-input').value)) {
                    addedElementsList.push(document.getElementById('add-element-input').value);
                    changeValuesInCellsAfterAddingElement(hashFunctions, inputFilterSize.value);
                }
            }
            document.getElementById('check-element-availability-button').onclick = () => {
                checkElementAvailability(hashFunctions, inputFilterSize.value, addedElementsList);
            }
        }
    });
}

/**
 * Сheck if there is an element in the filter.
 * @param {Array} hashFunctions list of hash functions
 * @param {number} filterSize number of cells in filter
 * @param {Object} addedElementsList list of elements that were added to filter
 */
function checkElementAvailability(hashFunctions, filterSize, addedElementsList) {
    ctx = document.getElementById("canvas").getContext("2d");

    let inputAddElement = document.getElementById('add-element-input');
    let value = inputAddElement.value;
    inputAddElement.value = '';
    let filterCells = document.getElementById('filter-array-div').childNodes;
    // True if all result values were in filter.
    let wasInFilter = true;
    let indexForFunctionDivs = 0;
    let timerId = setInterval(() => {
        if (indexForFunctionDivs == hashFunctions.length) {
            if (wasInFilter) {
                // If the element was never added but the result is positive.
                if (!addedElementsList.includes(value)) {
                    document.getElementById('checking-element-result').innerHTML = "<b>False positive</b> result";
                } else {
                    document.getElementById('checking-element-result').innerHTML = "Can't say for sure";
                }
            } else {
                document.getElementById('checking-element-result').innerHTML = "Definitely <b>not</b> in the filter";
            }
            setTimeout(() => {
                document.getElementById('checking-element-result').innerHTML = "";
            }, 2000);
            clearTimeout(timerId);
        }
        let func = hashFunctions[indexForFunctionDivs];
        let filterIndex = func(value)[0] % filterSize;

        // Coordinates for the value input field.
        let rectangleInputCoordinates = inputAddElement.getBoundingClientRect();
        let fromInputStartX = rectangleInputCoordinates.left + inputAddElement.clientWidth + 10;
        let fromInputStartY = rectangleInputCoordinates.top + inputAddElement.height / 2;

        let currentHashFunctionDiv = document.getElementById('hash-functions-list-div').childNodes[indexForFunctionDivs];
        // Coordinates for the div that the arrow goes to.
        let rectangleFunctionDivCoordinates = currentHashFunctionDiv.getBoundingClientRect();
        let fromInputEndX = rectangleFunctionDivCoordinates.left - 20;
        let fromInputEndY = rectangleFunctionDivCoordinates.top - 5 + currentHashFunctionDiv.clientHeight / 2;

        ctx.beginPath();
        drawAnArrow(ctx, fromInputStartX, fromInputStartY, fromInputEndX, fromInputEndY);
        ctx.stroke();

        let indexForFilterCells = 0;
        // Run on each function in array of has functions.
        for (let cell of filterCells) {
            if (indexForFilterCells == filterIndex) {
                let fromFunctionDivStartX = rectangleFunctionDivCoordinates.left + currentHashFunctionDiv.clientWidth + 5;
                let fromFunctionDivStartY = rectangleFunctionDivCoordinates.top + currentHashFunctionDiv.clientHeight / 2;

                let rectangleFilterCellCoordinates = cell.getBoundingClientRect();
                let fromFunctionDivEndX = rectangleFilterCellCoordinates.left - 20;
                let fromFunctionDivEndY = rectangleFilterCellCoordinates.top - 5 + cell.clientHeight / 2;

                setTimeout(() => {
                    ctx.beginPath();
                    drawAnArrow(ctx, fromFunctionDivStartX, fromFunctionDivStartY, fromFunctionDivEndX, fromFunctionDivEndY);
                    ctx.stroke();
                    if (cell.firstChild.innerHTML == '0') {
                        cell.classList.add('red-background');
                        setTimeout(() => {
                            cell.classList.remove('red-background');
                            ctx.clearRect(0, 0, 1680, 962);
                        }, 700);
                        wasInFilter = false;
                    } else {
                        cell.classList.add('green-background');
                        setTimeout(() => {
                            cell.classList.remove('green-background');
                            ctx.clearRect(0, 0, 1680, 962);
                        }, 700);
                    }
                }, 1000);
                break;
            }
            ++indexForFilterCells;
        }
        ++indexForFunctionDivs;
    }, 2000);
}

/**
 * Creat button that checks if element is in filter.
 */
function createButtonCheckElementAvailability() {
    let buttonCheckAvailability = document.createElement('button');
    buttonCheckAvailability.className = 'check-element-availability-button';
    buttonCheckAvailability.id = 'check-element-availability-button';
    buttonCheckAvailability.innerHTML = 'Check availability';
    document.getElementById('playground-main').appendChild(buttonCheckAvailability);

    let resultOfChecking = document.createElement('span');
    resultOfChecking.className = 'checking-element-result';
    resultOfChecking.id = 'checking-element-result';
    document.getElementById('playground-main').appendChild(resultOfChecking);
}

/**
 * When adding an item, change the values in the cells.
 * If the element was added to the filter, change the value
 * of the corresponding cells by one.
 * @param {Array} hashFunctions list of hash functions
 * @param {number} filterSize number of cells in filter
 */
function changeValuesInCellsAfterAddingElement(hashFunctions, filterSize) {
    ctx = document.getElementById("canvas").getContext("2d");

    let inputAddElement = document.getElementById('add-element-input');
    let value = inputAddElement.value;
    inputAddElement.value = '';
    let filterCells = document.getElementById('filter-array-div').childNodes;

    let indexForFunctionDivs = 0;

    let timerId = setInterval(() => {
            if (indexForFunctionDivs == hashFunctions.length) {
                console.log("clear!");
                clearTimeout(timerId);
            }
            console.log("New func!");
            let func = hashFunctions[indexForFunctionDivs];

            let filterIndex = func(value)[0] % filterSize;

            // Coordinates for the value input field.
            let rectangleInputCoordinates = inputAddElement.getBoundingClientRect();
            let fromInputStartX = rectangleInputCoordinates.left + inputAddElement.clientWidth + 10;
            let fromInputStartY = rectangleInputCoordinates.top + inputAddElement.height / 2;

            let currentHashFunctionDiv = document.getElementById('hash-functions-list-div').childNodes[indexForFunctionDivs];
            // Coordinates for the div that the arrow goes to.
            let rectangleFunctionDivCoordinates = currentHashFunctionDiv.getBoundingClientRect();
            let fromInputEndX = rectangleFunctionDivCoordinates.left - 20;
            let fromInputEndY = rectangleFunctionDivCoordinates.top - 5 + currentHashFunctionDiv.clientHeight / 2;

            ctx.beginPath();
            drawAnArrow(ctx, fromInputStartX, fromInputStartY, fromInputEndX, fromInputEndY);
            ctx.stroke();

            let indexForCell = 0;
            // Run on each cell in filter.
            for (let cell of filterCells) {
                // Change cell value to '1' in cell, which index is 'filterIndex'.
                if (indexForCell == filterIndex) {
                    let fromFunctionDivStartX = rectangleFunctionDivCoordinates.left + currentHashFunctionDiv.clientWidth + 5;
                    let fromFunctionDivStartY = rectangleFunctionDivCoordinates.top + currentHashFunctionDiv.clientHeight / 2;

                    let rectangleFilterCellCoordinates = cell.getBoundingClientRect();
                    let fromFunctionDivEndX = rectangleFilterCellCoordinates.left - 20;
                    let fromFunctionDivEndY = rectangleFilterCellCoordinates.top - 5 + cell.clientHeight / 2;

                    setTimeout(() => {
                        ctx.beginPath();
                        drawAnArrow(ctx, fromFunctionDivStartX, fromFunctionDivStartY, fromFunctionDivEndX, fromFunctionDivEndY);
                        ctx.stroke();
                        cell.firstChild.innerHTML = '1';
                        cell.classList.add('highlighted');
                        setTimeout(() => {
                            ctx.clearRect(0, 0, 1680, 962);
                        }, 700);
                    }, 1000);
                    break;
                }
                ++indexForCell;
            }
            ++indexForFunctionDivs;
    }, 2000);
}

/**
 * Adding a field to the playground for entering an element
 * that will be added to the filter.
 */
function createInputAddElement() {
    let inputAddElement = document.createElement('input');
    inputAddElement.className = 'add-element-input';
    inputAddElement.id = 'add-element-input';
    inputAddElement.placeholder = 'your number';
    document.getElementById('playground-main').appendChild(inputAddElement);
}

/**
 * Adding a button to the playground, after clicking on
 * which the element will be added to the filter.
 */
function createButtonAddElement() {
    let buttonAddElement = document.createElement('button');
    buttonAddElement.className = 'add-element-button';
    buttonAddElement.id = 'add-element-button';
    buttonAddElement.innerHTML = 'Add element';
    document.getElementById('playground-main').appendChild(buttonAddElement);
}

/**
 * Creating a wrapper that will store a list of divs,
 * each of which is associated with a specific hash function.
 */
function createHashFunctions() {
    let hashFunctionsList = document.createElement('div');
    hashFunctionsList.classList.add('hash-functions-list-div');
    hashFunctionsList.id = 'hash-functions-list-div';
    document.getElementById('playground-main').appendChild(hashFunctionsList);
}

/**
 * Creating a wrapper that will store a list of divs, 
 * each of which is associated with a specific bloom filter cell.
 */
function createFilterArray() {
    let filterArrayDiv = document.createElement('div');
    filterArrayDiv.classList.add('filter-array-div');
    filterArrayDiv.id = 'filter-array-div';
    document.getElementById('playground-main').appendChild(filterArrayDiv);
}

/**
 * Creating an element that serves as an input field 
 * for the element to be added to the bloom filter.
 * @param {object} elementsPlaygroundCap div containing header elements
 * @returns field for input nwe value
 */
function createInputFilterSize(elementsPlaygroundCap) {
    let divFilterSize = document.createElement('div');
    divFilterSize.innerHTML = 'Filter size: ';
    divFilterSize.className = 'div-filter-size';
    let inputFilterSize = document.createElement('input');
    divFilterSize.appendChild(inputFilterSize);
    elementsPlaygroundCap.appendChild(divFilterSize);
    return inputFilterSize;
}

/**
 * Creating an element that serves as an input field 
 * for number of hash functions.
 * @param {object} elementsPlaygroundCap div containing header elements
 * @returns field for input new number of hash functions
 */
function createInputNumberOfHash(elementsPlaygroundCap) {
    let divNumberOfHesh = document.createElement('div');
    divNumberOfHesh.innerHTML = 'Number of hesh: ';
    divNumberOfHesh.className = 'div-hesh-number';
    let inputNumberOfHesh = document.createElement('input');
    divNumberOfHesh.appendChild(inputNumberOfHesh);
    elementsPlaygroundCap.appendChild(divNumberOfHesh);
    return inputNumberOfHesh;
}

/**
 * Creating an element that serves as a button
 * that builds interface for filter.
 * @param {object} elementsPlaygroundCap div containing header elements
 * @returns Button that builds filter.
 */
function createButtonBuldingTheFilter(elementsPlaygroundCap) {
    let buttonBuildFilter = document.createElement('button');
    buttonBuildFilter.innerHTML = "BUILD FILTER";
    buttonBuildFilter.className = 'button-build-filter';
    buttonBuildFilter.id = 'button-build-filter';
    elementsPlaygroundCap.appendChild(buttonBuildFilter);
    return buttonBuildFilter;
}

/**
 * Draws divs that match bloom filter cells.
 * @param {number} filterSize size of Bloom filter
 */
function buildBloomFilter(filterSize) {
    // Div that contains cells for Bloom filter
    let filterArrayDiv = document.getElementById('filter-array-div');
    // Every new cell would be next this position.
    let cellShift = ((filterArrayDiv.clientHeight - 50 * filterSize) / 2);
    for (let index = 0; index < filterSize; ++index) {
        // Creating new cell for filter.
        let newDivCell = document.createElement('div');
        newDivCell.classList.add('filter-cell-div');
        newDivCell.style.top = cellShift + 'px';
        // Text in the cell.
        let innerTextDivCell = document.createElement('div');
        innerTextDivCell.className = 'filter-cell-div-inner-text';
        innerTextDivCell.innerHTML = '0';
        newDivCell.appendChild(innerTextDivCell);
        // Adding cell into filter.
        filterArrayDiv.appendChild(newDivCell);
        cellShift += 50;
    }
}

/**
 * A sequence of div blocks is drawn, each of which is responsible for a hash function.
 * @param {number} numberOfHash amount of hash functions
 * @param {Array} hashFunctions array of hash functions
 */
function buildListOfHashFunctions(numberOfHash, hashFunctions) {
     let hashFunctionsList = document.getElementById('hash-functions-list-div');
     // Every new hash function would be next this position.
     let hashFunctionShift = ((hashFunctionsList.clientHeight - 50 * numberOfHash) / 2);
     for (let index = 0; index < numberOfHash; ++index) {
         // Creating new hash function.
         let newHashFunction = document.createElement('div');
         newHashFunction.classList.add('hash-function-div');
         newHashFunction.style.top = hashFunctionShift + 'px';
         newHashFunction.dataToggle = "tooltip";
         let [a, b, p] = [hashFunctions[index](1)[1], hashFunctions[index](1)[2], hashFunctions[index](1)[3]];
         newHashFunction.title = `(${a}x + ${b} mod(${p})) mod(${numberOfHash})`;
         // Text in the cell.
         let innerTextHashFunction = document.createElement('div');
         innerTextHashFunction.className = 'hash-function-div-inner-text';
         innerTextHashFunction.innerHTML = 'k' + '<sub>' + (index + 1);
         newHashFunction.appendChild(innerTextHashFunction);
         hashFunctionsList.appendChild(newHashFunction);
         hashFunctionShift += 50;
     }
}