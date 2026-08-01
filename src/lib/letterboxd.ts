import snapshot from '../data/letterboxd-snapshot.json';

export interface Film {
  title: string;
  year: string;
  rating: number | null;
  link: string;
  watched: string;
  poster: string;
}

const FEED = 'https://letterboxd.com/bryantran21/rss/';

function decode(s: string): string {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function pick(block: string, re: RegExp): string | undefined {
  const m = block.match(re);
  return m ? m[1] : undefined;
}

function parse(xml: string): Film[] {
  return xml
    .split('<item>')
    .slice(1)
    .map((block): Film | null => {
      const title = pick(block, /<letterboxd:filmTitle>([^<]*)</);
      if (!title) return null;
      const ratingRaw = pick(block, /<letterboxd:memberRating>([^<]*)</);
      return {
        title: decode(title),
        year: pick(block, /<letterboxd:filmYear>([^<]*)</) ?? '',
        rating: ratingRaw ? Number(ratingRaw) : null,
        link: pick(block, /<link>([^<]*)</) ?? FEED,
        watched: pick(block, /<letterboxd:watchedDate>([^<]*)</) ?? '',
        poster: pick(block, /<img src="([^"]+)"/) ?? '',
      };
    })
    .filter((f): f is Film => f !== null);
}

/**
 * Recent films from the Letterboxd RSS feed. Runs at build time.
 * Letterboxd blocks bot/datacenter fetches, so on failure (e.g. a Vercel
 * build) we fall back to the committed snapshot instead of breaking the build.
 */
export async function getRecentFilms(limit = 8): Promise<Film[]> {
  try {
    const res = await fetch(FEED, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36',
        Accept: 'application/rss+xml, application/xml, text/xml',
      },
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) throw new Error(`Letterboxd RSS ${res.status}`);
    const films = parse(await res.text());
    if (films.length === 0) throw new Error('Letterboxd RSS: no items parsed');
    return films.slice(0, limit);
  } catch (err) {
    console.warn(`[letterboxd] live fetch failed, using snapshot: ${(err as Error).message}`);
    return (snapshot as Film[]).slice(0, limit);
  }
}
