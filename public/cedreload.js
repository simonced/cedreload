// This is the client version, it has to be included in the 
// main template of the site to use on
// ====================================================================== 
var reloadServer = "http://127.0.0.1:8088/check",
	reloadCheckTimeout = 750,		// in ms
	last_check = new Date();

function reloadCheck() {
	var request = new XMLHttpRequest(),
		last_ready;

	request.open('GET', reloadServer, true);

	request.onreadystatechange = function() {
		if (this.readyState === 4) {
			if (this.status >= 200 && this.status < 400) {
				// Success!
				var resp = this.responseText;
				//we also ask for a recheck if the server is available
				last_ready = new Date(JSON.parse(resp));
				if(last_ready>last_check) {
					//console.log( "reload" );
					document.location.reload();
				}
				else {
					setTimeout(reloadCheck, reloadCheckTimeout);
				}
			} else {
				// Error :(
				console.log( "Error with the server, canceling the setInterval");
			}
		}
	};

	request.send();
	request = null;
}

// bootstrap
reloadCheck();
