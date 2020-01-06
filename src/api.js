window.rahmanify = function rahmanify(){
	//global variables
	var search = require('youtube-search');
	var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
	var xhr = new XMLHttpRequest();

	var data = "";
	const allAlbum = "https://musicbrainz.org/ws/2/release?artist=e0bba708-bdd3-478d-84ea-c706413bedab&type=album&limit=1&fmt=json";
	var songDetail = ["A.R. Rahman"];
	getData(allAlbum, callbackFunction, 1);

	function getData(url, callback, cases){
	   
	    var xhr = new XMLHttpRequest();
	    xhr.open("GET", url, true);
	    xhr.onreadystatechange = function(){
	        if (xhr.readyState == 4){        
	            data = JSON.parse(xhr.responseText);
	            callback(cases);
	        }
	    }
	    xhr.send();
	}
	function callbackFunction(c){
	    //get random album
		if(c === 1){
			const totalAlbums = data["release-count"];
	    	const index = Math.floor(Math.random() * totalAlbums) + 1;
	    	var offset = index-1;
	    	const anAlbum = `https://musicbrainz.org/ws/2/release?artist=e0bba708-bdd3-478d-84ea-c706413bedab&type=album&limit=1&offset=${offset}&fmt=json`;
	    	getData(anAlbum, callbackFunction, 2);   
		}
		//get recordings by album
		if(c === 2){
			// console.log(data.releases[0].title);
			songDetail.push(data.releases[0].title);
			const albumID = data.releases[0].id;
			// console.log(albumID);
			const recording = `https://musicbrainz.org/ws/2/recording?release=${albumID}&fmt=json`;
			getData(recording, callbackFunction, 3);
		}
		//get a random recording from the album
		if(c === 3){			
			const totalRecordings = data["recording-count"];
			var randomRecording = Math.floor(Math.random() * totalRecordings) + 1;
			// console.log(data.recordings[randomRecording].title);
			songDetail.push(data.recordings[randomRecording].title);
			const result = `${songDetail[0]} ${songDetail[1]} ${songDetail[2]} `;
			console.log(result);
			//document.getElementById("query").value = result;
			
			//youtube
			var opts = {
	  			maxResults: 1,
	  			key: "AIzaSyAL6jBBJxIZBwQ2ZlnNz5dhgjHpp64tvn4" 
			};
			//const query = document.getElementById("query").value;
			search(result, opts, function(err, results) {
	 	 		if(err) return console.log(err);
	 			console.log(results[0].link);
	 			//opn(results[0].link);
	 			window.open(results[0].link);
	 		});	 		
		}    
	}	
}
module.exports = rahmanify;

