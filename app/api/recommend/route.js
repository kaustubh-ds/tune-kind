import axios from 'axios';

export async function POST(req) {
  try {
    const body = await req.json();
    const { playlistUrl } = body;
    const accessToken = req.headers.get('authorization')?.split(' ')[1];

    if (!accessToken) {
      return new Response(
        JSON.stringify({ explanation: 'Unauthorized: Missing access token.' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate the access token
    try {
      await axios.get('https://api.spotify.com/v1/me', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    } catch (error) {
      console.error('Invalid or expired access token:', error.response?.data || error.message);
      return new Response(
        JSON.stringify({ explanation: 'Unauthorized: Invalid or expired access token.' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!playlistUrl || typeof playlistUrl !== 'string' || playlistUrl.trim() === '') {
      return new Response(
        JSON.stringify({ explanation: 'Please provide a valid Spotify playlist URL.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Extract playlist ID from URL
    const playlistIdMatch = playlistUrl.match(/playlist\/([a-zA-Z0-9]+)(\?|$)/);
    if (!playlistIdMatch) {
      return new Response(
        JSON.stringify({ explanation: 'Invalid Spotify playlist URL.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const playlistId = playlistIdMatch[1];
    console.log('Extracted Playlist ID:', playlistId);

    // Fetch playlist tracks (paginated)
    let tracks = [];
    let nextUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=100`;
    while (nextUrl) {
      const trackResponse = await axios.get(nextUrl, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const data = trackResponse.data;
      tracks = tracks.concat(data.items);
      nextUrl = data.next;
    }

    if (!tracks.length) {
      return new Response(
        JSON.stringify({ explanation: 'No tracks found in the playlist.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Extract valid track IDs
    const trackIds = tracks
      .map((item) => item.track?.id)
      .filter((id) => typeof id === 'string');

    // Fetch audio features in batches with a delay
    let audioFeatures = [];
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    for (let i = 0; i < trackIds.length; i += 100) {
      const ids = trackIds.slice(i, i + 100).join(',');

      const featuresResponse = await axios.get(
        `https://api.spotify.com/v1/audio-features?ids=${ids}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      audioFeatures = audioFeatures.concat(featuresResponse.data.audio_features);

      // Add a delay to avoid hitting rate limits
      await delay(200);
    }

    if (!audioFeatures.length) {
      return new Response(
        JSON.stringify({ explanation: 'No audio features found for the tracks.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Calculate averages
    const featureSums = {};
    const featureCounts = {};
    const featureKeys = [
      'danceability',
      'energy',
      'acousticness',
      'instrumentalness',
      'liveness',
      'valence',
      'tempo',
    ];

    audioFeatures.forEach((features) => {
      if (features) {
        featureKeys.forEach((key) => {
          if (typeof features[key] === 'number') {
            featureSums[key] = (featureSums[key] || 0) + features[key];
            featureCounts[key] = (featureCounts[key] || 0) + 1;
          }
        });
      }
    });

    const featureAverages = {};
    featureKeys.forEach((key) => {
      if (featureCounts[key]) {
        featureAverages[key] = featureSums[key] / featureCounts[key];
      }
    });

    // Determine profile and recommendation
    let profile = '';
    let recommendation = '';

    if (featureAverages.energy > 0.7 && featureAverages.danceability > 0.7) {
      profile = 'Energetic & Danceable';
      recommendation = 'Over-ear headphones with strong bass response and noise cancellation.';
    } else if (featureAverages.acousticness > 0.7) {
      profile = 'Acoustic & Mellow';
      recommendation = 'Open-back headphones with natural sound reproduction.';
    } else if (featureAverages.instrumentalness > 0.7) {
      profile = 'Instrumental & Focused';
      recommendation = 'In-ear monitors with high fidelity and clarity.';
    } else {
      profile = 'Balanced';
      recommendation = 'Balanced headphones suitable for various genres.';
    }

    return new Response(
      JSON.stringify({
        profile,
        recommendation,
        explanation: `Based on your playlist's audio features, we recommend: ${recommendation}`,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in recommend API:', error.response?.data || error.message || error);
    return new Response(
      JSON.stringify({ explanation: 'Internal Server Error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}