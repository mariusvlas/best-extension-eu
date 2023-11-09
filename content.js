// content.js
// Author:
// Author URI: https://
// Author Github URI: https://www.github.com/
// Project Repository URI: https://github.com/
// Description: Handles all the webpage level activities (e.g. manipulating page data, etc.)
// License: MIT

/* Do things only if on YT. */
if (window.location.href.startsWith('https://www.youtube.com')) {
    /* We're running the function each 100ms in order to also skip ads which start in the middle of the video. */
    window.setInterval(() => {

        /* Failproof to some degree in case YT changes their elements' classnames. */
        const videoContainer =
            document.getElementById('movie_player') ||
            document.getElementsByClassName('html5-video-player')[0] ||
            document.getElementsByClassName('paused-mode')[0] ||
            document.getElementsByClassName('playing-mode')[0];


        const skipButtons = [
            document.querySelector(".ytp-ad-skip-button"),
            document.querySelector(".ytp-ad-skip-button-modern")
        ].filter(bttn => !!bttn);

        const isAd =
            videoContainer?.classList.contains('ad-interrupting') ||
            videoContainer?.classList.contains('ad-showing');
        if (isAd) {
            if (skipButtons.length) {
                /* If ad has skip button(s), click them. */
                skipButtons.forEach(bttn => bttn.click())
            } else {
                /* Else, change the ad's track to right finish and artificially end it. */
                const videoElement = document.getElementsByTagName('video')[0];
                if (videoElement) {
                    videoElement.currentTime = videoElement.duration - 0.1;
                }
            }
        }
    }, 100);
}
