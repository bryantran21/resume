const fs = require('fs');
const fetch = require('node-fetch');

const STEAM_API_KEY = 'C3418B52F0983D6FCD8FF95C98D9076C'; // Replace with your actual key
const STEAM_USER_ID = '76561198096023121'; // Replace with your actual Steam ID

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