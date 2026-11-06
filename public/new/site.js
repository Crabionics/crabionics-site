// Shared by the inner pages: the nav and footer, the operating loop, and the homepage's motion.
(() => {
	const snap = location.search.includes('snap');   // test mode: no easing, for still screenshots
	if (snap) document.documentElement.classList.add('snap');
	const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
	const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
	const page = document.body.dataset.page || '';

	const CLAW = '<svg class="claw" viewBox="4 8 86 88" aria-hidden="true"><path d="M88 36C81 15 57 5 36 11C12 18 3 43 7 63C11 83 31 95 52 93C67 92 80 81 84 64C77 70 69 73 62 72L60 64L53 70C41 67 34 54 38 42C42 31 53 27 62 29L62 37L70 31C76 32 82 34 88 36Z"/></svg>';
	const ARROW = '<span class="arrow">↗</span>';

	// Which top-level section each page belongs to
	const section = {
		system: 'system', solutions: 'system', habitat: 'system', crabsense: 'system', crabpod: 'system',
		producers: 'producers', aquaos: 'aquaos', demo: 'aquaos', 'early-access': 'aquaos',
		validation: 'validation', resources: 'resources', guide: 'resources',
		company: 'company', investors: 'company'
	}[page];
	const top = [
		['system', '/system', 'Technology'],
		['producers', '/producers', 'Producers'],
		['aquaos', '/aquaos', 'AquaOS'],
		['validation', '/validation', 'Research'],
		['resources', '/resources', 'Resources'],
		['company', '/company', 'Company']
	];
	const cur = key => key === section ? ' aria-current="page"' : '';

	document.body.insertAdjacentHTML('afterbegin', `
<a class="skip" href="#main-content">Skip to content</a>
<header class="nav" id="nav">
	<a class="brand" href="/" aria-label="Crabionics home">${CLAW}<span aria-hidden="true">RABIONICS</span></a>
	<nav class="nav-links" aria-label="Main">${top.map(([k, h, t]) => `<a href="${h}"${cur(k)}>${t}</a>`).join('')}</nav>
	<div class="nav-end">
		<a class="nav-cta" href="/contact#production">Discuss a project ${ARROW}</a>
		<button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Menu"><i></i></button>
	</div>
</header>
<nav class="menu" id="menu" aria-label="Mobile">
	${top.map(([k, h, t]) => `<a href="${h}"${cur(k)}>${t}<span class="arrow">↗</span></a>`).join('')}
	<div class="menu-sub">
		<a href="/solutions/habitat">Habitat</a><a href="/solutions/crabsense">CrabSense</a>
		<a href="/solutions/crabpod">CrabPod</a><a href="/solutions">All solutions</a>
		<a href="/demo">Product film</a><a href="/early-access">Early access</a>
		<a href="/investors">Investors</a><a href="/contact">Contact</a>
	</div>
	<div class="actions"><a class="btn primary" href="/contact#production">Discuss a project ${ARROW}</a></div>
</nav>`);

	document.body.insertAdjacentHTML('beforeend', `
<footer data-tone="deep">
	<div class="foot-grid">
		<div>
			<a class="brand" href="/" aria-label="Crabionics home">${CLAW}<span aria-hidden="true">RABIONICS</span></a>
			<p>Mud-crab aquaculture, connected. Developing the physical environment and operating tools around the people doing the work.</p>
		</div>
		<div class="foot-col">
			<span class="mono">Explore</span>
			<a href="/solutions">Solutions</a>
			<a href="/producers">Producers</a>
			<a href="/aquaos">AquaOS</a>
			<a href="/demo">Product film</a>
			<a href="/early-access">Early access</a>
			<a href="/system">How it connects</a>
			<a href="/validation">Research &amp; validation</a>
			<a href="/resources">Resources</a>
		</div>
		<div class="foot-col">
			<span class="mono">Company</span>
			<a href="/company">People &amp; company</a>
			<a href="/investors">Investors</a>
			<a href="/contact">Discuss a partnership</a>
			<a href="mailto:info@crabionics.com">info@crabionics.com</a>
			<a href="https://www.linkedin.com/company/crabionics-aquaculture-private-limited/">Follow company updates ↗</a>
		</div>
	</div>
	<div class="foot-end">
		<span>© 2026 Crabionics Aquaculture Pvt. Ltd.</span>
		<div><a href="/privacy">Privacy</a><a href="/terms">Terms</a></div>
	</div>
</footer>`);

	const nav = document.getElementById('nav');
	const menuBtn = nav.querySelector('.menu-btn');
	const setMenu = open => {
		document.documentElement.classList.toggle('menu-open', open);
		menuBtn.setAttribute('aria-expanded', open);
		document.body.style.overflow = open ? 'hidden' : '';
	};
	menuBtn.addEventListener('click', () => setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'));
	document.getElementById('menu').addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
	addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

	// The operating loop: Habitat → CrabSense → AquaOS → CrabPod, and back to observing what changed
	document.querySelectorAll('.loop').forEach(el => {
		const here = el.dataset.here;
		const nodes = [
			['habitat', '/solutions/habitat', 'Habitat', 'Habitat & water environment', 'n1'],
			['crabsense', '/solutions/crabsense', 'CrabSense', 'Observe conditions', 'n2'],
			['aquaos', '/aquaos', 'AquaOS', 'Operating context & history', 'n3'],
			['crabpod', '/solutions/crabpod', 'CrabPod', 'Permitted equipment response', 'n4']
		];
		const id = 'loopGrad' + Math.random().toString(36).slice(2, 7);
		el.innerHTML = `
<svg class="ring" viewBox="0 0 100 100" aria-hidden="true">
	<defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6ce1da"/><stop offset="1" stop-color="#2a7fd4"/></linearGradient></defs>
	<circle class="ring-track" cx="50" cy="50" r="41"/>
	<circle class="ring-flow" cx="50" cy="50" r="41" pathLength="1000" transform="rotate(-90 50 50)" stroke="url(#${id})"/>
</svg>
${nodes.map(([k, h, t, d, c], i) => `<a class="node ${c}${k === here ? ' here' : ''}" href="${h}"${k === here ? ' aria-current="page"' : ''}><small>0${i + 1}</small><b>${t}</b><span>${d}</span></a>`).join('')}
<div class="core"><strong>Operator / defined rules</strong><span>Review the context, then decide the permitted next action.</span></div>`;
		el.querySelector('.ring-flow').style.stroke = `url(#${id})`;
	});

	// Tabs (Technology): one part at a time; a link like /system/#water opens that part
	document.querySelectorAll('.layers').forEach(box => {
		const tabs = [...box.querySelectorAll('[role="tab"]')];
		const show = (tab, focus) => {
			tabs.forEach(t => {
				const on = t === tab;
				t.setAttribute('aria-selected', on);
				t.tabIndex = on ? 0 : -1;
				document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
			});
			if (focus) tab.focus();
		};
		tabs.forEach((t, i) => {
			t.addEventListener('click', () => show(t));
			t.addEventListener('keydown', e => {
				const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
				if (step) { e.preventDefault(); show(tabs[(i + step + tabs.length) % tabs.length], true); }
			});
		});
		const fromHash = () => {
			const t = tabs.find(t => '#' + t.getAttribute('aria-controls') === location.hash);
			if (!t) return;
			show(t);
			// on phones every part is shown and the browser's own jump works; on desktop bring the tabs into view
			if (getComputedStyle(t.parentElement).display !== 'none') box.scrollIntoView();
		};
		show(tabs[0]);
		fromHash();
		addEventListener('hashchange', fromHash);
	});

	// Headings marked .rise split into lines at each <br>, and each line rises in turn
	document.querySelectorAll('h2.rise, h3.rise').forEach(h => {
		h.innerHTML = h.innerHTML.split(/<br\s*\/?>/i).map((l, i) => `<span class="rise-line"><span style="--d:${i * 120}">${l.trim()}</span></span>`).join('');
	});

	// Film plays only when asked, from the live site
	document.querySelectorAll('.film-play').forEach(btn => btn.addEventListener('click', () => {
		const video = document.createElement('video');
		video.src = 'https://www.crabionics.com/product/film/crabdesk-v2-desktop.mp4';
		video.controls = true;
		video.playsInline = true;
		video.autoplay = true;
		btn.parentElement.replaceChildren(video);
	}));

	// Forms in this preview don't send anything; on the live site live.js sends them instead
	if (!window.crabLive) {
		document.querySelectorAll('form.form').forEach(f => f.addEventListener('submit', e => {
			e.preventDefault();
			f.classList.add('sent');
			f.querySelector('.form-done')?.focus?.();
		}));
		document.getElementById('confirm-interest')?.addEventListener('click', () => {
			document.getElementById('confirm-status').textContent = 'Preview only: confirmation works on the live site.';
		});
	}

	// Contact topics pick the form's subject; links like /contact/#market land on it
	const topicSel = document.querySelector('select[name="topic"]');
	if (topicSel) {
		const links = [...document.querySelectorAll('.topics a')];
		const pick = hash => {
			const a = links.find(l => l.hash === hash);
			if (!a) return;
			links.forEach(l => l.classList.toggle('on', l === a));
			topicSel.value = a.dataset.topic;
		};
		links.forEach(a => a.addEventListener('click', () => pick(a.hash)));
		topicSel.addEventListener('change', () => links.forEach(l => l.classList.toggle('on', l.dataset.topic === topicSel.value)));
		if (location.hash) { pick(location.hash); addEventListener('load', () => document.getElementById('enquiry')?.scrollIntoView()); }
	}

	// Scroll-driven bits: nav tone, steps filling, pictures drifting, current tab and contents link
	const toned = [...document.querySelectorAll('[data-tone="deep"]')];
	const steps = [...document.querySelectorAll('.steps')];
	const scenes = [...document.querySelectorAll('.scene > img')];
	const spy = [...document.querySelectorAll('.subnav, .toc')].map(box => {
		const links = [...box.querySelectorAll('a[href^="#"]')];
		return { links, targets: links.map(a => document.getElementById(a.hash.slice(1))) };
	});
	const readBar = document.querySelector('.read-bar');
	const article = document.querySelector('.prose');

	function onScroll() {
		const y = scrollY, vh = innerHeight;
		nav.classList.toggle('solid', y > 30);
		const probe = nav.offsetHeight / 2;
		nav.classList.toggle('on-deep', toned.some(s => { const r = s.getBoundingClientRect(); return r.top <= probe && r.bottom > probe; }));
		steps.forEach(s => {
			const r = s.getBoundingClientRect();
			const vertical = getComputedStyle(s).gridTemplateColumns.split(' ').length === 1;
			const f = snap ? 1 : vertical ? clamp((vh * .7 - r.top) / r.height) : clamp((vh * .85 - r.top) / (vh * .35));
			s.style.setProperty('--fill', f.toFixed(3));
			const items = [...s.children];
			items.forEach((c, i) => c.classList.toggle('on', f >= (vertical ? i / items.length : i / (items.length - 1)) - .001));
		});
		if (!reduced) scenes.forEach(img => {
			const r = img.parentElement.getBoundingClientRect();
			img.style.transform = `translateY(${-12 * clamp((vh - r.top) / (vh + r.height))}%)`;
		});
		spy.forEach(({ links, targets }) => {
			let on = -1;
			targets.forEach((t, i) => { if (t && t.getBoundingClientRect().top < vh * .35) on = i; });
			links.forEach((a, i) => a.classList.toggle('on', i === on));
		});
		if (readBar && article) {
			const r = article.getBoundingClientRect();
			readBar.style.setProperty('--read', clamp((vh * .3 - r.top) / (r.height - vh * .5)).toFixed(3));
		}
	}
	addEventListener('scroll', onScroll, { passive: true });
	addEventListener('resize', onScroll);
	onScroll();

	// Reveal on scroll position, so nothing can stay hidden if the browser skips an observer callback
	if (!reduced && !snap) {
		let waiting = [...document.querySelectorAll('.rise, .stagger, .fade-up, .unclip')].filter(el => el.getBoundingClientRect().top > innerHeight * .92);
		waiting.forEach(el => {
			el.classList.add('wait');
			if (el.classList.contains('stagger')) [...el.children].forEach((c, i) => c.style.setProperty('--i', i));
		});
		const reveal = () => {
			waiting = waiting.filter(el => {
				if (el.getBoundingClientRect().top > innerHeight * .88) return true;
				el.classList.add('in');
				setTimeout(() => el.classList.remove('wait'), 1800);
				return false;
			});
			if (!waiting.length) removeEventListener('scroll', reveal);
		};
		addEventListener('scroll', reveal, { passive: true });
		reveal();
	}

	document.querySelectorAll('.glow').forEach(el => el.addEventListener('pointermove', e => {
		const r = el.getBoundingClientRect();
		el.style.setProperty('--gx', (e.clientX - r.left) + 'px');
		el.style.setProperty('--gy', (e.clientY - r.top) + 'px');
	}));
})();
