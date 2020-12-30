let clicks = 0,
	upgradeAt = 100,
	add = 1,
	autoadd = 20,
	interval = null,
	dark = JSON.parse(sessionStorage.dark || false);

function updateComponents() {
	const $ = id => document.getElementById(id);

	$('upgrade').disabled = clicks < upgradeAt;
	$('toggle').disabled = upgradeAt <= 800;
	$('reset').disabled = false;

	$('clicks').innerText = `\nYou have ${clicks} click${clicks === 1 ? '' : 's'}!`;
	$('stats').innerText = `Current clicks per click: ${add}\nUpgrade at: ${upgradeAt} clicks`;
	$('autoclicker').innerText = `Autoclicker${upgradeAt <= 800 ? ' at: 800 clicks' : `: ${autoadd} clicks`}`;
}

function click(amount) {
	clicks += amount;
	updateComponents();
}

function generate() {
	click(add);
}

function upgrade() {
	add *= 2;
	upgradeAt *= 2;

	if (upgradeAt > 1600) autoadd *= 2;
	if (upgradeAt === 1600) toggle();

	click(upgradeAt / -2);
}

function toggle() {
	if (!interval) return interval = setInterval(() => click(autoadd), 1000);
	clearInterval(interval);
	interval = null;
}

function darkmode(onload) {
	if (!onload) sessionStorage.dark = dark = !dark;
	document.body.style.backgroundImage = `linear-gradient(${dark ? '#022, #011' : '#9c9, #9a9'})`;
	document.body.style.color = dark ? 'white' : 'black';
}

function reset() {
	const confirmed = confirm('Are you sure? This will reset all your progress!');
	if (confirmed) window.location.reload();
}

window.onload = () => darkmode(true);
