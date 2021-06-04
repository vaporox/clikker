interface ClikkerElements {
	generate: HTMLButtonElement;
	upgrade: HTMLButtonElement;
	toggle: HTMLButtonElement;
	darkmode: HTMLButtonElement;
	reset: HTMLButtonElement;

	clicks: HTMLParagraphElement;
	stats: HTMLParagraphElement;
	autoclicker: HTMLParagraphElement;
}

export function $<T extends keyof ClikkerElements>(id: T) {
	return document.getElementById(id) as ClikkerElements[T];
}
