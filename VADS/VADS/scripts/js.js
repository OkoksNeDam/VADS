/**
 * As the data structure Bloom filter was chosen.
 */
document.getElementById("bloom-filter-carousel-element").onclick = function() {
    document.getElementById('bloom-filter-description').style.display = "block";
    document.getElementById("bloom-filter-carousel-element").style.border = "1px solid white";
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