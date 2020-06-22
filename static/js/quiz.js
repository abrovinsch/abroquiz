const tableBody = document.getElementById("table-body")

async function GetQuestions(id) {
   const response = await fetch(`/questions/${id}`);
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
   rowNode.appendChild(NewCell(`${item.question_text}`));
   rowNode.appendChild(NewCell(`${item.answer_text}`));
   rowNode.appendChild(NewCell(`${item.question_type}`));

   tableBody.appendChild(rowNode);
}

async function ClickButton() {
   const questions = await GetQuestions(0);
   UpdateQuestionTable(questions);
}

async function SubmitNewQuestion() {

   let form = {
      question: document.getElementById('question').value,
      answer: document.getElementById('answer').value,
      quiz_id: parseInt(document.getElementById('topic').value),
      question_type: "learn_word_meaning"
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

async function NewQuiz() {
   window.questionResults = [];
   window.correctAnswers = 0;
   window.numberOfQuestions = 10;
   window.numberOfoptions = 4;
   window.questions = await GetQuestions(0);

   UpdateScoreKeeper();

   if (window.questions.length < window.numberOfQuestions) {
      alert("Error: too few questions!");
      return;
   }

   window.allAnswers = [];
   for (let q of window.questions) {
      if (q.answer_text != null) window.allAnswers.push(q.answer_text);
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
   if (window.questionResults.length == window.numberOfQuestions) {
      FinishGame();
      return;
   }

   let nextQuestionIndex = RandomBetween(0, window.questions.length);
   window.currentQuestion = window.questions[nextQuestionIndex];
   window.questions.splice(nextQuestionIndex, 1);

   let options = [];
   options.push(window.currentQuestion.answer_text);
   while (options.length < window.numberOfoptions) {
      let answer = window.allAnswers[RandomBetween(0, window.allAnswers.length)];
      if (!options.includes(answer)) {
         options.push(answer);
      }
   }
   UpdateUIForQuestion(options);
}

function UpdateUIForQuestion(options) {
   RemoveAllElementsWithClass('answerbtn');
   document.getElementById("question").textContent = window.currentQuestion.question_text;
   let quizMain = document.getElementById("quiz-main");

   for (let opt of Shuffle(options)) {
      let button = document.createElement("div")
      button.name = opt;
      button.className = 'answerbtn';
      button.onclick = function () {
         OnAnswerQuestion(button.name);
      }
      button.innerHTML = `<h4 class="option-text">${opt}</h4>`;
      quizMain.appendChild(button);
   }
}

function OnAnswerQuestion(option) {
   let correct = option == window.currentQuestion.answer_text;
   if (correct) {
      window.correctAnswers++;
      alert("Correct");
   } else {
      alert("Wrong");
   }
   // Perhaps should add time taken to answer too?
   window.questionResults.push({
      questionID: window.currentQuestion.question_id,
      answerGiven: option,
      correct: correct
   })
   UpdateScoreKeeper();
   NextQuestion();
}

function FinishGame() {
   alert(`Game finished\nScore: ${window.correctAnswers} / ${window.questionResults.length}`);
   NewQuiz();
}

function UpdateScoreKeeper() {
   document.getElementById("questionsAnswered").textContent = window.questionResults.length;
   document.getElementById("questionsInQuiz").textContent = window.numberOfQuestions;
   document.getElementById("score").textContent = window.correctAnswers.toString();
} 