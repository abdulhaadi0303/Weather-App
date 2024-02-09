import express from "express";
import bodyParser from "body-parser";
import axios from "axios"

const app =express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

  app.get("/", async (req,res) => {
      res.render("index.ejs" , { data:null });   
  });
  

  app.post("/", async (req, res) => {
    const citynew = req.body.cityName;
    console.log(citynew);

    const apiKey = "317a365e8b9662f8edfbe6e7163be1e0";
    const city = citynew; // or any other city you want to query

const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    try {
        const response = await axios.get(url);
        const result = response.data;
        console.log(result);
    
        res.render("index.ejs", { data: result });

      } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
            data:null,
          error: error.message,
        });
      }
});


app.listen(port,()=>{
    console.log(`sever is running on ${port}`)
})