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
  audio.load(item.audioFile);
  audio.on("play", function(e) {
    console.log(audio.getCurrentTime());
    document
      .querySelector("#playList__item" + item.id)
      .classList.add("playing");
  });
  audio.on("audioprocess", function(e) {
    // 파일이 재생될때 계속 실행
    document.querySelector(
      "#playList__item" + item.id + " .current"
    ).innerText = time_convert(parseInt(e, 10)) + " / ";
  });
  audio.on("ready", function(e) {
    // 파일이 로드가 다 됐을때,
    document.querySelector(
      "#playList__item" + item.id + " .duration"
    ).innerText = time_convert(parseInt(audio.getDuration(), 10));
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
document.addEventListener("DOMContentLoaded", function() {
  [].forEach.call(document.querySelectorAll("[data-action]"), function(el) {
    el.addEventListener("click", function(e) {
      var action = e.currentTarget.dataset.action;
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

$(function() {
  // 메인페이지: 서브 앨범 슬라이드 이벤트
  $(".toggle-subList").on("click", function() {
    var itemLength = $(this)
      .parents(".playList__itembox")
      .find(".subPlayList .playList__itembox").length;
    $(this).toggleClass("active");
    if ($(this).hasClass("active")) {
      // active 일때,
      $(this)
        .parents(".playList__itembox")
        .find(".subPlayList")
        .css("height", 90 * itemLength);
    } else {
      // 지웟을때,
      $(this)
        .parents(".playList__itembox")
        .find(".subPlayList")
        .css("height", 0);
    }
  });
});
