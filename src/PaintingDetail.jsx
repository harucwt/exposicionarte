import { createRoot } from 'react-dom/client';
import FlipCard from './FlipCard.jsx';
import { paintings } from './paintings.js';
import './painting-detail.css';

const paintingId = window.location.pathname.match(/(\d{3})\.html$/)?.[1];
const painting = paintings.find(item => item.id === paintingId);

if (!painting) {
	throw new Error(`No painting is registered for page ${window.location.pathname}.`);
}

const imageSrc = painting.image ? `./${painting.image}` : './placeholder.svg';

function PaintingDetail() {
	return (
		<>
			<a className="painting-back" href="../index.html">Volver al catálogo</a>
			<main className="painting-page">
				<header className="painting-heading">
					<p className="painting-number">Catálogo · {painting.id}</p>
					<h1>{painting.title}</h1>
				</header>

				<section className="painting-card-section" aria-label={`Tarjeta de ${painting.title}`}>
					<FlipCard
						className="painting-flip-card"
						ariaLabel={`Tarjeta de ${painting.title}. Pulsa o arrastra para ver la ficha técnica.`}
						front={
							<img
								className="painting-art"
								src={imageSrc}
								alt={painting.alt}
							/>
						}
						back={
							<div className="painting-card-back">
								<p className="card-eyebrow">Ficha técnica</p>
								<h2>{painting.title}</h2>
								<dl className="painting-facts">
									<div><dt>Artista</dt><dd>Por definir</dd></div>
									<div><dt>Fecha</dt><dd>Por definir</dd></div>
									<div><dt>Técnica</dt><dd>Por definir</dd></div>
								</dl>
								<p className="painting-card-note">La información de esta obra se añadirá más adelante.</p>
							</div>
						}
						axis="y"
						flipOnClick
						draggable
						tilt
						tiltMax={12}
						glare
						glareOpacity={0.18}
						hoverScale={1.02}
						perspective={1100}
						stiffness={170}
						damping={20}
						width={360}
						height={460}
						radius={4}
						background="#171020"
						color="#f7f1fb"
						shadow
						shadowColor="#000000"
						shadowOpacity={0.48}
					/>
					<p className="card-hint">Haz clic o arrastra la tarjeta para voltearla</p>
				</section>

				<section className="painting-map" aria-labelledby="painting-map-title">
					<header className="map-heading">
						<p className="card-eyebrow">Localización</p>
						<h2 id="painting-map-title">Ubicación en la exposición</h2>
						<p>Plano de referencia; la ubicación de esta obra está por definir.</p>
					</header>
					<figure className="map-figure">
						<img
							src="./plano-referencia.png"
							alt="Plano de demostración de la exposición con entrada, salida y nueve zonas numeradas."
						/>
						<figcaption>Imagen provisional. Se reemplazará por el plano definitivo de la exposición.</figcaption>
					</figure>
				</section>
			</main>
		</>
	);
}

createRoot(document.getElementById('painting-root')).render(<PaintingDetail />);
