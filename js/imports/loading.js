class Loading {
	constructor() {}
	createLoading(parent) {
		let loading__container = document.createElement("div");
		loading__container.className = "loading__container";
		let loading = document.createElement("div");
		loading.className = "loading";
		loading__container.appendChild(loading);
		parent.appendChild(loading__container);
	}
	clearLoading(parent) {
		let loading__container = parent.querySelector(".loading__container");
		parent.removeChild(loading__container);
	}
}

export default Loading;
