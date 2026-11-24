import { createRoot } from 'react-dom/client';
import LiquidEther from './LiquidEther.jsx';
import './main.css';

function App() {
	return (
		<main className="exhibition-background" aria-label="Fondo animado de la exposición">
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
		</main>
	);
}

createRoot(document.getElementById('root')).render(<App />);
