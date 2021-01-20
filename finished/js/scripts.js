// All non-barba code will go in here
function initializeScripts() {
	document.addEventListener('mousemove', ({ clientX, clientY }) => {
		document.body.style = `--x: ${clientX}px; --y: ${clientY}px;`;
	});
}

initializeScripts();

// Page Transitions
barba.use(barbaPrefetch);

barba.init({
	debug: true,
	transitions: [
		{
			name: 'projectFlip',
			from: {
				route: '/',
			},
			to: {
				namespace: ['project'],
			},
			async enter({ current, next }) {
				const currentVisibleImage = current.container.querySelector(
					'.project-image'
				);

				currentVisibleImage.style.visibility = 'hidden';

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
			after() {
				// Re-initialize all scripts once the transition is finished
				initializeScripts();
			},
		},
	],
});
