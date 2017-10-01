$(document).ready(function () {

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
    // }/* 

    d3.csv("../data/quiz1a.csv", sumCorrect, function (err, data) {
        if (err) throw err;
        console.log(data);
        console.log(perCorrect);
        console.log(perIncorrect);

        // data for pie chart
        var data = [
            {name: "Correct", value: perCorrect},
            {name: "Incorrect", value: perIncorrect},
        ];

        //Copied code from somewhere to display two colour donut chart
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
            .value(function (d) {
                return d.value;
            })
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
                    .attr("class", "name-text")
                    .text(`${d.data.name}`)
                    .attr('text-anchor', 'middle')
                    .attr('dy', '-1.2em');

                g.append("text")
                    .attr("class", "value-text")
                    .text(`${d.data.value}`)
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
            .attr('fill', (d, i) = > color(i)
    )
    .
        on("mouseover", function (d) {
            d3.select(this)
                .style("cursor", "pointer")
                .style("fill", "black");
        })
            .on("mouseout", function (d) {
                d3.select(this)
                    .style("cursor", "none")
                    .style("fill", color(this._current));
            })
            .each(function (d, i) {
                this._current = i;
            });


        g.append('text')
            .attr('text-anchor', 'middle')
            .attr('dy', '.35em')
            .text(text);

    });
    //end of copied code to display two colour donut chart

    //local variables to perform on parsed data from quiz.csv files
    var numCorrect = 0;
    var numIncorrect = 0;
    var numRows = 0;
    var perCorrect = 0;
    var perIncorrect = 0;

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
            //acculmulate number total correct/incorrect, while iterating through the rows
            numCorrect++;
            numIncorrect = numRows - numCorrect;
        }

        //calculate the return values as fractions out of 100 (like percentage)
        //but I can't find a way for the donut chart to interpret percentages meaninfully and display it
        //so it's in decimal for now
        perCorrect = numCorrect / numRows;
        perCorrect = perCorrect.toFixed(2);
        perIncorrect = numIncorrect / numRows;
        perIncorrect = perIncorrect.toFixed(2);

        return {
            perCorrect, perIncorrect
        }
    };

});

