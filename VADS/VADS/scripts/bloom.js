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

            createZoneForBarChart();

            // Elements to be added to the bloom filter.
            let addedElementsList = [];

            // Creating universal hash functions.
            let hashFunctions = new UniversalHashFunctions(inputNumberOfHash.value).generateFunctions();

            createChangeFunctionParametersElements();
            document.getElementById('accespt-changes-to-function-button').onclick = () => {
                let numberOfFunction = document.getElementById('number-of-function-to-change-input').value;
                let parameterA = document.getElementById('a-parameter-to-change-input').value;
                let parameterB = document.getElementById('b-parameter-to-change-input').value;
                let parameterP = document.getElementById('p-parameter-to-change-input').value;
                document.getElementById('number-of-function-to-change-input').value = "";
                document.getElementById('a-parameter-to-change-input').value = "";
                document.getElementById('b-parameter-to-change-input').value = "";
                document.getElementById('p-parameter-to-change-input').value = "";
                let newFunction = value => {
                    return [(parameterA * value + parameterB) % parameterP, parameterA, parameterB, parameterP];
                }
                hashFunctions[numberOfFunction - 1] = newFunction;
                buildListOfHashFunctions(inputNumberOfHash.value, hashFunctions, inputFilterSize.value);
            }
            document.getElementById('change-parameters-of-function-randomly').onclick = () => {
                let numberOfFunction = document.getElementById('number-of-function-to-change-input').value;
                let parameterP = Math.floor(Math.random() * (100000) + 1);
                let parameterA = Math.floor(Math.random() * (parameterP - 1) + 1);
                let parameterB = Math.floor(Math.random() * parameterP);
                document.getElementById('number-of-function-to-change-input').value = "";
                document.getElementById('a-parameter-to-change-input').value = "";
                document.getElementById('b-parameter-to-change-input').value = "";
                document.getElementById('p-parameter-to-change-input').value = "";
                let newFunction = value => {
                    return [(parameterA * value + parameterB) % parameterP, parameterA, parameterB, parameterP];
                }
                hashFunctions[numberOfFunction - 1] = newFunction;
                buildListOfHashFunctions(inputNumberOfHash.value, hashFunctions, inputFilterSize.value);
            }
            buildListOfHashFunctions(inputNumberOfHash.value, hashFunctions, inputFilterSize.value);
            createButtonAddElement();
            createInputAddElement();
            createButtonCheckElementAvailability();
            createShowAddedElementsButton();

            document.getElementById('add-element-button').onclick = () => {
                if (!addedElementsList.includes(document.getElementById('add-element-input').value)) {
                    addedElementsList.push(document.getElementById('add-element-input').value);
                    document.getElementById('text-area-with-list-of-added-elements').innerHTML += 
                                addedElementsList.length + ":  " + document.getElementById('add-element-input').value + "\n";
                }
                changeValuesInCellsAfterAddingElement(hashFunctions, inputFilterSize.value);
            }
            document.getElementById('check-element-availability-button').onclick = () => {
                checkElementAvailability(hashFunctions, inputFilterSize.value, addedElementsList);
            }
        }
    });
}

/**
 * Сreates a zone in which the fields for entering
 * input data for the bloom filter will be located.
 */
