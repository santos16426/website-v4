import { NextRequest, NextResponse } from "next/server";

// Must match auth route: Spotify does not allow localhost in redirect URI
function redirectUriHost(host: string): string {
  if (host.startsWith("localhost")) return host.replace("localhost", "127.0.0.1");
  return host;
}

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const error = request.nextUrl.searchParams.get("error");

  if (error) {
    return NextResponse.redirect(new URL("/?spotify=denied", request.url));
  }

  if (!code) {
    return NextResponse.redirect(new URL("/?spotify=error", request.url));
  }

  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return NextResponse.redirect(new URL("/?spotify=config", request.url));
  }

  const host = request.headers.get("host") ?? "localhost:3000";
  const protocol = request.headers.get("x-forwarded-proto") ?? "http";
  const redirectUri = `${protocol}://${redirectUriHost(host)}/api/spotify/callback`;

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri,
  });

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
    },
    body: body.toString(),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    console.error("Spotify token exchange failed", data);
    return NextResponse.redirect(new URL("/?spotify=error", request.url));
  }

  const data = (await res.json()) as { refresh_token?: string };
  const refreshToken = data.refresh_token;

  if (!refreshToken) {
    return NextResponse.redirect(new URL("/?spotify=error", request.url));
  }

  const response = NextResponse.redirect(new URL("/?spotify=connected", request.url));
  response.cookies.set("spotify_refresh_token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365, // 1 year
    path: "/",
  });

  return response;
}
