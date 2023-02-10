
const OpenAI = require("openai");
const { Configuration, OpenAIApi } = OpenAI;

const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3002;
const morgan = require("morgan");
// const exif = require('exif-reader')
// const Jimp = require("jimp");




app.use(morgan("dev"))

const dotenv = require("dotenv");
dotenv.config();

const configuration = new Configuration({
  organization: "org-F8gnCWqLm2Z0XnvRXdVzLGTx",
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);
// const response = await openai.listEngines();

app.use(bodyParser.json());
app.use(cors());

app.post("/text-completion", async (req, res) => {
  const { message } = req.body;
  console.log(message, 'text-completion')
const response = await openai.createCompletion({
model: "text-davinci-003",
prompt: ` ${message}`,
max_tokens: 1000,
temperature: 0,
});
console.log(response.data);
if (response.data.choices[0].text) {
res.json({
message: response.data.choices[0].text,
});
}
});

app.post("/image-generation", async (req, res) => {
  const { message } = req.body;
  const {user} = req.body;
  console.log(message);

  try {
    const response = await openai.createImage({
      prompt: message,
      n: 1,
      size: "256x256",
    });
    const url = response.data.data[0].url;
    res.json({
      data: url,
    });
    const imgResult = await fetch(url);
     const blob = await imgResult.blob();
     const buffer = Buffer.from(await blob.arrayBuffer());
     fs.writeFileSync(`./img/${user}-profileImage${Date.now()}.png`, buffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while generating the image",
    });
  }
});

app.listen(port, () => {
console.log(`Server started on port ${port}`);
});


/*

To convert PNG to JPEG


const Jimp = require("jimp");

// Read the PNG file and convert it to editable format
Jimp.read("./static/GFG_IMG.png", function (err, image) {
    if (err) {

        // Return if any error
        console.log(err);
        return;
    }

    // Convert image to JPG and store it to
    // './output/' folder with 'out.jpg' name
    image.write("./output/out.jpg");
});

*/


/*

To read and write EXIF data

const fs = require("fs");
const exif = require("exif-reader");

const filePath = "./undersea.png";

fs.readFile(filePath, (err, data) => {
  if (err) throw err;

  // Check if the image is a JPEG format
  if (data[0] === 0xff && data[1] === 0xd8) {
    // Read the existing metadata
    const metadata = exif(data.toString("binary"));
    console.log(metadata, "metadata");

    // Update the metadata
    // metadata.key = "value";

    // Write the updated metadata back to the file
    // fs.writeFile(filePath, data, (err) => {
    //   if (err) throw err;
    //   console.log("Metadata updated successfully");
    // });
  } else {
    console.error("This image is not in JPEG format and does not contain EXIF metadata.");
  }
});

*/
