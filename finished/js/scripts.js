const projects = document.querySelectorAll('.project');

projects.forEach((project) => {
	const projectImage = project.querySelector('img');
	const projectHeading = project.querySelector('h2');

	projectHeading.addEventListener('mousemove', (e) => {
		const { clientX, clientY } = e;

		projectImage.style = `--x: ${clientX}px; --y: ${clientY}px;`;

		projectImage.setAttribute('data-visible', true);
	});

	projectHeading.addEventListener('mouseleave', () => {
		projectImage.setAttribute('data-visible', false);
	});
});
