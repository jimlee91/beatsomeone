$(function() {
  $(".filter__title").on("click", function() {
    $(this).toggleClass("folded");
    $(this)
      .siblings(".filter__content")
      .stop()
      .slideToggle();
  });

  // BPM range
  if ($(".bpmRange").length) {
    $(".bpmRange input").ionRangeSlider({
      skin: "round",
      type: "double",
      min: 0,
      max: 170,
      from: 0,
      to: 125,
      onStart: function(data) {
        $("#bpm-start").val(data.from_pretty);
        $("#bpm-end").val(data.to_pretty);
      },
      onChange: function(data) {
        $("#bpm-start").val(data.from_pretty);
        $("#bpm-end").val(data.to_pretty);
      }
    });
  }
  // 메인 trend Slider
  $(".trending__slider .slider").slick({
    slidesToShow: 6,
    slidesToScroll: 6,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    dots: true
  });
  // 메인페이지: 서브 앨범 슬라이드 이벤트
  $(".toggle-subList").on("click", function() {
    var itemLength = $(this)
      .parents(".playList__itembox")
      .find(".subPlayList .playList__itembox").length;
    $(this).toggleClass("active");
    $(this)
      .parents(".playList__itembox")
      .toggleClass("is-show-children");

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

  // 커스텀 셀렉트 옵션
  $(".custom-select").on("click", function() {
    $(this)
      .siblings(".custom-select")
      .removeClass("active")
      .find(".options")
      .hide();
    $(this).toggleClass("active");
    $(this)
      .find(".options")
      .toggle();
  });
});
// 윈도우 스크롤 했을때,
$(window).scroll(function() {
  var t = $("html, body").scrollTop();
  if (t > 10) {
    $(".header").addClass("scrolled");
  } else {
    $(".header").removeClass("scrolled");
  }
});
