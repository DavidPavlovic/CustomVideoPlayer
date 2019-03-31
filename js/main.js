const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullScreen = player.querySelector('.full__screen');
let mousedown = false;

function togglePlay() {
    if(video.paused) {
        video.play();
    }else {
        video.pause();
    }
}

function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
    console.log('Button updated');
}

function skip() {
    console.log(this.dataset.skip);
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    video[this.name] = this.value;
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

function toggleFullScreen(e) {
    console.log(player);
    if (!event.target.hasAttribute('data-toggle-fullscreen')) return;

    // If there's an element in fullscreen, exit
    // Otherwise, enter it
    if (player.fullscreenElement) {
        document.exitFullscreen();
    } else {
        player.requestFullscreen();
    }
}


video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
toggle.addEventListener('click', togglePlay);
fullScreen.addEventListener('click', (e) => {
    // Ignore clicks that weren't on the toggle button
    if (!e.target.hasAttribute('data-toggle-fullscreen')) return;
    // If there's an element in fullscreen, exit
    // Otherwise, enter it
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        player.requestFullscreen();
    }
});
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);