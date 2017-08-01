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
2. Update api.js with your ApiMedic and Google Cloud Platorm Translation API (see instructions in api.js)
3. In your console, navigate to the directory where index.html is located
4. Run the following console command: python -m "SimpleHTTPServer" 8000
5. In your browser (Chrome works best), go to the URL localhost:8000   

## Walkthrough

[Video -- coming soon!]

## Development Process
* [1. Concept]
* [2. Initial Planning]
* [3. Accessing APIs]
* [4. Visualization]
* [5. Challenges and Successes!]

## If We Had More Time, we would...

* Spiff up design
* Improve results display
* Allow users to toggle between an anterior and posterior display
* Create zoom capability for selected body part
* Add instructions and welcome page for user
* Make the body 3D using an API like BioDigital (https://www.biodigital.com/)

## Closing Thoughts

## Acknowledgments

Thank you to our wonderful instructors at DigitalCrafts!
* **Chris Aquino** - [radishmouse](https://github.com/radishmouse)
* **Carl Severe** - [mutebard](https://github.com/mutebard)

## License 
Copyright <2017> <Jennifer Li Johnson, Nat Ventura Tim Brady>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.