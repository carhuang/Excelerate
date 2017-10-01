$(document).ready(function () {

    // declare object class Unit
    function UnitObj(name, correct, incorrect) {
        this.name = name;
        this.correct = correct;
        this.incorrect = incorrect;
    }
    var units = [];

    d3.csv("../data/quiz1a.csv", processQuiz, function (err, data) {
        if (err) throw err;
        console.log(data);

        var quizBarData = getQuizBarData(data);
        var quizDonutData = getQuizDonutData(quizBarData);

        console.log(quizBarData);
        console.log(quizDonutData);
    });

    function getQuizDonutData(data) {
            var correct = 0;
            var wrong = 0;

            for (var i = 0; i < data.length; i++) {
                correct = correct + data[i].correct;
                wrong = wrong + data[i].incorrect;
            }

            var numQuestions = correct + wrong;
            var perCorrect = correct/numQuestions;
            var perIncorrect = wrong/numQuestions;
            var dataset = [
                {state: 'Correct', percent: perCorrect},
                {state: 'Incorrect', percent: perIncorrect}
            ];
            return dataset;
        }

        function getQuizBarData(data) {
            var quizUnits = [];
            data.forEach(function (quiz) {
                if (unitExists(quiz.Unit, quizUnits)) {
                    quizUnits = unitUpdate(quiz.Unit, quiz.Correct, quizUnits);
                    units = unitUpdate(quiz.Unit, quiz.Correct, units);
                } else {
                    quizUnits = addUnit(quiz.Unit, quiz.Correct, quizUnits);
                    if (unitExists(quiz.Unit, units)) {
                        units = unitUpdate(quiz.Unit, quiz.Correct, units);
                    } else {
                        units = addUnit(quiz.Unit, quiz.Correct, units);
                    }
                }
            });

            return quizUnits;
        }

    function processQuiz(d) {
        return {
            Unit: d.Unit, Correct: d.Correct
        }
    }

    function unitUpdate(unit, correctness, arr) {
        arr.forEach(function (e) {
            if (e.name == unit) {
                if (correctness == "1") {
                    e.correct++;
                } else {
                    e.incorrect++;
                }
            }
        });
        return arr;
    }

    function unitExists(unit, arr) {
        console.log("in unitexist check");
        if (arr.length > 0) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].name.toString() == unit) return true;
            }
        }
        return false;
    }

    function addUnit(unit, correctness, arr) {
        if (correctness == "1") {
            var newUnit = new UnitObj(unit, 1, 0);
        } else {
            var newUnit = new UnitObj(unit, 0, 1);
        }
        arr.push(newUnit);
        return arr;
    }


});