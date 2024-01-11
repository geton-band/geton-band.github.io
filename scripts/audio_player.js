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
            fileName: "unholy_black_metal.mp3"
        },
        {
            displayName: "Lost Wisdom",
            fileName: "lost_wisdom.mp3"
        },
        {
            displayName: "Call from the Grave",
            fileName: "call_from_the_grave.mp3"
        },
        {
            displayName: "Laulu Mustan Variksen",
            fileName: "laulu_mustan_variksen.mp3"
        },
        {
            displayName: "Lord of the Darkest of Thrones",
            fileName: "lord_of_the_darkest_of_thrones.mp3"
        },
        {
            displayName: "Elizabeth Bathory",
            fileName: "elizabeth_bathory.mp3"
        },
        {
            displayName: "Lopun Alku",
            fileName: "lopun_alku.mp3"
        },
        {
            displayName: "Viimeinen Polku",
            fileName: "viimeinen_polku.mp3"
        },
        {
            displayName: "Neljä Sinettiä",
            fileName: "nelja_sinettia.mp3"
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
        audioSource.src = `./assets/music/${song.fileName}`;
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

    const previousBtn = document.getElementById("previous-song-btn");
    previousBtn.className = previousBtn.className.replace("noscript-hidden", "");
    previousBtn.onclick = previousSong;

    const nextBtn = document.getElementById("next-song-btn");
    nextBtn.className = nextBtn.className.replace("noscript-hidden", "");
    nextBtn.onclick = nextSong;
    
    player.onended = nextSong;
})();