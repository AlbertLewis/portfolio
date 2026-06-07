// ---------- Theme toggle ----------
// The header is injected asynchronously, so use event delegation on the
// document to catch clicks on the toggle button whenever it appears.
document.addEventListener('click', function (e) {
    if (e.target.closest('#theme-toggle')) {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    }
});

// ---------- Project data ----------
// Each project drives both its card and its detail popup.
//   description : short line shown on the card (on hover)
//   details     : longer text shown in the popup (falls back to description)
//   links       : optional buttons in the popup, e.g.
//                 [{ label: "View on GitHub", url: "https://github.com/..." }]
const PROJECTS = [
    {
        title: "UAV-UGV Collaboration",
        image: "media/projects/UAV_UGV.jpg",
        description: "A system that allows a quadcopter to autonomously dock and charge on a UGV reliably; in partnership with Draper Laboratory.",
        details: "A system that allows a quadcopter to autonomously dock and charge on a UGV (unmanned ground vehicle) reliably, developed in partnership with Draper Laboratory. The work spanned mechanical design, embedded firmware, and a computer-vision pipeline for precision landing.",
        skills: ["Solidworks", "3D Printing", "C++", "Embedded Systems", "Computer Vision", "Ardupilot"],
        links: [{ label: "Link to Paper", url: "https://digital.wpi.edu/concern/student_works/w6634816k?locale=en" }]
    },
    {
        title: "3-DOF Robotic Sorting Arm",
        image: "media/projects/color_sorting_robotic_arm.gif",
        description: "A 3-DOF robot arm, programmed to pick up and sort colored balls that were placed into its workspace.",
        details: "A 3-DOF robot arm programmed to pick up and sort colored balls placed into its workspace. I implemented forward and inverse kinematics, generated smooth trajectories between pick-and-place poses, and used stereo calibration to locate targets in 3D.",
        skills: ["MATLAB", "Forward/Inverse Kinematics", "Trajectory Generation", "Stereo Calibration"],
        links: []
    },
    {
        title: "Escape Room Robots",
        image: "media/projects/escape_room_robots.gif",
        description: "A set of 3 robots with unique sets of sensors that communicate with each other and find clues to exit an escape room.",
        details: "A set of three robots, each with a unique sensor suite, that communicate with one another over MQTT to find clues and \"escape\" a room. The project combined sensor fusion, PID-based motion control, and inter-robot messaging.",
        skills: ["C++", "Sensor Integration", "IMU", "PID Control", "MQTT", "OpenMV"],
        links: []
    },
    {
        title: "Solar Panel Pick and Place Robot",
        image: "media/projects/solar_panel_robot.gif",
        description: "Designed and 3D printed a four-bar mechanism on a robot that picks up \"solar panels\" and places them on miniature roofs.",
        details: "Designed and 3D printed a four-bar mechanism on a robot that picks up \"solar panels\" and places them onto the tops of miniature roofs. I performed static force analysis to size the linkage and power transmission, then prototyped and tuned the assembly.",
        skills: ["Solidworks", "3D Printing", "C++", "Servos", "Power Transmission", "Static Force Analysis"],
        links: []
    },
    {
        title: "Hospital Kiosk Application",
        image: "media/projects/brigham_and_womens_hospital.jpeg",
        description: "Led a team of 11 students to design a kiosk application for workers at Brigham and Women’s Hospital in Boston.",
        details: "Led a team of 11 students to design and build a kiosk application for staff at Brigham and Women’s Hospital in Boston. As team lead I ran an Agile/Scrum process, managed work in Jira, and owned the data model and backend integration.",
        skills: ["Java", "Agile", "Scrum", "Jira", "UML", "Git", "SQL"],
        links: []
    },
    {
        title: "Custom Built 3D Printer",
        image: "media/projects/3D_printer.jpg",
        description: "A Voron 2.4 FDM 3D printer, built using individually sourced components from professional suppliers.",
        details: "A Voron 2.4 FDM 3D printer built from individually sourced components from professional suppliers. The build covered the full electromechanical stack: mechanical assembly, AC/DC wiring and soldering, and a Raspberry Pi running the control software and slicer toolchain.",
        skills: ["Raspberry Pi", "PrusaSlicer", "AC/DC circuits", "Soldering", "Wiring", "Mechanical Assembly", "Solidworks", "Fusion 360"],
        links: []
    }
];

// ---------- Project cards ----------
// Builds a card with a full-bleed image and an overlay that reveals the
// description on hover. Clicking (or pressing Enter/Space) opens the popup.
function createProjectCard(project) {
    const card = document.createElement('article');
    card.className = 'project-card';
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `View details for ${project.title}`);

    const image = document.createElement('img');
    image.src = project.image;
    image.alt = project.title;
    image.loading = 'lazy';
    image.className = 'project-image';

    const overlay = document.createElement('div');
    overlay.className = 'project-overlay';

    const title = document.createElement('h3');
    title.innerText = project.title;

    const description = document.createElement('p');
    description.className = 'project-desc';
    description.innerText = project.description;

    const skills = document.createElement('div');
    skills.className = 'skills';
    skills.innerHTML = project.skills.map(skill => `<span>${skill}</span>`).join('');

    overlay.append(title, description, skills);
    card.append(image, overlay);

    const open = () => openProjectModal(project);
    card.addEventListener('click', open);
    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            open();
        }
    });

    document.getElementById('project-container').appendChild(card);
}

// ---------- Project popup (modal) ----------
let lastFocusedCard = null;

function buildModal() {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.id = 'project-modal';
    overlay.innerHTML = `
        <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <button class="modal-close" type="button" aria-label="Close">&times;</button>
            <img class="modal-image" alt="">
            <div class="modal-body">
                <h3 class="modal-title" id="modal-title"></h3>
                <p class="modal-details"></p>
                <div class="modal-skills skills"></div>
                <div class="modal-links"></div>
            </div>
        </div>`;
    document.body.appendChild(overlay);

    // Close when clicking the backdrop or the close button.
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay || e.target.closest('.modal-close')) {
            closeProjectModal();
        }
    });
    return overlay;
}

function openProjectModal(project) {
    const overlay = document.getElementById('project-modal') || buildModal();
    lastFocusedCard = document.activeElement;

    overlay.querySelector('.modal-image').src = project.image;
    overlay.querySelector('.modal-image').alt = project.title;
    overlay.querySelector('.modal-title').innerText = project.title;
    overlay.querySelector('.modal-details').innerText = project.details || project.description;
    overlay.querySelector('.modal-skills').innerHTML =
        project.skills.map(skill => `<span>${skill}</span>`).join('');

    const linksWrap = overlay.querySelector('.modal-links');
    const links = project.links || [];
    linksWrap.innerHTML = links
        .map(l => `<a class="modal-link" href="${l.url}" target="_blank" rel="noopener">${l.label}</a>`)
        .join('');

    document.body.style.overflow = 'hidden';
    overlay.classList.add('is-open');
    overlay.querySelector('.modal-close').focus();
}

function closeProjectModal() {
    const overlay = document.getElementById('project-modal');
    if (!overlay || !overlay.classList.contains('is-open')) return;
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
    if (lastFocusedCard) lastFocusedCard.focus();
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeProjectModal();
});

// ---------- Render ----------
PROJECTS.forEach(createProjectCard);
