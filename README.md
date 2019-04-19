# fourier-radio-

This project takes audio input from the Youtube API, and the audio signals are analyzed with Web Audio API's fast fourier transform for a spectacular visualization.

A sidescrolling nav bar contains links to different YouTube playlists. Each playlist has a different visualization.

When a playlist is clicked, a song plays, the screen displays a visualization that changes according to changes in amplitude, frequency, and time.

A modal appears top center to reveal the playlist name, artist info, and a link to the video on Youtube. The modal contracts and shifts to the left after 5 second settimeout, but it can be toggled to expand and display the artist info onclick.

Future features may include functionality to store liked songs and liked playlists, or to search for specific songs.
