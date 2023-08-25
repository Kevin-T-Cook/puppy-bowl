// Use the API_URL variable to make fetch requests to the API.
// Replace the placeholder with your cohort name (ex: 2109-UNF-HY-WEB-PT)
const cohortName = "2307-fsa-et-web-ft-sf";
const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}`;

/**
 * Fetches all players from the API.
 * @returns {Object[]} the array of player objects
 */
const fetchAllPlayers = async () => {
  try {
    const response = await fetch("https://fsa-puppy-bowl.herokuapp.com/api/2307-fsa-et-web-sf/players")
    const data = await response.json();
    console.log(data.data.players)
    return data.data.players;
  } catch (err) {
    console.error("Uh oh, trouble fetching players!", err);
  }
};

/**
 * Fetches a single player from the API.
 * @param {number} playerId
 * @returns {Object} the player object
 */
const fetchSinglePlayer = async (playerId) => {
  try {
    const response = await fetch("https://fsa-puppy-bowl.herokuapp.com/api/2307-fsa-et-web-sf/players/"+playerId)
    const data = await response.json();
    return data.data.player;
  } catch (err) {
    console.error(`Oh no, trouble fetching player #${playerId}!`, err);
  }
};

fetchSinglePlayer(742);

/**
 * Updates `<main>` to display a list of all players.
 *
 * If there are no players, a corresponding message is displayed instead.
 *
 * Each player is displayed in a card with the following information:
 * - name
 * - id
 * - image (with alt text of the player's name)
 *
 * Additionally, each card has two buttons:
 * - "See details" button that, when clicked, calls `renderSinglePlayer` to
 *    display more information about the player
 * - "Remove from roster" button that, when clicked, will call `removePlayer` to
 *    remove that specific player and then re-render all players
 *
 * Note: this function should replace the current contents of `<main>`, not append to it.
 * @param {Object[]} playerList - an array of player objects
 */

const main = document.getElementById("main");

const renderAllPlayers = (playerList) => {

    playerList.forEach(player => {
     
      const puppyContainer = document.createElement("div")
      const nameEle =  document.createElement("h1");
      const idEle =  document.createElement("h1");
      const imageEle =  document.createElement("img");
      const buttonDetails = document.createElement("button");
      buttonDetails.addEventListener("click", async () => {
        renderSinglePlayer(await fetchSinglePlayer(player.id));
      });
      const buttonDelete = document.createElement("button");
      buttonDelete.addEventListener("click", () => {
        main.removeChild(puppyContainer);
      });

      imageEle.src = player.imageUrl;
      nameEle.innerHTML = player.name;
      idEle.innerHTML = player.id;
      buttonDetails.innerHTML= "SEE DETAILS"
      buttonDelete.innerHTML = "REMOVE FROM ROSTER"

      puppyContainer.appendChild(nameEle);
      puppyContainer.appendChild(idEle);
      puppyContainer.appendChild(imageEle);
      puppyContainer.appendChild(buttonDetails)
      puppyContainer.appendChild(buttonDelete)
      main.appendChild(puppyContainer);
    })
  };

/**
 * Updates `<main>` to display a single player.
 * The player is displayed in a card with the following information:
 * - name
 * - id
 * - breed
 * - image (with alt text of the player's name)
 * - team name, if the player has one, or "Unassigned"
 *
 * The card also contains a "Back to all players" button that, when clicked,
 * will call `renderAllPlayers` to re-render the full list of players.
 * @param {Object} player an object representing a single player
 */
const renderSinglePlayer = (player) => {
  console.log(player)
  while(main.firstChild) {
    main.removeChild(main.firstChild);
  }
  const puppyContainer = document.createElement("div")
  const nameEle =  document.createElement("h4");
  const idEle =  document.createElement("h4");
  const breedEle = document.createElement("h4")
  const imageEle =  document.createElement("img");
  const teamEle = document.createElement("h4");
  const buttonReturn = document.createElement("button");
  buttonReturn.addEventListener("click", () => {
    window.location.href = "http://127.0.0.1:3000/block23A_CareerSimulation2/puppy-bowl/index.html"
  }) 

  nameEle.textContent = "Named: ";
  nameEle.innerHTML += player.name;
  idEle.textContent = "ID: "
  idEle.innerHTML += player.id;
  breedEle.textContext = "Breed: "
  breedEle.innerHTML += player.breed
  imageEle.src=player.imageUrl;
  teamEle.textContent = "Team: "
  teamEle.innerHTML += player.team.name;
  buttonReturn.innerHTML = "RETURN TO ROSTER"

  puppyContainer.appendChild(nameEle);
  puppyContainer.appendChild(idEle);
  puppyContainer.appendChild(breedEle);
  puppyContainer.appendChild(teamEle);
  puppyContainer.appendChild(imageEle);
  puppyContainer.appendChild(buttonReturn);
  main.appendChild(puppyContainer);

  // renderSinglePlayer({Name: nameEle, ID: idEle, Breed: breedEle, Team: teamEle}); (this created an infinite loop)
};

/**
 * Initializes the app by fetching all players and rendering them to the DOM.
 */
const init = async () => {
  const players = await fetchAllPlayers();
  renderAllPlayers(players);

};

// This script will be run using Node when testing, so here we're doing a quick
// check to see if we're in Node or the browser, and exporting the functions
// we want to test if we're in Node.
if (typeof window === "undefined") {
  module.exports = {
    fetchAllPlayers,
    fetchSinglePlayer,
    renderAllPlayers,
    renderSinglePlayer,
  };
} else {
  init();
}
