import fs from "fs";
import path from "path";

export const addArticle = async (req, res) => {
  const { title, content } = req.body;

  // Validate input
  if (!title || !content) {
    return res.status(400).send("Title and content are required");
  }

  // Create a safe filename: replace spaces and remove bad characters
  const safeTitle = title.replace(/[^a-zA-Z0-9-_]/g, "_");

  // Add a .txt extension
  const fileName = `${safeTitle}.txt`;

  // Ensure file goes into a "blog" folder
  const filePath = path.join(process.cwd(), "articles", fileName);

  // Make sure the folder exists (won’t crash if it doesn’t)
  fs.mkdir(path.dirname(filePath), { recursive: true }, (dirErr) => {
    if (dirErr) {
      console.error("Error creating folder:", dirErr);
      return res.status(500).send("Error creating folder");
    }

    // Write content to file
    fs.writeFile(filePath, content, (err) => {
      if (err) {
        console.error("Error writing file:", err);
        return res.status(500).send("Error writing file");
      }

      console.log(`File saved: ${filePath}`);
      res.send(`Article saved as: ${fileName}`);
    });
  });
};