function createZoneForBarChart() {
    // Div where input elements and chart would be located.
    let zoneForBarChart = document.createElement('div');
    zoneForBarChart.id = 'zone-for-bar-chart';
    zoneForBarChart.className = 'zone-for-bar-chart';
    document.getElementById('playground-main').appendChild(zoneForBarChart);

    // Button that shows all input elements for bar chart and chart.
    let showZoneForBatChartButton = document.createElement('button');
    showZoneForBatChartButton.className = "show-zone-bar-chart-button";
    showZoneForBatChartButton.id = "show-zone-bar-chart-button";
    showZoneForBatChartButton.innerHTML = "Input data analysis";
    zoneForBarChart.appendChild(showZoneForBatChartButton);

    let labelForFilterSizeBarChart = document.createElement('label');
    labelForFilterSizeBarChart.style.position = 'absolute';
    labelForFilterSizeBarChart.style.top = '40px';
    labelForFilterSizeBarChart.innerHTML = "Filter Bloom size:";
    labelForFilterSizeBarChart.classList.add('hide-element');
    zoneForBarChart.appendChild(labelForFilterSizeBarChart);

    // Input for filter size for bar chart.
    let inputFilterSizeForBarChart = document.createElement('input');
    inputFilterSizeForBarChart.className = 'input-filter-size-for-bar-chart';
    inputFilterSizeForBarChart.id = 'input-filter-size-for-bar-chart';
    inputFilterSizeForBarChart.classList.add('hide-element');
    inputFilterSizeForBarChart.placeholder = "your number";
    zoneForBarChart.appendChild(inputFilterSizeForBarChart);

    let labelNumberOfHashFunctionsForBarChart = document.createElement('label');
    labelNumberOfHashFunctionsForBarChart.style.position = 'absolute';
    labelNumberOfHashFunctionsForBarChart.style.top = '90px';
    labelNumberOfHashFunctionsForBarChart.innerHTML = "Number of hash functions:";
    labelNumberOfHashFunctionsForBarChart.classList.add('hide-element');
    zoneForBarChart.appendChild(labelNumberOfHashFunctionsForBarChart);

    // Input for number of hash functions for bar chart.
    let inputNumberOfHashForBarChart = document.createElement('input');
    inputNumberOfHashForBarChart.className = 'input-number-of-hash-functions-for-bar-chart';
    inputNumberOfHashForBarChart.id = 'input-number-of-hash-functions-for-bar-chart';
    inputNumberOfHashForBarChart.classList.add('hide-element');
    inputNumberOfHashForBarChart.placeholder = "your number";
    zoneForBarChart.appendChild(inputNumberOfHashForBarChart);

    let labelNumberOfElementsToAdd = document.createElement('label');
    labelNumberOfElementsToAdd.style.position = 'absolute';
    labelNumberOfElementsToAdd.style.top = '140px';
    labelNumberOfElementsToAdd.innerHTML = "Number of elements to add:";
    labelNumberOfElementsToAdd.classList.add('hide-element');
    zoneForBarChart.appendChild(labelNumberOfElementsToAdd);

    // Input number of elements to add to filter for bar chart.
    let inputNumberOfElementsToAddForBarChart = document.createElement('input');
    inputNumberOfElementsToAddForBarChart.className = 'input-number-of-elements-to-add-for-bar-chart';
    inputNumberOfElementsToAddForBarChart.id = 'input-number-of-elements-to-add-for-bar-chart';
    inputNumberOfElementsToAddForBarChart.classList.add('hide-element');
    inputNumberOfElementsToAddForBarChart.placeholder = "your number";
    zoneForBarChart.appendChild(inputNumberOfElementsToAddForBarChart);

    let labelNumberOfElementsToCheck = document.createElement('label');
    labelNumberOfElementsToCheck.style.position = 'absolute';
    labelNumberOfElementsToCheck.style.top = '195px';
    labelNumberOfElementsToCheck.innerHTML = "Number of elements to check:";
    labelNumberOfElementsToCheck.classList.add('hide-element');
    zoneForBarChart.appendChild(labelNumberOfElementsToCheck);

    // Input number of elements to check avaliability in filter for bar chart.
    let inputNumberOfElementsToCheckForBarChart = document.createElement('input');
    inputNumberOfElementsToCheckForBarChart.className = 'input-number-of-elements-to-check-for-bar-chart';
    inputNumberOfElementsToCheckForBarChart.id = 'input-number-of-elements-to-check-for-bar-chart';
    inputNumberOfElementsToCheckForBarChart.classList.add('hide-element');
    inputNumberOfElementsToCheckForBarChart.placeholder = "your number";
    zoneForBarChart.appendChild(inputNumberOfElementsToCheckForBarChart);

    // After clicking this button bar chart would be redrawing.
    let generateBloomFilterForBarChartButton = document.createElement('button');
    generateBloomFilterForBarChartButton.className = 'button-to-build-filter-bar-chart';
    generateBloomFilterForBarChartButton.id = 'button-to-build-filter-bar-chart';
    generateBloomFilterForBarChartButton.classList.add('hide-element');
    generateBloomFilterForBarChartButton.innerHTML = 'generate';
    zoneForBarChart.appendChild(generateBloomFilterForBarChartButton);

    let labelExplainingBarChart = document.createElement('label');
    labelExplainingBarChart.style.position = 'absolute';
    labelExplainingBarChart.style.top = '300px';
    labelExplainingBarChart.innerHTML = "After generating the filter, the number of elements entered in the third field will be added to it, each element is generated randomly.<br><br>After that, elements are generated, the number of which is equal to the value entered in the fourth field. These elements are checked to see if they are in the filter or not.";
    labelExplainingBarChart.classList.add('hide-element');
    zoneForBarChart.appendChild(labelExplainingBarChart);

    showZoneForBatChartButton.onclick = () => {
        labelForFilterSizeBarChart.classList.toggle('hide-element');
        inputFilterSizeForBarChart.classList.toggle('hide-element');
        labelNumberOfHashFunctionsForBarChart.classList.toggle('hide-element');
        inputNumberOfHashForBarChart.classList.toggle('hide-element');
        labelNumberOfElementsToAdd.classList.toggle('hide-element');
        inputNumberOfElementsToAddForBarChart.classList.toggle('hide-element');
        labelNumberOfElementsToCheck.classList.toggle('hide-element');
        inputNumberOfElementsToCheckForBarChart.classList.toggle('hide-element');
        generateBloomFilterForBarChartButton.classList.toggle('hide-element');
        labelExplainingBarChart.classList.toggle('hide-element');
        if (document.getElementById('barChart').style.display == "none") {
            document.getElementById('barChart').style.display = "block";
        } else {
            document.getElementById('barChart').style.display = "none";
        }
    }

    createBarChart();
}

