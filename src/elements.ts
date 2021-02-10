/**
 * List of all elements used on the website.
 */
interface Elements {
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
export default function $<T extends keyof Elements>(id: T) {
	return document.getElementById(id) as Elements[T];
}
