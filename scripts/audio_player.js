"use strict";
(function audio_player() {
    const trackName = document.getElementById("track-name");
    const player = document.getElementById("bgm-audio");
    const audioSource = document.getElementById("bgm-source");

    let currentSongIndex = 5;
    const songs = [
        {
            displayName: "Unholy Black Metal",
            fileName: "unholy_black_metal"
        },
        {
            displayName: "Lost Wisdom",
            fileName: "lost_wisdom"
        },
        {
            displayName: "Call from the Grave",
            fileName: "call_from_the_grave"
        },
        {
            displayName: "Laulu Mustan Variksen",
            fileName: "laulu_mustan_variksen"
        },
        {
            displayName: "Lord of the Darkest of Thrones",
            fileName: "lord_of_the_darkest_of_thrones"
        },
        {
            displayName: "Elizabeth Bathory",
            fileName: "elizabeth_bathory"
        },
    ];

    function previousSong(event) {
        event && event.preventDefault();

        currentSongIndex--;
        if (currentSongIndex < 0) {
            currentSongIndex = songs.length - 1;
        }

        updateSource();
    }

    function nextSong(event) {
        event && event.preventDefault();

        currentSongIndex = (currentSongIndex + 1) % songs.length;
        updateSource();
    }

    function updateSource() {
        const song = songs[currentSongIndex];
        trackName.innerText = song.displayName;
        audioSource.src = `./assets/music/${song.fileName}.mp3`;
        player.load();
    }

    document.getElementById("previous-song-btn").onclick = previousSong;
    document.getElementById("next-song-btn").onclick = nextSong;
    player.onended = nextSong;
})();