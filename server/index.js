const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const URL = require("./db/schema");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://tiny.ukachar.com");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB database connected successfully"))
  .catch((err) => console.log(err));

app.post("/api/add", (req, res) => {
  const origin_url = req.body.original_url;
  console.log(origin_url);

  if (!origin_url) {
    return res.status(400).json({ error: "original_url is required" });
  }
  function generateShortUrl() {
    return Math.random().toString(36).substr(2, 8);
  }

  const newUrl = new URL({
    original_url: origin_url,
    tiny_url: generateShortUrl(),
  });

  if (origin_url.startsWith("http://") || origin_url.startsWith("https://")) {
    newUrl
      .save()
      .then(() => {
        console.log("Url created");
        res.status(201).json({ message: "Url created successfully" });
      })
      .catch((err) => {
        if (err.name === "MongoError" && err.code === 11000) {
          return res.status(400).json({ error: "Duplicate URL" });
        } else {
          console.error("Error creating URL:", err);
          return res.status(500).json({ error: "Internal server error" });
        }
      });
  } else {
    res
      .status(406)
      .send("Invalid URL, needs to start with http:// or https://");
  }
});

app.get("/api/url/:long", async (req, res) => {
  try {
    const longUrl = req.params.long;

    const url = await URL.findOne({ original_url: longUrl });

    if (url) {
      res.json({ shortUrl: url.tiny_url });
    } else {
      res.status(404).json({ error: "Long URL not found" });
    }
  } catch (error) {
    console.error("Error retrieving short URL:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/all", async (req, res) => {
  try {
    const urls = await URL.find({});

    if (urls.length > 0) {
      const urlList = urls.map((url) => ({
        original_url: url.original_url,
        short_url: url.tiny_url,
      }));
      res.json(urlList);
    } else {
      res.status(404).json({ error: "No URLs found" });
    }
  } catch (error) {
    console.error("Error retrieving URLs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/:shortUrl", async (req, res) => {
  const url = await URL.findOne({ tiny_url: req.params.shortUrl }).exec();
  // res.send({ original_url: url.original_url });
  res.redirect(url.original_url);
});

// Define a route to handle keep-alive requests
app.get("/keep-alive", (req, res) => {
  res.send("Keep alive request received");
});

// Set up a cron job to send keep-alive requests every 5 minutes
const cron = require("node-cron");

// Schedule a task to run every 5 minutes
cron.schedule("*/5 * * * *", () => {
  // Send a keep-alive request to your app
  const options = {
    hostname: "https://url-shortener-zn31.onrender.com",
    port: 443,
    path: "/keep-alive",
    method: "GET",
  };

  const req = http.request(options, (res) => {
    console.log(`Keep-alive request status: ${res.statusCode}`);
  });

  req.on("error", (error) => {
    console.error("Error sending keep-alive request:", error);
  });

  req.end();
});
