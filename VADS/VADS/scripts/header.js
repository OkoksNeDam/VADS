/**
 * Building an interface for the Bloom filter header.
 */
 function fillTheHeaderBloomFilter() {
    // DIV containing all header elements.
    let elementsPlaygroundCap = document.getElementById('elements-playground-cap');

    elementsPlaygroundCap.innerHTML = "";

    // Creating settings for input filter size.
    let inputFilterSize = createInputFilterSize(elementsPlaygroundCap);

    // Creating settings for input number of hesh.
    let inputNumberOfHash = createInputNumberOfHash(elementsPlaygroundCap);

    // Add button for building the filter.
    let buttonBuildFilter = createButtonBuldingTheFilter(elementsPlaygroundCap);

    labelRestrictionsForFilterAndFunctions(elementsPlaygroundCap);

    addEventWhenButtonBuildFilterWasClicked(buttonBuildFilter, inputFilterSize, inputNumberOfHash);
}

/**
 * Label that shows restriction for filter size.
 * @param {object} elementsPlaygroundCap div containing header elements
 */
function labelRestrictionsForFilterAndFunctions(elementsPlaygroundCap) {
    let divLabelRestrictionsForFilterSize = document.createElement('div');
    divLabelRestrictionsForFilterSize.innerHTML = "<i>restrictions: 1 ≤ value ≤ 13</i><br><br><br><i>restrictions: 1 ≤ value ≤ 13</i>";
    divLabelRestrictionsForFilterSize.style.position = "absolute";
    divLabelRestrictionsForFilterSize.style.left = "300px";
    divLabelRestrictionsForFilterSize.style.top = "9px";
    divLabelRestrictionsForFilterSize.style.color = "rgb(48, 184, 246, 0.95)";
    elementsPlaygroundCap.appendChild(divLabelRestrictionsForFilterSize);
}

/**
 * Creating an element that serves as an input field 
 * for the element to be added to the bloom filter.
 * @param {object} elementsPlaygroundCap div containing header elements
 * @returns field for input nwe value
 */
 function createInputFilterSize(elementsPlaygroundCap) {
    let divFilterSize = document.createElement('div');
    divFilterSize.innerHTML = '<i>Filter size: </i>';
    divFilterSize.className = 'div-filter-size';
    let inputFilterSize = document.createElement('input');
    inputFilterSize.className = "input-filter-size-header";
    inputFilterSize.style = "background: white";
    inputFilterSize.style.border = "1.5px solid black";
    inputFilterSize.placeholder = 'your number';

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
    divNumberOfHesh.innerHTML = '<i>Number of hash: </i>';
    divNumberOfHesh.className = 'div-hesh-number';
    let inputNumberOfHesh = document.createElement('input');
    inputNumberOfHesh.style = "background-color: white";
    inputNumberOfHesh.style.border = "1.5px solid black";
    inputNumberOfHesh.placeholder = 'your number';
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
