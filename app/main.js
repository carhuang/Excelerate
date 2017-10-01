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
    
            renderDonutChart(quizDonutData);
    
            console.log(quizBarData);
            console.log(quizDonutData);
            console.log(units);
        });
    
        d3.csv("../data/quiz1b.csv", processQuiz, function (err, data) {
            if (err) throw err;
            console.log(data);
    
            var quizBarData = getQuizBarData(data);
            var quizDonutData = getQuizDonutData(quizBarData);
    
            console.log(quizBarData);
            console.log(quizDonutData);
            console.log(units);
        });
    
        d3.csv("../data/quiz2a.csv", processQuiz, function (err, data) {
            if (err) throw err;
            console.log(data);
    
            var quizBarData = getQuizBarData(data);
            var quizDonutData = getQuizDonutData(quizBarData);
    
            console.log(quizBarData);
            console.log(quizDonutData);
            console.log(units);
        });
    
        d3.csv("../data/quiz2b.csv", processQuiz, function (err, data) {
            if (err) throw err;
            console.log(data);
    
            var quizBarData = getQuizBarData(data);
            var quizDonutData = getQuizDonutData(quizBarData);
    
            console.log(quizBarData);
            console.log(quizDonutData);
            console.log(units);
        });
    
    
        function getQuizDonutData(data) {
            var correct = 0;
            var wrong = 0;
    
            for (var i = 0; i < data.length; i++) {
                correct = correct + data[i].correct;
                wrong = wrong + data[i].incorrect;
            }
    
            var numQuestions = correct + wrong;
            var toCorrect = correct / numQuestions;
            var perCorrect = toCorrect.toFixed(2)
            var toIncorrect = wrong / numQuestions;
            var perIncorrect = toIncorrect.toFixed(2)
            var dataset = [
                { state: 'Correct', percent: perCorrect },
                { state: 'Incorrect', percent: perIncorrect }
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
    
    
        function renderDonutChart(data) {
            var text = "";
    
            var width = 260;
            var height = 260;
            var thickness = 40;
            var duration = 750;
    
            var radius = Math.min(width, height) / 2;
            var color = d3.scaleOrdinal(d3.schemeCategory10);
    
            var svg = d3.select("#chart")
                .append('svg')
                .attr('class', 'pie')
                .attr('width', width)
                .attr('height', height);
    
            var g = svg.append('g')
                .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');
    
            var arc = d3.arc()
                .innerRadius(radius - thickness)
                .outerRadius(radius);
    
            var pie = d3.pie()
                .value(function (d) { return d.percent; })
                .sort(null);
    
            var path = g.selectAll('path')
                .data(pie(data))
                .enter()
                .append("g")
                .on("mouseover", function (d) {
                    let g = d3.select(this)
                        .style("cursor", "pointer")
                        .style("fill", "black")
                        .append("g")
                        .attr("class", "text-group");
    
                    g.append("text")
                        .attr("class", "state-text")
                        .text(`${d.data.state}`)
                        .attr('text-anchor', 'middle')
                        .attr('dy', '-1.2em');
    
                    g.append("text")
                        .attr("class", "percent-text")
                        .text(`${d.data.percent}`)
                        .attr('text-anchor', 'middle')
                        .attr('dy', '.6em');
                })
                .on("mouseout", function (d) {
                    d3.select(this)
                        .style("cursor", "none")
                        .style("fill", color(this._current))
                        .select(".text-group").remove();
                })
                .append('path')
                .attr('d', arc)
                .attr('fill', (d, i) => color(i))
                .on("mouseover", function (d) {
                    d3.select(this)
                        .style("cursor", "pointer")
                        .style("fill", "black");
                })
                .on("mouseout", function (d) {
                    d3.select(this)
                        .style("cursor", "none")
                        .style("fill", color(this._current));
                })
                .each(function (d, i) { this._current = i; });
    
    
            g.append('text')
                .attr('text-anchor', 'middle')
                .attr('dy', '.35em')
                .text(text);
        }
    
    });
        
    