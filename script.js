const svgNS = "http://www.w3.org/2000/svg";

const doodleLayer = document.getElementById("doodles");
const scribbleLayer = document.getElementById("scribbles");

function createScribbles() {
    for (let i = 0; i < 180; i++) {

        const path = document.createElementNS(svgNS, "path");

        const x = Math.random() * 800;
        const y = Math.random() * 1000;
        const len = 80 + Math.random() * 120;

        path.setAttribute(
            "d",
            `M${x},${y}
             L${x + len * 0.25},${y + len * 0.6}
             L${x + len * 0.5},${y + len}`
        );

        path.setAttribute("class", "scribble");
        scribbleLayer.appendChild(path);
    }
}

function spiralPath(cx, cy, turns, spacing) {

    let d = "";

    for (let t = 0; t <= turns * 40; t++) {

        const angle = t * 0.25;

        const r = spacing * angle / 4;

        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;

        if (t === 0) d += `M ${x} ${y}`;
        else d += ` L ${x} ${y}`;
    }

    return d;
}

const spirals = [];

function createSpirals() {

    for (let i = 0; i < 35; i++) {

        const x = 60 + Math.random() * 680;
        const y = 60 + Math.random() * 880;

        const turns = 2 + Math.random() * 2;
        const spacing = 2 + Math.random() * 3;

        const path = document.createElementNS(svgNS, "path");

        path.setAttribute(
            "d",
            spiralPath(x, y, turns, spacing)
        );

        path.setAttribute("class", "spiral");

        doodleLayer.appendChild(path);

        spirals.push({
            el: path,
            x,
            y,
            turns,
            spacing,
            phase: Math.random() * Math.PI * 2
        });
    }
}

createScribbles();
createSpirals();

let frame = 0;

// 4 FPS hand-drawn effect
setInterval(() => {

    frame++;

    spirals.forEach(s => {

        const jitterX =
            Math.sin(frame * 0.4 + s.phase) * 4;

        const jitterY =
            Math.cos(frame * 0.35 + s.phase) * 4;

        const scale =
            1 + Math.sin(frame * 0.25 + s.phase) * 0.05;

        s.el.setAttribute(
            "transform",
            `
            translate(${jitterX} ${jitterY})
            scale(${scale})
            `
        );
    });

}, 250);
