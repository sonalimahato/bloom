const canvas = document.getElementById('flowerCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// This array will store all the flowers we create
let flowers = [];

// A "blueprint" for a flower object
function createFlower(x) {
    return {
        x: x,
        stemHeight: 0,
        flowerSize: 0,
        maxStemHeight: Math.random() * 150 + 100, // Random heights
        maxFlowerSize: Math.random() * 20 + 30,   // Random sizes
        petalColor: `hsl(${Math.random() * 360}, 70%, 70%)` // Random colors!
    };
}

// Start with one flower in the middle
flowers.push(createFlower(canvas.width / 2));

// Listen for clicks to add more flowers
window.addEventListener('click', (e) => {
    flowers.push(createFlower(e.clientX));
});

function animate() {
    // Clear canvas to draw the next frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    flowers.forEach(flower => {
        // Draw Stem
        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.strokeStyle = '#2d5a27';
        ctx.moveTo(flower.x, canvas.height);
        ctx.lineTo(flower.x, canvas.height - flower.stemHeight);
        ctx.stroke();

        // Growth Logic
        if (flower.stemHeight < flower.maxStemHeight) {
            flower.stemHeight += 2;
        } else if (flower.flowerSize < flower.maxFlowerSize) {
            drawPetals(flower);
            flower.flowerSize += 0.5;
        } else {
            drawPetals(flower); // Keep drawing once fully grown
        }
    });

    requestAnimationFrame(animate);
}

function drawPetals(f) {
    // Draw 6 petals
    for (let i = 0; i < 6; i++) {
        ctx.beginPath();
        ctx.fillStyle = f.petalColor;
        let angle = i * (Math.PI / 3);
        let petalX = f.x + Math.cos(angle) * f.flowerSize;
        let petalY = (canvas.height - f.maxStemHeight) + Math.sin(angle) * f.flowerSize;
        ctx.arc(petalX, petalY, f.flowerSize / 1.5, 0, Math.PI * 2);
        ctx.fill();
    }

    // Yellow Center
    ctx.beginPath();
    ctx.fillStyle = '#ffd700';
    ctx.arc(f.x, canvas.height - f.maxStemHeight, f.flowerSize / 1.2, 0, Math.PI * 2);
    ctx.fill();
}

animate(); 