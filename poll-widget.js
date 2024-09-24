let currentQuestionIndex = 0;
let selectedAnswers = [];

function createPoll(question, options) {
  const pollContainer = document.getElementById("poll-container");

  const pollHtml = `
    <div class="poll-question">${currentQuestionIndex + 1}. ${question}</div>
    <ul class="poll-options">
      ${options
        .map(
          (option, index) => `
        <li><input type="radio" name="option" id="option-${index}" value="${index}"><label for="option-${index}">${option}</label></li>
      `
        )
        .join("")}
    </ul>
    <button id="nextButton" onclick="nextQuestion()">Next</button>
  `;

  pollContainer.innerHTML = pollHtml;
}

function nextQuestion() {
  const selectedOption = document.querySelector('input[name="option"]:checked');

  if (!selectedOption) {
    alert("Please select an option!");
    return;
  }

  // Store the selected answer
  selectedAnswers.push(parseInt(selectedOption.value));

  // Increment the question index or redirect to the results page if it’s the last question
  currentQuestionIndex++;

  if (currentQuestionIndex < pollData.length) {
    // Show the next question
    createPoll(
      pollData[currentQuestionIndex].question,
      pollData[currentQuestionIndex].options
    );
  } else {
    // Save the answers to localStorage and redirect to results
    localStorage.setItem("pollResults", JSON.stringify(selectedAnswers));
    localStorage.setItem(
      "pollOptions",
      JSON.stringify(pollData.map((poll) => poll.options))
    );
    window.location.href = "results.html";
  }
}

// Fetch the JSON file and start with the first question
let pollData = [];
fetch("pollData.json")
  .then((response) => response.json())
  .then((data) => {
    pollData = data.polls;

    createPoll(
      pollData[currentQuestionIndex].question,
      pollData[currentQuestionIndex].options
    );
  })
  .catch((error) => console.error("Error loading poll data:", error));
