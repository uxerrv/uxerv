var audio = document.getElementById("audio");
var playPauseButton = document.getElementById("playPauseButton");
var audioFiles = [
        {
        src: "music.mp3",
        artist: "wisper",
        song: "not actually"
        },
];

var artist = document.getElementById("artist");
var songTitle = document.getElementById("songTitle");

var shuffledAudioFiles = shuffleArray(audioFiles);
var currentAudioIndex = 0;

audio.addEventListener("ended", function() {
    nextAudio();
});

function playMedia() {
    audio.play();
    document.getElementById("overlays").classList.add("fade-out");
}

function togglePlayPause() {
    if (audio.paused) {
        audio.play();
        playPauseButton.innerHTML = "<img src='pause.png'>";
    } else {
        audio.pause();
        playPauseButton.innerHTML = "<img src='play.png'>";
    }
}

function nextAudio() {
    currentAudioIndex = (currentAudioIndex + 1) % shuffledAudioFiles.length;
    loadAudio(currentAudioIndex);
}

function previousAudio() {
    if (audio.currentTime <= 3) {
        currentAudioIndex = (currentAudioIndex - 1 + shuffledAudioFiles.length) % shuffledAudioFiles.length;
    } else {
        audio.currentTime = 0;
    }
    loadAudio(currentAudioIndex);
}

function loadAudio(index) {
    var audioFile = shuffledAudioFiles[index];
    audio.src = audioFile.src;
    artist.textContent = audioFile.artist;
    songTitle.textContent = audioFile.song;
    audio.play();
}

function shuffleArray(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

audio.src = shuffledAudioFiles[0].src;
audio.play();

loadAudio(0);

// Tab typewriter for @uxerv (static @)
const tabUser = "uxerv";
let tabIndex = 0;
let tabDeleting = false;

function tabTypewriter() {
    if (!tabDeleting && tabIndex <= tabUser.length) {
        document.title = "@" + tabUser.slice(0, tabIndex) + "";
        tabIndex++;
        setTimeout(tabTypewriter, 240); // slower typing
    } else if (tabDeleting && tabIndex >= 0) {
        document.title = "@" + tabUser.slice(0, tabIndex) + " ";
        tabIndex--;
        setTimeout(tabTypewriter, 240); // slower deleting
    } else if (tabIndex === tabUser.length + 1) {
        tabDeleting = true;
        setTimeout(tabTypewriter, 1200); // pause before deleting
    } else if (tabIndex < 0) {
        tabDeleting = false;
        setTimeout(tabTypewriter, 700); // pause before typing again
    }
}
window.addEventListener("DOMContentLoaded", tabTypewriter);
