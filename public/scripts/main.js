const API_KEY = "AIzaSyCrjVK3tkxWzJwjLqv0aZGn5O5CSXezfiE";  // Your API Key
// const fs = require('fs');

document.addEventListener("DOMContentLoaded", function() {
    let srin = document.getElementById("searchinput");

    window.search = async () => {
        let ytlink = srin.value;
        srin.value = "";

        let videoId = getVideoId(ytlink);
        if (!videoId) {
            alert("Invalid YouTube URL");
            return;
        }

        let videoData = await fetchVideoDetails(videoId);
        let comments = await fetchComments(videoId);

        if (videoData) {
            displayVideoInfo(videoData, comments);
            // fs.appendFileSync('comments.txt', `${comments}`);
        } else {
            alert("Video not found");
        }
    }
});

function getVideoId(url) {
    let match = url.match(/(?:youtube\.com\/.*v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([^&?/]+)/);
    return match ? match[1] : null;
}

async function fetchVideoDetails(videoId) {
    let apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${API_KEY}`;
    try {
        let response = await fetch(apiUrl);
        let data = await response.json();
        return data.items.length > 0 ? data.items[0].snippet : null;
    } catch (error) {
        console.error("API error:", error);
        return null;
    }
}

async function fetchComments(videoId) {
    let apiUrl = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${API_KEY}&maxResults=10&order=relevance`;
    try {
        let response = await fetch(apiUrl);
        let data = await response.json();
        return data.items || [];
    } catch (error) {
        console.error("Error fetching comments:", error);
        return [];
    }
}

function displayVideoInfo(video, comments) {
    let resultContainer = document.createElement("div");
    resultContainer.innerHTML = `
        <h2>${video.title}</h2>
        <p>Channel: ${video.channelTitle}</p>
        <img src="${video.thumbnails.high.url}" alt="Thumbnail">
        <h3>Top Comments:</h3>
        <ul>
            ${comments.map(comment => `<li>${comment.snippet.topLevelComment.snippet.textDisplay}</li>`).join('')}
        </ul>
    `;
    document.body.appendChild(resultContainer);
}
