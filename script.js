const myArray = [];
const coinLogo = document.querySelector('.coin-logo');
const getButton = document.querySelector('.getPVU');

fetch('https://api.coingecko.com/api/v3/coins/list', {
        'method': 'GET'
    }, {
        'headers': {
            'accept': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => {
        myArray.push(data);
    })


function checkPvu() {
    for (let i = 0; i < myArray.length; i++) {
        for (let j = 0; j < myArray[i].length; j++) {
            if (myArray[i][j].symbol === 'pvu') {
                console.log(`${myArray[i][j].name}, ${myArray[i][j].symbol}, ${myArray[i][j].id}`)
            }
        }
    }
}


getButton.addEventListener('click', getPvuPrice);

function getPvuPrice() {
    const options = {'method': 'GET', headers: {'accept': 'application/json'}}

        const id = 'plant-vs-undead-token'
        const vs_currency = 'usd';

        fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${vs_currency}&ids=${id}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h`, options)
        .then(res => res.json())
        .then(data => {
            renderData(data[0].name);
        })
    }
    

function renderData(name) {
    coinName.textContent = name;
}

