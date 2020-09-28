!function(t,e){if("object"==typeof exports&&"undefined"!=typeof module){var i=require("video.js");module.exports=e(i.default||i)}else"function"==typeof define&&define.amd?define(["videojs"],(function(i){return t.Youtube=e(i)})):t.Youtube=e(t.videojs)}(this,(function(t){"use strict";var e,i,s,o,r,n,a,h,l=t.browser.IS_IOS||t.browser.IS_NATIVE_ANDROID,d=t.getTech("Tech"),u=t.extend(d,{constructor:function(t,e){d.call(this,t,e),this.setPoster(t.poster),this.setSrc(this.options_.source,!0),this.setTimeout(function(){this.el_&&(this.el_.parentNode.className+=" vjs-youtube",l&&(this.el_.parentNode.className+=" vjs-youtube-mobile"),u.isApiReady?this.initYTPlayer():u.apiReadyQueue.push(this))}.bind(this))},dispose:function(){if(this.ytPlayer)this.ytPlayer.stopVideo&&this.ytPlayer.stopVideo(),this.ytPlayer.destroy&&this.ytPlayer.destroy();else{var t=u.apiReadyQueue.indexOf(this);-1!==t&&u.apiReadyQueue.splice(t,1)}this.ytPlayer=null,this.el_.parentNode.className=this.el_.parentNode.className.replace(" vjs-youtube","").replace(" vjs-youtube-mobile",""),this.el_.parentNode.removeChild(this.el_),d.prototype.dispose.call(this)},createEl:function(){var t=document.createElement("div");t.setAttribute("id",this.options_.techId),t.setAttribute("style","width:100%;height:100%;top:0;left:0;position:absolute"),t.setAttribute("class","vjs-tech");var e=document.createElement("div");if(e.appendChild(t),!l&&!this.options_.ytControls){var i=document.createElement("div");i.setAttribute("class","vjs-iframe-blocker"),i.setAttribute("style","position:absolute;top:0;left:0;width:100%;height:100%"),i.onclick=function(){this.pause()}.bind(this),e.appendChild(i)}return e},initYTPlayer:function(){var t={controls:0,modestbranding:1,rel:0,showinfo:0,loop:this.options_.loop?1:0};if(void 0!==this.options_.autohide&&(t.autohide=this.options_.autohide),void 0!==this.options_.cc_load_policy&&(t.cc_load_policy=this.options_.cc_load_policy),void 0!==this.options_.ytControls&&(t.controls=this.options_.ytControls),void 0!==this.options_.disablekb&&(t.disablekb=this.options_.disablekb),void 0!==this.options_.color&&(t.color=this.options_.color),t.controls?void 0!==this.options_.fs&&(t.fs=this.options_.fs):t.fs=0,-1!==this.options_.source.src.indexOf("end=")){var e=this.options_.source.src.match(/end=([0-9]*)/);this.options_.end=parseInt(e[1])}if(void 0!==this.options_.end&&(t.end=this.options_.end),void 0!==this.options_.hl?t.hl=this.options_.hl:void 0!==this.options_.language&&(t.hl=this.options_.language.substr(0,2)),void 0!==this.options_.iv_load_policy&&(t.iv_load_policy=this.options_.iv_load_policy),void 0!==this.options_.list?t.list=this.options_.list:this.url&&void 0!==this.url.listId&&(t.list=this.url.listId),void 0!==this.options_.listType&&(t.listType=this.options_.listType),void 0!==this.options_.modestbranding&&(t.modestbranding=this.options_.modestbranding),void 0!==this.options_.playlist&&(t.playlist=this.options_.playlist),void 0!==this.options_.playsinline&&(t.playsinline=this.options_.playsinline),void 0!==this.options_.rel&&(t.rel=this.options_.rel),void 0!==this.options_.showinfo&&(t.showinfo=this.options_.showinfo),-1!==this.options_.source.src.indexOf("start=")){var i=this.options_.source.src.match(/start=([0-9]*)/);this.options_.start=parseInt(i[1])}if(void 0!==this.options_.start&&(t.start=this.options_.start),void 0!==this.options_.theme&&(t.theme=this.options_.theme),void 0!==this.options_.customVars){var s=this.options_.customVars;Object.keys(s).forEach((function(e){t[e]=s[e]}))}this.activeVideoId=this.url?this.url.videoId:null,this.activeList=t.list;var o={videoId:this.activeVideoId,playerVars:t,events:{onReady:this.onPlayerReady.bind(this),onPlaybackQualityChange:this.onPlayerPlaybackQualityChange.bind(this),onPlaybackRateChange:this.onPlayerPlaybackRateChange.bind(this),onStateChange:this.onPlayerStateChange.bind(this),onVolumeChange:this.onPlayerVolumeChange.bind(this),onError:this.onPlayerError.bind(this)}};void 0!==this.options_.enablePrivacyEnhancedMode&&this.options_.enablePrivacyEnhancedMode&&(o.host="https://www.youtube-nocookie.com"),this.ytPlayer=new YT.Player(this.options_.techId,o)},onPlayerReady:function(){this.options_.muted&&this.ytPlayer.mute(),this.ytPlayer.getAvailablePlaybackRates().length>1&&(this.featuresPlaybackRate=!0),this.playerReady_=!0,this.triggerReady(),this.playOnReady?this.play():this.cueOnReady&&(this.cueVideoById_(this.url.videoId),this.activeVideoId=this.url.videoId)},onPlayerPlaybackQualityChange:function(){},onPlayerPlaybackRateChange:function(){this.trigger("ratechange")},onPlayerStateChange:function(t){var e=t.data;if(e!==this.lastState&&!this.errorNumber)switch(this.lastState=e,e){case-1:this.trigger("loadstart"),this.trigger("loadedmetadata"),this.trigger("durationchange"),this.trigger("ratechange");break;case YT.PlayerState.ENDED:this.trigger("ended");break;case YT.PlayerState.PLAYING:this.trigger("timeupdate"),this.trigger("durationchange"),this.trigger("playing"),this.trigger("play"),this.isSeeking&&this.onSeeked();break;case YT.PlayerState.PAUSED:this.trigger("canplay"),this.isSeeking?this.onSeeked():this.trigger("pause");break;case YT.PlayerState.BUFFERING:this.player_.trigger("timeupdate"),this.player_.trigger("waiting")}},onPlayerVolumeChange:function(){this.trigger("volumechange")},onPlayerError:function(t){this.errorNumber=t.data,this.trigger("pause"),this.trigger("error")},error:function(){var t=1e3+this.errorNumber;switch(this.errorNumber){case 5:return{code:t,message:"Error while trying to play the video"};case 2:case 100:return{code:t,message:"Unable to find the video"};case 101:case 150:return{code:t,message:"Playback on other Websites has been disabled by the video owner."}}return{code:t,message:"YouTube unknown error ("+this.errorNumber+")"}},loadVideoById_:function(t){var e={videoId:t};this.options_.start&&(e.startSeconds=this.options_.start),this.options_.end&&(e.endSeconds=this.options_.end),this.ytPlayer.loadVideoById(e)},cueVideoById_:function(t){var e={videoId:t};this.options_.start&&(e.startSeconds=this.options_.start),this.options_.end&&(e.endSeconds=this.options_.end),this.ytPlayer.cueVideoById(e)},src:function(t){return t&&this.setSrc({src:t}),this.source},poster:function(){return l?null:this.poster_},setPoster:function(t){this.poster_=t},setSrc:function(t){t&&t.src&&(delete this.errorNumber,this.source=t,this.url=u.parseUrl(t.src),this.options_.poster||this.url.videoId&&(this.poster_="https://img.youtube.com/vi/"+this.url.videoId+"/0.jpg",this.trigger("posterchange"),this.checkHighResPoster()),this.options_.autoplay&&!l?this.isReady_?this.play():this.playOnReady=!0:this.activeVideoId!==this.url.videoId&&(this.isReady_?(this.cueVideoById_(this.url.videoId),this.activeVideoId=this.url.videoId):this.cueOnReady=!0))},autoplay:function(){return this.options_.autoplay},setAutoplay:function(t){this.options_.autoplay=t},loop:function(){return this.options_.loop},setLoop:function(t){this.options_.loop=t},play:function(){this.url&&this.url.videoId&&(this.wasPausedBeforeSeek=!1,this.isReady_?(this.url.listId&&(this.activeList===this.url.listId?this.ytPlayer.playVideo():(this.ytPlayer.loadPlaylist(this.url.listId),this.activeList=this.url.listId)),this.activeVideoId===this.url.videoId?this.ytPlayer.playVideo():(this.loadVideoById_(this.url.videoId),this.activeVideoId=this.url.videoId)):(this.trigger("waiting"),this.playOnReady=!0))},pause:function(){this.ytPlayer&&this.ytPlayer.pauseVideo()},paused:function(){return!this.ytPlayer||this.lastState!==YT.PlayerState.PLAYING&&this.lastState!==YT.PlayerState.BUFFERING},currentTime:function(){return this.ytPlayer?this.ytPlayer.getCurrentTime():0},setCurrentTime:function(t){this.lastState===YT.PlayerState.PAUSED&&(this.timeBeforeSeek=this.currentTime()),this.isSeeking||(this.wasPausedBeforeSeek=this.paused()),this.ytPlayer.seekTo(t,!0),this.trigger("timeupdate"),this.trigger("seeking"),this.isSeeking=!0,this.lastState===YT.PlayerState.PAUSED&&this.timeBeforeSeek!==t&&(clearInterval(this.checkSeekedInPauseInterval),this.checkSeekedInPauseInterval=setInterval(function(){this.lastState===YT.PlayerState.PAUSED&&this.isSeeking?this.currentTime()!==this.timeBeforeSeek&&(this.trigger("timeupdate"),this.onSeeked()):clearInterval(this.checkSeekedInPauseInterval)}.bind(this),250))},seeking:function(){return this.isSeeking},seekable:function(){return this.ytPlayer?t.createTimeRange(0,this.ytPlayer.getDuration()):t.createTimeRange()},onSeeked:function(){clearInterval(this.checkSeekedInPauseInterval),this.isSeeking=!1,this.wasPausedBeforeSeek&&this.pause(),this.trigger("seeked")},playbackRate:function(){return this.ytPlayer?this.ytPlayer.getPlaybackRate():1},setPlaybackRate:function(t){this.ytPlayer&&this.ytPlayer.setPlaybackRate(t)},duration:function(){return this.ytPlayer?this.ytPlayer.getDuration():0},currentSrc:function(){return this.source&&this.source.src},ended:function(){return!!this.ytPlayer&&this.lastState===YT.PlayerState.ENDED},volume:function(){return this.ytPlayer?this.ytPlayer.getVolume()/100:1},setVolume:function(t){this.ytPlayer&&this.ytPlayer.setVolume(100*t)},muted:function(){return!!this.ytPlayer&&this.ytPlayer.isMuted()},setMuted:function(t){this.ytPlayer&&(this.muted(!0),t?this.ytPlayer.mute():this.ytPlayer.unMute(),this.setTimeout((function(){this.trigger("volumechange")}),50))},buffered:function(){if(!this.ytPlayer||!this.ytPlayer.getVideoLoadedFraction)return t.createTimeRange();var e=this.ytPlayer.getVideoLoadedFraction()*this.ytPlayer.getDuration();return t.createTimeRange(0,e)},preload:function(){},load:function(){},reset:function(){},networkState:function(){if(!this.ytPlayer)return 0;switch(this.ytPlayer.getPlayerState()){case-1:return 0;case 3:return 2;default:return 1}},readyState:function(){if(!this.ytPlayer)return 0;switch(this.ytPlayer.getPlayerState()){case-1:return 0;case 5:return 1;case 3:return 2;default:return 4}},supportsFullScreen:function(){return document.fullscreenEnabled||document.webkitFullscreenEnabled||document.mozFullScreenEnabled||document.msFullscreenEnabled},checkHighResPoster:function(){var t="https://img.youtube.com/vi/"+this.url.videoId+"/maxresdefault.jpg";try{var e=new Image;e.onload=function(){if("naturalHeight"in e){if(e.naturalHeight<=90||e.naturalWidth<=120)return}else if(e.height<=90||e.width<=120)return;this.poster_=t,this.trigger("posterchange")}.bind(this),e.onerror=function(){},e.src=t}catch(t){}}});u.isSupported=function(){return!0},u.canPlaySource=function(t){return u.canPlayType(t.type)},u.canPlayType=function(t){return"video/youtube"===t},u.parseUrl=function(t){var e={videoId:null},i=t.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/);i&&11===i[2].length&&(e.videoId=i[2]);return(i=t.match(/[?&]list=([^#\&\?]+)/))&&i[1]&&(e.listId=i[1]),e},u.apiReadyQueue=[],"undefined"!=typeof document&&(o="https://www.youtube.com/iframe_api",r=function(){YT.ready((function(){u.isApiReady=!0;for(var t=0;t<u.apiReadyQueue.length;++t)u.apiReadyQueue[t].initYTPlayer()}))},n=!1,a=document.createElement("script"),(h=document.getElementsByTagName("script")[0])&&(h.parentNode.insertBefore(a,h),a.onload=function(){n||(n=!0,r())},a.onreadystatechange=function(){n||"complete"!==this.readyState&&"loaded"!==this.readyState||(n=!0,r())},a.src=o),e=".vjs-youtube .vjs-iframe-blocker { display: none; }.vjs-youtube.vjs-user-inactive .vjs-iframe-blocker { display: block; }.vjs-youtube .vjs-poster { background-size: cover; }.vjs-youtube-mobile .vjs-big-play-button { display: none; }",i=document.head||document.getElementsByTagName("head")[0],(s=document.createElement("style")).type="text/css",s.styleSheet?s.styleSheet.cssText=e:s.appendChild(document.createTextNode(e)),i.appendChild(s)),void 0!==t.registerTech?t.registerTech("Youtube",u):t.registerComponent("Youtube",u)})),function(t,e){if("object"==typeof exports&&"undefined"!=typeof module){var i=require("video.js");module.exports=e(i.default||i)}else"function"==typeof define&&define.amd?define(["videojs"],(function(i){return t.Youtube=e(i)})):t.Youtube=e(t.videojs)}(this,(function(t){"use strict";var e,i,s,o,r,n,a,h,l=t.browser.IS_IOS||t.browser.IS_NATIVE_ANDROID,d=t.getTech("Tech"),u=t.extend(d,{constructor:function(t,e){d.call(this,t,e),this.setPoster(t.poster),this.setSrc(this.options_.source,!0),this.setTimeout(function(){this.el_&&(this.el_.parentNode.className+=" vjs-youtube",l&&(this.el_.parentNode.className+=" vjs-youtube-mobile"),u.isApiReady?this.initYTPlayer():u.apiReadyQueue.push(this))}.bind(this))},dispose:function(){if(this.ytPlayer)this.ytPlayer.stopVideo&&this.ytPlayer.stopVideo(),this.ytPlayer.destroy&&this.ytPlayer.destroy();else{var t=u.apiReadyQueue.indexOf(this);-1!==t&&u.apiReadyQueue.splice(t,1)}this.ytPlayer=null,this.el_.parentNode.className=this.el_.parentNode.className.replace(" vjs-youtube","").replace(" vjs-youtube-mobile",""),this.el_.parentNode.removeChild(this.el_),d.prototype.dispose.call(this)},createEl:function(){var t=document.createElement("div");t.setAttribute("id",this.options_.techId),t.setAttribute("style","width:100%;height:100%;top:0;left:0;position:absolute"),t.setAttribute("class","vjs-tech");var e=document.createElement("div");if(e.appendChild(t),!l&&!this.options_.ytControls){var i=document.createElement("div");i.setAttribute("class","vjs-iframe-blocker"),i.setAttribute("style","position:absolute;top:0;left:0;width:100%;height:100%"),i.onclick=function(){this.pause()}.bind(this),e.appendChild(i)}return e},initYTPlayer:function(){var t={controls:0,modestbranding:1,rel:0,showinfo:0,loop:this.options_.loop?1:0};if(void 0!==this.options_.autohide&&(t.autohide=this.options_.autohide),void 0!==this.options_.cc_load_policy&&(t.cc_load_policy=this.options_.cc_load_policy),void 0!==this.options_.ytControls&&(t.controls=this.options_.ytControls),void 0!==this.options_.disablekb&&(t.disablekb=this.options_.disablekb),void 0!==this.options_.color&&(t.color=this.options_.color),t.controls?void 0!==this.options_.fs&&(t.fs=this.options_.fs):t.fs=0,-1!==this.options_.source.src.indexOf("end=")){var e=this.options_.source.src.match(/end=([0-9]*)/);this.options_.end=parseInt(e[1])}if(void 0!==this.options_.end&&(t.end=this.options_.end),void 0!==this.options_.hl?t.hl=this.options_.hl:void 0!==this.options_.language&&(t.hl=this.options_.language.substr(0,2)),void 0!==this.options_.iv_load_policy&&(t.iv_load_policy=this.options_.iv_load_policy),void 0!==this.options_.list?t.list=this.options_.list:this.url&&void 0!==this.url.listId&&(t.list=this.url.listId),void 0!==this.options_.listType&&(t.listType=this.options_.listType),void 0!==this.options_.modestbranding&&(t.modestbranding=this.options_.modestbranding),void 0!==this.options_.playlist&&(t.playlist=this.options_.playlist),void 0!==this.options_.playsinline&&(t.playsinline=this.options_.playsinline),void 0!==this.options_.rel&&(t.rel=this.options_.rel),void 0!==this.options_.showinfo&&(t.showinfo=this.options_.showinfo),-1!==this.options_.source.src.indexOf("start=")){var i=this.options_.source.src.match(/start=([0-9]*)/);this.options_.start=parseInt(i[1])}if(void 0!==this.options_.start&&(t.start=this.options_.start),void 0!==this.options_.theme&&(t.theme=this.options_.theme),void 0!==this.options_.customVars){var s=this.options_.customVars;Object.keys(s).forEach((function(e){t[e]=s[e]}))}this.activeVideoId=this.url?this.url.videoId:null,this.activeList=t.list;var o={videoId:this.activeVideoId,playerVars:t,events:{onReady:this.onPlayerReady.bind(this),onPlaybackQualityChange:this.onPlayerPlaybackQualityChange.bind(this),onPlaybackRateChange:this.onPlayerPlaybackRateChange.bind(this),onStateChange:this.onPlayerStateChange.bind(this),onVolumeChange:this.onPlayerVolumeChange.bind(this),onError:this.onPlayerError.bind(this)}};void 0!==this.options_.enablePrivacyEnhancedMode&&this.options_.enablePrivacyEnhancedMode&&(o.host="https://www.youtube-nocookie.com"),this.ytPlayer=new YT.Player(this.options_.techId,o)},onPlayerReady:function(){this.options_.muted&&this.ytPlayer.mute(),this.ytPlayer.getAvailablePlaybackRates().length>1&&(this.featuresPlaybackRate=!0),this.playerReady_=!0,this.triggerReady(),this.playOnReady?this.play():this.cueOnReady&&(this.cueVideoById_(this.url.videoId),this.activeVideoId=this.url.videoId)},onPlayerPlaybackQualityChange:function(){},onPlayerPlaybackRateChange:function(){this.trigger("ratechange")},onPlayerStateChange:function(t){var e=t.data;if(e!==this.lastState&&!this.errorNumber)switch(this.lastState=e,e){case-1:this.trigger("loadstart"),this.trigger("loadedmetadata"),this.trigger("durationchange"),this.trigger("ratechange");break;case YT.PlayerState.ENDED:this.trigger("ended");break;case YT.PlayerState.PLAYING:this.trigger("timeupdate"),this.trigger("durationchange"),this.trigger("playing"),this.trigger("play"),this.isSeeking&&this.onSeeked();break;case YT.PlayerState.PAUSED:this.trigger("canplay"),this.isSeeking?this.onSeeked():this.trigger("pause");break;case YT.PlayerState.BUFFERING:this.player_.trigger("timeupdate"),this.player_.trigger("waiting")}},onPlayerVolumeChange:function(){this.trigger("volumechange")},onPlayerError:function(t){this.errorNumber=t.data,this.trigger("pause"),this.trigger("error")},error:function(){var t=1e3+this.errorNumber;switch(this.errorNumber){case 5:return{code:t,message:"Error while trying to play the video"};case 2:case 100:return{code:t,message:"Unable to find the video"};case 101:case 150:return{code:t,message:"Playback on other Websites has been disabled by the video owner."}}return{code:t,message:"YouTube unknown error ("+this.errorNumber+")"}},loadVideoById_:function(t){var e={videoId:t};this.options_.start&&(e.startSeconds=this.options_.start),this.options_.end&&(e.endSeconds=this.options_.end),this.ytPlayer.loadVideoById(e)},cueVideoById_:function(t){var e={videoId:t};this.options_.start&&(e.startSeconds=this.options_.start),this.options_.end&&(e.endSeconds=this.options_.end),this.ytPlayer.cueVideoById(e)},src:function(t){return t&&this.setSrc({src:t}),this.source},poster:function(){return l?null:this.poster_},setPoster:function(t){this.poster_=t},setSrc:function(t){t&&t.src&&(delete this.errorNumber,this.source=t,this.url=u.parseUrl(t.src),this.options_.poster||this.url.videoId&&(this.poster_="https://img.youtube.com/vi/"+this.url.videoId+"/0.jpg",this.trigger("posterchange"),this.checkHighResPoster()),this.options_.autoplay&&!l?this.isReady_?this.play():this.playOnReady=!0:this.activeVideoId!==this.url.videoId&&(this.isReady_?(this.cueVideoById_(this.url.videoId),this.activeVideoId=this.url.videoId):this.cueOnReady=!0))},autoplay:function(){return this.options_.autoplay},setAutoplay:function(t){this.options_.autoplay=t},loop:function(){return this.options_.loop},setLoop:function(t){this.options_.loop=t},play:function(){this.url&&this.url.videoId&&(this.wasPausedBeforeSeek=!1,this.isReady_?(this.url.listId&&(this.activeList===this.url.listId?this.ytPlayer.playVideo():(this.ytPlayer.loadPlaylist(this.url.listId),this.activeList=this.url.listId)),this.activeVideoId===this.url.videoId?this.ytPlayer.playVideo():(this.loadVideoById_(this.url.videoId),this.activeVideoId=this.url.videoId)):(this.trigger("waiting"),this.playOnReady=!0))},pause:function(){this.ytPlayer&&this.ytPlayer.pauseVideo()},paused:function(){return!this.ytPlayer||this.lastState!==YT.PlayerState.PLAYING&&this.lastState!==YT.PlayerState.BUFFERING},currentTime:function(){return this.ytPlayer?this.ytPlayer.getCurrentTime():0},setCurrentTime:function(t){this.lastState===YT.PlayerState.PAUSED&&(this.timeBeforeSeek=this.currentTime()),this.isSeeking||(this.wasPausedBeforeSeek=this.paused()),this.ytPlayer.seekTo(t,!0),this.trigger("timeupdate"),this.trigger("seeking"),this.isSeeking=!0,this.lastState===YT.PlayerState.PAUSED&&this.timeBeforeSeek!==t&&(clearInterval(this.checkSeekedInPauseInterval),this.checkSeekedInPauseInterval=setInterval(function(){this.lastState===YT.PlayerState.PAUSED&&this.isSeeking?this.currentTime()!==this.timeBeforeSeek&&(this.trigger("timeupdate"),this.onSeeked()):clearInterval(this.checkSeekedInPauseInterval)}.bind(this),250))},seeking:function(){return this.isSeeking},seekable:function(){return this.ytPlayer?t.createTimeRange(0,this.ytPlayer.getDuration()):t.createTimeRange()},onSeeked:function(){clearInterval(this.checkSeekedInPauseInterval),this.isSeeking=!1,this.wasPausedBeforeSeek&&this.pause(),this.trigger("seeked")},playbackRate:function(){return this.ytPlayer?this.ytPlayer.getPlaybackRate():1},setPlaybackRate:function(t){this.ytPlayer&&this.ytPlayer.setPlaybackRate(t)},duration:function(){return this.ytPlayer?this.ytPlayer.getDuration():0},currentSrc:function(){return this.source&&this.source.src},ended:function(){return!!this.ytPlayer&&this.lastState===YT.PlayerState.ENDED},volume:function(){return this.ytPlayer?this.ytPlayer.getVolume()/100:1},setVolume:function(t){this.ytPlayer&&this.ytPlayer.setVolume(100*t)},muted:function(){return!!this.ytPlayer&&this.ytPlayer.isMuted()},setMuted:function(t){this.ytPlayer&&(this.muted(!0),t?this.ytPlayer.mute():this.ytPlayer.unMute(),this.setTimeout((function(){this.trigger("volumechange")}),50))},buffered:function(){if(!this.ytPlayer||!this.ytPlayer.getVideoLoadedFraction)return t.createTimeRange();var e=this.ytPlayer.getVideoLoadedFraction()*this.ytPlayer.getDuration();return t.createTimeRange(0,e)},preload:function(){},load:function(){},reset:function(){},networkState:function(){if(!this.ytPlayer)return 0;switch(this.ytPlayer.getPlayerState()){case-1:return 0;case 3:return 2;default:return 1}},readyState:function(){if(!this.ytPlayer)return 0;switch(this.ytPlayer.getPlayerState()){case-1:return 0;case 5:return 1;case 3:return 2;default:return 4}},supportsFullScreen:function(){return document.fullscreenEnabled||document.webkitFullscreenEnabled||document.mozFullScreenEnabled||document.msFullscreenEnabled},checkHighResPoster:function(){var t="https://img.youtube.com/vi/"+this.url.videoId+"/maxresdefault.jpg";try{var e=new Image;e.onload=function(){if("naturalHeight"in e){if(e.naturalHeight<=90||e.naturalWidth<=120)return}else if(e.height<=90||e.width<=120)return;this.poster_=t,this.trigger("posterchange")}.bind(this),e.onerror=function(){},e.src=t}catch(t){}}});u.isSupported=function(){return!0},u.canPlaySource=function(t){return u.canPlayType(t.type)},u.canPlayType=function(t){return"video/youtube"===t},u.parseUrl=function(t){var e={videoId:null},i=t.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/);i&&11===i[2].length&&(e.videoId=i[2]);return(i=t.match(/[?&]list=([^#\&\?]+)/))&&i[1]&&(e.listId=i[1]),e},u.apiReadyQueue=[],"undefined"!=typeof document&&(o="https://www.youtube.com/iframe_api",r=function(){YT.ready((function(){u.isApiReady=!0;for(var t=0;t<u.apiReadyQueue.length;++t)u.apiReadyQueue[t].initYTPlayer()}))},n=!1,a=document.createElement("script"),(h=document.getElementsByTagName("script")[0])&&(h.parentNode.insertBefore(a,h),a.onload=function(){n||(n=!0,r())},a.onreadystatechange=function(){n||"complete"!==this.readyState&&"loaded"!==this.readyState||(n=!0,r())},a.src=o),e=".vjs-youtube .vjs-iframe-blocker { display: none; }.vjs-youtube.vjs-user-inactive .vjs-iframe-blocker { display: block; }.vjs-youtube .vjs-poster { background-size: cover; }.vjs-youtube-mobile .vjs-big-play-button { display: none; }",i=document.head||document.getElementsByTagName("head")[0],(s=document.createElement("style")).type="text/css",s.styleSheet?s.styleSheet.cssText=e:s.appendChild(document.createTextNode(e)),i.appendChild(s)),void 0!==t.registerTech?t.registerTech("Youtube",u):t.registerComponent("Youtube",u)}));const msalConfig={auth:{clientId:"b23bcd24-02ec-4176-85b9-6f0050400394",authority:"b6d5681b-4a40-4d3a-8e7b-03a70d3991b6",redirectUri:"http://localhost:3000/"},cache:{cacheLocation:"sessionStorage",storeAuthStateInCookie:!1}},graphConfig={graphMeEndpoint:"https://graph.microsoft.com/v1.0/me"};$(()=>{if(setTimeout(()=>{$.get("/api/question",t=>{null!=document.getElementById("question_text")&&($("#question_text").html(t[0].question),$("#question_text").removeClass("hidden")),null!=document.getElementById("answers")&&t[0].answers.length>0&&t[0].answers.map((t,e)=>{console.log(t),$("#answers").append('<li><button hidden" correct="'+t.correct+'"class="answer hidden buttonstyle1" id="answer-'+e+'">'+t.answer+"</button></li>")})}).then(t=>{addAnswerClickListeners()})},1e4),null!=document.getElementById("submitAnswer")){var t=[];$("#submitAnswer").on("click",e=>{e.preventDefault(),t.push({answer:$("#answer_name").val(),correct:$("#correct").is(":checked")}),$("#answers_table").append('<li correct="'+$("#correct").is(":checked")+'">'+$("#answer_name").val()+"</li>")})}null!=document.getElementById("submit_question")&&$("#submit_question").on("click",e=>{e.preventDefault(),t.length>0&&$("#question_name").val().length>3&&$.ajax({url:"api/question",type:"POST",headers:{Accept:"application/json; charset=utf-8","Content-Type":"application/json; charset=utf-8"},data:JSON.stringify({question:$("#question_name").val(),answers:t,order:1}),dataType:"json",success:t=>{console.log(t)}})});var e=0;setTimeout(()=>{(()=>{if(0==e){e=1;var t=document.getElementById("progressbar"),i=0,s=setInterval((function(){i>=100?(clearInterval(s),e=0):(i++,t.style.width=i+"%")}),300)}})(),$(".answer").removeClass("hidden")},45e3)});var addAnswerClickListeners=()=>{$(".answer").on("click",t=>{var e=t.target;"true"===$(e).attr("correct")?($("#answer_right").removeClass("hidden"),setTimeout(()=>{$("#answer_right").addClass("hidden")},2500)):($("#answer_wrong").removeClass("hidden"),setTimeout(()=>{$("#answer_wrong").addClass("hidden")},2500))})};