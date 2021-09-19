const myArray = [];
const divLogo = document.querySelector('.coin-logo');
const getButton = document.querySelector('.getPVU');
const firstRow = document.querySelector('.first-row');


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
            renderData(data[0].image,data[0].name, data[0].current_price, data[0].price_change_24h, data[0].price_change_percentage_24h);
        })
    }
    

function renderData(logo, name, price, price_change, price_change_24) {
    let price_change_green = ``;
    if(price_change >= 0) {
        price_change_green = `<td class="price-change price-change-green">${price_change.toFixed(2)} %</td>` 
    } else {
        price_change_green = `<td class="price-change price-change-red">${price_change.toFixed(2)} %</td>`
    }
    firstRow.innerHTML = ` <img src="${logo}" class="logo-img">
                            <td class="coin-name">${name.replace("Token","")}</td>
                            <td>${price.toFixed(2)}</td>
                            ${price_change_green}
                            <td class="price-change">${price_change_24.toFixed(2)} %</td>
                            <tr>
                            </tr>`
}

