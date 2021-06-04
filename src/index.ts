import { $ } from './elements.js';
import { storage } from './storage.js';

function updateComponents() {
	$('upgrade').disabled = storage.clicks < storage.upgradeAt;
	$('toggle').disabled = storage.upgradeAt <= 800;
	$('reset').disabled = false;

	$('clicks').innerText = `\nYou have ${storage.clicks} click${storage.clicks === 1 ? '' : 's'}!`;
	$('stats').innerText = `Current clicks per click: ${storage.add}\nUpgrade at: ${storage.upgradeAt} clicks`;
	$('autoclicker').innerText = `Autoclicker${storage.upgradeAt <= 800 ? ' at: 800 clicks' : `: ${storage.autoadd} clicks`}`;
}

function click(amount: number) {
	storage.clicks += amount;
	updateComponents();
}

function updateColors() {
	document.body.style.backgroundImage = `linear-gradient(${storage.dark ? '#022, #011' : '#9c9, #9a9'})`;
	document.body.style.color = storage.dark ? 'white' : 'black';
}

function generate() {
	click(storage.add);
}

function upgrade() {
	storage.add *= 2;
	storage.upgradeAt *= 2;

	if (storage.upgradeAt > 1600) storage.autoadd *= 2;
	if (storage.upgradeAt === 1600) toggle();

	click(storage.upgradeAt / -2);
}

function toggle() {
	if (!storage.interval) return storage.interval = window.setInterval(() => click(storage.autoadd), 1000);
	clearInterval(storage.interval);
	storage.interval = null;
}

function darkmode() {
	storage.dark = !storage.dark;
	updateColors();
}

function reset() {
	const confirmed = confirm('Are you sure? This will reset all your progress!');
	if (!confirmed) return;

	const { dark } = storage;
	storage.clear();
	storage.dark = dark;

	window.location.reload();
}

window.addEventListener('load', () => {
	$('generate').addEventListener('click', generate);
	$('upgrade').addEventListener('click', upgrade);
	$('toggle').addEventListener('click', toggle);
	$('darkmode').addEventListener('click', darkmode);
	$('reset').addEventListener('click', reset);

	storage.add ??= 1;
	storage.autoadd ??= 20;
	storage.clicks ??= 0;
	storage.dark ??= false;
	storage.interval ??= null;
	storage.upgradeAt ??= 100;

	if (storage.interval) storage.interval = window.setInterval(() => click(storage.autoadd), 1000);

	if (storage.clicks) updateComponents();
	updateColors();
});
