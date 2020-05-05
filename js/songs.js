songs=[
    {
        src:"../Assets/Songs/Charlie Puth - How Long.mp3",
        image_url:"../Assets/Images/how_long.jpg",
        song_name:"How Long",
        artist:"Charlie Puth"
    },
    {
        src:"../Assets/Songs/Attention-9xtunes.in.mp3",
        image_url:"../Assets/Images/attention.jpg",
        song_name:"Attention",
        artist:"Charlie Puth"
    },
    {
        src:"../Assets/Songs/Charlie Puth Ft. Selena Gomez - We Dont Talk Anymore.mp3",
        image_url:"../Assets/Images/we_don't_talk_anymore.jpg",
        song_name:"We don't talk Anymore",
        artist:"Charlie Puth(feat. Selena Gomez)"
    },
    {
        src:"../Assets/Songs/Dua Lipa - New Rules (DawnFoxes.com).mp3",
        image_url:"../Assets/Images/new_rules.jpg",
        song_name:"New Rules",
        artist:"Dua Lipa"
    },
    {
        src:"../Assets/Songs/Let Me Love You - DJ Snake Ft Justin Bieber (DJJOhAL.Com).mp3",
        image_url:"../Assets/Images/let_me_love_you.jpg",
        song_name:"Let me love you",
        artist:"Justin Bieber"
    },
    {
        src:"../Assets/Songs/Avicii ft. Rita Ora - Lonely Together (Alan Walker Remix)(MyMp3Maza.in).mp3",
        image_url:"../Assets/Images/Lonely_together.jpg",
        song_name:"Lonely Together",
        artist:"Avicii ft.Rita Ora"
    },
    {
        src:"../Assets/Songs/Rita_Ora_Anywhere.mp3",
        image_url:"../Assets/Images/Rita_Ora_-_Anywhere.jpg",
        song_name:"Anywhere",
        artist:"Rita Ora"
    },
    {
        src:"../Assets/Songs/Rockabye (feat. Sean Paul & Anne-Marie) (Mp3beet.Com) - 192Kbps.mp3",
        image_url:"../Assets/Images/rockabye.jpg",
        song_name:"Rockabye",
        artist:"Anne-Marie feat. Sean Paul"
    },
    {
        src:"../Assets/Songs/Camila_Cabello_-_Havana_Audio_ft_Young_Thug[ListenVid.com].mp3",
        image_url:"../Assets/Images/camila.jpg",
        song_name:"Havana",
        artist:"Camila Cabello"
    },
    {
        src:"../Assets/Songs/Taylor Swift - Look What You Made Me Do (Mp3Goo.com).mp3",
        image_url:"../Assets/Images/taylor_swift.jpg",
        song_name:"Look what you made me do",
        artist:"Taylor Swift"
    },
    {
        src:"../Assets/Songs/Shape of You - Ed Sheeran (DJJOhAL.Com).mp3",
        image_url:"../Assets/Images/shape_of_you.jpg",
        song_name:"Shape of you",
        artist:"Ed Sheeran"
    },
    {
        src:"../Assets/Songs/the-weeknd-hurt-you-feat-gesaffelstein.mp3",
        image_url:"../Assets/Images/hurt_you.jpg",
        song_name:"Hurt You",
        artist:"The Weeknd"
    }

]

var artists=[
    {
        src:'../Assets/Images/how_long.jpg',
        text:'Charlie Puth'
    },
    {
        src:'../Assets/Images/selena_gomez.jpg',
        text:'Selena Gomez'
    },
    {
        src:'../Assets/Images/justin_bieber.jpg',
        text:'Justin Bieber'
    },
    {
        src:'../Assets/Images/taylor_swift.jpg',
        text:'Taylor Swift'
    }
]

var playlist=[
    {
        src:'../Assets/Images/mood_boosters.jpg'
    },
    {
        src:'../Assets/Images/bollywood_reloaded.jpg'
    },
    {
        src:'../Assets/Images/weekend_hits.jpg'
    }
]

//Add Latest Playlist dynamically to the page
for(let i=0;i<playlist.length;i++){
    $('#latest-playlist-row').append(
        `<div class="col-4" id="latest-playlist-column">
        <img src="${playlist[i].src}" class="figure-img img-fluid rounded" 
        alt="A generic square placeholder image with rounded corners in a figure." id="center-image">
        </div>`);
}

/* Equivalent html code
<div class="col-4" id="latest-playlist-column">
        <img src="${playlist[i].src}" class="figure-img img-fluid rounded" 
        alt="A generic square placeholder image with rounded corners in a figure." id="center-image">
</div>
*/


