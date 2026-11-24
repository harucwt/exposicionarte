const PLACEHOLDER_IMAGE = 'placeholder.svg';

export const paintings = Array.from({ length: 30 }, (_, index) => {
	const id = String(index + 1).padStart(3, '0');
	const image = PLACEHOLDER_IMAGE;

	return {
		id,
		title: `Pintura ${id}`,
		subtitle: 'Imagen pendiente',
		alt: `Imagen provisional de Pintura ${id}`,
		image: null,
		src: `./pinturas/${image}`,
		href: `./pinturas/${id}.html`
	};
});
