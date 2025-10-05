let words = ["Happy", "Sad", "Unbothered", "YIPPEE!", "Angry"];
let images = [];
let fontRegular;

let questions = [
  "What’s your ideal weekend?",
  "Pick a snack:",
  "How do you handle stress?",
  "Choose a hobby:"
];

let options = [
  ["Picnic in the park", "Crying in bed", "Scrolling TikTok", "Dancing around", "Yelling at clouds"],
  ["Ice cream", "Soup", "Chips", "Candy", "Flamin' Hot Cheetos"],
  ["Laugh it off", "Cry it out", "Ignore it", "Jump around", "Explode!!!"],
  ["Painting", "Writing poetry", "Napping", "Partying", "Kicking stuff"]
];

let answers = [];
let currentQuestion = 0;
let quizOver = false;
let result = -1;

function preload() {
  images[0] = loadImage("pictures/happy_snoop.jpg");
  images[1] = loadImage("pictures/sad_snoop.jpg");
  images[2] = loadImage("pictures/unbothered_snoop.jpg");
  images[3] = loadImage("pictures/yippee_snoop.jpg");
  images[4] = loadImage("pictures/angry_snoop.png");

  fontRegular = loadFont("assets/Poppins-Regular.ttf");
}

function setup() {
  createCanvas(800, 800);
  textAlign(CENTER, CENTER);
  textFont(fontRegular);
}

function draw() {
  background(220, 200, 255);

  if (!quizOver) {
    showQuestion();
  } else {
    showResult();
  }
}

function showQuestion() {
  textSize(28);
  fill(50);
  text(questions[currentQuestion], width / 2, 100);

  textSize(22);
  for (let i = 0; i < options[currentQuestion].length; i++) {
    let x = width / 2;
    let y = 200 + i * 100;
    let w = 400;
    let h = 60;

    // Hover effect
    let isHover = mouseX > x - w/2 && mouseX < x + w/2 &&
                  mouseY > y - h/2 && mouseY < y + h/2;
    fill(isHover ? [200,0,100] : [100,0,200]);
    rectMode(CENTER);
    rect(x, y, w, h, 15);

    fill(255);
    text(options[currentQuestion][i], x, y);
  }
}

function showResult() {
  textSize(32);
  fill(50);
  text("You are " + words[result] + " Snoopy!", width / 2, 100);

  imageMode(CENTER);
  image(images[result], width / 2, height / 2, 300, 300);

  textSize(20);
  let quotes = [
    "Happiness is a warm puppy.",
    "I have a new philosophy. I'm only going to dread one day at a time.",
    "Be yourself. No one can say you're doing it wrong",
    "Life is better with a friend :)",
    "Good grief!"
  ];
  text(quotes[result], width / 2, height - 150);

  // Restart button
  let btnX = width / 2;
  let btnY = height - 70;
  let btnW = 200;
  let btnH = 50;
  let isHover = mouseX > btnX - btnW/2 && mouseX < btnX + btnW/2 &&
                mouseY > btnY - btnH/2 && mouseY < btnY + btnH/2;

  fill(isHover ? [200,0,100] : [100,0,200]);
  rectMode(CENTER);
  rect(btnX, btnY, btnW, btnH, 15);

  fill(255);
  textSize(18);
  text("Restart Quiz", btnX, btnY);
}

function mousePressed() {
  if (!quizOver) {
    let x = width / 2;
    for (let i = 0; i < options[currentQuestion].length; i++) {
      let y = 200 + i * 100;
      let w = 400;
      let h = 60;
      if (mouseX > x - w/2 && mouseX < x + w/2 &&
          mouseY > y - h/2 && mouseY < y + h/2) {
        answers.push(i);
        currentQuestion++;
        if (currentQuestion >= questions.length) {
          quizOver = true;
          calculateResult();
        }
      }
    }
  } else {
    // Check if restart button is clicked
    let btnX = width / 2;
    let btnY = height - 70;
    let btnW = 200;
    let btnH = 50;
    if (mouseX > btnX - btnW/2 && mouseX < btnX + btnW/2 &&
        mouseY > btnY - btnH/2 && mouseY < btnY + btnH/2) {
      answers = [];
      currentQuestion = 0;
      quizOver = false;
      result = -1;
    }
  }
}

function calculateResult() {
  let counts = [0,0,0,0,0];
  for (let ans of answers) counts[ans]++;
  result = counts.indexOf(max(counts));
}
