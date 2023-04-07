import { DetailsPage } from "./Details.js";
import Loading from "./loading.js";
let detailsPage = new DetailsPage();
let loading = new Loading();
export class Countries {
	countries = [];
	constructor() {
		this.output_container = document.querySelector(".output__items");
		this.output = document.querySelector(".output__items .output");
	}

	setCountries(data) {
		this.countries = data;
		detailsPage.setCountries(data);
	}

	getCountries() {
		return this.countries;
	}

	createCountryCardParagraphs(card_bottom, paragraph_text, span_text) {
		let paragraph_p = document.createElement("p");
		paragraph_p.textContent = paragraph_text;
		let paragraph_span = document.createElement("span");
		paragraph_span.textContent = span_text;
		paragraph_p.appendChild(paragraph_span);
		card_bottom.append(paragraph_p);
	}
	// Create country card
	createCountryCard(img_src, name, population, region, capital) {
		let card = document.createElement("div");
		card.classList.add("card");

		let card_top = document.createElement("div");
		card_top.classList.add("card_top");
		let card_image = document.createElement("img");
		card_image.setAttribute("src", img_src);
		card_top.append(card_image);

		let card_bottom = document.createElement("div");
		card_bottom.classList.add("card_bottom");
		let name_h3 = document.createElement("h3");
		name_h3.textContent = name;

		card_bottom.append(name_h3);
		this.createCountryCardParagraphs(card_bottom, "Population : ", population);
		this.createCountryCardParagraphs(card_bottom, "Region : ", region);
		this.createCountryCardParagraphs(card_bottom, "Capital : ", capital);
		card.append(card_top, card_bottom);

		card.addEventListener("click", () => {
			detailsPage.createDetailsPage(this.countries.find((e) => e.name == name));
		});
		this.output.append(card);
	}

	// This is used as the start up
	createStartUpCountryCards() {
		this.output.innerHTML = "";
		let arr = [];
		let countries = this.getCountries();
		// Limit to random 30 countries
		for (let i = 0; i < 29; i++) {
			let rand = this.createDistictRandomCountry(arr, countries);
			let country = countries[rand];
			this.createCountryCard(country.flag, country.name, country.population, country.region, country.capital);
		}
	}

	clearExistingCards() {
		// Remove all pre-existing cards in the output
		this.output.innerHTML = "";
		let card = document.querySelectorAll(".card");
		card.forEach((e) => {
			this.output.removeChild(e);
		});
		let text = document.querySelector(".output .text");
		if (text != undefined) {
			this.output.removeChild(text);
		}
	}

	createDistictRandomCountry(randArr, arr) {
		let rand = Math.floor(Math.random() * arr.length);
		if (randArr.includes(arr)) {
			return this.createDistictRandomCountry(randArr, arr);
		}
		randArr.push(rand);
		return rand;
	}

	filterCards(continent) {
		continent = continent == "America" ? "Americas" : continent;
		let matchedCountries = this.countries.filter((e) => {
			return e.region == continent;
		});
		matchedCountries.forEach((country) => {
			this.createCountryCard(country.flag, country.name, country.population, country.region, country.capital);
		});
	}

	searchCards(name) {
		return this.countries.filter((e) => e.name.toLowerCase().startsWith(name.toLowerCase()));
	}

	createSearchResult(countryName) {
		this.clearExistingCards();
		this.setMainPageLoad();
		// Setup loading
		setTimeout(() => {
			let country = this.countries.find((e) => e.name.toLowerCase() === countryName.toLowerCase());
			this.removeMainPageLoad();
			if (!country) {
				this.createNotFound();
				return;
			}
			this.createCountryCard(country.flag, country.name, country.population, country.region, country.capital);
		}, 500);
	}

	createNotFound() {
		let text = document.createElement("h1");
		text.classList.add("text");
		text.textContent = "No country matches your search";
		this.output.appendChild(text);
	}
	setMainPageLoad() {
		loading.createLoading(this.output_container);
	}
	removeMainPageLoad() {
		loading.clearLoading(this.output_container);
	}
}
