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
export default new Proxy(localStorage as ClikkerStorage, {
	/**
	 * Parse the stringified value before returning it.
	 */
	get(target, prop: string) {
		const value = target[prop] ?? target.getItem(prop);
		return typeof value === 'function' ? value.bind(target) : JSON.parse(value);
	},
});
