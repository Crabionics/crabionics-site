// Live behaviour, loaded only when these pages are served from crabionics-site (see scripts/export-to-site.py):
// the two forms send through the site's real API, journey counts and Vercel analytics as on the old site.
// It runs before site.js, which then leaves the forms to this file.
window.crabLive = true;
document.addEventListener('DOMContentLoaded', () => {
	const noTrack = navigator.doNotTrack === '1' || navigator.globalPrivacyControl;
	const path = location.pathname.replace(/\/$/, '') || '/';

	// Journey counts (/api/funnel): the same pages, events and sources as the old JourneyMetrics component
	const pages = { '/': 'home', '/producers': 'producers', '/aquaos': 'aquaos', '/demo': 'demo', '/early-access': 'early-access', '/contact': 'contact', '/resources': 'resources' };
	let source = 'direct';
	try {
		const saved = sessionStorage.getItem('crabionics:source');
		const campaign = new URLSearchParams(location.search).get('utm_source')?.toLowerCase();
		const host = document.referrer ? new URL(document.referrer).hostname : '';
		source = saved && ['direct', 'youtube', 'linkedin', 'other'].includes(saved) ? saved
			: campaign === 'youtube' || /(^|\.)youtube\.com$|(^|\.)youtu\.be$/.test(host) ? 'youtube'
			: campaign === 'linkedin' || /(^|\.)linkedin\.com$/.test(host) ? 'linkedin'
			: host && host !== location.hostname ? 'other' : 'direct';
		sessionStorage.setItem('crabionics:source', source);
	} catch { source = 'direct'; }
	const journey = (event, page = pages[path]) => {
		if (noTrack || !page) return;
		navigator.sendBeacon('/api/funnel', new Blob([JSON.stringify({ event, page, source })], { type: 'application/json' }));
	};
	journey('view');
	document.addEventListener('click', e => {
		const href = e.target.closest?.('a')?.getAttribute('href') || '';
		if (['/early-access', '/contact', '/aquaos', '/demo'].some(r => href.startsWith(r))) journey('journey_click');
	});

	// Vercel Web Analytics and Speed Insights, with query strings and fragments removed, and nothing sent under Do Not Track
	// Only on Vercel: the scripts don't exist on a local dev server
	const local = /^(localhost|127\.0\.0\.1|0\.0\.0\.0|\[::1\]|192\.168\.)/.test(location.hostname);
	if (!noTrack && !local) {
		const clean = event => { try { const u = new URL(event.url); u.search = ''; u.hash = ''; return { ...event, url: u.toString() }; } catch { return null; } };
		window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
		window.va('beforeSend', clean);
		window.si = window.si || function () { (window.siq = window.siq || []).push(arguments); };
		window.si('beforeSend', clean);
		for (const [src, extra] of [['/_vercel/insights/script.js', {}], ['/_vercel/speed-insights/script.js', { sampleRate: '0.25' }]]) {
			const s = document.createElement('script');
			s.defer = true;
			s.src = src;
			Object.assign(s.dataset, extra);
			document.head.appendChild(s);
		}
	}

	const post = async (url, body) => {
		const response = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
		let payload = {};
		try { payload = await response.json(); } catch { /* keep empty */ }
		return { ok: response.ok, payload };
	};
	const value = (form, name) => (form.elements[name]?.value || '').trim();
	const say = (form, text, kind) => {
		const box = form.querySelector('.form-done');
		box.innerHTML = text;
		box.classList.toggle('is-error', kind === 'error');
		form.classList.add('sent');
		box.focus?.();
	};

	// Contact: /api/enquiry emails the team and sends the person an acknowledgement; nothing is stored
	const enquiry = document.querySelector('form[aria-label="Partnership enquiry"]');
	if (enquiry) enquiry.addEventListener('submit', async e => {
		e.preventDefault();
		if (!enquiry.reportValidity()) return;
		journey('form_attempt');
		const data = { topic: value(enquiry, 'topic'), name: value(enquiry, 'name'), email: value(enquiry, 'email'), organisation: value(enquiry, 'organisation'), region: value(enquiry, 'region'), role: value(enquiry, 'role'), message: value(enquiry, 'message'), website: value(enquiry, 'website') };
		const mail = `mailto:info@crabionics.com?subject=${encodeURIComponent('Website enquiry')}&body=${encodeURIComponent(`Name: ${data.name}\nOrganisation: ${data.organisation}\nRegion: ${data.region}\nRole: ${data.role}\n\n${data.message}`)}`;
		const button = enquiry.querySelector('button[type="submit"]');
		button.disabled = true;
		try {
			const { ok, payload } = await post('/api/enquiry', data);
			if (ok && payload.sent === true) {
				journey('enquiry_sent');
				say(enquiry, `Thank you. Your enquiry has been sent to the team.${payload.acknowledgement ? ' A confirmation is on its way to your email.' : ''}`);
				enquiry.querySelectorAll('input, select, textarea').forEach(el => { el.disabled = true; });
				return;
			}
			say(enquiry, `${payload.error || 'The enquiry could not be sent.'} <a href="${mail}">Send it by email instead</a>.`, 'error');
		} catch {
			say(enquiry, `The connection failed. Please try again, or <a href="${mail}">send it by email</a>.`, 'error');
		}
		button.disabled = false;
	});

	// Early access: /api/early-access stores a pending registration and emails a seven-day confirmation link
	const access = document.querySelector('form[aria-label="Early-access interest"]');
	if (access) access.addEventListener('submit', async e => {
		e.preventDefault();
		if (!access.reportValidity()) return;
		journey('form_attempt');
		const data = { name: value(access, 'name'), email: value(access, 'email'), role: value(access, 'role'), region: value(access, 'region'), interest: value(access, 'interest'), setting: value(access, 'setting'), updates: !!access.elements.updates?.checked, consent: !!access.elements.consent?.checked, website: value(access, 'website') };
		const button = access.querySelector('button[type="submit"]');
		button.disabled = true;
		try {
			const { ok, payload } = await post('/api/early-access', data);
			if (ok && payload.verificationRequested) {
				journey('verification_requested');
				say(access, 'Check your inbox to confirm. If confirmation is needed, an email with a seven-day link is on its way. Already confirmed? Your interest remains registered.');
				access.querySelectorAll('input, select, textarea').forEach(el => { el.disabled = true; });
				return;
			}
			say(access, `${payload.error || 'We could not complete this request.'} <a href="mailto:info@crabionics.com?subject=AquaOS%20early-access%20interest">Email info@crabionics.com instead</a>.`, 'error');
		} catch {
			say(access, 'The connection failed. Please try again, or email <a href="mailto:info@crabionics.com">info@crabionics.com</a>.', 'error');
		}
		button.disabled = false;
	});

	// Email confirmation link: /early-access/confirm?token=…
	const confirmBtn = document.getElementById('confirm-interest');
	if (confirmBtn) {
		const token = new URLSearchParams(location.search).get('token') || '';
		const status = document.getElementById('confirm-status');
		if (!/^[a-f0-9]{64}$/.test(token)) {
			confirmBtn.hidden = true;
			status.textContent = 'This link is incomplete. Please use the link in your confirmation email.';
		}
		confirmBtn.addEventListener('click', async () => {
			confirmBtn.disabled = true;
			confirmBtn.firstChild.textContent = 'Confirming… ';
			try {
				const { ok, payload } = await post('/api/early-access', { token });
				if (ok && payload.confirmed) {
					journey('confirmed', 'early-access');
					confirmBtn.firstChild.textContent = 'Interest confirmed ';
					status.textContent = 'Your interest is registered. The team will discuss a suitable next step; trial timing is agreed individually.';
					return;
				}
				status.textContent = payload.error || 'Please try again.';
			} catch {
				status.textContent = 'Connection failed. Please try again.';
			}
			confirmBtn.disabled = false;
			confirmBtn.firstChild.textContent = 'Confirm my early-access interest ';
		});
	}
});