/**
 * Creating bar chart for showing results of generation.
 */
function createBarChart() {
    let canvas = document.createElement('canvas');
    canvas.style.position = "absolute";
    canvas.id = "barChart";
    canvas.style.display = 'none';

    document.getElementById('zone-for-bar-chart').appendChild(canvas);
    canvas.parentNode.style.bottom = '10px';
    canvas.parentNode.style.width = '380px';
    canvas.parentNode.style.top = '10px';
    canvas.style.right = '10px';
    canvas.style.bottom = '10px';
    const ctx = canvas.getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['false positive', 'negative', 'positive'],
            datasets: [{
                label: "results",
                data: [100000, 50000, 13000],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

/**
 * Creates the elements needed to change the parameters of the function.
 */
function createChangeFunctionParametersElements() {
    // Shows/hides fields for changing function parameters.
    let changeFunctionParametersButton = document.createElement('button');
    changeFunctionParametersButton.className = 'change-function-parameters-button';
    changeFunctionParametersButton.id = 'change-function-parameters-button';
    changeFunctionParametersButton.innerHTML = "Change function parameters";

    // The number of the function for which you want to change the parameters.
    let numberOfFunctionToChangeInput = document.createElement('input');
    numberOfFunctionToChangeInput.className = 'number-of-function-to-change-input';
    numberOfFunctionToChangeInput.id = 'number-of-function-to-change-input';
    numberOfFunctionToChangeInput.placeholder = "number of function";
    numberOfFunctionToChangeInput.classList.toggle('hide-element');

    // New parameter 'a' for function.
    let parameterAToChangeInput = document.createElement('input');
    parameterAToChangeInput.className = 'a-parameter-to-change-input';
    parameterAToChangeInput.id = 'a-parameter-to-change-input';
    parameterAToChangeInput.placeholder = "'a' parameter";
    parameterAToChangeInput.classList.toggle('hide-element');

    // New parameter 'b' for function.
    let parameterBToChangeInput = document.createElement('input');
    parameterBToChangeInput.className = 'b-parameter-to-change-input';
    parameterBToChangeInput.id = 'b-parameter-to-change-input';
    parameterBToChangeInput.placeholder = "'b' parameter";
    parameterBToChangeInput.classList.toggle('hide-element');

    // New parameter 'p' for function.
    let parameterPToChangeInput = document.createElement('input');
    parameterPToChangeInput.className = 'p-parameter-to-change-input';
    parameterPToChangeInput.id = 'p-parameter-to-change-input';
    parameterPToChangeInput.placeholder = "'p' parameter";
    parameterPToChangeInput.classList.toggle('hide-element');

    // When you click this button all parameters of function will change.
    let acceptChangesToFunctionButton = document.createElement('button');
    acceptChangesToFunctionButton.className = 'accespt-changes-to-function-button';
    acceptChangesToFunctionButton.id = 'accespt-changes-to-function-button';
    acceptChangesToFunctionButton.innerHTML = "Accept changes";
    acceptChangesToFunctionButton.classList.toggle('hide-element');

    // When you click this button all parameters of function will change randomly.
    let changeParametersOfFunctionRandomly = document.createElement('button');
    changeParametersOfFunctionRandomly.className = 'change-parameters-of-function-randomly';
    changeParametersOfFunctionRandomly.id = 'change-parameters-of-function-randomly';
    changeParametersOfFunctionRandomly.innerHTML = "Change randomly";
    changeParametersOfFunctionRandomly.classList.toggle('hide-element');

    changeFunctionParametersButton.onclick = () => {
        numberOfFunctionToChangeInput.classList.toggle('hide-element');
        parameterAToChangeInput.classList.toggle('hide-element');
        parameterBToChangeInput.classList.toggle('hide-element');
        parameterPToChangeInput.classList.toggle('hide-element');
        acceptChangesToFunctionButton.classList.toggle('hide-element');
        changeParametersOfFunctionRandomly.classList.toggle('hide-element');
    }

    document.getElementById('playground-main').appendChild(changeFunctionParametersButton);
    document.getElementById('playground-main').appendChild(numberOfFunctionToChangeInput);
    document.getElementById('playground-main').appendChild(parameterAToChangeInput);
    document.getElementById('playground-main').appendChild(parameterBToChangeInput);
    document.getElementById('playground-main').appendChild(parameterPToChangeInput);
    document.getElementById('playground-main').appendChild(acceptChangesToFunctionButton);
    document.getElementById('playground-main').appendChild(changeParametersOfFunctionRandomly);
}

/**
 * Creating a button to show items added to a filter
 */
function createShowAddedElementsButton() {
    let showAddedElementsButton = document.createElement('button');
    showAddedElementsButton.className = 'show-added-elements-button';
    showAddedElementsButton.id = 'show-added-elements-button';
    showAddedElementsButton.innerHTML = "Added elements";

    let textAreaWithListOfAddedElements = document.createElement('textarea');
    textAreaWithListOfAddedElements.className = 'text-area-with-list-of-added-elements';
    textAreaWithListOfAddedElements.id = 'text-area-with-list-of-added-elements';
    textAreaWithListOfAddedElements.classList.add('hide-element');

    showAddedElementsButton.onclick = () => textAreaWithListOfAddedElements.classList.toggle('hide-element');
    document.getElementById('playground-main').appendChild(showAddedElementsButton);
    document.getElementById('playground-main').appendChild(textAreaWithListOfAddedElements);
}

/**
 * Сheck if there is an element in the filter.
 * @param {Array} hashFunctions list of hash functions
 * @param {number} filterSize number of cells in filter
 * @param {Object} addedElementsList list of elements that were added to filter
 */
function checkElementAvailability(hashFunctions, filterSize, addedElementsList) {
    ctx = document.getElementById("canvasArrows").getContext("2d");

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

        let innerTextOfFunctionDiv = currentHashFunctionDiv.firstChild.innerHTML;
        currentHashFunctionDiv.firstChild.innerHTML = `${filterIndex}`;
        currentHashFunctionDiv.classList.add('highlighted');

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
                    currentHashFunctionDiv.firstChild.innerHTML = innerTextOfFunctionDiv;
                    currentHashFunctionDiv.classList.remove('highlighted');
                    if (cell.firstChild.innerHTML == '0') {
                        cell.classList.add('red-background');
                        setTimeout(() => {
                            cell.classList.remove('red-background');
                            ctx.clearRect(0, 0, 1650, 942);
                        }, document.getElementById('input-range-speed').value / 3);
                        wasInFilter = false;
                    } else {
                        cell.classList.add('green-background');
                        setTimeout(() => {
                            cell.classList.remove('green-background');
                            ctx.clearRect(0, 0, 1650, 942);
                        }, document.getElementById('input-range-speed').value / 3);
                    }
                }, document.getElementById('input-range-speed').value / 2);
                break;
            }
            ++indexForFilterCells;
        }
        ++indexForFunctionDivs;
    }, document.getElementById('input-range-speed').value);
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
    ctx = document.getElementById("canvasArrows").getContext("2d");

    let inputAddElement = document.getElementById('add-element-input');
    let value = inputAddElement.value;
    inputAddElement.value = '';
    let filterCells = document.getElementById('filter-array-div').childNodes;

    let indexForFunctionDivs = 0;
    let timerId = setInterval(() => {
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

            let innerTextOfFunctionDiv = currentHashFunctionDiv.firstChild.innerHTML;
            currentHashFunctionDiv.firstChild.innerHTML = `${filterIndex}`;
            currentHashFunctionDiv.classList.add('highlighted');

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
                        currentHashFunctionDiv.firstChild.innerHTML = innerTextOfFunctionDiv;
                        currentHashFunctionDiv.classList.remove('highlighted');
                        cell.firstChild.innerHTML = '1';
                        cell.classList.add('highlighted');
                        setTimeout(() => {
                            ctx.clearRect(0, 0, 1650, 942);
                        }, document.getElementById('input-range-speed').value / 3);
                    }, document.getElementById('input-range-speed').value / 2);
                    break;
                }
                ++indexForCell;
            }
            ++indexForFunctionDivs;
            if (indexForFunctionDivs == hashFunctions.length) {
                clearInterval(timerId);
            }
    }, document.getElementById('input-range-speed').value);
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
function buildListOfHashFunctions(numberOfHash, hashFunctions, filterSize) {
     let hashFunctionsList = document.getElementById('hash-functions-list-div');
     hashFunctionsList.innerHTML = "";
     // Every new hash function would be next this position.
     let hashFunctionShift = ((hashFunctionsList.clientHeight - 50 * numberOfHash) / 2);
     for (let index = 0; index < numberOfHash; ++index) {
         // Creating new hash function.
         let newHashFunction = document.createElement('div');
         newHashFunction.classList.add('hash-function-div');
         newHashFunction.style.top = hashFunctionShift + 'px';
         newHashFunction.dataToggle = "tooltip";
         let [a, b, p] = [hashFunctions[index](1)[1], hashFunctions[index](1)[2], hashFunctions[index](1)[3]];
         newHashFunction.title = `(${a}x + ${b} mod(${p})) mod(${filterSize})`;
         // Text in the cell.
         let innerTextHashFunction = document.createElement('div');
         innerTextHashFunction.className = 'hash-function-div-inner-text';
         innerTextHashFunction.innerHTML = 'k' + '<sub>' + (index + 1);
         newHashFunction.appendChild(innerTextHashFunction);
         hashFunctionsList.appendChild(newHashFunction);
         hashFunctionShift += 50;
     }
}