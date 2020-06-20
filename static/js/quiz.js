const questionList = document.getElementById("questionlist")

async function GetQuestions(id, topic) {
   const response = await fetch(`/questions/${id}/${topic}`);
   const result = await response.json();

   questionList.textContent = "";

   for(let item of result) {
      AddQuestionToList(item);
   }

}

function AddQuestionToList(item) {
   let listNode = document.createElement("LI")
   let textNode = document.createTextNode(`${item.question} = ${item.ans1}`);
   listNode.appendChild(textNode);
   questionlist.appendChild(listNode);
}

function ClickButton() {
   questionList.textContent = "loading";
   GetQuestions(0, "båt");
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
