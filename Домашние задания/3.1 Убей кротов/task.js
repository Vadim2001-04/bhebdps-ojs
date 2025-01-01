let score = 0;
let misses = 0;

function getHole(index) {
    return document.getElementById(`hole${index}`);
}

function randomHole() {
    const holes = document.querySelectorAll('.hole');
    const randomIndex = Math.floor(Math.random() * holes.length);
    holes.forEach(hole => hole.classList.remove('hole_has-mole'));
    holes[randomIndex].classList.add('hole_has-mole');
}

function whackMole(e) {
    if (e.target.classList.contains('hole_has-mole')) {
        score++;
        console.log('Hit! Score: ' + score);
        if (score === 10) {
            alert('Congratulations! You won!');
            score = 0;
            misses = 0;
        }
    } else {
        misses++;
        console.log('Miss! Misses: ' + misses);
        if (misses === 5) {
            alert('Game Over! You lost.');
            score = 0;
            misses = 0;
        }
    }
}

document.querySelectorAll('.hole').forEach(hole => {
    hole.addEventListener('click', whackMole);
});

randomHole();
setInterval(randomHole, 1000);
