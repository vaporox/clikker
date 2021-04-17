/**
 * List of all variables used on the website.
 */
interface ClikkerStorage extends Storage {
	add: number;
	autoadd: number;
	clicks: number;
	dark: boolean;
	interval: number | null;
	upgradeAt: number;
}

/**
 * Used for easier interaction with the local storage.
 */
export const storage = new Proxy(localStorage as ClikkerStorage, {
	/**
	 * Parse the stringified value before returning it.
	 * @param target - The local storage
	 * @param prop - The property that should be returned
	 */
	get(target, prop: string) {
		const value = target[prop] ?? target.getItem(prop);
		return typeof value === 'function' ? value.bind(target) : JSON.parse(value);
	},
});
