const countryLists = document.querySelector(".country-list");
const filterByRegion = document.querySelector(".filter-by-region");
const search_container=document.querySelector('.search-container')

const themeChanger=document.querySelector('.theme-changer')

let allCountriesData;


fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data)=>{
    
    renderCountries(data)
    allCountriesData=data
  });


filterByRegion.addEventListener("change", (event) => {
  fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
    .then((res) => res.json())
    .then(renderCountries);
});

function renderCountries(data) {
  countryLists.innerHTML = "";
  data.forEach((country) => {
    // console.log(country)

    const countrycard = document.createElement("a");
    countrycard.classList.add("country-cards");
    countrycard.href = `/country.html?name=${country.name.common}`;

    countrycard.innerHTML = `
      
        <img src="${country.flags.svg}" alt="">
                    <div class="card-text">
                        <h3 class="card-title">${country.name.common}</h3>
                        <p><b>Population: </b>${country.population.toLocaleString(
                          "en-IN"
                        )}</p>
                        <p><b>Region : </b>${country.region}</p>
                        <p><b>Capital : </b>${country.capital[0]}</p>
                    </div>
      `;
    countryLists.append(countrycard);
  });
}

// search container function
search_container.addEventListener('input',(e)=>{

  allCountriesData.filter((country)=>{
    let filteredCountry=country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
    renderCountries(filteredCountry)
   
  })
})


themeChanger.addEventListener('click',()=>{
  document.body.classList.toggle('dark')
})
