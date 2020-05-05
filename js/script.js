{
    setTimeout(function(){
        let f=$('.latest-release');
        let pause=$('.latest-release .pause');
        let play=$('.latest-release .play');
        let g_id=0;
        let played_part;
        let shuffle=false;
        let repeat=false;
        let audioElement;
        let first_time=true;
        let favourite=$('.heart1');
        let unfavourite=$('.heart2');
        let volume=1;
        let volume_before_mute=1;
        let isPaused=false;

        // First time play function handler
        $('#player-play').click(function(){
            if(first_time){
                first_time=!first_time;
                g_id=8;
                played_part='queue-songs';
                $('#featuresongs #8').css('opacity','0.5');
                var k=$($('#featuresongs .container-fluid img#8').parent()).find('.queue.pause');
                k.css('display','block');
                $(this).css('display','none');
                $('.fa-pause').css('display','block');
                songplayed(8);
            }
        });


        //Toogles the heart section in the queue
        for(let i=0;i<favourite.length;i++){
            $(favourite[i]).click(function(){
                $(this).css('display','none');
                $(unfavourite[i]).css('display','block');
            });
        }

        for(let i=0;i<unfavourite.length;i++){
            $(unfavourite[i]).click(function(){
                $(this).css('display','none');
                $(favourite[i]).css('display','block');
            });
        }


        // Handles the click on any of the songs, either on center div or aside section
        for(let i=0;i<f.length;i++){
            $(f[i]).click(function(){
                first_time=false;
                isPaused=false;
                resetEverything();
                $(f[i]).find('img').css('opacity','0.5');
                let id=parseInt($(this).find('img').attr('id'));
                $(pause[i]).css('display','block');
                played_part=$(f[i]).attr('id');
                if(played_part==undefined) played_part='latest-release';
                bottomPlayerProperties(id);
            });
        }

        //Changes songs on next,prev buttons
        function changeSong(id){
            var str="[id='"+id+"']";
            var div=$('.col-11').find('#'+id);
            resetEverything();
            $(div).css('opacity','0.5');
            let inner_pause=$(div).parent().find('.pause');
            $(inner_pause).css('display','block');
            bottomPlayerProperties(id);
        }

        //Reset Images
        function resetImages(){
            $(f).each(function(){
                $(f).find('img').css('opacity','1');
            })
        }

        //Reset Pauses
        function resetPause(){
            $(pause).each(function(){
                $(this).css('display','none');
            });
        }

        //Reset Plays
        function resetPlay(){
            $(play).each(function(){
                $(this).css('display','none');
            });
        }

        //Removes all Pause and plays and makes each image as before
        function resetEverything(){
            resetImages();
            resetPlay();
            resetPause();
        }

        //Set the bottom player properties based on id and start song
        function bottomPlayerProperties(id){
            $('.fa-play').css('display','none');
            $('.fa-pause').css('display','block');
            $('#img-footer').attr('src',songs[id].image_url);
            let str=songs[id].song_name+"<div id='sub-heading'>"+"by "+songs[id].Artist+"</div>";
            $('.col-3 h4').html(str);
            g_id=id;
            songplayed(id);
        }


        //Next function on the bottom player
        $('.fa-step-forward').click(function(){
            next();
        });

        function next(){
            if(repeat) songplayed(g_id);
            else{
                if(shuffle) g_id=(parseInt(Math.random()*100)%songs.length);
                let id=((g_id+1)%songs.length);
                changeSong(id);
            }
        }


        //Previous function on the bottom player
        $('.fa-step-backward').click(function(){
            prev();
        });

        function prev(){
            if(repeat) songplayed(g_id);
            else{
                if(shuffle) g_id=(parseInt(Math.random()*100)%songs.length);
                let id=((g_id-1+songs.length)%songs.length);
                changeSong(id);
            }
        }


        //Random function on the bottom player;
        $('.fa-random').click(function(){
            shuffle=!shuffle;
            if(shuffle){
                $(this).css('color','red');
            }else{
                $(this).css('color','rgb(202, 188, 188)')
            }
        });

        
        //Repeat function on the bottom player
        $('.fa-sync').click(function(){
            repeat=!repeat;
            if(repeat){
                $(this).css('color','red');
            }else{
                $(this).css('color','rgb(202, 188, 188)')
            }
        });

        //Plays songs by creating audio element
        function songplayed(i){
            $(document).ready(function() {
                if(audioElement!=undefined){
                    audioElement.pause();
                    volume=audioElement.volume;
                }
                audioElement = document.createElement('audio');
                audioElement.setAttribute('src', songs[i].src);
                audioElement.addEventListener('ended', function() {
                    if(repeat) audioElement.play();
                    else if(!shuffle) next();
                    else if(shuffle){
                        g_id=(parseInt(Math.random()*100)%songs.length);
                        next();
                    }
                }, false);


                audioElement.addEventListener("canplay",function(){
                    let duration=audioElement.duration;
                    let minutes=parseInt(duration/60);
                    let seconds=parseInt(duration%60);
                    let time;
                    if(seconds<10) time=minutes+":0"+seconds;
                    else time=minutes+":"+seconds
                    $('#end-time').text(time);
                    audioElement.volume=volume;
                    if(!isPaused) audioElement.play();
                    // $("#length").text("Duration:" + audioElement.duration + " seconds");
                    // $("#source").text("Source:" + audioElement.src);
                    // $("#status").text("Status: Playing").css("color","green");
                });
                
                audioElement.addEventListener("timeupdate",function(){
                    let currentTime=audioElement.currentTime;
                    let minutes=parseInt(currentTime/60);
                    let seconds=parseInt(currentTime%60);
                    let time;
                    $('#player-scroll').mousedown(function(e){
                        let rect = e.target.getBoundingClientRect();
                        let x = e.clientX - rect.left;
                        let song_length=this.getBoundingClientRect().right-this.getBoundingClientRect().left;
                        let percentage=(x/song_length)*100;
                        let new_current_time=(audioElement.duration/100)*percentage;
                        audioElement.currentTime=new_current_time;
                    });
                    let percentage=Math.max(1,(currentTime/audioElement.duration)*98)+"%";
                    $('#seek').css('width',percentage);
                    if(seconds<10) time=minutes+":0"+seconds;
                    else time=minutes+":"+seconds;
                    $('#start-time').text(time);
                    // $("#currentTime").text("Current second:" + audioElement.currentTime);
                });

                $('#player-play').click(function() {
                    isPaused=false;
                    $(this).css('display','none');
                    $('#player-pause').css('display','block');
                    audioElement.play();
                    resetPause();
                    resetPlay();
                    if(played_part=='queue-songs'){
                        let queue_play=$('#featuresongs .container-fluid img#'+g_id).parent().find('.queue.pause');
                        queue_play.css('display','block');
                        queue_play.find('.fa-pause').css('display','block');
                    }else{
                        let queue_play=$('#latest-release-row img#'+g_id).parent().find('.pause');
                        queue_play.css('display','block');
                        queue_play.find('.fa-pause').css('display','block');
                    }
                    // $("#status").text("Status: Playing");
                });
                
                $('#player-pause').click(function() {
                    isPaused=true;
                    $(this).css('display','none');
                    $('#player-play').css('display','block');
                    audioElement.pause();
                    resetPause();
                    resetPlay();
                    if(played_part=='queue-songs'){
                        let queue_play=$('#featuresongs .container-fluid img#'+g_id).parent().find('.queue.play');
                        // let queue_play=$(img.parent()).find('.queue.play');
                        queue_play.css('display','block');
                        queue_play.find('.fa-play').css('display','block');
                    }
                    else{
                        let queue_play=$('#latest-release-row img#'+g_id).parent().find('.play');
                        queue_play.css('display','block');
                        queue_play.find('.fa-play').css('display','block');
                    }
                    // $("#status").text("Status: Paused");
                });
                
                // $('#restart').click(function() {
                //     audioElement.currentTime = audioElement.duration-2;
                // });
            });
        }

        $('#outer-volume-seek').mousedown(function(e){
            let rect = e.target.getBoundingClientRect();
            let x = e.clientX - rect.left;
            let vol_length=this.getBoundingClientRect().right-this.getBoundingClientRect().left;
            let percentage=(x/vol_length)*100;
            percentage=Math.min(80,percentage);
            $('#volume-seek').css('width',percentage);
            if(percentage>2){
                volume=((percentage+20)/100);
                $($('.fa-volume-up')[0]).css('display','block');
                $($('.fa-volume-mute')[0]).css('display','none');
            }
            else{
                volume=0;
                $($('.fa-volume-up')[0]).css('display','none');
                $($('.fa-volume-mute')[0]).css('display','block');
            }
            volume_before_mute=volume;
            if(audioElement!=undefined) audioElement.volume=volume;
        });

        $($('.fa-volume-up')[0]).click(function(){
            volume_before_mute=volume;
            volume=0;
            $($('.fa-volume-up')[0]).css('display','none');
            $($('.fa-volume-mute')[0]).css('display','block');
            $('#volume-seek').css('width',0);
            if(audioElement!=undefined) audioElement.volume=volume;
        });

        $($('.fa-volume-mute')[0]).click(function(){
            volume=volume_before_mute;
            $($('.fa-volume-up')[0]).css('display','block');
            $($('.fa-volume-mute')[0]).css('display','none');
            let percentage=volume*100;
            if(volume!=0) percentage-=20;
            $('#volume-seek').css('width',percentage);
            if(audioElement!=undefined) audioElement.volume=volume;
        });

    },1000);
}