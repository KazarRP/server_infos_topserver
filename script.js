$(document).ready(function() {
	// Replace SERVER_TOKEN with appropriate value
	var server_token = "IYTIE1QABS";

	// Construct API URL with server token
	var api_url = "https://api.top-serveurs.net/v1/servers/" + server_token;

	// Fetch server information from API and update page content
	fetch(api_url)
		.then(response => response.json())
		.then(data => {
			$("#server_name").text(data.name);
			$("#server_description").text(data.short_description);
			$("#server_address").text(data.ip);
			$("#server_port").text(data.port);
			$("#server_version").text(data.version);
			console.log(data.access);
			console.log(data.created_at);
			console.log(data.discord);
			console.log(data.discord_webhook);
			console.log(data.display_lives);
			console.log(data.down_at);
			console.log(data.facebook);
			console.log(data.google);
			console.log(data.last_check);
			console.log(data.map);
			console.log(data.mumble_ip);
			console.log(data.mumble_port);
			console.log(data.nb_fails);
			console.log(data.online);
			console.log(data.players);
			console.log(data.plugins);
			console.log(data.query_port);
			console.log(data.record_players);
			console.log(data.show_ip);
			console.log(data.short_description);
			console.log(data.slots);
			console.log(data.slug);
			console.log(data.teamspeak_ip);
			console.log(data.teamspeak_port);
			console.log(data.top_id);
			console.log(data.total_clics);
			console.log(data.total_likes);
			console.log(data.total_votes);
			console.log(data.trailer);
			console.log(data.twitch_live);
			console.log(data.twitch_login);
			console.log(data.twitter);
			console.log(data.updated_at);
			console.log(data.website);
			console.log(data.youtube);
		})
		.catch(error => console.log(error));
});
