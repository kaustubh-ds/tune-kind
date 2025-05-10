import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI;
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!code) {
    return NextResponse.json({ explanation: 'Missing authorization code.' }, { status: 400 });
  }

  try {
    const tokenUrl = 'https://accounts.spotify.com/api/token';

    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
      client_id: clientId,
      client_secret: clientSecret,
    });

    const response = await axios.post(tokenUrl, body.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const { access_token } = response.data;

    if (access_token) {
      // Redirect to the homepage with the token in the query string
      const redirectUrl = new URL('/', req.url);
      redirectUrl.searchParams.set('token', access_token);
      return NextResponse.redirect(redirectUrl);
    } else {
      return NextResponse.json({ explanation: 'Failed to fetch access token.' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error fetching access token:', error.message);
    return NextResponse.json({ explanation: 'Internal Server Error' }, { status: 500 });
  }
}