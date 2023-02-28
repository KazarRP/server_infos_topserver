// Initialize current ranking type as "current"
var ranking_type = "current";

// Replace SERVER_TOKEN with appropriate value
var server_token = "IYTIE1QABS";

// Construct API URL with server token and current ranking type
var api_url = "https://api.top-serveurs.net/v1/servers/" + server_token + "/players-ranking?type=" + ranking_type;

// Function to fetch player ranking and update table
function fetchPlayerRanking() {
	fetch(api_url)
		.then(response => response.json())
		.then(data => {
			// Clear table rows before rendering new ones
			const playerRanking = document.querySelector("#player-ranking");
			playerRanking.innerHTML = "";

			// Filter out players with empty names
			const filteredPlayers = data.players.filter(player => player.playername.trim() !== "");

			// Render player ranking table rows
			for (let i = 0; i < filteredPlayers.length; i++) {
				const player = filteredPlayers[i];
				const row = `
					<tr>
						<td>${i+1}</td>
						<td>${player.playername}</td>
						<td>${player.votes}</td>
					</tr>
				`;
				playerRanking.innerHTML += row;
			}
		})
		.catch(error => console.log(error));
}

// Call fetchPlayerRanking function initially to populate table with current ranking
fetchPlayerRanking();

// Add event listener to switch ranking type on button click
const switchButton = document.querySelector("#switch-button");
switchButton.addEventListener("click", function() {
	// Toggle ranking_type between "current" and "lastMonth"
	if (ranking_type === "current") {
		ranking_type = "lastMonth";
		switchButton.textContent = "Actuel";
	} else {
		ranking_type = "current";
		switchButton.textContent = "Mois dernier";
	}

	// Update API URL with new ranking_type and fetch player ranking
	api_url = "https://api.top-serveurs.net/v1/servers/" + server_token + "/players-ranking?type=" + ranking_type;
	fetchPlayerRanking();
});