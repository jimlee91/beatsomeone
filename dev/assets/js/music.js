if (!window.AudioContext) {
  // webaudio 작동 ( ex 크롬 )
  function time_convert(num) {
    var minutes = Math.floor(num / 60);
    var seconds = num % 60;
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return minutes + ":" + seconds;
  }
  var _GLOBAL_ACTIONS = {}; // 각 액션들이 담기는 객체
  function setAudioInstance(item) {
    var audio = WaveSurfer.create({
      container: "#playList__item" + item.id + " .wave",
      waveColor: "#696969",
      progressColor: "#c3ac45",
      hideScrollbar: true,
      height: 90
    });
    audio.load(item.url);
    audio.on("play", function(e) {
      var playingThumb = document
        .querySelector("#playList__item" + item.id)
        .querySelector(".playList__cover")
        .cloneNode(true);
      document
        .querySelector("#playList__item" + item.id)
        .classList.add("playing");
    });
    audio.on("audioprocess", function(e) {
      // 파일이 재생될때 계속 실행
      document.querySelector(
        "#playList__item" + item.id + " .current"
      ).innerHTML = time_convert(parseInt(e, 10)) + " / ";
    });
    audio.on("ready", function(e) {
      // 파일이 로드가 다 됐을때,
      document.querySelector(
        "#playList__item" + item.id + " .duration"
      ).innerHTML = time_convert(parseInt(audio.getDuration(), 10));
    });
    audio.on("pause", function(e) {
      var actionTarget = "playAction" + item.id;
      document
        .querySelector("#playList__item" + item.id)
        .classList.remove("playing");
    });

    var actionName = "playAction" + item.id;
    _GLOBAL_ACTIONS[actionName] = audio;
  }
  function renderPlaylist(arr) {
    _.each(arr, function(item, index) {
      document
        .getElementById("playList__list")
        .insertAdjacentHTML("beforeend", template(item));

      setAudioInstance(item);
      if (item.subPlayList.length > 0) {
        _.each(item.subPlayList, function(playList, index) {
          setAudioInstance(playList);
        });
      }
    });
  }
  function renderPlaylistNoDepth(arr) {
    _.each(arr, function(item, index) {
      document
        .getElementById("playList__list")
        .insertAdjacentHTML("beforeend", template(item));

      setAudioInstance(item);
    });
  }
  document.addEventListener("DOMContentLoaded", function() {
    [].forEach.call(document.querySelectorAll("[data-action]"), function(el) {
      el.addEventListener("click", function(e) {
        var action = e.currentTarget.dataset.action;
        var id = e.currentTarget.dataset.id;

        if (action in _GLOBAL_ACTIONS) {
          e.preventDefault();
          Object.keys(_GLOBAL_ACTIONS).map(function(key) {
            if (_GLOBAL_ACTIONS[key] !== _GLOBAL_ACTIONS[action]) {
              _GLOBAL_ACTIONS[key].stop();
            }
          });
          _GLOBAL_ACTIONS[action].playPause();
        }
      });
    });
  });
} else {
}
