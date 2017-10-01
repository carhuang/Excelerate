$(document).ready(function () {

    var unit1Correct = 0;
    var unit1Wrong = 0;
    var unit2Correct = 0;
    var unit2Wrong = 0;
    var unit3Correct = 0;
    var unit3Wrong = 0;

    // declare object class Unit
    function Unit(name) {
        this.name = name;
        this.correct = 0;
        this.incorrect = 0;
    }
    var units = [];

    d3.csv("../data/quiz1a.csv", processQuiz, function (err, data) {
        if (err) throw err;
        console.log(data);
        var numQuestions = 0;
        var u1Correct = 0;//
        var u1Wrong = 0;//
        var quizUnits = [];
        var quizDonutData = getQuizDonutData(data);
        var quizBarData = [];

        function getQuizDonutData(data) {
            data.forEach(function (quiz) {           //hardcoded for now
                numQuestions++;
                console.log(quiz);
                if (unitExists(quiz.Unit, quizUnits)){


                }
                if (quiz.Unit == "1") {
                    if (quiz.Correct == "1") {
                        unit1Correct++;
                        u1Correct++;
                    } else {
                        unit1Wrong++;
                        u1Wrong++;
                    }
                }
            });
            console.log(numQuestions);
            console.log(u1Correct);
            console.log(u1Wrong);
            console.log(unit1Correct);
            console.log(unit1Wrong);
            var perCorrect = u1Correct/numQuestions;
            var perIncorrect = u1Wrong/numQuestions;
            var dataset = [
                {state: 'Correct', percent: perCorrect},
                {state: 'Incorrect', percent: perIncorrect}
            ];
            return dataset;
        }
        
        
        function getQuizBarData() {
            var dataset = [
                {unit: }
            ]
        }
    });

    function processQuiz(d) {
        return {
            Unit: d.Unit, Correct: d.Correct
        }
    }

    function unitExists(unit, arr) {
        if (arr.length > 0) {
            arr.forEach(function (e) {
                if (e.name == unit) return true;
            });
        }
        return false;
    }


});