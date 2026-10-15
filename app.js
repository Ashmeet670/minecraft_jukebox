
discs = {
    "Lava Chicken": document.getElementById("lava_chicken"),
    "Bounce": document.getElementById("bounce"),
    "Tears": document.getElementById("tears"),
    "Creator": document.getElementById("creator"),
    "Creator(MB)": document.getElementById("creator_music_box"),
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
    "Lava Chicken": "by Hyper Potions",
    "Bounce": "by fingerspit",
    "Tears": "by Amos Roddy",
    "5": "by Samuel Åberg",
    "11": "by C418",
    "13": "by C418",
    "Blocks": "by C418",
    "Cat": "by C418",
    "Chirp": "by C418",
    "Creator(MB)": "by Lena Raine",
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

autoPlayOrder = ["Bounce", "Lava Chicken", "Tears", "Creator", "Creator(MB)", "Precipice", "Relic", "5", "Otherside", "Pigstep", "Cat", "Chirp", "Blocks", "Mall", "Mellohi", "Far", "Stal", "Strad", "Wait", "Ward", "11", "13"]


playing = "5"
isPlaying = false
looping = false
queueSongs = false

queueSongsList = []
queueSongsCards = []

function addCards() {

    // horizontal
    for (cardIndex = 0; cardIndex < autoPlayOrder.length; cardIndex++) {
        discName = "disc_" + (autoPlayOrder[cardIndex]).toLowerCase().replace(" ","_")
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
                                    class="px-3 mx-0 my-auto rounded-1 musciCardPlay text-center"
                                    onclick="play('${autoPlayOrder[cardIndex]}')" >Play</p>
    
                            </div>
                        </div>
    
                    </div>
            
            
            `)

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
                                     class="px-3 mx-0 my-auto rounded-1 musciCardPlay text-center"
                                    onclick="play('${autoPlayOrder[cardIndex]}')" >Play</p>
    
                            </div>
                        </div>
    
                    </div>
                `)
    }

    // queue song
    for (cardIndex = 0; cardIndex < autoPlayOrder.length; cardIndex++) {



        document.getElementById("queueSongCreator").insertAdjacentHTML('beforeend',
            `
               <div class="col-12 col-sm-11 col-md-5 col-lg-4 col-xl-3 musicCard rounded-2 m-2  p-2 ">

                        <div class="d-flex ">

                            <div class=" d-flex justify-self-start justify-content-start align-items-center"
                                style="width: 100%;">
                                <text class="musicCard-name mx-1">${autoPlayOrder[cardIndex]}</text>
                            
                            </div>


                            <div class="text-center justify-self-end justify-content-center"
                                onclick="queueSongAdd('${autoPlayOrder[cardIndex]}') ; animateButtonPress(this)">
                                <p style="width: fit-content"
                                    class="fs-4 px-3 mx-0 my-auto rounded-2 queueAdd text-center">
                                    +</p>

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
    console.log("e")
    document.getElementsByName(playing + "Play").forEach(item => {

        item.innerHTML = "Playing..."

    });
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


    console.log("eeeee")

    document.getElementsByName(playing + "Play").forEach(item => {

        item.innerHTML = "- Paused -"

    });
}

function nextTrackBar() {

    if (looping) {
        discs[playing].loop = false
    }

    if (queueSongsList.length > 0) {

        toPlay = queueSongsList[0]
        queueSongsList.shift()
        queueSongsCards[0].remove()
        queueSongsCards.shift()

        for (i in queueSongsList) {
            document.getElementById("queueNumber" + queueSongsCards[i].id.slice(9)).innerHTML = Number(document.getElementById("queueNumber" + queueSongsCards[i].id.slice(9)).innerHTML) - 1
        }

        play(toPlay)
    }
    else {
        toPlay = autoPlayOrder[(autoPlayOrder.indexOf(playing)) + 1]
        if ((autoPlayOrder.indexOf(playing)) == (autoPlayOrder.length - 1)) {
            toPlay = autoPlayOrder[0]
        }
        play(toPlay)
    }

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
        toPlay = autoPlayOrder[autoPlayOrder.length - 1]
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

function queueSongShow() {

    if (!queueSongs) {
        queueSongs = true
        document.getElementById("addSongsToQueueBar").classList.remove("d-none")
        document.getElementById("queueAddPopUp").classList.remove("d-none")
        document.getElementById("body").style.overflow = "hidden"
        document.getElementById("nowPlaying").classList.add("d-none")
        document.getElementById("blurBGEle").classList.add("blur")
    }
    else if (queueSongs) {
        queueSongs = false
        document.getElementById("addSongsToQueueBar").classList.add("d-none")
        document.getElementById("queueAddPopUp").classList.add("d-none")
        document.getElementById("body").style.overflow = "auto"
        document.getElementById("nowPlaying").classList.remove("d-none")
        document.getElementById("queueAddedText").innerHTML = ""
        document.getElementById("blurBGEle").classList.remove("blur")

    }

}

function queueSongAdd(song) {

    document.getElementById("queuePretext").classList.add("d-none")

    document.getElementById("queueList").insertAdjacentHTML('beforeend',
        `
        <div id="queueSong${queueSongsList.length + 1}" class="col-11 col-md-8 col-lg-5 col-xl-4 col-xxl-3 musicCard rounded-2 m-2 p-2 align-items-center d-flex ">

                    <div class="d-flex align-items-center ">

                        <div class="text-center justify-self-start justify-content-center d-flex">
                            <p  id="queueNumber${queueSongsList.length + 1}" style="width: fit-content"
                                class="fs-4 px-3 mx-0 my-auto rounded-2 queueNumber text-center col-1">${queueSongsList.length + 1}</p>

                        </div>

                        <div class="mx-3 d-flex justify-content-start align-items-center" style="width: 100%;">
                            <text class="queueCard-name mx-1">${song}</text>
                            <text class="musicCard-by mx-1">&#9679;</text>
                            <text class="musicCard-by mx-1">${discsBy[song].slice(3)}</text>
                        </div>

                    </div>

                </div>

        `

    )
    queueSongsCards.push(document.getElementById(`queueSong${queueSongsList.length + 1}`))
    document.getElementById("queueAddedText").innerHTML = `Added ${song}`
    queueSongsList.push(`${song}`)
}


function animateButtonPress(btn) {
    btn.classList.add("animateButtonPress")
    setTimeout(() => {
        btn.classList.remove("animateButtonPress")
    }, 400)
}