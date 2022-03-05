/**
 * As the data structure Bloom filter was chosen.
 */
document.getElementById("bloom-filter-carousel-element").onclick = function(event) {
    let elementInCarouselBloomFilter = document.getElementById("bloom-filter-carousel-element");
    if (elementInCarouselBloomFilter.hasAttribute('in-use')) {
        return;
    }
    elementInCarouselBloomFilter.setAttribute('in-use', 'bloom-filter-carousel-element');
    drawInterface();
}

/**
 * Building an interface in the cap of playground for the user.
 */
function drawInterface() {
    switch(document.getElementById("bloom-filter-carousel-element").getAttribute('in-use')) {
        case 'bloom-filter-carousel-element':
            fillTheHeaderBloomFilter();
            fillTheFooterBloomFilter();
            break;
    }
}

/**
 * Reset all interface in the playground.
 */
function resetPlayground() {
    document.getElementById('elements-playground-cap').innerHTML = '';
    document.getElementById('playground-main').innerHTML = '';
    document.getElementById('elements-playground-footer').innerHTML = '';
}
