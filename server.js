const express = require('express');
const app = express();
require('dotenv').config();
const fs = require("fs");
const port = process.env.PORT;
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.use("/videos", express.static("files"));


app.use((_req, _res, next) => {
    console.log("Middleware running");
    next();
});

app.use((req, res, next) => {
    if (req.method === "POST" && req.headers["content-type"] !== "application/json") {
        return res.status(400).send("Hey, you need to give me proper JSON");
    }
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

app.post("/videos", (_req, res) => {
    // Make a new cat with a unique ID
    const newVideo = {
        id: uniqid(),
        name: _req.body.name,
        comment: _req.body.comment,

    };

    const allVideos = readCatsData();

    allVideos.push(newVideo);

    fs.writeFileSync("./files/video-details.json", JSON.stringify(allVideos));


    res.status(201).json(newVideo);
    res.json(readCatsData());
});


app.listen(port, () => {
    console.log(`Listening on ${port}`)
}
);
