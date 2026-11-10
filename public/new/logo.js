/* The menu-bar logo comes to life: on the first page of a visit, and on any reload, the claw's outline is drawn and filled,
   the letters slide in, and the claw snaps once; after that it snaps whenever the logo is hovered.
   Loaded in <head> so the logo is hidden before it first shows, never flashing in and out. */
(() => {
	const root = document.documentElement;
	const still = location.search.includes('snap') || matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (still) return;
	// The first page of a visit, and any reload; not when moving on to another page (owner's choice)
	let seen = false;
	try { seen = sessionStorage.getItem('crabionics-logo') === '1'; sessionStorage.setItem('crabionics-logo', '1'); } catch (e) {}
	const nav = performance.getEntriesByType && performance.getEntriesByType('navigation')[0];
	const reload = nav ? nav.type === 'reload' : (performance.navigation && performance.navigation.type === 1);
	const intro = !seen || reload;

	const css = `
.nav .brand .claw .lj { fill-opacity: 1; }
html.logo-wait .nav .brand { visibility: hidden; }
.nav .brand.logo-in .claw .lj { fill-opacity: 0; animation: logo-fill .6s 1.1s forwards; }
.nav .brand .claw .logo-line { fill: none; stroke-width: 1.6; stroke-dasharray: 1; stroke-dashoffset: 1; stroke-opacity: 0; }
.nav .brand.logo-in .claw .logo-line { stroke-opacity: 1; animation: logo-draw 1.3s cubic-bezier(.6, 0, .3, 1) forwards, logo-fadeline .5s 1.5s forwards; }
.nav .brand .logo-l { display: inline-block; }
.nav .brand.logo-in .logo-l { opacity: 0; transform: translateX(-.25em); animation: logo-letter .5s calc(1.25s + var(--n) * 55ms) cubic-bezier(.2, .7, .2, 1) forwards; }
@keyframes logo-draw { to { stroke-dashoffset: 0; } }
@keyframes logo-fadeline { to { stroke-opacity: 0; } }
@keyframes logo-fill { to { fill-opacity: 1; } }
@keyframes logo-letter { to { opacity: 1; transform: none; } }`;
	const style = document.createElement('style');
	style.textContent = css;
	document.head.appendChild(style);
	if (intro) root.classList.add('logo-wait');
	// Never leave the logo hidden, whatever happens below
	const reveal = () => root.classList.remove('logo-wait');
	setTimeout(reveal, 2500);

	function setup() {
		const brand = document.querySelector('.nav .brand');
		const svg = brand && brand.querySelector('.claw');
		if (!svg) return reveal();
		const d = svg.querySelector('path').getAttribute('d');
		const NS = 'http://www.w3.org/2000/svg';
		const id = 'logo' + Math.random().toString(36).slice(2, 7);
		// Two jaws that turn about the hinge on the left; a disc covers the hinge while they open
		svg.innerHTML = `<defs><clipPath id="${id}u"><rect x="0" y="0" width="100" height="51"/></clipPath><clipPath id="${id}l"><rect x="0" y="51" width="100" height="60"/></clipPath></defs>
<g class="up"><path class="lj" clip-path="url(#${id}u)" d="${d}"/></g><g class="lo"><path class="lj" clip-path="url(#${id}l)" d="${d}"/></g><circle class="lj" cx="21" cy="51" r="15"/>`;
		const up = svg.querySelector('.up'), lo = svg.querySelector('.lo');

		let running = false;
		const snap = () => {
			if (running) return;
			running = true;
			const t0 = performance.now(), D = 900;
			const ease = t => 1 - Math.pow(1 - t, 3);
			const frame = now => {
				const t = Math.min(1, (now - t0) / D);
				let a;   // open over 40%, hold, then snap shut with a small overshoot
				if (t < .4) a = ease(t / .4);
				else if (t < .55) a = 1;
				else { const s = (t - .55) / .45; a = s < .35 ? 1 - s / .35 : -.12 * Math.sin((s - .35) / .65 * Math.PI); }
				up.setAttribute('transform', `rotate(${-13 * a} 21 51)`);
				lo.setAttribute('transform', `rotate(${6 * a} 21 51)`);
				if (t < 1) requestAnimationFrame(frame);
				else { up.removeAttribute('transform'); lo.removeAttribute('transform'); running = false; }
			};
			requestAnimationFrame(frame);
		};
		brand.addEventListener('mouseenter', snap);

		if (intro) {
			const line = document.createElementNS(NS, 'path');
			line.setAttribute('d', d);
			line.setAttribute('class', 'logo-line');
			line.setAttribute('pathLength', '1');
			line.style.stroke = getComputedStyle(svg).fill;   // the outline in the claw's own colour, on dark or light menus
			svg.appendChild(line);
			const word = brand.querySelector('span');
			if (word) {
				word.innerHTML = [...word.textContent].map((ch, n) => `<span class="logo-l" style="--n:${n}">${ch}</span>`).join('');
			}
			brand.classList.add('logo-in');
			reveal();
			setTimeout(snap, 2300);   // once the last letter has landed
			setTimeout(() => { brand.classList.remove('logo-in'); line.remove(); }, 3300);
		}
	}

	// Start only once the page is on screen and its font has loaded (at most a second's wait),
	// so a slow load or a background tab doesn't play the letters before anyone sees them
	function whenShown() {
		if (document.hidden) {
			document.addEventListener('visibilitychange', whenShown, { once: true });
			return;
		}
		const fonts = document.fonts ? document.fonts.ready : Promise.resolve();
		Promise.race([fonts, new Promise(r => setTimeout(r, 1000))])
			.then(() => {
				let done = false;
				const go = () => { if (!done) { done = true; setup(); } };
				requestAnimationFrame(() => requestAnimationFrame(go));
				setTimeout(go, 120);   // in case frames are paused
			});
	}
	if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', whenShown);
	else whenShown();
})();
