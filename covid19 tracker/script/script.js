let searchCountry = document.getElementById("searchCountry")
let searchButton = document.getElementById("searchButton")
let tbody = document.getElementById("tbody")
let conformed = document.getElementById("conformed")
let active = document.getElementById("active")
let recovered = document.getElementById("recovered")
let deceased = document.getElementById("deceased")

console.log(searchCountry)
console.log(searchButton)
console.log(tbody)

async function getData(){
    try{
        let apiResponse = await fetch(`https://covid-api.mmediagroup.fr/v1/cases?country`)
        let apiData = await apiResponse.json()
        console.log(apiData)
        console.log(apiData.All)
        let conformedSum = 0
        let recoveredSum = 0
        let deceasedSum = 0
        let activeSum = 0
        Object.keys(apiData).forEach(function(key) {
            console.log(key, apiData[key]);
            conformedSum = conformedSum + apiData[key].All.confirmed
            recoveredSum = recoveredSum + apiData[key].All.recovered
            deceasedSum = deceasedSum + apiData[key].All.deaths
            activeSum = activeSum + ( apiData[key].All.confirmed - apiData[key].All.recovered - apiData[key].All.deaths)
            let tr = document.createElement("tr")
            tr.innerHTML = `
            <th scope="row" class="table-data">${key}</th>
                <td class="text-danger table-data">${apiData[key].All.confirmed}</td>
                <td class="text-primary table-data">${Number(apiData[key].All.confirmed)-Number(apiData[key].All.recovered)-Number(apiData[key].All.deaths)}</td>
                <td class="text-success table-data">${apiData[key].All.recovered}</td>
                <td class="text-secondary table-data">${apiData[key].All.deaths}</td>
            `
            tbody.appendChild(tr)
        });

        console.log(conformedSum,recoveredSum,deceasedSum)
        conformed.innerHTML = conformedSum
        recovered.innerHTML = recoveredSum
        deceased.innerHTML = deceasedSum
        active.innerHTML = activeSum
    }catch(err){
        console.log(err)
    }
}
getData()

