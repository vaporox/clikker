/**
 * List of all elements used on the website.
 */
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

/**
 * Get the element with the specified ID.
 * @param id - The ID of the element
 */
export function $<T extends keyof ClikkerElements>(id: T) {
	return document.getElementById(id) as ClikkerElements[T];
}
