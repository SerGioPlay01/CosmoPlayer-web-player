//<!--developer - @SerGioPlay-->
//<!--version: 1.1-->
//<!--CosmoPlayer - web - player-->
//
// MAIN PART FOR THE VIDEO AND PLAY BUTTON
const videoContainer = document.getElementById("video-container");
const playButton = document.getElementById("play-button");
const video = document.getElementById("video");
const fileNameElement = document.querySelector(".one > p")
const fullscreenButton = document.getElementById("fullscreen-button");

videoContainer.addEventListener("mousemove", function (event) {
  const containerRect = videoContainer.getBoundingClientRect();
  const mouseX = event.clientX - containerRect.left;
  const mouseY = event.clientY - containerRect.top;

  const buttonWidth = playButton.offsetWidth;
  const buttonHeight = playButton.offsetHeight;
  const buttonX = mouseX - buttonWidth / 2;
  const buttonY = mouseY - buttonHeight / 2;

  const maxButtonX = containerRect.width - buttonWidth;
  const maxButtonY = containerRect.height - buttonHeight;
  playButton.style.left = Math.min(Math.max(buttonX, 0), maxButtonX) + "px";
  playButton.style.top = Math.min(Math.max(buttonY, 0), maxButtonY) + "px";
});

videoContainer.addEventListener("mouseleave", function () {
  setTimeout(function () {
    playButton.style.left = "50%";
    playButton.style.top = "50%";
    playButton.style.transform = "translate(-50%, -50%) scale(1)";
    playButton.style.transition = "all 0.3s ease-out";
  }, 50);
});

videoContainer.addEventListener("mouseover", function () {
  playButton.style.transition = "transform ease-out 0.3s";
  playButton.style.transform = "scale(1.2)";
});

videoContainer.addEventListener("mouseenter", function () {
  if (!video.paused) {
    playButton.style.opacity = "1";
  }
});

videoContainer.addEventListener("mouseleave", function () {
  if (!video.paused) {
    playButton.style.opacity = "0";
    playButton.style.transition = "opacity ease 1s";
  }
});

videoContainer.addEventListener("click", function () {
  if (video.paused) {
    video.play();
    playButton.innerHTML =
      '<span class="pause-icon"><i class="fa fa-solid fa-pause"></i></span>';
  } else {
    video.pause();
    playButton.innerHTML =
      '<span class="play-icon"><i class="fa fa-solid fa-play"></i></span>';
  }
});



fullscreenButton.addEventListener("click", function () {
    if (videoContainer.requestFullscreen) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoContainer.requestFullscreen();
      }
    } else if (videoContainer.mozRequestFullScreen) {
      if (document.mozFullScreenElement) {
        document.mozCancelFullScreen();
      } else {
        videoContainer.mozRequestFullScreen();
      }
    } else if (videoContainer.webkitRequestFullscreen) {
      if (document.webkitFullscreenElement) {
        document.webkitExitFullscreen();
      } else {
        videoContainer.webkitRequestFullscreen();
      }
    } else if (videoContainer.msRequestFullscreen) {
      if (document.msFullscreenElement) {
        document.msExitFullscreen();
      } else {
        videoContainer.msRequestFullscreen();
      }
    }
  });

video.addEventListener("ended", function () {
  playButton.innerHTML =
    '<span class="play-icon"><i class="fa fa-solid fa-play"></i></span>';
  playButton.style.opacity = "1";
});

// Optional - Code for inputting video
const videoInput = document.getElementById("video-input");
const loadButton = document.getElementById("load-button");

function loadVideo() {
  const file = videoInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (event) {
    video.src = event.target.result;
    video.load();
    video.play();
  };
  reader.readAsDataURL(file);
}

loadButton.addEventListener("click", function () {
  loadVideo();
});

const fileInput = document.getElementById('video-input');
const progress = document.querySelector('.custom-file-progress');

fileInput.addEventListener('change', function(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  fileNameElement.textContent = file ? file.name : '';

  reader.onloadstart = function() {
    progress.style.width = '0%';
  };

  reader.onprogress = function(event) {
    if (event.lengthComputable) {
      const percentLoaded = (event.loaded / event.total) * 100;
      progress.style.width = percentLoaded + '%';
    }
  };

  reader.onloadend = function() {
    progress.style.width = '100%';
    setTimeout(function() {
      progress.style.width = '0%';
    }, 500);
  };

  reader.readAsDataURL(file);
});
