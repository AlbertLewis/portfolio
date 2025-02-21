// Function to generate a project card with skills as bolded text in a paragraph
function createProjectCard(title, description, imageUrl, projectLink, skills, projectId, videoUrl) {
    // Create the project card container
    const projectCard = document.createElement('a');
    projectCard.href = `#${projectId}`; // Set the link for the project to simulate a subpage
    projectCard.classList.add('project-card'); // Add class for styling
    projectCard.dataset.projectId = projectId; // Store the project ID for later use

    // Create the project title element
    const projectTitle = document.createElement('h3');
    projectTitle.innerText = title;

    // Create the project description element
    const projectDescription = document.createElement('p');
    projectDescription.innerText = description;

    // Create the skills paragraph
    const skillsParagraph = document.createElement('p');
    skillsParagraph.classList.add('skills'); // Add class for styling
    skillsParagraph.innerHTML = skills.map(skill => `<strong>${skill}</strong>`).join(', '); // Bold and separate skills by commas

    // Create the image element
    const projectImage = document.createElement('img');
    projectImage.src = imageUrl;
    projectImage.alt = title;
    projectImage.classList.add('project-image'); // Add class for styling

    // Append the title, description, skills, and image to the card
    projectCard.appendChild(projectTitle);
    projectCard.appendChild(projectDescription);
    projectCard.appendChild(skillsParagraph);
    projectCard.appendChild(projectImage);

    // Append the project card to the project container
    const projectContainer = document.getElementById('project-container');
    projectContainer.appendChild(projectCard);

    // TODO generate a new webpage for each project card and have them be linked to it
    // var opened = window.open("projects/uav_ugv_collaboration.html");
    // opened.document.write("<html><head><title>MyTitle</title></head><body>test</body></html>");

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
    "Lead a team of 11 students to design a kiosk application for workers at Brigham and Women\’s Hospital in Boston",
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