const dino = document.getElementById('dino');
const cactus = document.getElementById('cactus');
const cloud = document.getElementById('cloud');
const bird = document.getElementById('bird');
const scoreElement = document.getElementById('score');
let isJumping = false;
let gravity = 0.9;
let score = 0;
let day = true;
let jumpStart = 0;

document.addEventListener('mousedown', function() {
    jumpStart = Date.now();
});

document.addEventListener('mouseup', function() {
    const jumpDuration = Date.now() - jumpStart;
    jump(jumpDuration);
});

function jump(duration) {
    let position = 0;
    let maxJumpHeight = Math.min(100 + duration / 20, 200); // max h
    isJumping = true;

    let upInterval = setInterval(() => {
        if (position >= maxJumpHeight) {
            clearInterval(upInterval);
            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                }
                position -= 5;
                position = position * gravity;
                dino.style.bottom = position + 'px';
            }, 20);
        }
        position += 20; // h++
        position = position * gravity;
        dino.style.bottom = position + 'px';
    }, 20);
}

function moveCactus() {
    let cactusPosition = 800;

    let leftInterval = setInterval(() => {
        if (cactusPosition < -30) {
            cactusPosition = 800;
            score++;
            scoreElement.textContent = score;
            if (score % 10 === 0) {
                toggleDayNight();
            }
        } else if (cactusPosition > 0 && cactusPosition < 60 && dino.getBoundingClientRect().bottom >= cactus.getBoundingClientRect().top) {
            clearInterval(leftInterval);
            alert('Game Over');
            document.location.reload();
        } else {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20);
}

function toggleDayNight() {
    day = !day;
    if (day) {
        document.body.style.backgroundColor = '#87CEEB';
    } else {
        document.body.style.backgroundColor = '#2c3e50';
    }
}

moveCactus();
