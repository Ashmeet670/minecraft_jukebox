
discs = {
    "Creator": document.getElementById("creator"),
    "Creator (MB)": document.getElementById("creator_music_box"),
    "Precipice": document.getElementById("precipice"),
    "Relic": document.getElementById("relic"),
    "5": document.getElementById("5"),
    "Otherside": document.getElementById("otherside"),
    "Pigstep": document.getElementById("pigstep"),
    "Cat": document.getElementById("cat"),
    "Chirp": document.getElementById("chirp"),
    "Blocks": document.getElementById("blocks"),
    "Mall": document.getElementById("mall"),
    "Mellohi": document.getElementById("mellohi"),
    "Far": document.getElementById("far"),
    "Stal": document.getElementById("stal"),
    "Strad": document.getElementById("strad"),
    "Wait": document.getElementById("wait"),
    "Ward": document.getElementById("ward"),
    "11": document.getElementById("11"),
    "13": document.getElementById("13"),
}

discsBy = {
    "5": "by Samuel Åberg",
    "11": "by C418",
    "13": "by C418",
    "Blocks": "by C418",
    "Cat": "by C418",
    "Chirp": "by C418",
    "Creator (MB)": "by Lena Raine",
    "Creator": "by Lena Raine",
    "Mall": "by C418",
    "Mellohi": "by C418",
    "Otherside": "by Lena Raine",
    "Pigstep": "by Lena Raine",
    "Precipice": "by Aaron Cherof",
    "Far": "by C418",
    "Relic": "by Aaron Cherof",
    "Stal": "by C418",
    "Strad": "by C418",
    "Wait": "by C418",
    "Ward": "by C418",
}

autoPlayOrder = ["Creator", "Creator (MB)", "Precipice", "Relic", "5", "Otherside", "Pigstep", "Cat", "Chirp", "Blocks", "Mall", "Mellohi", "Far", "Stal", "Strad", "Wait", "Ward", "11", "13"]


playing = "5"
isPlaying = false
looping = false
queueSongs = false

queueSongsList = []

function addCards() {

    // horizontal
    for (cardIndex = 2; cardIndex < autoPlayOrder.length; cardIndex++) {
        discName = "disc_" + (autoPlayOrder[cardIndex]).toLowerCase()
        document.getElementById("horizontalCards").insertAdjacentHTML('beforeend',
            `
            
            <!-- "${autoPlayOrder[cardIndex]}" -->
    
                    <div class="col-11 musicCard rounded-1 m-2">
    
                        <div class="d-flex  " >
    
                            <img class="musicCardImg my-auto mx-1" src="images/${discName}.png" alt="">
    
                            <div class="d-flex flex-column  mx-1">
    
                                <text class="musicCard-name mt-auto">${autoPlayOrder[cardIndex]}</text>
                                <text class="musicCard-by mb-auto">${(discsBy[autoPlayOrder[cardIndex]]).slice(3)}</text>
    
                            </div>
    
                            <div class="text-center justify-content-center justify-self-end  d-flex ms-auto my-2 mx-1">
                                <p name="${(autoPlayOrder[cardIndex])}Play" style="width: fit-content"
                                    class="fs-4 px-3 mx-0 my-auto rounded-1 musciCardPlay text-center"
                                    onclick="play('${autoPlayOrder[cardIndex]}')" >Play</p>
    
                            </div>
                        </div>
    
                    </div>
            
            
            `)
    }

    // vertical
    for (cardIndex = 2; cardIndex < autoPlayOrder.length; cardIndex++) {
        discName = "disc_" + (autoPlayOrder[cardIndex]).toLowerCase()
        document.getElementById("verticalCards").insertAdjacentHTML('beforeend',
            `
                <!-- ${autoPlayOrder[cardIndex]} -->
                <div class="col-5 col-md-4 col-lg-3 col-xl-2 musicCard rounded-1 pb-2 m-2">

                    <div class="d-flex flex-column justify-content-center">

                        <img class="musicCardImg my-auto mx-auto " src="images/${discName}.png " alt="">



                        <div class="d-flex flex-column justify-content-center align-items-center mb-2">

                            <text class="musicCard-name">${autoPlayOrder[cardIndex]}</text>
                            <text class="musicCard-by">${(discsBy[autoPlayOrder[cardIndex]]).slice(3)}</text>

                        </div>

                        <div class="text-center justify-content-center  d-flex my-2">
                            <p name="${(autoPlayOrder[cardIndex])}Play" style="width: fit-content"
                                 class="fs-4 px-3 mx-0 my-auto rounded-1 musciCardPlay text-center"
                                onclick="play('${autoPlayOrder[cardIndex]}')" >Play</p>

                        </div>
                    </div>

                </div>
            `)
    }

}

addCards()

playTextIsPlaying = document.getElementsByName("5Play")

bar = document.getElementsByName("progress-bar")
bar.forEach(item => {
    item.style.width = `${((discs[playing].currentTime) / (discs[playing].duration)) * 100}%`
})



function barLenght() {

    bar.forEach(item => {
        item.style.width = `${((discs[playing].currentTime) / (discs[playing].duration)) * 100}%`
    })

    window.requestAnimationFrame(barLenght);
};

