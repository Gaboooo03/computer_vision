// Classifier Variable
let classifier;
// Model URL
let imageModelURL = "https://teachablemachine.withgoogle.com/models/b1_kjgE7x/";

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";
let confiaza = 0;

//Para agregar sonidos prueba
//let soundWithGlasses;
//let soundWithoutGlasses;

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + "model.json");
  //AGREGAMOS EL SONIDO !
  /*soundWithGlasses = loadSound(
    "C:UsersgabriOneDriveEscritorioCOSAS DE LA UCodigo creatuvocomputer_visionSONIDOSFrench Affair-Sexy.mp3"
  );
  soundWithoutGlasses = loadSound(
    "C:UsersgabriOneDriveEscritorioCOSAS DE LA UCodigo creatuvocomputer_visionSONIDOSAbucheo  Efecto de sonido.mp3"
  );
  */
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Create the video
  video = createCapture(VIDEO);
  video.size(windowWidth, windowHeight);
  video.hide();

  //flippedVideo = ml5.flipImage(video);
  // Start classifying
  classifyVideo();
}

function draw() {
  background(0);
  // Draw the video
  image(video, 0, 0);

  // Draw the label
  /*
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(label, width / 2, height - 4);
    */

  if (label == "conGafas" && confiaza > 0.9) {
    fill(255);
    textSize(80);
    textAlign(CENTER);
    text("¡Que sexy 🤭!", width / 2, height / 2);
  } else if (label == "sinGafas" && confiaza > 0.9) {
    filter(INVERT);
    filter(GRAY);
    fill(255);
    textSize(80);
    textAlign(CENTER);
    fill(0);
    text("¡Que horrible 😨!", width / 2, height / 2);
  }
  if (label == "feliz" && confiaza > 0.9) {
    fill(255);
    textSize(80);
    textAlign(CENTER);
    text("¡Feliz como una lombriz 😎😁✌️!", width / 2, height / 2);
  } else if (label == "triste" && confiaza > 0.9) {
    fill(255);
    textSize(80);
    textAlign(CENTER);
    text("Triste 🥲😫😭", width / 2, height / 2);
  }
  /* intento de agregar sonido pero no funciono :C
  if (label == "conGafas" && confiaza > 0.9) {
    if (soundWithGlasses.isPlaying()) {
      soundWithoutGlasses.stop();
      soundWithGlasses.play();
    }
  } else if (label == "sinGafas" && confiaza > 0.9) {
    if (soundWithoutGlasses.isPlaying()) {
      soundWithGlasses.stop();
      soundWithoutGlasses.play();
    }
  }

  */
}

// Get a prediction for the current video frame
function classifyVideo() {
  //flippedVideo = ml5.flipImage(video);
  classifier.classify(video, gotResult);
  //flippedVideo.remove();
}

// When we get a result
function gotResult(results, error) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;
  confiaza = results[0].confidence;
  // Classifiy again!
  classifyVideo();
}
