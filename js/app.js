import { Countries } from "./imports/Countries.js";
let countriesData = new Countries();

function toggleTheme(theme) {
	let moon = document.querySelector("header i");
	if (theme === "light") {
		moon.classList.remove("fa-regular");
		moon.classList.add("fa-solid");
		return;
	}
	moon.classList.add("fa-regular");
	moon.classList.remove("fa-solid");
}

// Setting dark and light mode on start up
if (localStorage.getItem("theme") == null) {
	localStorage.setItem("theme", "light");
} else {
	toggleTheme(localStorage.getItem("theme"));
	document.body.className = localStorage.getItem("theme");
}

// Changing theme when user clicks on the theme__div
(function () {
	let theme__div = document.querySelector("header .right_section");
	theme__div.addEventListener("click", () => {
		let prevTheme = localStorage.getItem("theme");
		let theme = prevTheme === "dark" ? "light" : "dark";
		toggleTheme(theme);
		localStorage.setItem("theme", theme);
		document.body.className = theme;
	});
})();

// Countries functionality
// Fetch Country Data and Create the Start up countries
(async () => {
	let res = await fetch("https://restcountries.com/v2/all");
	let response = await res.json();
	countriesData.setCountries(response);
	// Put in loading here
	setTimeout(() => {
		countriesData.createStartUpCountryCards();
	}, 2000);
})();

// Toggle The Arrow on the filter div
function toggleArrow(display) {
	let arrow = document.querySelector(".filter i");
	if (display !== "none") {
		arrow.classList.remove("fa-angle-down");
		arrow.classList.add("fa-angle-up");
		return;
	}
	arrow.classList.remove("fa-angle-up");
	arrow.classList.add("fa-angle-down");
}

//  The filter functionality
(function () {
	let filter_options = document.querySelector(".filter_options");
	let filter_list_items = document.querySelectorAll(".filter_options ul li");
	let filter_div = document.querySelector(".filter");
	filter_div.addEventListener("click", () => {
		let style = getComputedStyle(filter_options);
		// Displaying filter options
		filter_options.style.display = style.display === "none" ? "block" : "none";
		toggleArrow(style.display);
	});

	// Filtering
	if (filter_list_items.length !== 0) {
		filter_list_items.forEach((e) => {
			e.addEventListener("click", () => {
				// Clear cards
				countriesData.clearExistingCards();
				filter_options.style.display = "none";
				toggleArrow("none");
				// Setup Loading Here
				setTimeout(() => {
					countriesData.filterCards(e.textContent);
				}, 2000);
			});
		});
	}
})();

// Search functionality
const createSuggestedCountry = (name) => {
	let search_options_ul = document.querySelector(".search_options ul");
	let country = document.createElement("li");
	country.textContent = name;

	// Setting click event on country suggestion
	let search_options = document.querySelector(".search_options");
	let search_input = document.querySelector(".search input");
	country.addEventListener("click", () => {
		search_options.style.display = "none";
		// Fill up input field
		search_input.value = country.textContent;
		// Create Search Results
		countriesData.createSearchResult(country.textContent);
	});

	search_options_ul.append(country);
};

const clearExistingSuggestedCountries = () => {
	let search_options_ul = document.querySelector(".search_options ul");
	let suggestedCountries = search_options_ul.querySelectorAll("li");
	suggestedCountries.forEach((suggestedCountry) => {
		search_options_ul.removeChild(suggestedCountry);
	});
};
(function () {
	let search_input = document.querySelector(".search input");
	let search_icon = document.querySelector(".search i");
	let search_options = document.querySelector(".search_options");
	search_input.addEventListener("keyup", (e) => {
		let value = search_input.value;
		// If key is enter (Submit);
		if (e.key == "Enter") {
			search_options.style.display = "none";
			countriesData.createSearchResult(value);
			return;
		}
		if (value.length === 0) {
			search_options.style.display = "none";
			countriesData.createStartUpCountryCards();
			return;
		}
		if (value.length != 0) {
			// Mobiles don't see the options except desktops
			if (window.screen.width >= 560) {
				search_options.style.display = "block";
			}
			let match = countriesData.searchCards(value);
			if (match.length == 0) {
				search_options.style.display = "none";
				return;
			}
			// Clear Existing Suggested Countries
			clearExistingSuggestedCountries();
			// Create Matching (Suggested) Countries

			match.forEach((country) => {
				createSuggestedCountry(country.name);
			});
		}
	});

	search_icon.addEventListener("click", () => {
		search_options.style.display = "none";
		countriesData.createSearchResult(search_input.value);
		return;
	});
})();
