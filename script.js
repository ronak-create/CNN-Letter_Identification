// Get references to the canvas element and its drawing context
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Set the initial background color to white and fill the entire canvas
ctx.fillStyle = "#fff";
ctx.fillRect(0, 0, canvas.width, canvas.width);

// Variables to track drawing state and mouse position
let drawing = false;
let mouseX, mouseY;

// Event listener for mousedown on the canvas
canvas.addEventListener("mousedown", (e) => {
  // Set drawing to true and capture initial mouse position relative to canvas
  drawing = true;
  mouseX = e.clientX - canvas.offsetLeft;
  mouseY = e.clientY - canvas.offsetTop;
});

// Event listener for mouseup on the canvas
canvas.addEventListener("mouseup", () => {
  // Set drawing to false to stop drawing lines
  drawing = false;
});

// Event listener for mousemove on the canvas
canvas.addEventListener("mousemove", (e) => {
  if (drawing) {
    // Get new mouse position relative to canvas
    const newX = e.clientX - canvas.offsetLeft;
    const newY = e.clientY - canvas.offsetTop;

    // Start a new path, set line width and cap style
    ctx.beginPath();
    ctx.lineWidth = 20;
    ctx.lineCap = "round";

    // Move to the previous mouse position and draw a line to the new position
    ctx.moveTo(mouseX, mouseY);
    ctx.lineTo(newX, newY);
    ctx.stroke();

    // Update current mouse position for the next move event
    mouseX = newX;
    mouseY = newY;
  }
});

// Function to clear the entire canvas
function clearCanvas() {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");

  // Clear the entire rectangle using canvas width and height
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Set the background color to white and fill the cleared area
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.width);
}

const output = document.getElementById("ouput");
function clearOutput() {
  output.innerHTML = "";
  clearCanvas();
  input1.setAttribute("disabled",true);
  input2.setAttribute("disabled",true);
  labeling.setAttribute("disabled",true);
  uploadbutton.setAttribute("disabled",true);
}

const input1 = document.getElementById("yes");
const input2 = document.getElementById("no");
// Event listener for the upload button click
document
  .getElementById("uploadButton")
  .addEventListener("click", async function (event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Get references to output element and canvas
    const output = document.getElementById("ouput");
    const canvas = document.getElementById("myCanvas");

    try {
      // Get the image data URL from the canvas
      const imageData = canvas.toDataURL("image/png");

      // Call the asynchronous function to upload image and get prediction
      const currentPredictedLabel = await uploadImage(imageData);

      // Update output element only if a prediction exists
      if (currentPredictedLabel) {
        output.innerHTML = currentPredictedLabel;
      }
      input1.removeAttribute("disabled");
      input2.removeAttribute("disabled");
    } catch (error) {
      console.error("Error:", error); // Log the error for debugging
    }
  });

// Function to upload image data and get prediction asynchronously
async function uploadImage(imageData) {
  try {
    // Make a POST request to the Flask server endpoint (replace URL if needed)
    const response = await fetch("http://127.0.0.1:5000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
      body: JSON.stringify({ imageData }),
    });

    if (!response.ok) {
      // Throw an error with details if the response is not successful
      throw new Error(`Error uploading image: ${response.statusText}`);
    }

    const data = await response.json();
    const currentPredictedLabel = await data.predicted_label;
    // clearCanvas();
    return currentPredictedLabel;
  } catch (err) {
    // Handle upload errors (consider providing user feedback)
    handle(err); // Replace with a custom error handling function
    throw err; // Re-throw the error for further handling
  }
}

// Functions for smooth scrolling to different sections (optional)
function home() {
  const about = document.getElementById("home");
  about.scrollIntoView({
    behavior: "smooth",
    block: "end",
    inline: "nearest",
  });
}

function about() {
  const about = document.getElementById("about");
  about.scrollIntoView({
    behavior: "smooth",
    block: "end",
    inline: "nearest",
  });
}

function contact() {
  const about = document.getElementById("contact");
  about.scrollIntoView({
    behavior: "smooth",
    block: "end",
    inline: "nearest",
  });
}

function more() {
  const about = document.getElementById("more");
  about.scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "nearest",
  });
}
const labeling = document.getElementById("labeling");
const uploadbutton = document.getElementById("upbutton");

var store_label = "";
function fun(){
  labeling.removeAttribute("disabled");
  uploadbutton.removeAttribute("disabled");
}

async function upload(){
  store_label = labeling.value;
  const canvas = document.getElementById("myCanvas")
  const imageData = canvas.toDataURL("image/png");
//   console.log(form);
  const response = await fetch("http://127.0.0.1:5000", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
    },
    body: JSON.stringify({store_label}),
  });
  console.log(store_label);
  labeling.value = "";
  input1.setAttribute("disabled",true);
  input2.setAttribute("disabled",true);
  labeling.setAttribute("disabled",true);
  uploadbutton.setAttribute("disabled",true);
  clearOutput();
}
