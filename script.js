const myArray = [];
const divLogo = document.querySelector('.coin-logo');
const getButton = document.querySelector('.getPVU');
const firstRow = document.querySelector('.main-table');

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

getPvuPrice();

function getPvuPrice() {

    const options = {
        'method': 'GET',
        headers: {
            'accept': 'application/json'
        }
    }

    const coinsID = ['bitcoin', 'zcoin', 'cardano', 'dogecoin', 'litecoin','stellar', 'solana', 'plant-vs-undead-token', 'smooth-love-potion', 'binancecoin'];

    let requests = coinsID.map(id => fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${id}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h`))

    Promise.all(requests)
        .then(responses => {
            for(let response of responses) {
                console.log(`${response.url}: ${response.status}`);
            }
            return responses;
        })
        .then(responses => Promise.all(responses.map(r => r.json())))
        .then(id => {for(let i = 0; i < id.length; i++) {
                        for(let j = 0; j < id[i].length; j++) {
                            renderData(id[i][j].image, id[i][j].name, id[i][j].current_price, id[i][j].price_change_24h, id[i][j].price_change_percentage_24h )
                        }
        }})
}


function renderData(logo, name, price, price_change, price_change_24) {

    let price_change_green = ``;
    let price_change_green_24h = ``;

    if (price_change >= 0) {
        price_change_green = `<td class="price-change price-change-green">${price_change.toFixed(2)} USD</td>`
        price_change_green_24h = `<td class="price-change price-change-green">${price_change_24.toFixed(2)} %</td>`
    } else {
        price_change_green = `<td class="price-change price-change-red">${price_change.toFixed(2)} USD</td>`
        price_change_green_24h = `<td class="price-change price-change-red">${price_change_24.toFixed(2)} %</td>`
    }


    firstRow.innerHTML += ` 
                            <td><img src="${logo}" class="logo-img"></td>
                            <td class="coin-name">${name.replace("Token","")}</td>
                            <td>${price.toFixed(2)}</td>
                            ${price_change_green}
                            ${price_change_green_24h}
                            `


}
