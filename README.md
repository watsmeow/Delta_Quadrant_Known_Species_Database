# Delta_Quadrant_Known_Species_Database
A full stack CRUD application made for hardcore trekkies and general fans with an interactive map and corresponding database.

**View here:** https://delta-quadrant-species.herokuapp.com/

![DQD](https://user-images.githubusercontent.com/99840213/183674849-7aec5390-f29e-48cb-ab6f-fbbcaaea51c4.JPG)

## How It's Made:

**Tech used:** HTML, CSS, JavaScript, EJS, Node, Express, MongoDB, Multer

This project is a full stack CRUD application built using Node and utilizing a Mongo database. It is meant to be an immersive Star Trek themed experience. The user enters though a landing page that puts the app into the context of Trek canon. The user can then view the CSS driven interactive star map, which allows them to drill down on alien species by clicking on their territory (EJS is used to populate database information into the UI as requested by the user). The user can then choose to view the full species information, which includes "encounters" (Star Trek Voyager episodes), and can add to the database of encounters including image upload. 
The code structure of this program uses MVC folder structure to keep the back and front ends well organized and modular. 

## Optimizations

A neat feature of this application is that the map pop up box only is hard coded once, and is populated by an onClick function. This may sound simple, but took some work with Stringifying the database in order for it to interact appropriately with the HTML. 

## Lessons Learned:

There were many lessons learned during this project. I came up against some of the limitations of EJS that would not have been an issue if using React. Also, although I'm not a designer, I tried my best to keep the look and feel of the LCARS shell CSS template that I employed (big thanks to Jim Robertus at www.TheLCARS.com). 
