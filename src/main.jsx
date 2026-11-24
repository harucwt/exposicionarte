import { createRoot } from 'react-dom/client';
import FlexCarousel from './FlexCarousel.jsx';
import LiquidEther from './LiquidEther.jsx';
import { paintings } from './paintings.js';
import './main.css';

function createPlaceholderImage() {
	const canvas = document.createElement('canvas');
	canvas.width = 320;
	canvas.height = 240;
	const context = canvas.getContext('2d');
	if (!context) throw new Error('Canvas 2D is required to create painting placeholders.');

	const background = context.createLinearGradient(0, 0, canvas.width, canvas.height);
	background.addColorStop(0, '#241638');
	background.addColorStop(0.52, '#503080');
	background.addColorStop(1, '#110c1e');
	context.fillStyle = background;
	context.fillRect(0, 0, canvas.width, canvas.height);

	context.globalAlpha = 0.62;
	context.fillStyle = '#ff9ffc';
	context.beginPath();
	context.ellipse(94, 94, 92, 48, -0.5, 0, Math.PI * 2);
	context.fill();
	context.fillStyle = '#5227ff';
	context.beginPath();
	context.ellipse(235, 164, 112, 52, -0.5, 0, Math.PI * 2);
	context.fill();
	context.globalAlpha = 1;
	context.fillStyle = 'rgba(255, 255, 255, 0.88)';
	context.font = '600 13px sans-serif';
	context.letterSpacing = '3px';
	context.textAlign = 'center';
	context.fillText('IMAGEN PENDIENTE', canvas.width / 2, canvas.height / 2 + 5);

	return canvas.toDataURL('image/png');
}

const placeholderImage = createPlaceholderImage();
const carouselPaintings = paintings.map(painting => ({
	...painting,
	src: painting.image ? `./pinturas/${painting.image}` : placeholderImage
}));

function openPainting(_index, painting) {
	if (!painting?.href) {
		throw new Error('The selected painting is missing its detail page URL.');
	}
	window.location.assign(painting.href);
}

function App() {
	return (
		<>
			<div className="ether-layer" aria-hidden="true">
				<LiquidEther
					colors={['#5227FF', '#FF9FFC', '#B497CF']}
					mouseForce={20}
					cursorSize={100}
					persistence={0.75}
					autoDemo
					autoSpeed={0.5}
					autoIntensity={2.2}
					intensity={1}
					viscosity={0}
					resolution={0.5}
					clickBurst
					bounceEdges={false}
					intro
					lightMode={false}
				/>
			</div>
			<main className="gallery-home">
				<header className="gallery-heading">
					<p className="gallery-eyebrow">Exposición de arte</p>
					<h1>Obras por descubrir</h1>
					<p className="gallery-instructions">
						Desliza para recorrer el catálogo y selecciona una pintura para abrir su ficha.
					</p>
				</header>
				<section className="gallery-carousel" aria-label="Catálogo de pinturas">
					<FlexCarousel
						items={carouselPaintings}
						preset="liquid"
						intro="rise"
						cardHeight={0.5}
						gap={12}
						squeeze={0.2}
						focusOnClick={false}
						captions
						fit="natural"
						radius={0}
						lensWidth={0.74}
						lensHeight={1.18}
						tilt={62}
						roundness={1}
						bend={0.34}
						reach={0.38}
						curl="twist"
						dispersion={0.45}
						liquid={0}
						followCursor={false}
						autoplay={false}
						interval={4}
						captureWheel
						onSelect={openPainting}
					/>
				</section>
				<p className="gallery-count">{paintings.length} pinturas en el catálogo</p>
			</main>
		</>
	);
}

createRoot(document.getElementById('root')).render(<App />);
