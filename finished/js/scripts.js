const projects = document.querySelectorAll('.project');

// Move the project images with the position of the cursor
document.addEventListener('mousemove', (e) => {
	const { clientX, clientY } = e;

	const projectImages = document.querySelectorAll('.project img');

	projectImages.forEach((image) => {
		image.style = `--x: ${clientX}px; --y: ${clientY}px;`;
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
				console.log(currentVisibleImage);
				const nextImage = next.container.querySelector('img');
				const currentBounds = currentVisibleImage.getBoundingClientRect();
				const nextBounds = nextImage.getBoundingClientRect();
				// Calculate the distsance between the two elements
				const deltaX = currentBounds.left - nextBounds.left;
				const deltaY = currentBounds.top - nextBounds.top;
				const deltaW = currentBounds.width / nextBounds.width;
				const deltaH = currentBounds.height / nextBounds.height;
				// Animate FLIP transition using Web Animaitons API
				// Example from https://css-tricks.com/animating-layouts-with-the-flip-technique/

				currentVisibleImage.style.opacity = 0;

				nextImage.animate(
					[
						{
							transformOrigin: 'top left',
							transform: `
									translate(${deltaX}px, ${deltaY}px)
									scale(${deltaW}, ${deltaH})
								`,
						},
						{
							transformOrigin: 'top left',
							transform: `
									translate(0, 0)
									scale(1)
							   `,
						},
					],
					{
						duration: 1000,
						easing: 'cubic-bezier(0.2, 0, 0.2, 1)',
						fill: 'both',
					}
				);
			},
		},
	],
});
