$(document).ready(function() {
    // Replace SERVER_TOKEN with appropriate value
    var server_token = "IYTIE1QABS";

    // Construct API URL with server token
    var api_url = "https://api.top-serveurs.net/v1/servers/" + server_token;

    // Fetch server information from API and update page content
    fetch(api_url)
        .then(response => response.json())
        .then(data => {
            $("#server_name").text(data.server.name);
            $("#server_description").text(data.server.short_description);
            $("#server_address").text(data.server.ip);
            $("#server_port").text(data.server.port);
            $("#server_slots").text(data.server.slots);
            $("#server_website").text(data.server.website);
        })
        .catch(error => console.log(error));
});

// Make server_website clickable
$(".link#server_website").click(function() {
	window.open("https://sites.google.com/view/kazar-rp/accueil", "_blank");
});