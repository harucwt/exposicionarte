import { access, mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { paintings } from '../src/paintings.js';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const pagesDirectory = resolve(projectRoot, 'pinturas');

function escapeHtml(value) {
	return String(value).replace(/[&<>"']/g, character => ({
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#39;'
	})[character]);
}

async function pageExists(path) {
	try {
		await access(path);
		return true;
	} catch (error) {
		if (error.code === 'ENOENT') return false;
		throw error;
	}
}

function legacyPageTemplate(painting, image) {
	const title = escapeHtml(painting.title);
	const alt = escapeHtml(painting.alt);
	const pageImage = escapeHtml(image);
	return `<!doctype html>
<html lang="es">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
	<meta name="theme-color" content="#090711">
	<meta name="description" content="Ficha de catálogo: ${title}.">
	<title>${title} | Exposición de Arte</title>
	<link rel="stylesheet" href="./detalle.css">
</head>
<body>
	<a class="painting-back" href="../index.html">Volver al catálogo</a>
	<main class="painting-detail">
		<div class="painting-image">
			<img src="./${pageImage}" alt="${alt}">
		</div>
		<section class="painting-info" aria-labelledby="painting-title">
			<p class="painting-number">Catálogo · ${painting.id}</p>
			<h1 id="painting-title">${title}</h1>
			<p class="painting-placeholder">La imagen y la ficha de esta pintura se añadirán más adelante.</p>
		</section>
	</main>
</body>
</html>
`;
}

function pageTemplate(painting) {
	const title = escapeHtml(painting.title);
	return `<!doctype html>
<html lang="es">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
	<meta name="theme-color" content="#090711">
	<meta name="description" content="Ficha de catálogo: ${title}.">
	<title>${title} | Exposición de Arte</title>
	<link rel="stylesheet" href="../painting-detail.bundle.css">
</head>
<body>
	<div id="painting-root"></div>
	<script defer src="../painting-detail.bundle.js"></script>
</body>
</html>
`;
}

export async function generatePaintingPages() {
	await mkdir(pagesDirectory, { recursive: true });
	const seenIds = new Set();
	let generated = 0;
	let migrated = 0;

	for (const painting of paintings) {
		if (!/^\d{3}$/.test(painting.id) || seenIds.has(painting.id)) {
			throw new Error(`Invalid or duplicate painting ID: ${painting.id}`);
		}
		const image = painting.image || 'placeholder.svg';
		if (!/^[\w.-]+$/.test(image)) {
			throw new Error(`Invalid image filename for painting ${painting.id}`);
		}
		seenIds.add(painting.id);

		const pagePath = resolve(pagesDirectory, `${painting.id}.html`);
		const page = pageTemplate(painting);
		if (await pageExists(pagePath)) {
			const existingPage = await readFile(pagePath, 'utf8');
			if (existingPage === legacyPageTemplate(painting, image)) {
				await writeFile(pagePath, page, { encoding: 'utf8' });
				migrated++;
			}
			continue;
		}

		await writeFile(pagePath, page, { encoding: 'utf8', flag: 'wx' });
		generated++;
	}

	console.log(`Generated ${generated} new painting pages and migrated ${migrated} legacy pages.`);
}
