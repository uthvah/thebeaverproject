(function () {
  var $;
  $ = jQuery;
  $.ajaxSetup({ cache: false });

  $(document).ready(function () {
    if (typeof acf !== "undefined") {
      acf.unload.active = false;
    }
    function getPlaybackParam(url) {
      if (!url) url = window.location.href;
      const regex = /[?&]playback=(\d+)/;
      var match = regex.exec(url);
      if (match) {
        return match[1];
      }
      return null;
    }

    const fadeElements = document.querySelectorAll(".fade-element");
    let isMouseMoving = false;
    let timeout;

    // Function to handle mouse movement
    function handleMouseMovement() {
      if (!isMouseMoving) {
        fadeElements.forEach((element) => {
          element.classList.add("fade-out");
          element.classList.remove("fade-in");
        });
      }
      isMouseMoving = false;
      clearTimeout(timeout);

      // Set a timeout to fade the elements out after 3 seconds of inactivity
      timeout = setTimeout(() => {
        fadeElements.forEach((element) => {
          element.classList.add("fade-out");
          element.classList.remove("fade-in");
        });
      }, 1500);
    }

    // Event listener to detect mouse movement
    document.addEventListener("mousemove", () => {
      if (!fadeElements[0].classList.contains("fade-in")) {
        fadeElements.forEach((element) => {
          element.classList.remove("fade-out");
          element.classList.add("fade-in");
        });
      }
      isMouseMoving = true;
      clearTimeout(timeout);
      timeout = setTimeout(handleMouseMovement, 1500);
    });

    // Event listener to handle touch (mobile devices)
    document.addEventListener("touchstart", () => {
      if (!fadeElements[0].classList.contains("fade-in")) {
        fadeElements.forEach((element) => {
          element.classList.remove("fade-out");
          element.classList.add("fade-in");
        });
      }
      isMouseMoving = true;
      clearTimeout(timeout);
      timeout = setTimeout(handleMouseMovement, 1500);
    });

    /* play hover function on mobiles */

    if (/Mobi|Android/i.test(navigator.userAgent)) {
      // If the user agent is a mobile device, find all videos with class "preview"
      $(".preview").each(function () {
        // Play each video
        this.play();
      });
    }

    $(".preview").each(function () {
      // Play each video
      this.play();
      this.pause();
    });

    $(window).on("beforeunload", function () {
      setTimeout(function () {
        $(".info-loader").removeClass("red").css("transform", "translateY(100%)");
        // if (window.location.href.includes("info")) {
        //   $(".menu a").css("color", "rgb(0, 0, 0, 0.5)");
        // }
      }, 500);
    });

    /* Go straight to full video if playback number is in URL*/

    $(window).on("load", function (event) {
      var playbackNumber = getPlaybackParam();
      // Check if playbackNumber is present in the URL
      if (playbackNumber) {
        //transition : fade in the content
        $(".post-page, .info-page, .landing-page-film-container video,.director-page-film-container ").addClass("loaded");
        // Find the video with matching playback number
        var $videoWrapper = $(".vimeo-film-post")
          .has('video[src*="playback/' + playbackNumber + '"]')
          .find(".video-player-wrapper");
        if ($videoWrapper.length > 0) {
          // Add the playing class to the video wrapper
          $videoWrapper.addClass("playing");
          // Start playing the video
          $videoWrapper.find("video.full-film").get(0).play();
          // $videoWrapper.find("video.full-film").prop("controls", true);
          $videoWrapper.find("video.full-film").get(0).currentTime = 0;
          $videoWrapper.find("video.full-film").prop("muted", false);
          $videoWrapper.closest(".vimeo-film-post").find(".video-heading").addClass("see-heading");
          $("footer").addClass("hide");
          $(".post-template-default").addClass("stop-scroll");
          initializeVideoPlayer();
        }
      } else {
        $(".post-page, .info-page, .landing-page-film-container video, .director-page-film-container").addClass("loaded");
      }
    });

    /* clicking on a preview film */

    $(".post-page .vimeo-film-post ").click(function (event) {
      let videoSrc = $(this).find("video").attr("src");
      let playbackNumber = videoSrc.match(/playback\/(\d+)/)[1];
      if (getPlaybackParam()) {
        // event.preventDefault();
        // If the URL already has a playback parameter, do not execute the code
        return;
      } else {
        // event.preventDefault();
        // If the URL does not have a playback parameter, add it to the URL and navigate to the new URL
        let currentUrl = window.location.href;
        let newUrl = currentUrl + "?playback=" + playbackNumber;
        // window.location.href = newUrl;
        window.history.pushState({ path: newUrl }, "", newUrl);
        $(this).find(".video-player-wrapper").addClass("playing");
        $(this).find("video.full-film").get(0).play();
        // $(this).find("video.full-film").prop("controls", true);
        $(this).find("video.full-film").get(0).currentTime = 0;
        $(this).find("video.full-film").prop("muted", false);
        $(this).find(".video-heading").addClass("see-heading");
        initializeVideoPlayer();
        $(this).find(".video-player-wrapper.playing #playpause").addClass("playing");
      }
    });

    /* custom controls   */

    function initializeVideoPlayer() {
      let player = $(".video-player-wrapper.playing video.full-film");
      var btnPlayPause = $(".video-player-wrapper.playing #playpause");
      let fullScreen = $(".video-player-wrapper.playing #fs");
      let progressBar = $(".video-player-wrapper.playing #progress");
      let progresselement = $(".video-player-wrapper.playing #progress span");
      // Play/pause function
      var isPlaying = false;

      btnPlayPause.on("click touchstart", function (event) {
        event.preventDefault();
        if (isPlaying) {
          return;
        }

        isPlaying = true;

        if (player.get(0).paused || player.get(0).ended) {
          // Video is paused or ended, play the video
          player.get(0).play();
          btnPlayPause.addClass("playing");
        } else {
          // Video is playing, pause the video
          player.get(0).pause();
          btnPlayPause.removeClass("playing");
        }

        // Reset the flag after a short delay to allow subsequent interactions
        setTimeout(function () {
          isPlaying = false;
        }, 500);
      });

      // Progress bar update function
      player.on("timeupdate", function (event) {
        calculateRemainingTime();
        let progress = (player.get(0).currentTime / player.get(0).duration) * 100;
        progressBar.val(progress);
        progresselement.width(progress + "%");
      });

      //progress bar seek
      progressBar.on("click touchstart", function (e) {
        let clickOffset = e.pageX - $(this).offset().left;
        let progressBarWidth = $(this).width();
        let progresslength = (clickOffset / progressBarWidth) * 100;
        progresselement.css("width", progresslength + "%");

        let videoDuration = player.get(0).duration;
        let jumpToTime = (progresslength / 100) * videoDuration;
        player.get(0).currentTime = jumpToTime;
      });

      //time tags
      function calculateRemainingTime() {
        let videoDuration = player.get(0).duration;
        if (!isNaN(videoDuration)) {
          let currentTime = player.get(0).currentTime;
          let remainingTime = videoDuration - player.get(0).currentTime;

          let remainingHours = Math.floor(remainingTime / 3600);
          let remainingMinutes = Math.floor((remainingTime % 3600) / 60);
          let remainingSeconds = Math.floor(remainingTime % 60);

          let currentHours = Math.floor(currentTime / 3600);
          let currentMinutes = Math.floor((currentTime % 3600) / 60);
          let currentSeconds = Math.floor(currentTime % 60);

          let remainingTimeString = formatTime(remainingHours, remainingMinutes, remainingSeconds);
          let currentTimeString = formatTime(currentHours, currentMinutes, currentSeconds);

          $(".video-player-wrapper.playing p.time-left").text(remainingTimeString);
          $(".video-player-wrapper.playing p.time-gone").text(currentTimeString);
        }
      }

      function formatTime(hours, minutes, seconds) {
        let hoursString = hours.toString().padStart(2, "0");
        let minutesString = minutes.toString().padStart(2, "0");
        let secondsString = seconds.toString().padStart(2, "0");
        return hoursString + ":" + minutesString + ":" + secondsString;
      }

      // Wait for loadedmetadata event to ensure duration is accessible
      player.on("loadedmetadata", function (event) {
        calculateRemainingTime();
      });

      // Fullscreen function
      var isFullScreenToggle = false;

      fullScreen.on("click", function (event) {
        if (isFullScreenToggle) {
          return;
        }

        isFullScreenToggle = true;

        if (!document.fullscreenElement) {
          // Player is not in fullscreen, make it fullscreen
          if (player.get(0).requestFullscreen) {
            player.get(0).requestFullscreen();
          } else if (player.get(0).mozRequestFullScreen) {
            player.get(0).mozRequestFullScreen();
          } else if (player.get(0).webkitEnterFullscreen) {
            player.get(0).webkitEnterFullscreen();
          } else if (player.get(0).msRequestFullscreen) {
            player.get(0).msRequestFullscreen();
          }
        } else {
          // Player is in fullscreen, exit fullscreen
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          }
        }

        // Reset the flag after a short delay to allow subsequent interactions
        setTimeout(function () {
          isFullScreenToggle = false;
        }, 500);
      });
    }

    /* play preview on hover */

    $(".post-page .vimeo-film-post ")
      .mouseenter(function () {
        var $videoWrapper = $(this).find(".video-player-wrapper");
        if (!$videoWrapper.hasClass("playing")) {
          $videoWrapper.find("video").get(0).play();
        }
      })
      .mouseleave(function () {
        var $videoWrapper = $(this).find(".video-player-wrapper");
        if (!$videoWrapper.hasClass("playing")) {
          $videoWrapper.find("video").get(0).pause();
        }
      });

    $(".post-page  .close-button").click(function (event) {
      event.stopPropagation();
      $(".post-template-default").removeClass("stop-scroll");
      $("footer").removeClass("hide");
      $(".video-player-wrapper").each(function () {
        $(this).find("video").get(0).pause();
        $(this).find("video").get(0).currentTime = 0;
        $(this).find("video").prop("controls", false);
        $(this).find("video").prop("muted", true);
      });

      $(".video-player-wrapper").removeClass("playing");
      $(".video-heading").removeClass("see-heading");
      // Remove the playback parameter from the URL
      var newUrl = window.location.href.replace(/(\?|&)playback=\d+/, "");
      history.replaceState(null, null, newUrl);
    });

    // Change menu to mobile version,
    // deactivate 'director' link
    // toggle sub menu on click

    //   $(document).ready(function () {
    //   if (window.innerWidth < 700) {

    //     const link = document.getElementById("menu-item-70").firstChild;
    //     const subMenu = document.querySelector(".sub-menu");
    //     subMenu.classList.add('hidden');

    //     link.setAttribute('href', '#');
    //     link.addEventListener('click', revealSub)

    //       function revealSub () {
    //         subMenu.classList.toggle('hidden');
    //         console.log("hidden toggled");
    //       }
    //   }
    // });

    /* page transition */

    $(document).ready(function () {
      $("nav a, .footer-link").on("click", function (event) {
        event.preventDefault();
        if (event.currentTarget.href.includes("info")) {
          $(".info-loader").addClass("red");
        } else {
          $(".info-loader").removeClass("red");
          setTimeout(function () {
            $(".menu a").css("color", "white");
            $(".sub-menu li a").css("color", "rgba(255, 255, 255, 0.5)");
          }, 500);
        }
        if (event.currentTarget.href === window.location.href) {
          return;
        } else $(".info-loader").css("transform", "translateY(0%)");
        setTimeout(function () {
          window.location.href = event.currentTarget.href;
        }, 500);
      });
    });
  });
}).call(this);
