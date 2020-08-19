import quotes from './quotes.js';
import backgrounds from './backgrounds.js';

function quoteNumber() {
    return Math.floor(Math.random() * quotes.length);
};

function bgNumber() {
    return Math.floor(Math.random() * backgrounds.length);
};

function largeInit() {
    // assign random numbers for quotes and background to variables
    let b = bgNumber();
    let q = quoteNumber();
    // initialize background image, colors, and first quote/author
    $('#bg-img').css('background', backgrounds[b].url);
    $('#bg-color1').css('background-color', backgrounds[b].panel);
    $('#bg-color2').css('background-color', backgrounds[b].button);
    $('#text').text(quotes[q].quote);
    $('#author').html(quotes[q].author);
    $('#quote-box').css({ 'color': backgrounds[b].font, '--border-color': backgrounds[b].border });
    
};

function largeClick() {
        let b = bgNumber();
        let q = quoteNumber();

        // first text fades out, after fade out it changes. May look better to have this happen at same time as background change
        $('#text, #author').fadeOut(500, function () {
            $('#text').text(quotes[q].quote);
            $('#author').html(quotes[q].author);
            $('#quote-box').css({ 'color': backgrounds[b].font, '--border-color': backgrounds[b].border });

            // next the background changes, need to add transition to CSS, may be necessary to pull this out and put it in a set timeout function
            $('#bg-img').css('background', backgrounds[b].url);
            $('#bg-color1').css('background-color', backgrounds[b].panel);
            $('#bg-color2').css('background-color', backgrounds[b].button);

            //finally fade in the new quote .5 seconds after the the background changes, and the new author .5 seconds after that; 1 second may be better, again may need to pull this out of the callback function
            setTimeout(function () {
                $('#text').fadeIn(500, function () {
                    $('#author').fadeIn(500);
                });
            }, 500);
        });

};

function mobileInit() {
    let b = bgNumber();
    let q = bgNumber();
    // initialize background image, colors, and first quote/author
    $('#quote-box').css('background', backgrounds[b].url);
    $('#text').text(quotes[q].quote);
    $('#author').html(quotes[q].author);
    $('#quote-box').css({ 'color': backgrounds[b].font, '--border-color': backgrounds[b].border, '--text-shadow': '4px 4px 4px black' });
};

function mobileClick() {
    // change all of the following when the button is clicked
        let b = bgNumber();
        let q = quoteNumber();

        // first text fades out, after fade out it changes. May look better to have this happen at same time as background change
        $('#text, #author').fadeOut(500, function () {
            $('#text').text(quotes[q].quote);
            $('#author').html(quotes[q].author);

            // next the background changes, need to add transition to CSS, may be necessary to pull this out and put it in a set timeout function
            $('#quote-box').css({'background': backgrounds[b].url, 'color': backgrounds[b].font, '--border-color': backgrounds[b].border});

            //finally fade in the new quote .5 seconds after the the background changes, and the new author .5 seconds after that; 1 second may be better, again may need to pull this out of the callback function
            setTimeout(function () {
                $('#text, #author').fadeIn(500);
            }, 500);
        });
};

function didItChange(currentSize) {
    let changed = false;
    let newSize = $( window ).width();
        if (currentSize > 576 && newSize > 576 || currentSize <= 576 && newSize <= 576) {
            changed = false;
        } else if (currentSize > 576 && newSize <= 576) {
            changed = "shrunk";
        } else if (currentSize <= 576 && newSize > 576) {
            changed = "grew";
        };
    return changed;
};

function sizeChange(change) {
    if (change === "grew") {
        let currentSmBg = $('#quote-box').css('background-image');
        currentSmBg = currentSmBg.concat(" 0 0 / cover no-repeat");
        let bgInfo = backgrounds.filter((elem) => {
             return elem.url === currentSmBg;
        });
        $('#bg-img').css('background', bgInfo[0].url);
        $('#quote-box').css({'background': '', '--text-shadow': '2px 2px 2px black'});
        $('#bg-color1').css('background-color', bgInfo[0].panel);
        $('#bg-color2').css('background-color', bgInfo[0].button);
    } else if (change === "shrunk") {
        let currentLaBg = $('#bg-img').css('background');
        $('#quote-box').css({'background': currentLaBg, '--text-shadow': '4px 4px 4px black'});
        $('#bg-img').css('background', '');
        $('#bg-color1, #bg-color2').css('background-color', '');
    }

};

$(document).ready(() => {
    // attach click method that has options for both a large and mobile window
    $('#new-quote').click(() => {
        if (window.matchMedia("(min-width: 576px)").matches) {
            largeClick();
        } else {
            mobileClick();
        }
    });
 
    // initialize page depending on screen width
    if (window.matchMedia("(min-width: 576px)").matches) {
        largeInit();
    } else {
        mobileInit();
    };

    // check if screen changes from large to mobile and if it does change style
    let currentSize = $( window ).width();
    $( window ).resize(() => {
        if (didItChange(currentSize) === "grew") {
            sizeChange("grew");
        } else if (didItChange(currentSize) === "shrunk") {
            sizeChange("shrunk");
        };
        currentSize = $( window ).width();
    });
});
