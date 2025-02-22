// Function to generate a project card with skills as bolded text in a paragraph
function createProjectCard(title, description, modal_description, imageUrl, projectLink, skills, projectId, videoUrl) {
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

    // Add click event to open the modal with more details
    projectCard.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default link behavior

        // Fill modal with project details
        document.getElementById('modal-title').innerText = title;
        document.getElementById('modal-image').src = imageUrl;
        document.getElementById('modal-description').innerText = modal_description;
        document.getElementById('modal-skills').innerText = skills.join(', ');
        // document.getElementById('modal-link').href = projectLink;

        // Show the modal
        document.getElementById('project-modal').style.display = 'block';
    });
}

// // Close the modal when clicking the close button
// document.querySelector('.close-btn').addEventListener('click', function() {
//     document.getElementById('project-modal').style.display = 'none';
// });

// Close the modal when clicking outside the modal content (on the background)
document.getElementById('project-modal').addEventListener('click', function(event) {
    // Check if the click happened on the modal background (not inside the modal content)
    if (event.target === document.getElementById('project-modal')) {
        document.getElementById('project-modal').style.display = 'none';
    }
});

// Calling the function to add project cards dynamically
createProjectCard(
    "UAV-UGV Collaboration",
    "A system that allows a quadcopter to autonomously dock and charge on a UGV reliably; in partnership with Draper Laboratory.",
    "A system that allows a quadcopter to autonomously dock and charge on a UGV reliably; in partnership with Draper Laboratory.",
    "media/projects/UAV_UGV.jpg", 
    "https://github.com/your-github/repo2",
    ["Solidworks", "3D Printing", "C++", "Embedded Systems", "Computer Vision", "Ardupilot"]
);

createProjectCard(
    "3-DOF Robotic Sorting Arm",
    "A 3-DOF robot arm, programmed to pick up and sort colored balls that were placed into its workspace.",
    `This project was for the class RBE 3001: Unified Robotics III. 
    The goal of the project was to develop the three degree of freedom robot arm to pick up and sort the balls that were placed on the workspace. To do this, our team had to utilize forward and inverse kinematics, smooth trajectory generation, and computer vision.`,
    "media/projects/color_sorting_robotic_arm.gif", 
    "https://github.com/your-github/repo1",
    ["MATLAB", "Forward/Inverse Kinematics", "Trajectory Generation", "Stereo Calibration"]
);

createProjectCard(
    "Escape Room Robots",
    "A set of 3 robots with unique sets of sensors that communicate with each other and find clues to exit an escape room.",
    `This project was for RBE 2002: Unified Robotics II.

The goal of this project was to develop three robots to communicate with each other and utilize different sensors to navigate an escape room, and have one of the robots escape through a trap door. 

Robot 1 (Camera Bot) moves down the column of the field, wall following, until it reaches the last row, where it turns left to move up the ramp. Using a complementary filter with the robot's IMU, the bot detects when the robot moves far enough on the ramp when the ramp levels out. It then waits for Robot 2 to hit the button and reveal the apriltag at the top of the ramp. Robot 1 then scans the apriltag and sends the ID and orientation of the apriltag to MQTT, where Robot 3 can retrieve the information.

Robot 2 (Button Bot) moves down the first row and follows the left wall until it detects an IR Signal that is on the button using the IR sensor mounted to the front of the robot. Once it sees the IR Signal, the robot aligns itself with the signal--and therefore the button, and presses the button, using the complementary filter with the IMU to detect when the robot has collided with the button. The triggered button then reveals the apriltag for Robot 1.

 Robot 2 also keeps track of which cell the button is in and which face of the cell the button is on and sends that information over MQTT because Robot 3 needs it to unlock the escape door.

Robot 3 (Escape Bot) starts when it retrieves the ID and orientation of the apriltag and the location of the button from MQTT.

The ID of the apriltag determines which cell the escape door is in. For example an ID of 42 would be row 4 column 2.

The orientation of the apriltag determines which face of the cell the escape door is on. For example if the apriltag is not rotated the escape door would be on the north side, and if the apriltag was rotated 90 degrees, the escape door would be on the east side.

The XY location and cell face of the button determines the 3-digit passcode that needs to be sent to the door to open it. The door has an IR receiver and the robot has a circuit we designed with an IR emitter to send the correct passcode using the IR NEC Protocol.

Once the door is detected to have opened using an ultrasonic sensor mounted to the front of the robot, it drives through.`,
    "media/projects/escape_room_robots.gif", 
    "https://github.com/your-github/repo2",
    ["C++", "Sensor Integration", "IMU", "PID Control", "MQTT", "OpenMV"]
);

createProjectCard(
    "Solar Panel Pick and Place Robot",
    "Designed and 3D printed a four-bar mechanism on a robot that would pick up \"solar panels\" and place them on the tops of miniature roofs",
    "Designed and 3D printed a four-bar mechanism on a robot that would pick up \"solar panels\" and place them on the tops of miniature roofs",
    "media/projects/solar_panel_robot.gif", 
    "https://github.com/your-github/repo2",
    ["Solidworks", "3D Printing", "C++", "Servos", "Power Transmission", "Static Force Analysis"]
);

createProjectCard(
    "Hospital Kiosk Application",
    "Led a team of 11 students to design a kiosk application for workers at Brigham and Women\’s Hospital in Boston",
    "Led a team of 11 students to design a kiosk application for workers at Brigham and Women\’s Hospital in Boston",
    "media/projects/brigham_and_womens_hospital.jpeg",
    "https://github.com/your-github/repo2",
    ["Java", "Agile", "Scrum", "Jira", "UML", "Git", "SQL"]
);

createProjectCard(
    "Custom Built 3D Printer",
    "A Voron 2.4 FDM 3D printer, built using individually sourced components from professional suppliers",
    "A Voron 2.4 FDM 3D printer, built using individually sourced components from professional suppliers",
    "media/projects/3D_printer.jpg",
    "https://github.com/your-github/repo2",
    ["Raspberry Pi", "PrusaSlicer", "AC/DC circuits", "Soldering", "Wiring", "Mechanical Assembly", "Solidworks", "Fusion 360"]
);