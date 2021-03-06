/**
 * Fill footer with elements.
 */
function fillTheFooterBloomFilter() {
    // Element in which some settings of footer are situated.
    let elementsPlaygroundFooter = document.getElementById('elements-playground-footer');

    document.getElementById('playground-footer-title').style.display = "none";

    addInputRangeForSpeedVisualization(elementsPlaygroundFooter);
    createLabelHintAboutHashFunctions(elementsPlaygroundFooter);
}

function createLabelHintAboutHashFunctions(elementsPlaygroundFooter) {
    let labelFooterHint = document.createElement('label');
    labelFooterHint.innerHTML = "When hovering over a hash function, you can see how the final value is calculated!"
    labelFooterHint.style.position = "absolute";
    labelFooterHint.style.left = "10px";
    labelFooterHint.style.top = "100px";
    labelFooterHint.style.color = "white";
    elementsPlaygroundFooter.appendChild(labelFooterHint);
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

    shellForInputRangeSpeed.innerHTML = '<i>Speed visualization:</i>';

    let subIndeciesForSpeedRange = document.createElement('div');
    subIndeciesForSpeedRange.className = 'indecies-for-speed-range';
    subIndeciesForSpeedRange.id = 'indecies-for-speed-range';
    subIndeciesForSpeedRange.innerHTML = "faster<span style='color:grey'>----------------</span>slower";

    shellForInputRangeSpeed.appendChild(inputRangeSpeedVisual);
    elementsPlaygroundFooter.appendChild(subIndeciesForSpeedRange);
    elementsPlaygroundFooter.appendChild(shellForInputRangeSpeed);
}