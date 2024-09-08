const videoList = document.getElementById("videoList")

async function videoData(params) {
    try {
        let data = await fetch("https://6cddaf1f-7572-45db-8ded-caa1974795b1-00-35hat27lj11p0.janeway.replit.dev/history.txt")
        let response = await data.text()

        localStorage.setItem("videoID", response)

        return response
    } catch (error) {
        if(localStorage.getItem("videoID")) {
            return localStorage.getItem("videoID")
        }
    }

}

let videos;


videoData().then((data) => {
        videos = data.split('\n')
        for(let i = 0; i<videos.length - 1; i++) {
            videos[i] = videos[i].substring(0, videos[i].length)
            let listedVid = document.createElement("li")
            let videoLink = document.createElement("a")
            videoLink.innerHTML = videos[i]
            videoLink.setAttribute("href", videos[i])
            videoLink.setAttribute("target", "_blank")
            listedVid.appendChild(videoLink)
            videoList.appendChild(listedVid)
        }
})

function createPlayList() {
    let videoIDS = [];
    let mainURL = "https://www.youtube.com/watch_videos?video_ids="
    for(let i = 0; i<videos.length - 1; i++) {
        if(videos[i].split("?v=")[1] != undefined) {
            videoIDS.push(videos[i].split("?v=")[1]);
        } else {
            videoIDS.push(videos[i].split(".be/")[1].split("?")[0])
        }
    }
    for(let i = 0; i<videos.length-1; i++) {
        let k = Math.floor(Math.random() * videoIDS.length)
        console.log(k)
        mainURL += `${videoIDS[k]},`
        videoIDS.splice(k, 1)
    }
    let urlTag = document.createElement("a")
    urlTag.setAttribute("href", mainURL)
    urlTag.setAttribute("id", "mainurl")
    urlTag.setAttribute("target", "_blank")
    document.body.appendChild(urlTag)
    document.getElementById("mainurl").click()
    document.getElementById("mainurl").remove()
}
