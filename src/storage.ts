interface ClikkerStorage extends Storage {
	add: number;
	autoadd: number;
	clicks: number;
	dark: boolean;
	interval: number | null;
	upgradeAt: number;
}

export const storage = new Proxy(localStorage as ClikkerStorage, {
	get(target, prop: string) {
		const value = target[prop] ?? target.getItem(prop);
		return typeof value === 'function' ? value.bind(target) : JSON.parse(value);
	},
});
