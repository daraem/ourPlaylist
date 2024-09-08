const videoList = document.getElementById("videoList")

async function videoData(params) {
    let data = await fetch("src/history.txt")
    let response = await data.text()
    return response
}

let videos;

videoData().then((data) => {
    videos = data.split('\n')
    for(let i = 0; i<videos.length - 1; i++) {
        videos[i] = videos[i].substring(0, videos[i].length-1)
        let listedVid = document.createElement("li")
        let videoLink = document.createElement("a")
        videoLink.innerHTML = videos[i]
        videoLink.setAttribute("href", videos[i])
        videoLink.setAttribute("target", "_blank")
        listedVid.appendChild(videoLink)
        videoList.appendChild(listedVid)
    }
    console.log(videos[0].split(".be/")[1])
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
    for(let i = 0; i<videoIDS.length; i++) {
        mainURL += `${videoIDS[i]},`
    }
    let urlTag = document.createElement("a")
    urlTag.setAttribute("href", mainURL)
    urlTag.setAttribute("id", "mainurl")
    urlTag.setAttribute("target", "_blank")
    document.body.appendChild(urlTag)
    document.getElementById("mainurl").click()
}