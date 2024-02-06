export default class Country {
    constructor(country) {
        this.countryData = country;
        this.responses = this.getResponses();
    }

    get flag() {
        return this.countryData.flag;
    }

    getResponses() {
        const countryNames = this.countryData.translations;
        const translations = new Set();

        Object.values(countryNames).forEach((country) => {
            translations.add(country.common.toLowerCase());
        });

        //console.log(translations);

        return translations;
    }

    isValid(countryName) {
        const name = countryName.toLowerCase();
        let toReturn = false;
        if (this.responses.has(name)) toReturn = true;

        return toReturn;
    }

    renderFlag() {
        const flagEl = document.querySelector("#flag");
        const h1 = document.createElement("h1");
        h1.textContent = this.flag;
        flagEl.innerHTML = "";
        flagEl.insertAdjacentElement("afterbegin", h1);
    }
}