function play(song) {



    if (!isPlaying) {
        document.getElementsByName("play").forEach(item => {
            item.classList.toggle("d-none")
        })
        document.getElementsByName("pause").forEach(item => {
            item.classList.toggle("d-none")
        })
    }

    if (looping) {
        discs[playing].loop = false
    }

    discs[playing].pause()
    discs[playing].currentTime = 0
    bar.forEach(item => {
        item.style.width = `${((discs[playing].currentTime) / (discs[playing].duration)) * 100}%`
    })


    playTextIsPlaying.forEach(item => {

        item.innerHTML = "Play"
        item.classList.remove("playing")
        item.parentElement.parentElement.parentElement.classList.remove("playingParent")

    });

    document.getElementById("nowPlaying").classList.remove("d-none")

    playTextIsPlaying = document.getElementsByName(song + "Play")

    playTextIsPlaying.forEach(item => {

        item.innerHTML = "Playing..."
        item.classList.add("playing")

        item.parentElement.parentElement.parentElement.classList.add("playingParent")

        console.log(window.innerWidth)
        if (window.innerWidth < "576") {
            item.parentElement.parentElement.parentElement.scrollIntoView()

        }

    });


    bar.forEach(item => {
        item.style.width = `0%`
    })
    discs[song].play()


    document.getElementById("nowPlayingDiscName").innerText = song
    document.getElementById("nowPlayingByName").innerText = discsBy[song]

    document.getElementById("nowPlayingDiscNameInline").innerText = song
    document.getElementById("nowPlayingByNameInline").innerText = (discsBy[song]).slice(3)


    playing = song
    isPlaying = true


    if (looping) {
        discs[playing].loop = true
    }

    window.requestAnimationFrame(barLenght);

}

function playBar() {
    document.getElementsByName("play").forEach(item => {
        item.classList.toggle("d-none")
    })
    document.getElementsByName("pause").forEach(item => {
        item.classList.toggle("d-none")
    })
    discs[playing].play()
    isPlaying = true
}

function pauseBar() {
    document.getElementsByName("play").forEach(item => {
        item.classList.toggle("d-none")
    })
    document.getElementsByName("pause").forEach(item => {
        item.classList.toggle("d-none")
    })
    discs[playing].pause()
    isPlaying = false
}

function nextTrackBar() {

    if (looping) {
        discs[playing].loop = false
    }

    toPlay = autoPlayOrder[(autoPlayOrder.indexOf(playing)) + 1]
    if ((autoPlayOrder.indexOf(playing)) == 18) {
        toPlay = "Creator"
    }
    play(toPlay)

    if (looping) {
        discs[playing].loop = true
    }
}

function previousTrackBar() {

    if (looping) {
        discs[playing].loop = false
    }


    toPlay = autoPlayOrder[(autoPlayOrder.indexOf(playing)) - 1]
    if ((autoPlayOrder.indexOf(playing)) == 0) {
        toPlay = "13"
    }
    play(toPlay)

    if (looping) {
        discs[playing].loop = true
    }
}

function forward10() {
    if (((discs[playing].currentTime) / (discs[playing].duration)) * 100 >= 90) {
        nextTrackBar()
    }
    else {
        discs[playing].pause()
        discs[playing].currentTime += 10
        discs[playing].play()
        bar.forEach(item => {
            item.style.width = `${((discs[playing].currentTime) / (discs[playing].duration)) * 100}%`
        })
    }


}

function backward10() {
    discs[playing].pause()
    discs[playing].currentTime -= 10
    discs[playing].play()
    bar.forEach(item => {
        item.style.width = `${((discs[playing].currentTime) / (discs[playing].duration)) * 100}%`
    })

    if (((discs[playing].currentTime) / (discs[playing].duration)) * 100 <= 0) {
        previousTrackBar()
    }
}

function loopSong() {
    loopingOn = document.getElementsByName("loopingOn")
    loopingOff = document.getElementsByName("loopingOff")

    if (looping) {
        loopingOn.forEach(item => {
            item.classList.add("d-none")
        })
        loopingOff.forEach(item => {
            item.classList.remove("d-none")
        })

        discs[playing].loop = false
        looping = false
    }
    else {
        loopingOn.forEach(item => {
            item.classList.remove("d-none")
        })

        loopingOff.forEach(item => {
            item.classList.add("d-none")
        })
        discs[playing].loop = true
        looping = true
    }
}

function queueSongButton() {
    console.log("eobufoiewnikn")

    document.getElementById("queueList").insertAdjacentHTML('beforeend',
        `
        <div class="col-11 col-md-8 col-lg-4 col-xxl-3 musicCard rounded-2 m-2  p-2 ">

                    <div class="d-flex ">

                        <div class="text-center justify-self-start justify-content-center   d-flex">
                            <p name="CreatorPlay" style="width: fit-content"
                                class="fs-4 px-3 mx-0 my-auto rounded-2 queueNumber text-center col-1">1</p>

                        </div>

                        <div class="mx-3 d-flex justify-content-start align-items-center" style="width: 100%;">
                            <text class="musicCard-name mx-1">Creator</text>
                            <text class="musicCard-by mx-1">&#9679;</text>
                            <text class="musicCard-by mx-1">Lena Raine</text>
                        </div>

                    </div>

                </div>

        `
    )

}
