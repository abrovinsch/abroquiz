const tableBody = document.getElementById("table-body")

async function GetQuestions(id, topic) {
   const response = await fetch(`/questions/${id}/${topic}`);
   const result = await response.json();
   return result;
}

function UpdateQuestionTable(questions) {
   RemoveAllElementsWithClass('question-row');
   for (let item of questions) {
      AddQuestionToList(item);
   }
}

function NewCell(text) {
   let cell = document.createElement("td");
   cell.textContent = text;
   return cell;
}

function RemoveAllElementsWithClass(className) {
   let elements = document.getElementsByClassName(className);

   while (elements[0]) {
      elements[0].parentNode.removeChild(elements[0]);
   }
}

function AddQuestionToList(item) {
   let rowNode = document.createElement("tr")
   rowNode.className = "question-row";

   rowNode.appendChild(NewCell(`${item.question_id}`));
   rowNode.appendChild(NewCell(`${item.question}`));
   rowNode.appendChild(NewCell(`${item.ans1}`));
   rowNode.appendChild(NewCell(`${item.topic}`));

   tableBody.appendChild(rowNode);
}

async function ClickButton() {
   const questions = await GetQuestions(0, "Marin");
   UpdateQuestionTable(questions);
}

async function SubmitNewQuestion() {

   let form = {
      question: document.getElementById('question').value,
      answer: document.getElementById('answer').value,
      topic: document.getElementById('topic').value
   };

   const result = await fetch('/abroquiz/submit', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
   });
   console.log(result);
}

async function NewQuiz(topic) {
   window.usedQuestions = [];
   window.correctAnswers = 0;
   window.numberOfQuestions = 3;
   window.numberOfoptions = 4;
   window.questions = await GetQuestions(0, topic);

   UpdateScoreKeeper();

   if (window.questions.length < window.numberOfQuestions) {
      alert("Error: too few questions!");
      return;
   }

   window.allAnswers = [];
   for (let q of window.questions) {
      if (q.ans1 != null) window.allAnswers.push(q.ans1);
   }
   NextQuestion();
}

function RandomBetween(low, high) {
   return Math.floor(Math.random() * (high - low) + low);
}

function Shuffle(array) {
   var currentIndex = array.length, temporaryValue, randomIndex;

   // While there remain elements to shuffle...
   while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
   }

   return array;
}

function NextQuestion() {
   if (window.usedQuestions.length == window.numberOfQuestions) {
      FinishGame();
      return;
   }

   let nextQuestionIndex = RandomBetween(0, window.questions.length);
   let nextQuestion = window.questions[nextQuestionIndex];
   window.questions.splice(nextQuestionIndex);
   window.usedQuestions.push(nextQuestion);
   window.rightAnswer = nextQuestion.ans1;

   let options = [];
   options.push(nextQuestion.ans1);
   while (options.length < window.numberOfoptions) {
      let answer = window.allAnswers[RandomBetween(0, window.allAnswers.length)];
      if (!options.includes(answer)) {
         options.push(answer);
      }
   }
   UpdateUIForNewQuestion(nextQuestion, options);
}

function UpdateUIForNewQuestion(question, options) {
   RemoveAllElementsWithClass('answerbtn');
   document.getElementById("question").textContent = question.question;
   let quizMain = document.getElementById("quiz-main");

   for (let opt of Shuffle(options)) {
      let button = document.createElement("div")
      button.name = opt;
      button.className = 'answerbtn';
      button.onclick = function () {
         AnswerQuestion(button.name);
      }
      button.innerHTML = `<h4 class="option-text">${opt}</h4>`;
      quizMain.appendChild(button);
   }
}

function AnswerQuestion(option) {
   if (option == window.rightAnswer) {
      window.correctAnswers++;
      alert("Correct");
   } else {
      alert("Wrong");
   }
   UpdateScoreKeeper();
   NextQuestion();
}

function FinishGame() {
   alert("Game finished!");
   NewQuiz("Marin");
}

function UpdateScoreKeeper() {
   document.getElementById("points").textContent = window.correctAnswers.toString();
   document.getElementById("questionsAnswered").textContent = window.usedQuestions.length.toString();
}