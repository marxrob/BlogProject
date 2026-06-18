import express from "express";
import bodyParser from "body-parser";

// TODO: 1. Create the server using express ✅
// TODO: 2. Initialize this server ✅
// TODO: 3. Create the home page using ejs ✅
// TODO: 3.1 Create the common header ✅
// TODO: 3.2 Create the common footer ✅
// TODO: 3.3 Create the common style file ✅
// TODO: 3.4 Create the home page file ✅
// TODO: 4. Create the post page ❌
// TODO: 4.1 Add the post page style ✅
// TODO: 5. Create the add post logic ❌
// TODO: 5.1 Add the post creating page style ❌
// TODO: 6. Connect home page to header and footer through .ejs ✅

let posts = [
    {author: "Marques Silva",
     title: "O Problema da Falta de Coesão",
     text: `Ao elaborar um texto argumentativo, é de suma importância manter a devida atenção para com o aspecto da coesão do material escrito. Isso, pois, um dos principais objetivos deste tipo de texto é expor ideias de forma lógica ao leitor, de modo a tentar convencê-lo de que a conclusão sobre a tese desenvolvida está correta. Contudo, a existência de materiais desprovenientes de coesão é extremamente comum, especial no Brasil, um país cuja alfabetização declina vertiginosamente. Textos que divagam entre argumentos logicamente separados traem o propósito de convencimento deles. Por vezes, o autor pode pensar que sua escrita está robusta por ter sido populada com diversos argumentos. Contudo, se suas obras fossem analisadas de forma crítica, tão classificação cairia por terra. Afinal, não é incomum ouvirmos a expressão 'quantidade não é sinônimo qualidade', e muitas vezes tais textos não passam de redações inchadas e com falta de coesão. Por mais que os diferentes argumentos sejam convincentes individualmente, ou mesmo numerosos, é preciso que eles sejam essencialmente interligados, bem como relacionados à tese principal. Mesmo que tal análise criteriosa possa culminar em um texto mais enxuto, a qualidade dele irá crescer consideravelmente. Isso, pois, um texto detentor de argumentações poderosas, lógicas e pertinentes ao tema se torna, automaticamente, digno de atenção e até mesmo material para reconsideração de uma opinião sobre tal tema. Tome como exemplo um texto hipotético sobre as preocupações quanto aos avanços da Inteligência Artificial. Este texto faz bom uso de repertórios sociais, como o filme Matrix, que retrata um futuro distópico em que a humanidade utilizou de forma equivocada a tecnologia, a ponto de condenar seu futuro. O texto é bem escrito, com dialeto formal e bom desenvolvimento. Contudo, o usuário utiliza como argumentação o fato de que o avanço das IA's cresce exponencialmente. Isoladamente, é fato que as IA's tem o potencial de crescer em um ritmo estrondoso em um cenário onde agentes são criados e otimizados para o desenvolvimento de outros modelos. Porém, como exatamente este argumento se liga com a tese principal da redação? O ritmo de desenvolvimento da IA não tem relação direta com um grande impacto negativo na humanidade. No exemplo acima, observamos que um simples argumento pode quebrar a coesão de um texto bem elaborado.`
    }
];


const app = express();
const port = 3000;
const hi = "Hi!";
app.use(express.static("public"));

app.get("/", (req, res) =>{
    res.render("../views/index.ejs", {posts: posts});
})

app.get("/home", (req, res) =>{
    res.render("../views/index.ejs", {posts: posts});
})

app.get("/createPost", (req, res) =>{
    res.render("../views/createPost.ejs");
})

app.get("/about", (req, res) => {
    res.render("../views/about.ejs");
})

app.get("/post/:index", (req, res) => {
    const index = Number(req.params.index);

    res.render("../views/post.ejs", posts[index]);
});

app.listen(port, (req, resp) => {
    console.log(`Server on and runnin' at por ${port}`);
})

// POSTS
