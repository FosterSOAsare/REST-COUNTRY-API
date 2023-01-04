export class DetailsPage {
	constructor() {
		this.cards = document.querySelectorAll(".card");
		this.details = document.querySelector(".details");
		this.home = document.querySelector(".home");
		this.backFunctionality();
	}

	setCountries(data) {
		this.countries = data;
	}
	createDetailsPage(country) {
		let flag__container = document.querySelector(".details .bottom_section .left_section");
		let info__container = document.querySelector(".details .bottom_section .right_section");
		this.createLeftPart(flag__container, country.flags.png);
		this.createRightPart(info__container, country);
		this.details.style.display = "block";
	}

	createLeftPart(parent, img_src) {
		let flag = document.createElement("img");
		let prevImg = parent.querySelector("img");
		if (prevImg) parent.removeChild(prevImg);
		flag.src = img_src;
		parent.append(flag);
	}

	createRightPart(parent, data) {
		let h3 = document.createElement("h3");
		h3.textContent = this.trimText(data.name, 25);

		let info = document.createElement("div");
		info.classList.add("info");
		let div1 = document.createElement("div");
		this.createParagraph(div1, "Native Name:", data.nativeName);
		this.createParagraph(div1, "Population:", data.population);
		this.createParagraph(div1, "Region", data.region);
		this.createParagraph(div1, "Sub Region:", data.subregion);
		this.createParagraph(div1, "Capital:", data.capital);
		let div2 = document.createElement("div");
		this.createParagraph(div2, "Top Level Domain:", data.topLevelDomain[0]);
		this.createParagraph(div2, "Currencies:", data.currencies);
		this.createParagraph(div2, "Languages:", data.languages);

		let prevInfo = parent.querySelector(".info");
		if (prevInfo) {
			parent.removeChild(prevInfo);
		}

		info.append(div1, div2);
		let prevBorders = parent.querySelector(".border_countries");
		if (prevBorders) {
			parent.removeChild(prevBorders);
		}

		let prevH3 = parent.querySelector("h3");
		if (prevH3) {
			parent.removeChild(prevH3);
		}
		let borders = this.createBorderCountries(data.borders);

		parent.append(h3, info, borders);
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

		let borders = document.createElement("div");
		borders.classList.add("borders");

		data &&
			data.forEach((borderCountry) => {
				this.createBorderCountry(borders, borderCountry);
			});
		div.append(p, borders);
		return div;
	}

	createBorderCountry(parent, code) {
		let div = document.createElement("div");
		let country = this.countries.find((e) => e.alpha3Code == code);
		div.textContent = country.name;

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
	// The back functionality
}
