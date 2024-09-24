// Retrieve poll results and options from localStorage
const pollResults = JSON.parse(localStorage.getItem("pollResults")) || [];
const pollOptions = JSON.parse(localStorage.getItem("pollOptions")) || [];

// Function to count the number of votes for each option
function countVotes(options, results) {
  return options.map((optionSet, questionIndex) => {
    const voteCounts = new Array(optionSet.length).fill(0);
    const selectedOption = results[questionIndex];

    if (selectedOption !== undefined) {
      voteCounts[selectedOption]++;
    }

    return voteCounts;
  });
}

// Count votes for each question
const voteCounts = countVotes(pollOptions, pollResults);

// Generate labels and data for the chart
const labels = pollOptions
  .map((optionSet, questionIndex) => {
    return optionSet.map((option, index) => `Q${questionIndex + 1}: ${option}`);
  })
  .flat();

const data = voteCounts.flat();

// Create the bar chart using Chart.js
const ctx = document.getElementById("resultsChart").getContext("2d");
const resultsChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: labels,
    datasets: [
      {
        label: "Number of Votes",
        data: data,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Votes",
        },
      },
      x: {
        title: {
          display: true,
          text: "Options",
        },
      },
    },
  },
});
