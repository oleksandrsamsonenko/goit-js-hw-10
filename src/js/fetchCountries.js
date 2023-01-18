const inputField = document.querySelector(`#search-box`);

export function getData() {
  return fetch(
    `https://restcountries.com/v3.1/name/${inputField.value.trim()}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  });
}
