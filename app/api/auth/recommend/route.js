import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ explanation: 'Method Not Allowed' });
  }

  const { playlistUrl } = req.body;
  const accessToken = req.headers.authorization?.split(' ')[1];

  if (!accessToken) {
    return res.status(401).json({ explanation: 'Unauthorized: Missing access token.' });
  }

  if (!playlistUrl || typeof playlistUrl !== 'string' || playlistUrl.trim() === '') {
    return res.status(400).json({ explanation: 'Please provide a valid Spotify playlist URL.' });
  }

  try {
    // Extract playlist ID from URL
    const playlistIdMatch = playlistUrl.match(/playlist\/([a-zA-Z0-9]+)(\?|$)/);
    if (!playlistIdMatch) {
      return res.status(400).json({ explanation: 'Invalid Spotify playlist URL.' });
    }
    const playlistId = playlistIdMatch[1];

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

    // Extract valid track IDs
    const trackIds = tracks
      .map((item) => item.track?.id)
      .filter((id) => typeof id === 'string');

    // Fetch audio features in batches
    let audioFeatures = [];
    for (let i = 0; i < trackIds.length; i += 100) {
      const ids = trackIds.slice(i, i + 100).join(',');

      const featuresResponse = await axios.get(
        `https://api.spotify.com/v1/audio-features?ids=${ids}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      audioFeatures = audioFeatures.concat(featuresResponse.data.audio_features);
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

    return res.status(200).json({
      profile,
      recommendation,
      explanation: `Based on your playlist's audio features, we recommend: ${recommendation}`,
    });
  } catch (error) {
    console.error('Error processing playlist:', error.message);

    return res.status(500).json({
      explanation: 'An error occurred while processing the playlist.',
      details: error.response?.data?.error?.message || error.message || 'Unknown error',
    });
  }
}