
const countryName=new URLSearchParams(location.search).get('name')
const flagImage=document.querySelector('.country-details img')
const countryNameH1=document.querySelector('.country-details h1')
const nativeName=document.querySelector('.native-name')
const population=document.querySelector('.population')
const region=document.querySelector('.region')
const sub_region=document.querySelector('.sub-region')
const capital=document.querySelector('.captial')
const top_level_domain=document.querySelector('.top-level-domain')
const currencies=document.querySelector('.currencies')
const languagess=document.querySelector('.languages')
const borderCountries=document.querySelector('.border-country')

const themeChanger=document.querySelector('.theme-changer')
const darkMode=document.querySelector('.dark-mode')



fetch(`https://restcountries.com/v3.1/name/${countryName}?.fullText=true`)
.then((res)=>res.json())
.then(([country])=>{
    console.log(country)
    flagImage.src=country.flags.svg
    countryNameH1.innerText=country.name.common
    population.innerText=country.population.toLocaleString('en-in')
    region.innerText=country.region
    sub_region.innerText=country.subregion
    capital.innerText=country.capital[0]
    top_level_domain.innerText=country.tld.join(', ')

    if(country.name.nativeName){
        // console.log(Object.values(country.name.nativeName)[0].common)
        nativeName.innerText=Object.values(country.name.nativeName)[0].common
      }else{
        nativeName.innerText=country.name.common
    }

    if(country.currencies){
        currencies.innerText= Object.values(country.currencies).map((currency) => currency.name).join(',  ')
    }

    if(country.languages){
        languagess.innerText=Object.values(country.languages).join(', ')
    }

    if(country.borders){
        country.borders.forEach((border)=>{
            // console.log(border)
            fetch(`https://restcountries.com/v3.1/alpha/${border}`).then((res)=>res.json())
            .then(([borderCountry])=>{
                // console.log(borderCountry)

                const borderCountryTag=document.createElement('a')
                borderCountryTag.innerText=borderCountry.name.common
                borderCountryTag.href=`country.html?name=${borderCountry.name.common}`
                borderCountries.append(borderCountryTag)
            })
        })
    }
})

themeChanger.addEventListener('click',()=>{
    document.body.classList.toggle('dark')
    // darkMode.innerText='Light Mode'
})
darkMode.addEventListener('click',(e)=>{
   e?darkMode.innerText='Light Mode':darkMode.innerText="Dark Mode"

})