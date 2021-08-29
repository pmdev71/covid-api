const Selector = document.getElementById('selector');
// load all country name using api
const loadCountryName = () => {
    fetch('https://api.covid19api.com/countries')
    .then(res => res.json())
    .then(data => viewCountry(data));
}
// push all country name and value under select tag as option tag
viewCountry = (data) => {
    //console.log(data);
    for(country of data){
        const option = document.createElement('option');
        option.value = `${country.Country}`;
        option.innerText = `${country.Country}`;
        Selector.appendChild(option); 
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