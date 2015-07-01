
var feedDistributionData = {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    datasets: [
        {
            label: "Percentage of total feeds",
            fillColor: "rgba(151,187,205,0.5)",
            strokeColor: "rgba(151,187,205,0.8)",
            highlightFill: "rgba(151,187,205,0.75)",
            highlightStroke: "rgba(151,187,205,1)",
            data: [4.38, 3.50, 2.84, 1.96, 1.06, 0.51, 0.184, 0.028, 0.004, 0.0006, 0.0001, 0]
        }
    ]
};

new Chart(document.getElementById("feed-distribution").getContext("2d")).Bar(feedDistributionData, {});	

var entryDistributionData = {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    datasets: [
        {
            label: "Percentage of total entries",
            fillColor: "rgba(151,187,205,0.5)",
            strokeColor: "rgba(151,187,205,0.8)",
            highlightFill: "rgba(151,187,205,0.75)",
            highlightStroke: "rgba(151,187,205,1)",
            data: [0.599, 0.234, 0.490, 0.512, 0.586, 0.232, 0.116, 0.030, 0.005, 0.001, 0.000]
        }
    ]
};


new Chart(document.getElementById("entry-distribution").getContext("2d")).Bar(entryDistributionData, {});	
