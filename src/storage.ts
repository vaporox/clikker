/**
 * Used for easier interaction with the local storage.
 */
export default new Proxy(localStorage, {
	/**
	 * Parse the stringified value before returning it.
	 */
	get(target, prop: string) {
		const value = target[prop] ?? target.getItem(prop);
		return typeof value === 'function' ? value.bind(target) : JSON.parse(value);
	},
});

/**
 * Declare all the values needed for Clikker.
 */
declare global {
	interface Storage {
		add: number;
		autoadd: number;
		clicks: number;
		dark: boolean;
		interval: number;
		upgradeAt: number;
	}
}
