import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

const inputField = document.querySelector(`#search-box`);
const countryList = document.querySelector(`.country-list`);
const countryInfo = document.querySelector(`.country-info`);
inputField.addEventListener(`input`, debounce(handleInput, DEBOUNCE_DELAY));

function handleInput() {
  fetchCountries()
    .then(data => {
      console.log(data);
      if (data.length === 1) {
        const markup = data
          .map(element => {
            return `<li class="result"><p class="country-name"><img class="country-flag" src="${
              element.flags.png
            }" width="100px" alt="${element.name.official} flag"/>  ${
              element.name.official
            }</p>
  <p class="country-capital">Capital: <span>${element.capital}</span></p>
  <p class="country-population">Population: <span>${
    element.population
  }</span></p>
  <p class="country-lagnuages">Languages: <span>${Object.values(
    element.languages
          })
          .join('');
        countryInfo.innerHTML = markup;
        countryList.innerHTML = '';
      } else if (data.length >= 2 && data.length <= 10) {
        const markup = data
          .map(element => {
            return `<li class="list-element"><img
              class="country-flag"
              src="${element.flags.png}"
              width="100px"
              alt="${element.name.official}  flag"/>
            <p class="country-name">${element.name.official}</p></li>`;
          })
          .join('');
        console.log(markup);
        countryList.innerHTML = markup;
        countryInfo.innerHTML = '';
      } else if (data.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';
      }
    })
    .catch(err => {
      if (inputField.value.length > 0) {
        Notify.failure(`Oops, there is no country with that name`);
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';
      } else countryList.innerHTML = '';
      countryInfo.innerHTML = '';
    });
}
