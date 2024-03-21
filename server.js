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
// app.get('/videos', function (req, res) {
//     res.json(videos);
// });

// app.post('/videos', function (req, res) {

//     const { title, channel } = req.body;
//     const newVideos = {
//         id: uuidv4(),
//         title,
//         channel,
//     };
//     videos.push(newVideos);
//     res.json(newVideos);
// });




app.listen(port, () => {
    console.log(`Listening on ${port}`)
}
);
