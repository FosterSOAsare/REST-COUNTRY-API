import Loading from "./loading.js";
let loading = new Loading();
export class DetailsPage {
	constructor() {
		this.cards = document.querySelectorAll(".card");
		this.details = document.querySelector(".details");
		this.home = document.querySelector(".home");
		this.bottom = document.querySelector(".details .bottom_section");
		this.backFunctionality();
	}

	setCountries(data) {
		this.countries = data;
	}
	createDetailsPage(country) {
		this.bottom.innerHTML = "";
		loading.createLoading(this.bottom);
		this.details.style.display = "block";
		setTimeout(() => {
			loading.clearLoading(this.bottom);
			let flag__container = document.querySelector(".details .bottom_section .left_section");
			let info__container = document.querySelector(".details .bottom_section .right_section");
			this.createLeftPart(country.flags.png);
			this.createRightPart(country);
		}, 500);
	}

	createLeftPart(img_src) {
		let left_section = document.createElement("div");
		left_section.classList.add("left_section");
		let flag = document.createElement("img");
		flag.src = img_src;
		left_section.append(flag);
		this.bottom.appendChild(left_section);
	}

	createRightPart(data) {
		let right = document.createElement("div");
		right.classList.add("right_section");

		let h3 = document.createElement("h3");
		// h3.textContent = this.trimText(data.name, 25);
		h3.textContent = data.name;

		let info = document.createElement("div");
		info.classList.add("info");
		let div1 = document.createElement("div");
		this.createParagraph(div1, "Native Name: ", data.nativeName);
		this.createParagraph(div1, "Population: ", data.population);
		this.createParagraph(div1, "Region: ", data.region);
		this.createParagraph(div1, "Sub Region: ", data.subregion);
		this.createParagraph(div1, "Capital: ", data.capital);
		let div2 = document.createElement("div");
		this.createParagraph(div2, "Top Level Domain: ", data.topLevelDomain[0]);
		this.createParagraph(div2, "Currencies: ", this.createStringFromArray(data.currencies, "name"));
		this.createParagraph(div2, "Languages: ", this.createStringFromArray(data.languages, "name"));

		info.append(div1, div2);

		let borders = this.createBorderCountries(data.borders);

		right.append(h3, info, borders);
		this.bottom.appendChild(right);
	}

	createParagraph(parent, p_content, span_value) {
		let p = document.createElement("p");
		let span = document.createElement("span");

		if (Array.isArray(span_value)) {
			let textContent = "";
			span_value.forEach((value) => {
				if (p_content == "Currencies:") textContent += value != "" ? " " + value.name : value.name;
				if (p_content == "Languages:") textContent += value != span_value[span_value.length - 1] ? value.name + " , " : value.name;
			});
			span.textContent = textContent;
		} else {
			span.textContent = span_value;
		}
		p.textContent = p_content;
		p.append(span);
		parent.append(p);
	}

	createBorderCountries(data) {
		let div = document.createElement("div");
		div.classList.add("border_countries");
		let p = document.createElement("p");
		p.textContent = "Border Countries:";

		if (data) {
			let borders = document.createElement("div");
			borders.classList.add("borders");
			data.filter((item, i) => i < 4).forEach((borderCountry) => {
				this.createBorderCountry(borders, borderCountry);
			});
			div.append(p, borders);
		}

		if (!data) {
			let no_border = document.createElement("div");
			no_border.classList.add("no_border");
			no_border.innerText = "Country has no borders";
			div.append(p, no_border);
		}

		return div;
	}

	createBorderCountry(parent, code) {
		let div = document.createElement("div");
		let country = this.countries.find((e) => e.alpha3Code == code);
		div.classList.add("border-country");
		div.textContent = this.trimText(country.name, 15);

		div.addEventListener("click", () => {
			this.createDetailsPage(this.countries.find((e) => e.name == country.name));
		});
		parent.appendChild(div);
	}

	trimText(text, limit) {
		return text.length > limit ? `${text.substring(0, limit)}...` : text;
	}
	backFunctionality() {
		let back = document.querySelector(".back");
		back.addEventListener("click", () => {
			this.details.style.display = "none";
			this.home.style.display = "block";
		});
	}
	createStringFromArray(array, property) {
		let string = "";
		array.forEach((e, index, array) => {
			string += e[property];
			if (index !== array.length - 1) {
				string += ", ";
			}
		});
		return string;
	}
	// The back functionality
}
