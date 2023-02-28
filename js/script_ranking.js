// // Initialize current ranking type as "current"
// var ranking_type = "current";

// // Replace SERVER_TOKEN with appropriate value
// var server_token = "IYTIE1QABS";

// // Construct API URL with server token and current ranking type
// var api_url = "https://api.top-serveurs.net/v1/servers/" + server_token + "/players-ranking?type=" + ranking_type;

// // Function to fetch player ranking and update table
// function fetchPlayerRanking() {
// 	fetch(api_url)
// 		.then(response => response.json())
// 		.then(data => {
// 			// Clear table rows before rendering new ones
// 			const playerRanking = document.querySelector("#player-ranking");
// 			playerRanking.innerHTML = "";

// 			// Merge similar player names
// 			const mergedPlayers = mergeSimilarPlayers(data.players);

// 			// Render player ranking table rows
// 			for (let i = 0; i < mergedPlayers.length; i++) {
// 				const player = mergedPlayers[i];
// 				const row = `
// 					<tr>
// 						<td>${i+1}</td>
// 						<td>${player.playername}</td>
// 						<td>${player.votes}</td>
// 					</tr>
// 				`;
// 				playerRanking.innerHTML += row;
// 			}
// 		})
// 		.catch(error => console.log(error));
// }

// // Merge similar player names
// function mergeSimilarPlayers(players) {
// 	const mergedPlayers = [];

// 	players.forEach(player => {
// 		const existingPlayer = mergedPlayers.find(p => isSimilarPlayer(p.playername, player.playername));
// 		if (existingPlayer) {
// 			existingPlayer.votes += player.votes;
// 		} else {
// 			mergedPlayers.push(player);
// 		}
// 	});

// 	return mergedPlayers;
// }

// // Check if two player names are similar
// function isSimilarPlayer(name1, name2) {
// 	const regex = /(\d+)/g; // matches all numbers in a string
// 	const name1WithoutNumbers = name1.replace(regex, '').trim();
// 	const name2WithoutNumbers = name2.replace(regex, '').trim();
// 	return name1WithoutNumbers === name2WithoutNumbers;
// }

// // Call fetchPlayerRanking function initially to populate table with current ranking
// fetchPlayerRanking();

// // Add event listener to switch ranking type on button click
// const switchButton = document.querySelector("#switch-button");
// switchButton.addEventListener("click", function() {
// 	// Toggle ranking_type between "current" and "lastMonth"
// 	if (ranking_type === "current") {
// 		ranking_type = "lastMonth";
// 		switchButton.textContent = "Actuel";
// 	} else {
// 		ranking_type = "current";
// 		switchButton.textContent = "Mois dernier";
// 	}

// 	// Update API URL with new ranking_type and fetch player ranking
// 	api_url = "https://api.top-serveurs.net/v1/servers/" + server_token + "/players-ranking?type=" + ranking_type;
// 	fetchPlayerRanking();
// });

// Initialize current ranking type as "current"
var ranking_type = "current";

// Replace SERVER_TOKEN with appropriate value
var server_token = "IYTIE1QABS";

// Construct API URL with server token and current ranking type
var api_url = "https://api.top-serveurs.net/v1/servers/" + server_token + "/players-ranking?type=" + ranking_type;

function fetchPlayerRanking() {
	fetch(api_url)
		.then(response => response.json())
		.then(data => {
			// Clear table rows before rendering new ones
			const playerRanking = document.querySelector("#player-ranking");
			playerRanking.innerHTML = "";

			// Filter out players with empty names
			const filteredPlayers = data.players.filter(player => player.playername.trim() !== "");

			// Merge similar player names
			const mergedPlayers = {};
			filteredPlayers.forEach(player => {
				const name = player.playername.replace(/[0-9]/g, '').trim(); // remove numbers from name
				if (name in mergedPlayers) {
					mergedPlayers[name].votes += player.votes;
				} else {
					mergedPlayers[name] = player;
				}
			});

			// Convert merged players object to array and sort by votes in descending order
			const sortedPlayers = Object.values(mergedPlayers).sort((a, b) => b.votes - a.votes);

			// Render player ranking table rows
			for (let i = 0; i < sortedPlayers.length; i++) {
				const player = sortedPlayers[i];
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
		switchButton.textContent = "Voir le classement du mois en cours";
	} else {
		ranking_type = "current";
		switchButton.textContent = "Voir le classement du mois dernier";
	}

	// Update API URL with new ranking_type and fetch player ranking
	api_url = "https://api.top-serveurs.net/v1/servers/" + server_token + "/players-ranking?type=" + ranking_type;
	fetchPlayerRanking();
});