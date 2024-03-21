const express = require('express');
const app = express();
require('dotenv').config();
const fs = require("fs");
const port = process.env.PORT;
const cors = require('cors');
const uniqid = require('uniqid');

app.use(cors());
app.use(express.json());

app.use("/videos", express.static("files"));


app.use((_req, _res, next) => {
    console.log("Middleware running");
    next();
});



app.get('/', (req, res) => {
    return res.send('I am working');
})

function readVideosData() {
    const videosData = fs.readFileSync("./files/video-details.json");
    const parsedData = JSON.parse(videosData);
    return parsedData;
}

app.get("/videos", (req, res) => {
    res.json(readVideosData());
});

app.get("/videos/:id", (req, res) => {


    const videosData = fs.readFileSync("./files/video-details.json");

    const parsedData = JSON.parse(videosData);

    const filteredData = parsedData.filter((video) => video.id == req.params.id)

    res.json(filteredData);

});

app.use((req, res, next) => {
    if (req.method === "POST" && req.headers["content-type"] !== "application/json") {
        return res.status(400).send("Hey, you need to give me proper JSON");
    }
    next();
});

app.post("/videos", (req, res) => {
    console.log("hellos")
    console.log(req.body.title)

    const newVideo = {
        id: uniqid(),
        title: req.body.title,
        description: req.body.description,
        channel: "Mortezas channel",
        image: "https://unit-3-project-api-0a5620414506.herokuapp.com/images/image8.jpg",
        "views": "3,092,284",
        "likes": "75,985",
        "duration": "49:20",
        "video": "https://unit-3-project-api-0a5620414506.herokuapp.com/stream",
        "timestamp": 1701497862000,
        "comments": [],
    };

    const allVideos = readVideosData();

    allVideos.push(newVideo);

    fs.writeFileSync("./files/video-details.json", JSON.stringify(allVideos));


    res.status(201).json(newVideo);

});


app.listen(port, () => {
    console.log(`Listening on ${port}`)
}
);
