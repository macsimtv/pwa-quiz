const quiz = [
  {
    "id": 1,
    "question": "What is the capital of France?",
    "answers": [
      "Paris",
      "London",
      "Berlin",
      "Madrid"
    ],
    "answer": "Paris",
  },
  {
    "id": 2,
    "question": "What is the capital of Germany?",
    "answers": [
      "Paris",
      "London",
      "Berlin",
      "Madrid"
    ],
    "answer": "Berlin",
  },
];

const btnStart = document.getElementById("btnStart");
const scoreBoard = document.getElementById("scoreBoard");
const question = document.getElementById("question");
const answers = document.getElementById("answers");

let level = 0;
let score = 0;

btnStart.addEventListener("click", () => {
  btnStart.parentElement.classList.add("hide");
  document.getElementById("score").classList.remove("hide");
  createQuestion(level);
});

function createQuestion(lvl) {
  question.innerHTML = quiz[lvl].question;
  answers.innerHTML = "";

  scoreBoard.innerHTML = `Level: ${lvl + 1} / Score: ${score}`;

  for(let q of quiz[lvl].answers) {
    const btn = document.createElement("button");
    btn.classList.add(`btn${lvl}`);
    btn.innerHTML = q;

    btn.addEventListener("click", () => {
      const btns = document.querySelectorAll(`.btn${lvl}`);
      for(let b of btns) {
        const clone = b.cloneNode(true);
        b.parentNode.replaceChild(clone, b);
      }

      if(q === quiz[lvl].answer) {
        score++;
      }

      if(lvl < quiz.length - 1) {
        createQuestion(lvl + 1);
      } else {
        scoreBoard.innerHTML = `Your score is ${score} out of ${quiz.length}`;
        
        const btnRestart = document.createElement("button");
        btnRestart.innerHTML = "Restart";
        btnRestart.classList.add("btnRestart");
        btnRestart.addEventListener("click", () => {
          window.location.reload();
        });
        document.querySelector('.container').appendChild(btnRestart);
      }
    });

    answers.appendChild(btn);
  }
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err));
  });
}
