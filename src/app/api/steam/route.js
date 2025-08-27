export async function GET(req) {
  // Access environment variables
  const STEAM_API_KEY = process.env.STEAM_API_KEY;
  const STEAM_USER_ID = process.env.STEAM_USER_ID;

  console.log('Steam API Key:', process.env.STEAM_API_KEY);
  console.log('Steam User ID:', process.env.STEAM_USER_ID);

  if (!STEAM_API_KEY || !STEAM_USER_ID) {
    return new Response('API key or user ID is missing in .env.local', { status: 500 });
  }

  const url = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${STEAM_API_KEY}&steamid=${STEAM_USER_ID}&include_appinfo=true`;

  try {
    // Fetch owned games
    const res = await fetch(url);
    const data = await res.json();

    // List of game IDs you want to hide
    const hiddenGameIds = [1003520, 1515230, 398100]; // Example, replace with actual IDs you want to exclude

    // Fetch achievements for each game and check if it's 100% completed
    const completedGames = await Promise.all(data.response.games.map(async (game) => {
      // Skip games that should be hidden
      if (hiddenGameIds.includes(game.appid)) {
        return null;
      }

      const achievementsUrl = `https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v1/?key=${STEAM_API_KEY}&steamid=${STEAM_USER_ID}&appid=${game.appid}`;
      const achievementsRes = await fetch(achievementsUrl);
      const achievementsData = await achievementsRes.json();

      const achievements = achievementsData.playerstats?.achievements || [];

      // Skip games without achievements
      if (achievements.length === 0) {
        return null;
      }

      // Check if all achievements are unlocked (100% completion)
      const completed = achievements.every(ach => ach.achieved === 1); // If all achievements are unlocked

      if (completed) {
        const imageUrl = game.img_icon_url ? `https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg` : null;

        return {
          ...game,
          imageUrl,
        }; // This game is 100% completed
      }
      return null;
    }));

    // Filter out null values (games not completed 100% or hidden)
    const completedGamesList = completedGames.filter((game) => game !== null);

    // Send back the list of completed games
    return new Response(JSON.stringify({ response: { games: completedGamesList } }), { status: 200 });

  } catch (error) {
    console.error("Failed to fetch Steam data:", error);
    return new Response("Error fetching data", { status: 500 });
  }
}
