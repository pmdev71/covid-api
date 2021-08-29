const Selector = document.getElementById('selector');
// load all country name using api
const loadCountryName = () => {
    fetch('https://api.covid19api.com/summary')
    .then(res => res.json())
    .then(data => viewCountry(data.Countries, data.Global));
}
// push all country name and value under select tag as option tag and make table
viewCountry = (countrys, globaldata) => {
    console.log(globaldata);
    const globalSummary = document.getElementById('global-summary');
    const div = document.createElement('div');
    div.innerHTML =`<h3> New Confirmed  : ${globaldata.NewConfirmed} </h3>
                    <h4> New Death  : ${globaldata.NewDeaths} </h4>
                    <h4> Total Confirmed  : ${globaldata.TotalConfirmed} </h4>
                    <h4> Total Death  : ${globaldata.TotalDeaths} </h4>
                    <h4> Date  : ${globaldata.Date}`;
    globalSummary.appendChild(div);
    //console.log(data);
    for(country of countrys){
        const option = document.createElement('option');
        const tableBody = document.getElementById('table-body');
        const tr = document.createElement('tr');

        option.value = `${country.Country}`;
        option.innerText = `${country.Country}`;
        Selector.appendChild(option);

        tr.innerHTML = `<th scope="row">${country.Country}</th>
                        <td>${country.TotalConfirmed}</td>
                        <td>${country.TotalDeaths}</td>
                        <td>${country.TotalRecovered}</td>`;               
        tableBody.appendChild(tr); 
    } 
};
loadCountryName();

// btn click event listener 
const Btn = document.getElementById('btn');
Btn.addEventListener('click',function(event){
            loadCovid(Selector.value);
});

//load covid info using api, country name from delector value property
const loadCovid = (countryName) => {
    const api = `https://api.covid19api.com/live/country/${countryName}`;
    fetch(api)
    .then(res => res.json())
    .then(data => displayData(data, data.length));
};

// display covid info by selected country name
const displayData = (data, length) =>{
    const updateSection = document.getElementById('update-section');
    updateSection.textContent = '';
    //console.log(data[length-1]);
    const dataToday = (data[length-1]);
    const div = document.createElement('div');
    div.innerHTML = `<h3> Country  : ${dataToday.Country} </h3>
                    <h4> Active  : ${dataToday.Active} </h4>
                    <h4> Confirmed  : ${dataToday.Confirmed} </h4>
                    <h4> Death  : ${dataToday.Deaths} </h4>
                    <h4> Date  : ${dataToday.Date} </h4>`;
    updateSection.appendChild(div);
};
