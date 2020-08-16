document.addEventListener('DOMContentLoaded', () => {
	const dino = document.querySelector('.dino');
	const grid = document.querySelector('.grid');
	const status = document.getElementById('status');
	let isJumping = false;
	const gravity = 0.9;
	let position = 0;
	let isGameOver = false;

	const control = (e) => {
		if (e.keyCode === 38 || e.keyCode === 32) {
			if (!isJumping) {
				isJumping = true;
				dinoJump();
			}
		}
	};

	document.addEventListener('keyup', control);

	const dinoJump = () => {
		let count = 0;
		let timerId = setInterval(() => {
			if (count === 15) {
				clearInterval(timerId);
				let downTimerId = setInterval(() => {
					if (count === 0) {
						isJumping = false;
						clearInterval(downTimerId);
					}
					position -= 5;
					count--;
					position = position * gravity;
					dino.style.bottom = `${position}px`;
				}, 20);
			}

			count++;
			position += 30;
			position = position * gravity;
			dino.style.bottom = `${position}px`;
		}, 20);
	};

	const obsTimers = [];
	const generateObstacles = () => {
		const randomTime = (Math.random() + 0.5) * 3000;
		let obsPosition = 1000;
		const obstable = document.createElement('div');
		if (!isGameOver) obstable.classList.add('obstacle');
		grid.appendChild(obstable);
		obstable.style.left = `${obsPosition}px`;

		const timerId = setInterval(() => {
			if (obsPosition > 0 && obsPosition < 60 && position < 60) {
				status.innerHTML = 'Game over...';
				isGameOver = true;
				clearInterval(timerId);
				obstable.remove();
				obsTimers.forEach((id) => {
					clearInterval(id);
				});
				while (grid.firstChild) {
					grid.removeChild(grid.lastChild);
				}
			}
			obsPosition -= 10;
			obstable.style.left = `${obsPosition}px`;
		}, 20);
		obsTimers.push(timerId);

		if (!isGameOver) {
			const obsTimerId = setInterval(generateObstacles, randomTime);
			obsTimers.push(obsTimerId);
		}
	};
	status.innerHTML = 'Playing!!';
	generateObstacles();
});
