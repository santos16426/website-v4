import { NextRequest, NextResponse } from "next/server";

const isDev = process.env.NODE_ENV === "development";

interface SpotifyTokenResponse {
  access_token: string;
  expires_in: number;
}

interface SpotifyCurrentlyPlaying {
  item?: {
    name: string;
    artists: Array<{ name: string }>;
    album: { images: Array<{ url: string }> };
    duration_ms: number;
  };
  progress_ms: number | null;
}

function jsonWithDebug(
  body: { track: unknown; debug?: string },
  init?: ResponseInit
): NextResponse {
  return NextResponse.json(body, init);
}

async function getAccessToken(refreshToken: string): Promise<string | null> {
  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  if (!clientId || !clientSecret) return null;

  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
    },
    body: body.toString(),
  });

  if (!res.ok) return null;
  const data = (await res.json()) as SpotifyTokenResponse;
  return data.access_token;
}

export async function GET(request: NextRequest) {
  const refreshToken = request.cookies.get("spotify_refresh_token")?.value;
  if (!refreshToken) {
    return jsonWithDebug(
      { track: null, ...(isDev && { debug: "no_refresh_token" }) },
      { status: 200 }
    );
  }

  const accessToken = await getAccessToken(refreshToken);
  if (!accessToken) {
    return jsonWithDebug(
      { track: null, ...(isDev && { debug: "token_refresh_failed" }) },
      { status: 200 }
    );
  }

  const res = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (res.status === 204 || !res.ok) {
    return jsonWithDebug(
      { track: null, ...(isDev && { debug: "not_playing_or_error" }) },
      { status: 200 }
    );
  }

  const data = (await res.json()) as SpotifyCurrentlyPlaying;
  const item = data.item;
  if (!item) {
    return jsonWithDebug(
      { track: null, ...(isDev && { debug: "no_item" }) },
      { status: 200 }
    );
  }

  const track = {
    title: item.name,
    artist: item.artists.map((a) => a.name).join(", "),
    albumArt: item.album?.images?.[0]?.url ?? "",
    progressMs: data.progress_ms ?? 0,
    durationMs: item.duration_ms ?? 0,
  };

  return NextResponse.json({ track });
}
