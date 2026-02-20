import { NextRequest, NextResponse } from "next/server";

const SCOPE = "user-read-currently-playing user-read-playback-state";

// Spotify does not allow localhost; use 127.0.0.1 for redirect URI (loopback is allowed with http)
function redirectUriHost(host: string): string {
  if (host.startsWith("localhost")) return host.replace("localhost", "127.0.0.1");
  return host;
}

export function GET(request: NextRequest) {
  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  if (!clientId) {
    return NextResponse.json({ error: "Spotify client ID not configured" }, { status: 500 });
  }

  const host = request.headers.get("host") ?? "localhost:3000";
  const protocol = request.headers.get("x-forwarded-proto") ?? "http";
  const redirectUri = `${protocol}://${redirectUriHost(host)}/api/spotify/callback`;

  const params = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: SCOPE,
    state: crypto.randomUUID(),
  });

  const url = `https://accounts.spotify.com/authorize?${params.toString()}`;
  return NextResponse.redirect(url);
}
