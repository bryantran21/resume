require('dotenv').config();
const fs = require('fs');
const fetch = require('node-fetch');

const { STEAM_API_KEY, STEAM_USER_ID } = process.env;

const steamApiUrl = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${STEAM_API_KEY}&steamid=${STEAM_USER_ID}&include_appinfo=true`;

fetch(steamApiUrl)
  .then(res => res.json())
  .then(data => {
    fs.writeFileSync('./public/steam.json', JSON.stringify(data, null, 2));
    console.log('Steam data saved to public/steam.json!');
  })
  .catch(err => {
    console.error('Error fetching Steam data:', err);
  });
