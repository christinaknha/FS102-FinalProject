// USER INPUT ELEMENTS
let amountToConvert = document.getElementById("amount");
let baseCurrency = document.getElementById("base-currency")
let targetCurrency = document.getElementById("target-currency");
let displayConAmount = document.getElementById("converted-amount");
let date = document.getElementById("date")

// ELEMENTS THAT NEED TO BE POPULATED
let convertedAmountDisplay = document.createElement("h3"); 
let conversionHistory = document.createElement("p") 
let ratesContainer =  document.getElementById("historical-rates-container");
let favoritesContainer = document.getElementById("favorite-currency-pairs");

// BUTTONS
let historicalRates = document.getElementById("historical-rates");
let favoriteButton = document.getElementById("save-favorite");

// ELEMENTS I MADE
let conversionRate;
let convertedAmount;
let to;
let from;
let amount;
let exchangeDate;
let historicExchangeRates;
let pairs =[];
let favoriteCombos;
let neededId;

// EVENT LISTENERS
amountToConvert.addEventListener("change",fetchExchangeRates)
baseCurrency.addEventListener("change", fetchExchangeRates)
targetCurrency.addEventListener("change", fetchExchangeRates)
historicalRates.addEventListener("click", historicalData)
favoriteButton.addEventListener("click", saveFavorite)

// FUNCTION FOR EVENT LISTENERS
function saveUserCountryInput(){
    if (baseCurrency.value != targetCurrency.value){
      from = baseCurrency.value;
      to = targetCurrency.value;
    } else if (baseCurrency.value != targetCurrency.value){
      alert ("Please make sure base currency and target currency are different")
    }
}
function saveUserAmountInput(){ 
    if(amountToConvert.value >= 0 && amountToConvert.value != String){
      amount = amountToConvert.value;
    } else {
      alert ("Please enter a number that is greater than or equal to zero.")
    }
  }
  function saveUserDateInput(){
    exchangeDate = date.value;
}

// FUNCTION DATA FOR CURRENCY EXCHANGE
function fetchExchangeRates() {

    saveUserCountryInput();
    saveUserAmountInput();

    // FETCHES EXCHANGE RATES FROM SELECTED BASE CURRENCY
    var myHeaders = new Headers();
    myHeaders.append("apikey", "NYYpZHDpOuQubkMfxPTR8iAqjNhrmOM0");

    var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
    };

    fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}`, requestOptions)
    .then((response) => response.json())
    .then((json) =>{
        
        console.log(json)
        console.log(json.info.rate)
        conversionRate = json.info.rate

        console.log(conversionRate)
        // PERFORM CURRENCY CONVERSION
        convertedAmount = amount * conversionRate
        console.log(convertedAmount)

        // DISPLAY CONVERTED AMOUNT
        convertedAmountDisplay.innerHTML = convertedAmount + " " + to
        console.log(convertedAmountDisplay)
        displayConAmount.appendChild(convertedAmountDisplay)
    })
    .catch(error => console.log('Error: Please Check Your Inputs', error));;
}

// FUNCTION FOR HISTORICAL DATA
function historicalData(){
    console.log("clicked")

    saveUserCountryInput();
    saveUserDateInput();

var myHeaders = new Headers();
myHeaders.append("apikey", "NYYpZHDpOuQubkMfxPTR8iAqjNhrmOM0");

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

fetch(`https://api.apilayer.com/exchangerates_data/${exchangeDate}?symbols=${to}&base=${from}`, requestOptions)
  .then(response => response.json())
  .then(json =>{
    console.log(json.rates[to])
    historicExchangeRates = json.rates[to]
    conversionHistory.innerHTML = `Historic exchange rate of ${to} for ${exchangeDate}: ` + historicExchangeRates
    ratesContainer.appendChild(conversionHistory)
    })
  .catch(error => console.log('error', error));

}

function saveFavorite(){

    saveUserCountryInput();

    let objectPair = [from, to]
    console.log(objectPair)
    pairs.push(objectPair)
    console.log(pairs)


      for (let i = 0; i < pairs.length; i++){
        if(!document.getElementById(i)){
          favoriteCombos = document.createElement("button");
          favoriteCombos.id = i;
          favoriteCombos.setAttribute("type", "button")
          favoriteCombos.innerHTML = pairs[i][0] +" / " + pairs[i][1]
          favoriteCombos.addEventListener("click", checkFav)
          favoritesContainer.appendChild(favoriteCombos)
        }
    }

}

// GRABS THE ID OF THE POST THAT WAS CLICKED ON
function reply_click(clicked_id){
    console.log(clicked_id)
    return(clicked_id)
}

function checkFav(a){
    neededId = reply_click(a)
    let neededIndex = neededId.target.id
    console.log(neededId.target.id)
    baseCurrency.value = pairs[neededIndex][0];;
    targetCurrency.value = pairs[neededIndex][1];

    // FETCHES EXCHANGE RATES FROM SELECTED BASE CURRENCY
    
    saveUserCountryInput();
    saveUserAmountInput();
    
    var myHeaders = new Headers();
    myHeaders.append("apikey", "NYYpZHDpOuQubkMfxPTR8iAqjNhrmOM0");

    var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
    };

    fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}`, requestOptions)
    .then((response) => response.json())
    .then((json) =>{
        
        console.log(json)
        console.log(json.info.rate)
        conversionRate = json.info.rate

        console.log(conversionRate)
        // PERFORM CURRENCY CONVERSION
        convertedAmount = amount * conversionRate
        console.log(convertedAmount)

        // DISPLAY CONVERTED AMOUNT
        convertedAmountDisplay.innerHTML = convertedAmount + " " + to
        console.log(convertedAmountDisplay)
        displayConAmount.appendChild(convertedAmountDisplay)
    })
    .catch(error => console.log('Error: Please Check Your Inputs', error));;

}