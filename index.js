import express from "express";
import bodyParser from "body-parser";



const app = express();
const port = 3000;
const hi = "Hi!";
app.use(express.static("public"));

app.get("/", (req, res) =>{
    res.render("../views/index.ejs", {greeting: hi});
})

app.listen(port, (req, resp) => {
    console.log(`Server on and runnin' at por ${port}`);
})

