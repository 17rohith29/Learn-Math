// elements
var btn1 = document.querySelector("#one");
var btn2 = document.querySelector("#two");
var btn3 = document.querySelector("#three");
var btn4 = document.querySelector("#four");
var buttons = [btn1, btn2, btn3, btn4];

var next = document.querySelector("#next");
var result = document.querySelector(".result");
var ques = document.querySelector("#question");

var upper = 20; // upper limit for number selection
var first, second; // 2 elements for the question
var ans;
var ansButton; // the button with the right ans
var answered = false;

var attempted = 0;
var score = 0; //keeps count of score
var scoreBlock = document.querySelector("#score");

function updateScore() {
  scoreBlock.innerHTML = "<strong> SCORE: " + score + " out of " + attempted + "</strong>";
}

function getTwoNums() {
  second = Math.round(Math.random() * upper);
  first = Math.round(Math.random() * upper) * second;
}

function getAns() {
  ans = first / second;
}

function updateQueston() {
  getTwoNums();
  getAns(); // wont be used here though
  ques.innerHTML = "" + first + " / " + second + " = ?";
}

function getRandNum() { // can produce negative nums.
  let num = Math.random();
  let sign = Math.random();
  if (sign >= 0.5)
    num = -num;
  return num;
}

function inOptn(a, x){ // x is upper limit
  for(let k=0; k<x; k++){
    if(buttons[k].innerText == a)
      return true;
  }
}

function updateOptions() {
  // ans button
  let ansBtn = Math.round(Math.random() * 3);
  for (let i = 0; i < 4; i++) {
    if (i == ansBtn) {
      buttons[i].innerText = "" + ans;
      ansButton = buttons[i];
    } else {
      let optn = Math.round(ans + getRandNum() * ((Math.abs(ans) + 20) / 5));
      while(inOptn(optn, i)){
        optn = Math.round(ans + getRandNum() * ((Math.abs(ans) + 20) / 5));
      }
      buttons[i].innerText = "" + optn;
    }
  }
}

function next() {
  score = 0;
  answered = 0;
}

// this runs at the beg of script to set default answers
updateQueston();
updateOptions();

// this code runs when button is clicked
for (let i = 0; i < 4; i++) {
  let e = buttons[i];
  e.onclick = function() {
    if (!answered) {
      answered = true;
      attempted += 1;
      if (e == ansButton) {
        e.classList.add("correct");
        result.innerHTML = "<strong>RESULT : </strong><i class=\"far fa-check-circle\"></i>";
        score += 1;
      } else {
        e.classList.add("wrong")
        result.innerHTML = "<strong>RESULT : </strong><i class=\"far fa-times-circle\"></i>";
        ansButton.classList.add("correct");
      }
      updateScore();
    }
  };
}

// next button is hovered and clicked
next.onclick = function() {
  if (answered) {
    answered = false;
    for (let i = 0; i < 4; i++) {
      buttons[i].classList.remove("correct");
      buttons[i].classList.remove("wrong");
      result.innerHTML = "<strong>RESULT :</strong>";
    }
    updateQueston();
    updateOptions();
  }
};
