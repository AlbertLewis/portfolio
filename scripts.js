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

// ---------- Project cards ----------
// Builds a card with a full-bleed image and an overlay that reveals the
// description and skill tags on hover.
function createProjectCard(title, description, imageUrl, projectLink, skills, projectId, videoUrl) {
    const projectCard = document.createElement('a');
    projectCard.href = projectId ? `#${projectId}` : (projectLink || '#');
    projectCard.classList.add('project-card');
    if (projectId) projectCard.dataset.projectId = projectId;

    const projectImage = document.createElement('img');
    projectImage.src = imageUrl;
    projectImage.alt = title;
    projectImage.loading = 'lazy';
    projectImage.classList.add('project-image');

    const overlay = document.createElement('div');
    overlay.classList.add('project-overlay');

    const projectTitle = document.createElement('h3');
    projectTitle.innerText = title;

    const projectDescription = document.createElement('p');
    projectDescription.classList.add('project-desc');
    projectDescription.innerText = description;

    const skillsWrap = document.createElement('div');
    skillsWrap.classList.add('skills');
    skillsWrap.innerHTML = skills.map(skill => `<span>${skill}</span>`).join('');

    overlay.appendChild(projectTitle);
    overlay.appendChild(projectDescription);
    overlay.appendChild(skillsWrap);

    projectCard.appendChild(projectImage);
    projectCard.appendChild(overlay);

    document.getElementById('project-container').appendChild(projectCard);
}

// Calling the function to add project cards dynamically
createProjectCard(
    "UAV-UGV Collaboration",
    "A system that allows a quadcopter to autonomously dock and charge on a UGV reliably; in partnership with Draper Laboratory.",
    "media/projects/UAV_UGV.jpg", 
    "https://github.com/your-github/repo2",
    ["Solidworks", "3D Printing", "C++", "Embedded Systems", "Computer Vision", "Ardupilot"]
);

createProjectCard(
    "3-DOF Robotic Sorting Arm",
    "A 3-DOF robot arm, programmed to pick up and sort colored balls that were placed into its workspace.",
    "media/projects/color_sorting_robotic_arm.gif", 
    "https://github.com/your-github/repo1",
    ["MATLAB", "Forward/Inverse Kinematics", "Trajectory Generation", "Stereo Calibration"]
);

createProjectCard(
    "Escape Room Robots",
    "A set of 3 robots with unique sets of sensors that communicate with each other and find clues to exit an escape room.",
    "media/projects/escape_room_robots.gif", 
    "https://github.com/your-github/repo2",
    ["C++", "Sensor Integration", "IMU", "PID Control", "MQTT", "OpenMV"]
);

createProjectCard(
    "Solar Panel Pick and Place Robot",
    "Designed and 3D printed a four-bar mechanism on a robot that would pick up \"solar panels\" and place them on the tops of miniature roofs",
    "media/projects/solar_panel_robot.gif", 
    "https://github.com/your-github/repo2",
    ["Solidworks", "3D Printing", "C++", "Servos", "Power Transmission", "Static Force Analysis"]
);

createProjectCard(
    "Hospital Kiosk Application",
    "Led a team of 11 students to design a kiosk application for workers at Brigham and Women\’s Hospital in Boston",
    "media/projects/brigham_and_womens_hospital.jpeg",
    "https://github.com/your-github/repo2",
    ["Java", "Agile", "Scrum", "Jira", "UML", "Git", "SQL"]
);

createProjectCard(
    "Custom Built 3D Printer",
    "A Voron 2.4 FDM 3D printer, built using individually sourced components from professional suppliers",
    "media/projects/3D_printer.jpg",
    "https://github.com/your-github/repo2",
    ["Raspberry Pi", "PrusaSlicer", "AC/DC circuits", "Soldering", "Wiring", "Mechanical Assembly", "Solidworks", "Fusion 360"]
);