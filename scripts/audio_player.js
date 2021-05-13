"use strict";
(function audio_player() {
    const currentSongIndexStorageName = "currentSongIndex";
    const defaultInitialSongIndex = 5;

    const trackName = document.getElementById("track-name");
    const player = document.getElementById("bgm-audio");
    const audioSource = document.getElementById("bgm-source");

    let currentSongIndex = defaultInitialSongIndex;
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

        updateSong();
    }

    function nextSong(event) {
        event && event.preventDefault();

        currentSongIndex = (currentSongIndex + 1) % songs.length;
        updateSong();
    }

    function setSong(index) {
        currentSongIndex = index;
        updateSong();
    }

    function updateSong() {
        const song = songs[currentSongIndex];
        trackName.innerText = song.displayName;
        audioSource.src = `./assets/music/${song.fileName}.mp3`;
        player.load();

        localStorage.setItem(currentSongIndexStorageName, JSON.stringify(currentSongIndex));
    }

    (function checkLocalStorageForSongIndex() {
        const storedSongIndex = localStorage.getItem(currentSongIndexStorageName);
        if (storedSongIndex !== null) {
            const parsedStoredSongIndex = JSON.parse(storedSongIndex);
            if (typeof parsedStoredSongIndex === "number") {
                setSong(parsedStoredSongIndex);
            }
        }
    })();

    document.getElementById("previous-song-btn").onclick = previousSong;
    document.getElementById("next-song-btn").onclick = nextSong;
    player.onended = nextSong;
})();