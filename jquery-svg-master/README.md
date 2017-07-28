# jquery-svg
A lightweight jQuery plugin to apply css styles and js scripts to a SVG which is embedded (using the &lt;object> tag).
## Usage
    
1. Include jQuery:

	```html
	<script src="../lib/jquery.min.js"></script>
	```

2. Include plugin's code:

	```html
	<script src="../dist/jquery.svg.es5.min.js"></script>
	```

3. Call the plugin:

	```javascript
        window.onload = function(){
            
                //apply embed css to the svg object
                $("#cars").setSVGStyle(style);
                //or
                //apply css by stylesheet link
                $("#cars").setSVGStyleLink(stylepath);

                //get svg object, like a jquery object
                var svg = $("#cars").getSVG();
                //use jquery functions to do some thing
                svg.find("g path:first-child()").attr('fill', color);
                
            };
	```

## Demo
  - [test with embed css](http://mberneti.github.io/jquery-svg/) 
  - [test with linked css](http://mberneti.github.io/jquery-svg/test-linked-css.html) 
