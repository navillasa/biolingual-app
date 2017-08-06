# BioLingual

BioLingual is an interactive anatomy map that translates the names of body parts and commonly associated symptoms using ApiMedic and the Google Translate API.

## Authors

* **Jennifer Li Johnson** - [jenlij](https://github.com/jenlij)
* **Tim Brady** - [tfb414](https://github.com/tfb414)
* **Nat Ventura** - [nat-ventura](https://github.com/nat-ventura)

## Built With

* JavaScript ES6
* jQuery 3.2.1
* HTML5/CSS3
* [ApiMedic](https://apimedic.net/) - Medical Symptom Checker API
* [Google Translate](https://cloud.google.com/translate/) - Google Cloud Platform Translation API

## Getting Started

Since the APIs we used have a limited number of free queries, we are not hosting BioLingual live online. We've provided a demo video for a use case, but if you would like to try the application on your local machine, please follow these instructions.

#### Mac Instructions
1. Clone or download our repository
2. Update api.js with your ApiMedic and Google Cloud Platorm Translation API (see instructions in apikeys.js)
3. In your console, navigate to the directory where index.html is located
4. Run the following console command: python -m "SimpleHTTPServer" 8000
5. In your browser (Chrome works best), go to the URL localhost:8000   

## Demo
[Video -- coming soon!]

## Development Process
* [1. Concept]
* [2. Initial Planning]
    Notes:
    creating a mock up of the body and the menu
    creating a mock up of how and where the data will be displayed
    
* [3. Accessing APIs]
Notes:
    created based functions to access the api
    built gradually more complicated functions to access the API when clicked, then those accessed the other API - Natalie and i wrote a good snippet about this for the presentation tomorrow
* [4. Visualization]
Notes:
 within all of our promises we created a function to build out the information that was queried from the api's
Clickable body-- SVG madness
We decided not to use a jpeg or png for our person, because we knew that it would have to scale with our responsive design. So we decided to use scalable vector graphics (SVG) for both our person outline and highlighter shapes to maintain a clean look.
Because SVG files are just files full of coordinates, (maybe show pic here), we were able to go inside the SVG and label specific groups of coordinates as “head”, “foot”, or “leg”.
We attached IDs to each body part shape group, so we knew which body part information to send to the Google Translate API and ApiMedic.
Found a svg body outline from the internet. Used inkscape to trace sections of the body to turn into “body part” elements.
When you click a body part, it pulls the element ID of that body part, and sends that to ApiMedic. ApiMedic then gives us a list of all symptoms associated with that body part. For each symptom in that list, we send a request to the Google Translate API to translate each symptom. Then gather the translations returned from the Google Translate API and combine those translations with  API’s data into one dictionary. We then draw our results to the DOM, which displays in a table.
Result box
Required generating a box full of the translated information AND symptoms with every click.
A new box is generated every time you click a body part. The whole box is deleted every time the x-box is clicked.

* [5. Challenges and Successes!]
Notes:
Since a major objective of this project was to understand and execute promise chains, our architecture did not account for flexibility of adding or changing features easily
Getting the results to live update when you select the menu option as well as the body part
Asynchronous API load times
API keys not free and required refresh every so many data calls
problems with the image loading before the document.ready fired off. So we had to inject the file into the dom with the document.ready
    design - struggled with getting the menu to go over the guy
    challenges with the language dropdown updating when that was changed and not just when the body was clicked
    creating the SVG file and being able to access it

## If We Had More Time, we would...

* Spiff up design
* Improve results display
* Allow users to toggle between an anterior and posterior display
* Create zoom capability for selected body part
* Add instructions and welcome page for user
* Add more organs, organ systems, and associated illnesses
* Make the body 3D using an API like [BioDigital](https://www.biodigital.com/)
* Architect API calls to be more modular


## Closing Thoughts
If we had a lot more time and resources, we could imagine making this application a translation tool for hospitals and medical centers to assist communication between patients and providers.  

## Acknowledgments

Thank you to our wonderful instructors at DigitalCrafts!
* **Chris Aquino** - [radishmouse](https://github.com/radishmouse)
* **Carl Severe** - [mutebard](https://github.com/mutebard)

## Disclaimer
This application does NOT replace professional medical help. If you have a medical issue. please see a physician or call 911. 

## License 
Copyright <2017> <Jennifer Li Johnson, Nat Ventura, Tim Brady>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

