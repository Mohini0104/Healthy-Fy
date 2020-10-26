
// Selecting all the elements----------------------------------
const country_name_element = document.querySelector(".country .name");
const total_cases_element = document.querySelector(".total_cases .value");
const new_cases_element = document.querySelector(".total_cases .new_value");
const recovered_element = document.querySelector(".recovered .value");
const new_recoverd_element = document.querySelector(".recovered .new_value");
const deaths_element = document.querySelector(".deaths .value");
const new_deaths_element = document.querySelector(".deaths .new_value");



// App variable to store data----------------------------------
let cases_list =[];
let app_data =[];
let  recovered_list=[];
let  death_list=[];
let  deaths=[];

// Get users country code-------------------------------------
let country_code = geoplugin_countryCode(); 
let users_country;
countrylist.forEach(country => {
    if(country.code== country_code){
        users_country =country.name;
    }
    
});
// API KEY----------------------------------------------------

function fetchData(users_country){

    fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php?=${users_country}", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
            "x-rapidapi-key": "33f33870bdmshd30a3d262be7e18p1dd57ajsn8b798fbbe783"
        }
    })
    .then(response => {
        return response.json()
    })
    .then(data => {
        dates =Object.keys(data);
        // console.log(data);
        dates.forEach(date=>{
            let DATA = data[date];
            app_data.push(DATA);
            
            cases_list.push(DATA[1].cases);
            recovered_list.push(DATA[1].total_recovered);
            death_list.push(DATA[1].deaths);



        
        })
    })

    .then( () =>{
        updateUI();
    })
    .catch(Error=>{
        alert(Error);
    })
       
    
}

fetchData(users_country);

// UPDATE UI FUNCTION--------------------------------------
function updateUI(){
    updateStats();
    axesLinearCharts();
}
function updateStats(){
    before_last_entry = app_data[app_data.length-1];
    let last_entry =app_data[app_data.length-2];
    country_name_element.innerHTML = last_entry[1].country_name;
    total_cases_element.innerHTML = last_entry[1].cases ||0;
    new_cases_element.innerHTML=`+ ${last_entry[1].new_cases}`;
    recovered_element.innerHTML =last_entry[1].total_recovered;
    new_recoverd_element.innerHTML = last_entry.recovered_element - before_last_entry.recovered_element;
    deaths_element.innerHTML = last_entry[1].deaths;
    new_deaths_element.innerHTML =`+${last_entry[1].new_deaths}`;


}
// update charts-----------------------------------------------

const ctx = document.getElementById("axes_linear_chart").getContext("2d");
let labels = ['total_cases_element','recovered_cases_element','deaths_element'];
let colorHex =['#FB3640','#EFCA08','#43AA8B']
let my_chart;
function axesLinearCharts(){
    my_chart = new Chart(ctx, {
        type: 'line',
        data:{
            datasets :[{
                labels:'Cases',
                data:total_cases_element

            }],

            labels:dates
        },
        options:{
            responsive : true,
            maintainAspectRatio: false
        }
    });

   
}





