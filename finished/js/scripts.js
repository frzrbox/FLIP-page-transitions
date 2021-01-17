const projects = document.querySelectorAll('.project');

// Move the project images with the position of the cursor
document.addEventListener('mousemove', (e) => {
	const { clientX, clientY } = e;

	const projectImages = document.querySelectorAll('.project img');

	projectImages.forEach((image) => {
		image.style = `--mouseX: ${clientX}px; --mouseY: ${clientY}px;`;
	});
});

// Toggle project image visiblity on hover
projects.forEach((project) => {
	const projectImage = project.querySelector('img');
	const projectHeading = project.querySelector('h2');

	projectHeading.addEventListener('mousemove', (e) => {
		projectImage.setAttribute('data-visible', true);
	});

	projectHeading.addEventListener('mouseleave', () => {
		projectImage.setAttribute('data-visible', false);
	});
});

// Page Transitions
barba.init({
	debug: true,
	transitions: [
		{
			name: 'project-flip',
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

				currentVisibleImage.style.setProperty('visibility', 'hidden');

				// Assign delta values as custom properties
				nextImage.style = `--deltaX: ${deltaX}px; --deltaY: ${deltaY}px; --deltaW: ${deltaW}; --deltaH: ${deltaH};`;
			},
		},
	],
});
