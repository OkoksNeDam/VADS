/**
 * Building an interface in the cap of playground for the user: some input for Bloom filter.
 */
 function fillTheCapBloomFilter() {
    // Div, which contains the input data of Bloom filter.
    let elementsPlaygroundCap = document.getElementById('elements-playground-cap');

    // Creating shell for filter.
    createFilterArray();
    // Creating shell for hash functions.
    createHashFunctions();

    // Creating settings for input filter size.
    let inputFilterSize = createInputFilterSize(elementsPlaygroundCap);

    // Creating settings for input number of hesh.
    let inputNumberOfHash = createInputNumberOfHash(elementsPlaygroundCap);

    // Add button for building the filter.
    let buttonBuildFilter = createButtonBuldingTheFilter(elementsPlaygroundCap);

    // Change filter if button was clicked.
    buttonBuildFilter.addEventListener('click', () => {
        if (!Number.isInteger(inputFilterSize.value) && inputFilterSize.value <= 13 && inputFilterSize.value >= 0 &&
            !Number.isInteger(inputNumberOfHash.value && inputNumberOfHash.value <= 13 && inputNumberOfHash.value >= 0)) {
            buildBloomFilter(inputFilterSize.value);
            buildListOfHashFunctions(inputNumberOfHash.value);
            createButtonAddElement();
            createInputAddElement();
            // Creating universal hash functions.
            let hashFunctions = new UniversalHashFunctions(inputNumberOfHash.value).generateFunctions();
            document.getElementById('add-element-button').onclick = () => {
                changeValuesInFiltersCells(hashFunctions, inputFilterSize.value);
            }
        }
    })
}

function changeValuesInFiltersCells(hashFunctions, filterSize) {
    let value = document.getElementById('add-element-input').value;
    let filterCells = document.getElementById('filter-array-div').childNodes;
    hashFunctions.forEach(func => {
        let filterIndex = func(value) % filterSize;
        let index = 0;
        for (let cell of filterCells) {
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
    // Reset values for filter.
    filterArrayDiv.innerHTML = '';
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
 * Building list of hash functions.
 * @param {number} numberOfHash 
 */
function buildListOfHashFunctions(numberOfHash) {
     let hashFunctionsList = document.getElementById('hash-functions-list-div');
     hashFunctionsList.innerHTML = '';
     // Every new hash function would be next this position.
     let hashFunctionShift = ((hashFunctionsList.clientHeight - 50 * numberOfHash) / 2);
     for (let index = 0; index < numberOfHash; ++index) {
         // Creating new hash function.
         let newHashFunction = document.createElement('div');
         newHashFunction.classList.add('hash-function-div');
         newHashFunction.style.top = hashFunctionShift + 'px';
         // Text in the cell.
         let innerTextHashFunction = document.createElement('div');
         innerTextHashFunction.className = 'hash-function-div-inner-text';
         innerTextHashFunction.innerHTML = 'k' + '<sub>' + (index + 1);
         newHashFunction.appendChild(innerTextHashFunction);
         hashFunctionsList.appendChild(newHashFunction);
         hashFunctionShift += 50;
     }
}