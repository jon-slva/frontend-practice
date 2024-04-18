# Cro Metrics Experiment Engineer Application

Thanks for your interest in working with us! To apply:

- Create a new * secret * gist(link in github header once you're logged in) with the Raw Text of this .md file (**do not fork this gist**). Please name your gist `application.md` so that it's formatted correctly(not a.txt file)
	- Answer the following questions in the spaces provided respond to the email that linked you here with a link to your gist.
- Once we receive your submission and all looks well, we’ll reach out for next steps.If you have any questions / concerns about the process please reach out to michael.verthein@crometrics.com.We're happy to address anything before you submit.
	- If you come across anything that doesn't make sense, or if you find yourself spending more than 90 minutes completing the exercise, please reach out to michael.verthein@crometrics.com.  We're constantly experimenting with our processes and would love to hear any feedback that you might have.

---

	For questions 1 - 4, consider the following HTML:

```
<!DOCTYPE html>
<html lang="en">
<head>
    <style>
        [data-color="red"] { color: red; }
        [data-color="blue"] { color: blue; }
        [data-color="green"] { color: green; }
        [data-color="orange"] { color: orange; }
        [data-color="purple"] { color: purple; }
    </style>
    <script>
        window.myHandler = function () {
            console.log('Click!');
        };

        window.getRandomNumber = function (max) {
            return Math.floor(Math.random() * max)
        }

        var colors = ['red', 'blue', 'green', 'orange', 'purple'];
        window.changeHeadlineColor = function (croHeadline) {
            var random = getRandomNumber(5000);
            var randomString = random.toString();
            setTimeout(() => {
                var colorKey = (randomString.length < 4) ? 0 : parseInt(randomString.charAt(0));
                croHeadline.setAttribute('data-color', colors[colorKey]);
                changeHeadlineColor(croHeadline);
            }, random);
        };
    </script>
    <script>
        ////////////////////
        /* YOUR CODE HERE */
        ////////////////////
    </script>
</head>

<body>
    <div id="myDiv">OMG Click me!</div>
    <script>
        document.querySelector('#myDiv').addEventListener('click', myHandler);

        setTimeout(() => {
            myDiv.insertAdjacentHTML('beforebegin', '<h1 id="cro-headline" data-color="red">Cro Metrics</h1>');
            var croHeadline = document.querySelector('#cro-headline');
            changeHeadlineColor(croHeadline);
        }, getRandomNumber(5000));
    </script>
</body>

</html>
```

## Handling Clicks

	** Question 1:**

		What would you write in the`YOUR CODE HERE` section to ** _add a new click handler_ ** to the `#myDiv` element ?

			The handler should use `console.log()` to tell us something interesting about your development background, for example:

				`console.log('I know FORTRAN lol long story');`.

Your response:
```
document.querySelector('#MyDiv').addEventListener('click', function() {
    console.log('My first experience with programming was scripting with the Warcraft III World Editor.');
})
```

---

** Question 2:**

	Rewrite your solution to Question 1. Make sure your `console.log()` executes every time a visitor clicks`#myDiv`, but ** _do not add a new handler_ ** and retain the original behavior.Monkey patching is acceptable.

Your response:
```
const origClick = document.querySelector('#myDiv').onclick

document.querySelector('#myDiv').onclick = function(event) {
    if (origClick) {
    origClick.call(this, event);
    }
    console.log('My first experience with programming was scripting with the Warcraft III World Editor.')
};

```

---

## Modifying an element

	** Question 3:**

		Write code in `YOUR CODE HERE` that changes the Cro Metrics headline text with another string of your choosing. 

Your response:
```
function waitForCroHeadline() {
    const croHeadline = document.querySelector('#cro-headline');
    if (croHeadline) {
        croHeadline.textContent = "Welcome to Cro Metrics";
    } else {
        setTimeout(waitForCroHeadline, 100);
    }
}
waitForCroHeadline();
```

---


** Question 4:**

	Write code in `YOUR CODE HERE` that logs the current and previous values of the data - color attribute on the #cro - headline element each time that the attribute changes.Your log statement should look something like this:
`console.log('Current color: ' + currentColor + ' | Previous Color: ' + previousColor);`

Your response:
```
let element = document.querySelector('#cro-headline');
let previousColor = element.getAttributes('data-color');

let observer = new MutationObserver((mutations) => {
	mutations.forEach((mutation) => {
		if mutation.type === 'attributes' && mutation.attributeName === 'data-color') {
			let currentColor = element.getAttriute('data-color');
			console.log('Current color: ' + currentColor + ' | Previous Color: ' + previousColor);
			previousColor = currentColor;
		}
	})
});

observer.observe(element, { attributes: true });

```

## Regex fu

	** Question 5:**

		Our client, bacondelivery.com, is launching a test on all product pages.Write a JavaScript function that takes in a URL, evaluates the URL for a regex match, and returns true or false depending on whether or not the URL matches your regex string.  

The first 3 URLs passed into your function should return true, and the last 4 URLs should return false.

Your code should look something like this example:
```
function myRegexFunction(url) {
  // do the thing
}

// Should return true
console.log('1 - ', myRegexFunction('www.bacondelivery.com/weekly-bacon-delivery/'));
console.log('2 - ', myRegexFunction('www.bacondelivery.com/daily-bacon-delivery/'));
console.log('3 - ', myRegexFunction('www.bacondelivery.com/bacon-of-the-month-club/'));

// Should return false
console.log('4 - ', myRegexFunction('www.bacondelivery.com/'));
console.log('5 - ', myRegexFunction('www.bacondelivery.com/?some_param'));
console.log('6 - ', myRegexFunction('www.bacondelivery.com/about/'));
console.log('7 - ', myRegexFunction('www.bacondelivery.com/contact-us/'));
```

Your response:
```
/* Question 5 Answer Here */
```

---

## Stylin'

	** Question 6:**

		Share a link to an original CodePen / JSFiddle that implements this:

![Boxes with hover animation](http://uploads.crometrics.com/7P8x/4F9VmEDq.gif)

	Don't worry about pixel perfection; just eyeball it.

	Your response:
		```
/* Question 6 Link Here */
```

---

## jQueryin'

	** Question 7:**

		How could you improve the following code ? Be sure that you don't change any functionality.

			```
$(document).ready(function() {
  $('.foo #bar').css('color', 'red');
  $('.foo #bar').css('border', '1px solid blue');
  $('.foo #bar').text('new text!');
  $('.foo #bar').click(function() {
    $(this).attr('title', 'new title');
    $(this).width('100px');
  });

  $('.foo #bar').click();
});
```

Your response:
```
/* Question 7 jQuery Here */
```

Re - write your solution using plain JavaScript:
	```
/* Question 7 JavaScript Here */
```


---

## Behaviors

	** Question 8:**

		What code could run before the following statement that would make it evaluate to true ?

			```
'bc'.prefix('a') === 'abc';
```

Your response:
```
/* Question 8 Code/Comments Here */
```