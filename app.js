import Ajax from './js/ajax';

window.addEventListener('load', () => {
    const xhr = new Ajax();
    const div = document.getElementById('output');
    div.style.fontSize = '35px';
    xhr.get('https://talaikis.com/api/quotes/')
    .then(data => JSON.parse(data))
    .then(quotesArray => {
        const [firstQuote, secondQuote] = quotesArray;
        const isFirst = confirm("Press OK to choose the first quote and cancel to choose second");
        return {
            isFirst,
            firstQuote,
            secondQuote
        };
    })
    .then(data => {
        const { isFirst, firstQuote, secondQuote } = data;
        const order = isFirst ? 1 : 2;
        const quote = order === 1 ? firstQuote.quote : secondQuote.quote;
        div.innerHTML = `Quote #${order}: ${quote}`;
    })
    .catch(error => {
        div.innerHTML = error;
        div.style.color = red;
    });
});