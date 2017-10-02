# Excelerate
Built by Jillian Kong, Quinn Hou, and Carly Huang,

## Inspiration
We identified a huge gaps in learning progress and test assessment, where students too often receive an overall course mark, look at it, and leave it behind. 
What's lacking is a quick and accessible breakdown on learning progress, whether it be a progress tracker for individual students or class data for instructors. 

## What it does
Excelerate analyzes scattered individual assessment results into meaningful representations on a visual dashboard. 

Individual assessment results from quizzes/exams and displays the aggregated data onto a dashboard. 
Excelerate's dashboard includes the following features:
* provides a breakdown of course topics, specifically how the student is performing for each unit in the course, 
* identifies a class's weakest and strongest areas in the course by aggregating class data
* helps instructors tailor teaching materials to improve weaker units 

## How we built it
* Input: Read quiz results from .csv files. Quiz results included questions, associated units, student answer, and correct answer)
* Data Analysis: Parsed the .csv files with javascript and analyzed the data to output uniform datasets objects.
* Output: Used d3.js to render analyzed data into interactive donut charts, bar graphs, aster charts, and line graphs, with detailed descriptions and labels. 

## Challenges we ran into
Time was a luxury for a 3 person team in a 24 hour hackathon!
We realized our initial project scope was too ambitious (we wanted to build/integrate the an in-app quiz feature and a database storing all results with mySQL). 
We regrouped (and had a very positive discussion) about what we thought we were capable of completing, and ended up completing a minimally viable product.

## Accomplishments that we're proud of
We were extremely adaptive in changing directions, as well as learning d3.js on a spot. 

## What we learned
We learned pretty thoroughly the tech stack we were using, such as d3.js, javascript, and aws. We learned that there are a ton of areas in education that needs work, and that we can use ours apps to slowly push for systematic change. 

## What's next for Excelerate
Next, we want to build out the back end and integrate an interactive quiz feature, so that users can see real-live results on the go. 
