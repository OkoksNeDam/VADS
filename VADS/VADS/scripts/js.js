/**
 * As the data structure Bloom filter was chosen.
 * TODO: Make carousel and elements there: event on clicking on each element.
 */
document.getElementById("bloom-filter-carousel-element").onclick = function(event) {
    let elementInCarouselBloomFilter = document.getElementById("bloom-filter-carousel-element");
    if (elementInCarouselBloomFilter.hasAttribute('in-use')) {
        return;
    }
    elementInCarouselBloomFilter.setAttribute('in-use', 'bloom-filter-carousel-element');
    fillTheCap();
}

/**
 * Building an interface in the cap of playground for the user.
 */
function fillTheCap() {
    // TODO: After making a carousel change this switch.
    switch(document.getElementById("bloom-filter-carousel-element").getAttribute('in-use')) {
        case 'bloom-filter-carousel-element':
            fillTheCapBloomFilter();
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
