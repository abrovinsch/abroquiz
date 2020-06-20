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
