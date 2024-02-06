import Country from "./Country";

export default class Game {
    #score = 0;
    constructor(allCountries) {
        this.countries = allCountries;
        this.countryIndex = 0;
        this.currentCountry = new Country(this.countries[this.countryIndex]);
        this.currentCountry.renderFlag();
    }

    get score() {
        return this.#score;
    }

    addPoint() {
        this.#score++;
    }

    isOver() {
        let toReturn = false;
        if (this.countryIndex >= this.countries.length-1) toReturn = true;
        return toReturn;
    }

    nextCountry() {
        if (!this.isOver()) {
            this.countryIndex++;
            this.currentCountry = new Country(this.countries[this.countryIndex]);
            this.currentCountry.renderFlag();
        }
    }
}
