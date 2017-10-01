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

        // console.log(quizBarData);
        // console.log(quizDonutData);
        // console.log(units);

        renderQuizBarGraph(quizBarData, '#quizChart1');


    });

    function renderQuizBarGraph(data, div) {
        var margin = {top: 20, right: 20, bottom: 20, left: 20};
        var width = +svg.attr("width") - margin.left - margin.right,
            height = +svg.attr("height") - margin.top - margin.bottom;
        var svg = d3.select(div),
            margin = {top: 20, right: 20, bottom: 20, left: 20},
            width = +svg.attr("width") - margin.left - margin.right,
            height = +svg.attr("height") - margin.top - margin.bottom,
            g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        const unitCorrectness = ["correct", "incorrect"];

        var x = d3.scale.ordinal()
            .rangeRoundBands([0, width]);
        var y = d3.scale.linear()
            .rangeRound([height, 0]);
        var z = d3.scaleOrdinal()
            .range(["#EA001F", "#5C9932"]);
        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");
        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");
        var layers = d3.layout.stack()(unitCorrectness.map(function (c) {
            return data.map(function (d) {
                return {y1: d.correct, y: d.incorrect};
            });
        }));
        x.domain(layers[0].map(function (d) {
            return d.x;
        }));
        y.domain([0, d3.max(layers[layers.length - 1], function (d) {
            return d.y0 + d.y;
        })]).nice();

        var layer = svg.selectAll(".layer")
            .data(layers)
            .enter().append("g")
            .attr("class", "layer")
            .style("fill", function (d, i) {
                return z(i);
            });

        layer.selectAll("rect")
            .data(function (d) {
                return d;
            })
            .enter().append("rect")
            .attr("x", function (d) {
                return x(d.x);
            })
            .attr("y", function (d) {
                return y(d.y + d.y0);
            })
            .attr("height", function (d) {
                return y(d.y0) - y(d.y + d.y0);
            })
            .attr("width", x.rangeBand() - 1);

        svg.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "axis axis--y")
            .attr("transform", "translate(" + width + ",0)")
            .call(yAxis);

    }

    d3.csv("../data/quiz1b.csv", processQuiz, function (err, data) {
        if (err) throw err;
        console.log(data);

        var quizBarData = getQuizBarData(data);
        var quizDonutData = getQuizDonutData(quizBarData);

        // console.log(quizBarData);
        // console.log(quizDonutData);
        // console.log(units);
    });

    d3.csv("../data/quiz2a.csv", processQuiz, function (err, data) {
        if (err) throw err;
        console.log(data);

        var quizBarData = getQuizBarData(data);
        var quizDonutData = getQuizDonutData(quizBarData);

        // console.log(quizBarData);
        // console.log(quizDonutData);
        // console.log(units);
    });

    d3.csv("../data/quiz2b.csv", processQuiz, function (err, data) {
        if (err) throw err;
        console.log(data);

        var quizBarData = getQuizBarData(data);
        var quizDonutData = getQuizDonutData(quizBarData);

        // console.log(quizBarData);
        // console.log(quizDonutData);
        // console.log(units);
    });


    function getQuizDonutData(data) {
        var correct = 0;
        var wrong = 0;

        for (var i = 0; i < data.length; i++) {
            correct = correct + data[i].correct;
            wrong = wrong + data[i].incorrect;
        }

        var numQuestions = correct + wrong;
        var perCorrect = correct / numQuestions;
        var perIncorrect = wrong / numQuestions;
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