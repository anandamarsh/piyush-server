import http from "http";
import OpenAI from "openai";

const OPENAI_API_KEY = "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";

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });
const prompt =
  "Generate a JSON structure for web forms (array of forms). Each form should have multiple rows. Include a variety of component types such as TextField, RadioGroup, Checkbox, Switch, Slider, and Select. Each row should atleast have a field componentType and label and placeholder (for TextField). Adjust properties, labels, and options to introduce diversity. There should be at least 4 forms, and each form should have at least 6 rows. show only the json fsuch that its cane be put as is in a json.parse() call";

http
  .createServer(async (req, res) => {
    try {
      // Set CORS headers
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept",
      );

      // Handle preflight requests
      if (req.method === "OPTIONS") {
        res.writeHead(204);
        res.end();
        return;
      }

      // Use OpenAI SDK to fetch data
      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-3.5-turbo",
      });

      const response = completion.choices[0].message.content;
      console.log(response);

      // Respond with data from OpenAI
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(response);
      res.end();
    } catch (error) {
      console.error("Error:", error);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.write(JSON.stringify({ error: "Internal Server Error" }));
      res.end();
    }
  })
  .listen(8080, () => console.log("Server running on http://localhost:8080"));
