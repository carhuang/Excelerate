$(document).ready(function () {
    console.log("on load");

//     var quiz1a = quizChart();
//
//     d3.csv("../data/quiz1a.csv", sumCorrect, function(err, data) {
//     if (err) throw err;
//     console.log(data);
//     d3.select('#quiz1a')
//             .datum(data)
//             .call(quiz1a);
// });


    // function quizChart() {
    //     var width = 960,
    //         height = 500,
    //         margin = {top:10, right: 10, bottom:10, left:10},
    //         colour = d3.scaleOrdinal(d3.schemeCategory20c),
    //         padAngle = 0.015,
    //         cornerRadius = 3;
    //
    // }

    d3.csv("../data/quiz1a.csv", sumCorrect, function(err, data) {
if (err) throw err;
console.log(data);
console.log(lastPerCorrect);
console.log(lastPerIncorrect);
});
var numCorrect = 0;
var numIncorrect = 0;
var numRows = 0;
var lastPerCorrect = 0;
var lastPerIncorrect = 0;
function sumCorrect(d) {
    var correctVal;
    if (d.Correct == "1") {
        correctVal = 1;
        numRows ++;
   } else {
    correctVal = 0;
    numRows ++;
   }
    if (correctVal == 1){
    numCorrect ++;
    numIncorrect = numRows - numCorrect;}
    var perCorrect = numCorrect/numRows;
    var perIncorrect = numIncorrect/numRows;
    lastPerCorrect = perCorrect;
    lastPerIncorrect = perIncorrect;
     return {
       perCorrect, perIncorrect
        //Question: d.QuestionCode, Unit: d.Unit, perCorrect, perIncorrect
        //numCorrect, numIncorrect,
        //Unit: d.Unit, Correct: d.Correct, correctVal, numCorrect, numIncorrect
    }
      var dataset = [
      {state: 'Correct', percent: lastPerCorrect},
      {state: 'Incorrect', percent: lastPerIncorrect}
    ];
    var width = 360;
    var height = 360;
    var radius = Math.min(width, height) / 2;

  };
});