//Add Popular artist dynamically to the page
for(let i=0;i<artists.length;i++){
    $('<div>',{
        class:'col-3 popular-artist',
        html:$('<img>',{
            src:artists[i].src,
            class:'figure-img img-fluid rounded-circle playable-songs',
            alt:'A generic square placeholder image with rounded corners in a figure'
        }).add($('<h3>',{
            class:'white',
            text:artists[i].text
        }))
    }).appendTo($('#artist-row'));
}

/* Equivalent html code 

<div class="col-3 popular-artist">
    <img src="../Assets/Images/how_long.jpg" class="figure-img img-fluid rounded-circle playable-songs" 
    alt="A generic square placeholder image with rounded corners in a figure.">
    <h3 class="white">Charlie Puth</h3>
</div>
*/

//Add Queue dynamically to the page
for(let i=0;i<songs.length;i++){
    let track_id=(i+11)%songs.length;
    let track_number='0'+(i+1);
    if(i>=9) track_number=track_number.slice(1);
    $('<div>',{
        class:'row d-flex justify-content-between',
        id:'navbar-row',
        html:$(
            '<div>',{
            class:'col-11 latest-release d-flex',
            id:'queue-songs',
            html:$('<h3>',{
                class:'grey',
                id:'numbers',
                text:track_number
            }).add('<div>',{
                class:'outer-div',
                html:$('<img>',{
                    src:songs[track_id].image_url,
                    class:'figure-img img-fluid rounded queue-image',
                    alt:'A generic square placeholder image with rounded corners in a figure',
                    id:track_id
                }).add('<div>',{
                    class:'overlay',
                    html:$('<div>',{
                        class:'queue pause',
                        html:$('<i>',{
                            class:'fas fa-pause'
                        })
                    }).add('<div>',{
                        class:'queue play',
                        html:$('<i>',{
                            class:'fas fa-play'
                        })
                    })
                })
            }).add('<h5>',{
                id:'song-name',
                html:`<h5 id="song-name">${songs[track_id].song_name}<div id="sub-heading-queue">by ${songs[track_id].Artist}</div></h5>`
            })
        }).add('<div>',{
            class:'col-1',
            html:$('<i>',{
                class:'far fa-heart heart1'
            }).add('<i>',{
                class:'fas fa-heart heart2'
            })
        })
    }).appendTo('#featuresongs .container-fluid');
}

/*Equivalent html code
<div class="row d-flex justify-content-between" id="navbar-row">
    <div class="col-11 latest-release d-flex">
        <h3 class="grey" id="numbers">01</h3>
        <div class="outer-div">
            <img src="../Assets/Images/camila.jpg" class="figure-img img-fluid rounded queue-image" 
            alt="A generic square placeholder image with rounded corners in a figure." id="8">
            <div class="overlay">
                <div class="queue pause"><i class="fas fa-pause"></i></div>
                <div class="queue play"><i class="fas fa-play"></i></div>
            </div>
        </div>
        <h5 id="song-name">Havana<div id="sub-heading-queue">by Camila Cabello</div></h5>
    </div>

    <div class="col-1">
        <i class="far fa-heart heart1"></i>
        <i class="fas fa-heart heart2"></i>
    </div>
</div>
*/



//Add Latest release dynamically
for(let i=0;i<8;i++){
    $('<div>',{
        class:'col-3 latest-release',
        html:$('<div>',{
            class:'outer-div1',
            html:$('<img>',{
                src:songs[i].image_url,
                class:'figure-img img-fluid rounded playable-songs',
                alt:'A generic square placeholder image with rounded corners in a figure',
                id:i
            }).add('<div>',{
                class:'overlay',
                html:$('<div>',{
                    class:'pause',
                    title:'pause-button',
                    html:$('<i>',{
                        class:'fas fa-pause'
                    })
                }).add('<div>',{
                    class:'play',
                    title:'play-button',
                    html:$('<i>',{
                        class:'fas fa-play'
                    })
                })
            })
        }).add(`<h5 id="song-name">${songs[i].song_name}<div id="sub-heading-queue">by ${songs[i].Artist}</div></h5>`)
    }).appendTo($('#latest-release-row'));
}

/* Equivalent html code*/

/* <div class="col-3 latest-release">
    <div class="outer-div1">
     <img src="${songs[i].image_url}" class="figure-img img-fluid rounded playable-songs" 
         alt="A generic square placeholder image with rounded corners in a figure." id="1">
     <div class="overlay">
         <div class="pause" title="pause-button"><i class="fas fa-pause"></i></div>
         <div class="play" title="play-button"><i class="fas fa-play"></i></div>
     </div>
    </div>
    <h5 id="song-name">How Long<div id="sub-heading-queue">by Charlie puth</div></h5>
 </div> */
