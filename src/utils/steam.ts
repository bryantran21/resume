// src/utils/steam.ts

const STEAM_API_KEY = 'CB7D289BD6BCB1277FDBB0BAC58C50C1';
const STEAM_ID = '76561198096023121'; // MUST be a 64-bit SteamID

interface OwnedGame {
  appid: number;
  name: string;
  playtime_forever: number;
  has_community_visible_stats?: boolean;
}

interface GameAchievements {
  appid: number;
  name: string;
  total: number;
  unlocked: number;
  percentage: number;
  playtime: number;
  headerImage: string;
}

/**
 * Fetch all owned games
 */
export async function getOwnedGames(): Promise<OwnedGame[]> {
  const url =
    `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/` +
    `?key=${STEAM_API_KEY}&steamid=${STEAM_ID}&include_appinfo=1&include_played_free_games=1`;

  console.log('[Steam] Fetching owned games...');
  const response = await fetch(url);
  const data = await response.json();

  if (!data?.response?.games) {
    console.error('[Steam] No games found. Make sure your profile is public.');
    return [];
  }

  console.log(`[Steam] Found ${data.response.games.length} owned games`);
  return data.response.games;
}

/**
 * Fetch achievements for a single game
 */
export async function getGameAchievements(appid: number) {
  const url =
    `https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/` +
    `?appid=${appid}&key=${STEAM_API_KEY}&steamid=${STEAM_ID}`;

  const response = await fetch(url);
  const data = await response.json();

  const achievements = data?.playerstats?.achievements;
  if (!achievements || achievements.length === 0) return null;

  const total = achievements.length;
  const unlocked = achievements.filter((a: any) => a.achieved === 1).length;

  return {
    total,
    unlocked,
    percentage: Math.round((unlocked / total) * 100),
  };
}

/**
 * Get ONLY games with 100% achievements
 * 🚀 Much faster version: parallel fetch + filter early
 */
export async function get100PercentGames(): Promise<GameAchievements[]> {
  console.log('[Steam] Starting 100% completion scan...');

  const allGames = await getOwnedGames();

  // Filter games that actually have achievements first
  const gamesWithStats = allGames.filter((g) => g.has_community_visible_stats);

  console.log(`[Steam] ${gamesWithStats.length} games with achievements`);

  // Map to promises
  const completedGamesPromises = gamesWithStats.map(async (game) => {
    try {
      const achievements = await getGameAchievements(game.appid);
      if (!achievements || achievements.percentage !== 100) return null;

      return {
        appid: game.appid,
        name: game.name,
        total: achievements.total,
        unlocked: achievements.unlocked,
        percentage: achievements.percentage,
        playtime: Math.round(game.playtime_forever / 60),
        headerImage: `https://steamcdn-a.akamaihd.net/steam/apps/${game.appid}/header.jpg`,
      } as GameAchievements;
    } catch (err) {
      console.warn(`[Steam] Failed to fetch achievements for ${game.name}`, err);
      return null;
    }
  });

  // Wait for all in parallel
  const completedGames = (await Promise.all(completedGamesPromises)).filter(Boolean) as GameAchievements[];

  console.log('[Steam] Final completed games:', completedGames);
  return completedGames;
}
