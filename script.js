const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const buttonTwitter = document.getElementById('twitter');
const buttonNewQuote = document.getElementById('new-quote');
const loader = document.querySelector('.loader');

function showLoaderSpinner(isLoading) {
    if (isLoading) {
        loader.hidden = false;
        quoteContainer.hidden = true;
    } else {
        loader.hidden = true;
        quoteContainer.hidden = false;
    }
}

function setQuoteText(el, text) {
    el.innerText = text;
    // Reduce font-size for long quotes
    text.length > 120 ? el.classList.add('-long') : el.classList.remove('-long');
}

function setQuoteAuthor(el, text) {
    el.innerText = text;
    // If author is blank, add 'Unknown'
    el.innerText = text ? text : 'Unknown';
}

async function getQuoteFromAPI() {
    showLoaderSpinner(true);
    const proxyUrl = 'https://pure-wildwood-80652.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        setQuoteText(quoteText, data.quoteText);
        setQuoteAuthor(quoteAuthor, data.quoteAuthor);
        showLoaderSpinner(false);
    } catch(error) {
        // Run getQuote again if there is "Unexpected token ' in JSON" error:
        getQuoteFromAPI();
        console.error('[ERROR]', error);
    }
}

function tweetQuote() {
    const quote = quoteText.innerText;
    const author = quoteAuthor.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

// Event listeners
buttonNewQuote.addEventListener('click', getQuoteFromAPI);
buttonTwitter.addEventListener('click', tweetQuote);

getQuoteFromAPI();
