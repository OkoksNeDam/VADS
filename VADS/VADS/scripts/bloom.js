/**
 * Building an interface in the cap of playground for the user: some input for Bloom filter.
 */
 function fillTheCapBloomFilter() {
    // Div, which contains the input data of Bloom filter.
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
            // Creating universal hash functions.
            let hashFunctions = new UniversalHashFunctions(inputNumberOfHash.value).generateFunctions();
            buildListOfHashFunctions(inputNumberOfHash.value, hashFunctions);
            createButtonAddElement();
            createInputAddElement();
            createButtonCheckElementAvailability();

            document.getElementById('add-element-button').onclick = () => {
                changeValuesInCellsAfterAddingElement(hashFunctions, inputFilterSize.value);
            }
            document.getElementById('check-element-availability-button').onclick = () => {
                checkElementAvailability(hashFunctions, inputFilterSize.value);
            }
        }
    });
}

/**
 * Сheck if there is an element in the filter.
 * @param {Array} hashFunctions 
 * @param {number} filterSize 
 */
function checkElementAvailability(hashFunctions, filterSize) {
    let value = document.getElementById('add-element-input').value;
    document.getElementById('add-element-input').value = '';
    let filterCells = document.getElementById('filter-array-div').childNodes;
    // True if all result values were in filter.
    let wasInFilter = true;
    hashFunctions.forEach(func => {
        let filterIndex = func(value)[0] % filterSize;
        let index = 0;
        // Run on each function in array of has functions.
        for (let cell of filterCells) {
            if (index == filterIndex) {
                if (cell.firstChild.innerHTML == '0') {
                    cell.classList.add('red-background');
                    setTimeout(() => {
                        cell.classList.remove('red-background');
                    }, 1200);
                    wasInFilter = false;
                }
                break;
            }
            ++index;
        }
    });
    if (wasInFilter) {
        document.getElementById('checking-element-result').innerHTML = "Can't say for sure";
    } else {
        document.getElementById('checking-element-result').innerHTML = "Definitely <b>not</b> in the filter";
    }
    setTimeout(() => {
        document.getElementById('checking-element-result').innerHTML = "";
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
 * @param {Array} hashFunctions 
 * @param {number} filterSize 
 */
function changeValuesInCellsAfterAddingElement(hashFunctions, filterSize) {
    let value = document.getElementById('add-element-input').value;
    document.getElementById('add-element-input').value = '';
    let filterCells = document.getElementById('filter-array-div').childNodes;
    // Run on each function in array of has functions.
    hashFunctions.forEach(func => {
        let filterIndex = func(value)[0] % filterSize;
        let index = 0;
        // Run on each cell in filter.
        for (let cell of filterCells) {
            // Change cell value to '1' in cell, which index is 'filterIndex'.
            if (index == filterIndex) {
                cell.firstChild.innerHTML = '1';
                cell.classList.add('highlighted');
                break;
            }
            ++index;
        }
    });
}

/**
 * Input element to add to filter.
 */
function createInputAddElement() {
    let inputAddElement = document.createElement('input');
    inputAddElement.className = 'add-element-input';
    inputAddElement.id = 'add-element-input';
    inputAddElement.placeholder = 'your number';
    document.getElementById('playground-main').appendChild(inputAddElement);
}

/**
 * Button that adds element to filter.
 */
function createButtonAddElement() {
    let buttonAddElement = document.createElement('button');
    buttonAddElement.className = 'add-element-button';
    buttonAddElement.id = 'add-element-button';
    buttonAddElement.innerHTML = 'Add element';
    document.getElementById('playground-main').appendChild(buttonAddElement);
}

/**
 * Creating shell for hash functions.
 */
function createHashFunctions() {
    let hashFunctionsList = document.createElement('div');
    hashFunctionsList.classList.add('hash-functions-list-div');
    hashFunctionsList.id = 'hash-functions-list-div';
    document.getElementById('playground-main').appendChild(hashFunctionsList);
}

/**
 * Creating shell for filter.
 */
function createFilterArray() {
    let filterArrayDiv = document.createElement('div');
    filterArrayDiv.classList.add('filter-array-div');
    filterArrayDiv.id = 'filter-array-div';
    document.getElementById('playground-main').appendChild(filterArrayDiv);
}

/**
 * Creating settings for input filter size.
 * @param {object} elementsPlaygroundCap 
 * @returns Input size for filter.
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
 * Creating settings for input number of hesh.
 * @param {object} elementsPlaygroundCap 
 * @returns Input number of hesh for Bloom filter.
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
 * Creat button for building the filter.
 * @param {object} elementsPlaygroundCap 
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
 * Building a Bloom filter size of filterSize.
 * @param {number} filterSize Size of Bloom filter.
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