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

## Walkthrough
[Video -- coming soon!]

## Development Process
* [1. Concept]

* [2. Initial Planning]
    creating a mock up of the body and the menu
    creating a mock up of how and where the data will be displayed
    
* [3. Accessing APIs]
    created based functions to access the api
    built gradually more complicated functions to access the API when clicked, then those accessed the other API - Natalie and i wrote a good snippet about this for the presentation tomorrow
* [4. Visualization]
    within all of our promises we created a function to build out the information that was queried from the api's
* [5. Challenges and Successes!]
    problems with the image loading before the document.ready fired off. So we had to inject the file into the dom with the document.ready
    design - struggled with getting the menu to go over the guy
    challenges with the language dropdown updating when that was changed and not just when the body was clicked
    creating the SVG file and being able to access it




## If We Had More Time, we would...

* Spiff up design
* Make body part stay highlighted on click
* Improve results display
* Allow users to toggle between an anterior and posterior display
* Create zoom capability for selected body part
* Add instructions and welcome page for user
* Add more organs, organ systems, and associated illnesses
* Make the body 3D using an API like [BioDigital](https://www.biodigital.com/)

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

