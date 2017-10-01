$(document).ready(function () {

    d3.csv("../data/quiz1a.csv", processQuiz, function (err, data) {
        if (err) throw err;
        console.log(data);
        data.forEach()
        // console.log(lastPerCorrect);
        // console.log(lastPerIncorrect);
    });
    var numCorrect = 0;
    var numIncorrect = 0;
    var numRows = 0;
    var lastPerCorrect = 0;
    var lastPerIncorrect = 0;

    function processQuiz(d) {
        return {
            Unit: d.Unit, Correct: d.Correct
        }
    }

    function sumCorrect(d) {
        var correctVal;
        if (d.Correct == "1") {
            correctVal = 1;
            numRows++;
        } else {
            correctVal = 0;
            numRows++;
        }
        if (correctVal == 1) {
            numCorrect++;
            numIncorrect = numRows - numCorrect;
        }
        var perCorrect = numCorrect / numRows;
        var perIncorrect = numIncorrect / numRows;
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