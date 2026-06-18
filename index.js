import express from "express";
import bodyParser from "body-parser";

// TODO: 1. Create the server using express ✅
// TODO: 2. Initialize this server ✅
// TODO: 3. Create the home page using ejs ❌
// TODO: 3.1 Create the common header ❌
// TODO: 3.2 Create the common footer ❌
// TODO: 3.3 Create the common style file
// TODO: 3.4 Create the home page file ❌
// TODO: 4. Create the post page ❌
// TODO: 4.1 Add the post page style ❌
// TODO: 5. Create the add post logic ❌
// TODO: 5.1 Add the post creating page style ❌
// TODO: 6. Connect home page to header and footer through .ejs ✅


const app = express();
const port = 3000;
const hi = "Hi!";
app.use(express.static("public"));

app.get("/", (req, res) =>{
    res.render("../views/index.ejs");
})

app.get("/home", (req, res) =>{
    res.render("../views/index.ejs");
})

app.listen(port, (req, resp) => {
    console.log(`Server on and runnin' at por ${port}`);
})

