import $ from './elements';
import storage from './storage';

/**
 * Update all components.
 */
function updateComponents() {
	$('upgrade').disabled = storage.clicks < storage.upgradeAt;
	$('toggle').disabled = storage.upgradeAt <= 800;
	$('reset').disabled = false;

	$('clicks').innerText = `\nYou have ${storage.clicks} click${storage.clicks === 1 ? '' : 's'}!`;
	$('stats').innerText = `Current clicks per click: ${storage.add}\nUpgrade at: ${storage.upgradeAt} clicks`;
	$('autoclicker').innerText = `Autoclicker${storage.upgradeAt <= 800 ? ' at: 800 clicks' : `: ${storage.autoadd} clicks`}`;
}

/**
 * Add a specific amount to the click counter.
 * @param amount - The amount of clicks that should be added
 */
function click(amount: number) {
	storage.clicks += amount;
	updateComponents();
}

/**
 * Update all colors.
 */
function updateColors() {
	document.body.style.backgroundImage = `linear-gradient(${storage.dark ? '#022, #011' : '#9c9, #9a9'})`;
	document.body.style.color = storage.dark ? 'white' : 'black';
}

/**
 * Generate the clicks that you get by pressing the button.
 */
function generate() {
	click(storage.add);
}

/**
 * Apply an upgrade and remove the needed clicks from the click counter.
 */
function upgrade() {
	storage.add *= 2;
	storage.upgradeAt *= 2;

	if (storage.upgradeAt > 1600) storage.autoadd *= 2;
	if (storage.upgradeAt === 1600) toggle();

	click(storage.upgradeAt / -2);
}

/**
 * Enable or disable the autoclicker.
 */
function toggle() {
	if (!storage.interval) return storage.interval = window.setInterval(() => click(storage.autoadd), 1000);
	clearInterval(storage.interval);
	storage.interval = null;
}

/**
 * Enable or disable dark mode.
 */
function darkmode() {
	storage.dark = !storage.dark;
	updateColors();
}

/**
 * Reset the game and reload the page.
 */
function reset() {
	const confirmed = confirm('Are you sure? This will reset all your progress!');
	if (!confirmed) return;

	const { dark } = storage;
	storage.clear();
	storage.dark = dark;

	window.location.reload();
}

/**
 * Initialize the game when loading the page.
 */
window.onload = () => {
	$('generate').onclick = generate;
	$('upgrade').onclick = upgrade;
	$('toggle').onclick = toggle;
	$('darkmode').onclick = darkmode;
	$('reset').onclick = reset;

	storage.add ??= 1;
	storage.autoadd ??= 20;
	storage.clicks ??= 0;
	storage.dark ??= false;
	storage.interval ??= null;
	storage.upgradeAt ??= 100;

	if (storage.interval) storage.interval = window.setInterval(() => click(storage.autoadd), 1000);

	if (storage.clicks) updateComponents();
	updateColors();
};
