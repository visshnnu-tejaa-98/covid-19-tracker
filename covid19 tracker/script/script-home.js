alert("All the data is rendered dynamically from api with time")
let searchButton = document.getElementById("search")
let conformed = document.getElementById("conformed")
let active = document.getElementById("active")
let recovered = document.getElementById("recovered")
let deceased = document.getElementById("deceased")


async function getData(){
    let apiResponse = await fetch("https://covid-api.mmediagroup.fr/v1/cases?country=India")
    let apiData = await apiResponse.json()
    console.log(apiData)
    console.log( apiData.All.confirmed)
    conformed.innerHTML =apiData.All.confirmed
    active.innerHTML = apiData.All.confirmed - apiData.All.recovered - apiData.All.deaths
    recovered.innerHTML =apiData.All.recovered
    deceased.innerHTML =apiData.All.deaths
    
    Object.keys(apiData).forEach(function(key) {
        console.log(key, apiData[key]);
        console.log(key, apiData[key].All);
        let tr = document.createElement("tr")
        tr.innerHTML = `
        <th scope="row" class="table-data">${key}</th>
            <td class="text-danger table-data">${apiData[key].confirmed}</td>
            <td class="text-primary table-data">${Number(apiData[key].confirmed)-Number(apiData[key].recovered)-Number(apiData[key].deaths)}</td>
            <td class="text-success table-data">${apiData[key].recovered}</td>
            <td class="text-secondary table-data">${apiData[key].deaths}</td>
        `
        tbody.appendChild(tr)
    });
}
getData()
