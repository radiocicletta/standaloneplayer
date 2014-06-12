(function(){
"use strict";
var api_uri = "http://api.radiocicletta.it/player";
//var api_uri = '.';
var $;

function onload(scr, callback) {
    if (scr.readyState){
        scr.onreadystatechange = function(){
            if (scr.readyState == "loaded" ||
                scr.readyState == "complete"){
                scr.onreadystatechange = null;
                callback();
            }
        };
    } else {
        scr.onload = function(){
            callback();
        };
    }
}

function attach(el, evt, cbk) {
    if (el.addEventListener) {
      el.addEventListener(evt, cbk, false); 
    } else if (el.attachEvent)  {
      el.attachEvent('on' + evt, cbk);
    }
}


function init(){
    if (document.createStyleSheet) {
        document.createStyleSheet(api_uri + '/pink.flag/jplayer.pink.flag.css');
    }
    else {
        $(document.head).append('<link rel="stylesheet" href="' + api_uri + '/pink.flag/jplayer.pink.flag.css" type="text/css"/>');
    }
    $(function(){
        var template =
        $(
            '<div id="jquery_jplayer_1" class="jp-jplayer"></div>'+
            '<div id="jp_container_1" class="jp-audio-stream" style="position: fixed; bottom: 0px; right: 20px; z-index: 24; display: block; padding: 5px 20px; height: 0px">' +
            '   <div class="jp-type-single">' +
            '       <div class="jp-gui jp-interface">' +
            '           <ul class="jp-controls">' +
            '               <li><a href="javascript:;" class="jp-play" tabindex="1">play</a></li>' +
            '               <li><a href="javascript:;" class="jp-pause" tabindex="1">pause</a></li>' +
            '           </ul>' +
            '           <div class="jp-volume-bar">' +
            '               <div class="jp-volume-bar-value"></div>' +
            '           </div>' +
            '       </div>' +
            '       <div class="jp-details">' +
            '           <ul>' +
            '               <li><span class="jp-title" style="font-size: 60%"><strong>ON AIR:</strong> <a style="color:white;" href="http://www.radiocicletta.it">Radiocicletta!</a></span></li>' +
            '           </ul>' +
            '       </div>' +
            '       <div class="jp-no-solution">' +
            '           <span>Update Required</span>' +
            '           To play the media you will need to either update your browser to a recent version or update your <a href="http://get.adobe.com/flashplayer/" target="_blank">Flash plugin</a>.' +
            '       </div>' +
            '   </div>' +
            '</div>'
         );
        $(document.body).append(template);
        var ready = false;
        $("#jquery_jplayer_1").jPlayer({
             ready: function () {
                 ready = true;
         $("#jp_container_1").animate({height: "100px"});
                 $(this).jPlayer("setMedia", {
                     mp3: "http://radiocicletta.it:8000/stream",
                     title: "Radiocicletta"
                 });
             },
             pause: function() {
                $(this).jPlayer("clearMedia");
             },
             error: function(event) {
                if(ready && event.jPlayer.error.type === $.jPlayer.error.URL_NOT_SET) {
                    $(this).jPlayer("setMedia", stream).jPlayer("play");
                }
             },
             swfPath: "./jplayer/",
             supplied: "mp3",
             solution: 'html, flash',
             preload: 'none',
             volume: 0.4,
             muted: false,
             backgroundColor: '#000000',
             cssSelectorAncestor: '#jp_container_1',
             cssSelector: {
              videoPlay: '.jp-video-play',
              play: '.jp-play',
              pause: '.jp-pause',
              stop: '.jp-stop',
              seekBar: '.jp-seek-bar',
              playBar: '.jp-play-bar',
              mute: '.jp-mute',
              unmute: '.jp-unmute',
              volumeBar: '.jp-volume-bar',
              volumeBarValue: '.jp-volume-bar-value',
              volumeMax: '.jp-volume-max',
              playbackRateBar: '.jp-playback-rate-bar',
              playbackRateBarValue: '.jp-playback-rate-bar-value',
              currentTime: '.jp-current-time',
              duration: '.jp-duration',
              title: '.jp-title',
              fullScreen: '.jp-full-screen',
              restoreScreen: '.jp-restore-screen',
              repeat: '.jp-repeat',
              repeatOff: '.jp-repeat-off',
              gui: '.jp-gui',
              noSolution: '.jp-no-solution'
             }
         });
    });
}


function initjs() {
    if (window.cycleReady)
        return;
    window.cycleReady = true;
    var scr = document.createElement('script');
    scr.src = api_uri + "/jplayer/jquery.jplayer.min.js";
    attach(window, 'load', function(){
        document.body.appendChild(scr);
        onload(scr, init);
    });
}

if (!window.jQuery) {
    var scr = document.createElement('script');
    scr.src = api_uri + "/jquery-1.11.1.min.js";
    attach(window, 'load', function(){
       document.body.appendChild(scr);
       onload(scr, initjs);
    });
} else{
    $ = window.jQuery;
    initjs();
}

})();
