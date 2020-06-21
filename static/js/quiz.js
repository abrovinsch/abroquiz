const tableBody = document.getElementById("table-body")

async function GetQuestions(id, topic) {
   RemoveOldQuestions();

   const response = await fetch(`/questions/${id}/${topic}`);
   const result = await response.json();

   questionList.textContent = "";

   for (let item of result) {
      AddQuestionToList(item);
   }

}

function NewCell(text) {
   let cell = document.createElement("td");
   cell.textContent = text;
   return cell;
}

function RemoveOldQuestions() {
   var elements = document.getElementsByClassName('question-row');

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

function ClickButton() {
   questionList.textContent = "loading";
   GetQuestions(0, "Marin");
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
