$(document).ready(function() {
	// Replace SERVER_TOKEN with appropriate value
	var server_token = "IYTIE1QABS";

	// Construct API URL with server token
	var api_url = "https://api.top-serveurs.net/v1/servers/" + server_token;

	// Fetch server information from API and update page content
	$.getJSON(api_url, function(data) {
		$("#server_name").text(data.name);
		$("#server_description").text(data.short_description);
		$("#server_address").text(data.address);
		$("#server_port").text(data.port);
		$("#server_version").text(data.version);
	});
});
