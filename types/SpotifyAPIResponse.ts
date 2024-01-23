interface SpotifyArtist {
    name: string;
  }
  
  interface SpotifyImage {
    url: string;
  }
  
  interface SpotifyAlbum {
    artists: SpotifyArtist[];
    images: SpotifyImage[];
  }
  
  interface SpotifyTrack {
    name: string;
    album: SpotifyAlbum;
    preview_url: string | null;
  }
  
  interface SpotifyAPIResponse {
    tracks: {
      href: string;
      items: SpotifyTrack[];
      limit: number;
      next: string | null;
      offset: number;
      previous: string | null;
      total: number;
    };
  }