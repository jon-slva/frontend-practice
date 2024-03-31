



// Using fetch with then/catch


function fetchData() {
	fetch("https://api.publicAndPromises.org/entries")
		.then(response => response.json())
		.then(data => {
			console.log("Fetch", data);
			// set your state here
		})
		.catch(error => console.error(error));
}


//Using fetch with async/await


async function fetchData() {
	try {
		const response = await fetch("https://api.publicAndPromises.org/entries");
		const data = await response.json();
		console.log("Fetch", data);
		// set your state here
	} catch (error) {
		console.error(error);
	}
}


// Using axios with then/catch


function fetchData() {
	axios.get("https://api.publicAndPromises.org/entries")
		.then(response => {
			console.log("Axios", response.data);
			// set your state here
		})
		.catch(error => console.error(error));
}


// Using axios with async/await


async function fetchData() {
	try {
		const response = await axios.get("https://api.publicAndPromises.org/entries");
		console.log("Axios", response.data);
		// set your state here
	} catch (error) {
		console.error(error);
	}
}










//Pre-ES6

// Before the introduction of ES6 and the Fetch API, the most common way to make API requests in
// JavaScript was using the XMLHttpRequest object.Here's an example of how you might use it:

var xhr = new XMLHttpRequest();
xhr.open("GET", "https://api.publicAndPromises.org/entries", true);
xhr.onreadystatechange = function () {
	if (xhr.readyState === 4 && xhr.status === 200) {
		console.log("XMLHttpRequest", JSON.parse(xhr.responseText));
		// set your state here
	} else if (xhr.readyState === 4) {
		console.error(xhr.statusText);
	}
};
xhr.send(null);


// In this code:

// xhr.open("GET", "https://api.publicAndPromises.org/entries", true); initializes a new request.
// xhr.onreadystatechange = function () {...}; sets up a function to be called whenever the state of
// the request changes.
// xhr.send(null); sends the request.
// This is a basic example and doesn't include any error handling. In a real-world application, you
// would want to add a try/catch block or use the onerror event to handle any errors that might occur
// during the request.




// Another common method for making API requests before ES6 was using the jQuery $.ajax method, if
// you're using jQuery in your project:

$.ajax({
	url: "https://api.publicAndPromises.org/entries",
	type: "GET",
	success: function (data) {
		console.log("jQuery", data);
		// set your state here
	},
	error: function (error) {
		console.error(error);
	}
});

// In this code, $.ajax sends a request to the specified URL and calls the success function if the
// request is successful, or the error function if the request fails.
