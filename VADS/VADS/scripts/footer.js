/**
 * Fill footer with elements.
 */
function fillTheFooterBloomFilter() {
    // Element in which some settings of footer are situated.
    let elementsPlaygroundFooter = document.getElementById('elements-playground-footer');

    addInputRangeForSpeedVisualization(elementsPlaygroundFooter);
}

/**
 * Adding the input range that can regulate speed of visualization.
 * @param {HTMLDivElement} elementsPlaygroundFooter element in which some settings of footer are situated
 */
function addInputRangeForSpeedVisualization(elementsPlaygroundFooter) {
    let shellForInputRangeSpeed = document.createElement('div');
    shellForInputRangeSpeed.className = 'shell-input-range-speed';
    shellForInputRangeSpeed.id = 'shell-input-range-speed';

    let inputRangeSpeedVisual = document.createElement('input');
    inputRangeSpeedVisual.className = 'input-range-speed';
    inputRangeSpeedVisual.id = 'input-range-speed';
    inputRangeSpeedVisual.type = 'range';
    inputRangeSpeedVisual.min = "500";
    inputRangeSpeedVisual.max = "3000";
    inputRangeSpeedVisual.step = "any";

    shellForInputRangeSpeed.innerHTML = 'Speed visualization';

    shellForInputRangeSpeed.appendChild(inputRangeSpeedVisual);
    elementsPlaygroundFooter.appendChild(shellForInputRangeSpeed);
}