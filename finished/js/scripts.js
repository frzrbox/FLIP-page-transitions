// Move the project image with the position of the cursor
const projectImage = document.querySelector('.project-image');

document.addEventListener('mousemove', (e) => {
	const { clientX, clientY } = e;

	projectImage.style = `--mouseX: ${clientX}px; --mouseY: ${clientY}px;`;
});

// Toggle project image visiblity on hover
const projectLink = document.querySelector('.project-link');

projectLink.addEventListener('mousemove', () => {
	projectImage.setAttribute('data-visible', true);
});

projectLink.addEventListener('mouseleave', () => {
	projectImage.setAttribute('data-visible', false);
});

// Page Transitions
barba.init({
	debug: true,
	transitions: [
		{
			from: {
				route: '/',
			},
			to: {
				namespace: ['project'],
			},
			enter({ current, next }) {
				const currentVisibleImage = current.container.querySelector(
					'.project img[data-visible="true"]'
				);
				const nextImage = next.container.querySelector('img');

				const currentBounds = currentVisibleImage.getBoundingClientRect();
				const nextBounds = nextImage.getBoundingClientRect();

				// Calculate the distsance between the two elements
				const deltaX = currentBounds.left - nextBounds.left;
				const deltaY = currentBounds.top - nextBounds.top;
				const deltaW = currentBounds.width / nextBounds.width;
				const deltaH = currentBounds.height / nextBounds.height;

				// Assign delta values as custom properties
				nextImage.style = `--deltaX: ${deltaX}px; --deltaY: ${deltaY}px; --deltaW: ${deltaW}; --deltaH: ${deltaH};`;
			},
		},
	],
});
