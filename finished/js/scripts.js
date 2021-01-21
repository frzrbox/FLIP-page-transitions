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
	transitions: [
		{
			name: 'project',
			from: {
				route: '/',
			},
			to: {
				namespace: ['project'],
			},
			enter: ({ current, next }) => {
				// Re-initialize all scripts
				initializeScripts();

				const currentVisibleImage = current.container.querySelector(
					'.project-image'
				);

				const nextImage = next.container.querySelector('img');

				const currentBounds = currentVisibleImage.getBoundingClientRect();
				const nextBounds = nextImage.getBoundingClientRect();

				// Calculate the distsance between the two elements
				const deltaX = currentBounds.left - nextBounds.left + 'px';
				const deltaY = currentBounds.top - nextBounds.top + 'px';
				const deltaW = currentBounds.width / nextBounds.width;
				const deltaH = currentBounds.height / nextBounds.height;

				return new Promise((resolve) => {
					// Run FLIP animation through timeline
					const tl = gsap.timeline({
						// Wait until the timeline is finished before completing the hook
						onComplete() {
							resolve();
						},
					});

					tl.set(nextImage, {
						transformOrigin: 'top left',
						x: deltaX,
						y: deltaY,
						scaleX: deltaW,
						scaleY: deltaH,
					});
					tl.set('.project-hero .content', { opacity: 0, y: 20 });
					tl.set(currentVisibleImage, {
						visibility: 'hidden',
					});

					tl.to(current.container, {
						opacity: 0,
					})

						.to(nextImage, {
							transformOrigin: 'bottom left',
							x: 0,
							y: 0,
							duration: 0.7,
						})
						.to(nextImage, {
							scale: 1,
						})
						.to('.project-hero .content', {
							opacity: 1,
							y: 0,
							duration: 0.2,
						});
				});
			},
		},
	],
});
