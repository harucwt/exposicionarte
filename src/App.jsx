import React from 'react';
import AeroShards from './AeroShards.jsx';

export default function App() {
	return (
		<main className="shard-background" aria-label="Fondo animado de la exposición">
			<AeroShards
				shardColor="#896ABD"
				accentColor="#A855F7"
				placement="full"
				material="glass"
				markers="plus"
				count={1300}
				depthOfField={0.75}
				vignette={0.3}
				mouseInteraction
				pulseOnClick
				holdToGather
			/>
		</main>
	);
}
