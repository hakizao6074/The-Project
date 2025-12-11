const express = require("express");
const app = express();
app.use(express.json());
const PORT = 4000;

const tarefas = [
    {id: 1, Horario: "12:00", tarefa:"Varrer a Casa"},
    {id: 2, Horario: "12:30", tarefa:"Lavar louça"},
    {id: 3, Horario: "13:00", tarefa:"Botar roupa no varal"},
    {id: 4, Horario: "14:30", tarefa:"Passar pano"},
    {id: 5, Horario: "16:00", tarefa:"Codar"}
];

app.get("/", (req,res) => {
    res.send("servidor esta rodando!")
});

app.get("/tarefas", (req, res) => {
    res.json(tarefas)
});


app.post("/tarefas", (req, res) => {
    const {Horario, tarefa} = req.body
    const newTarefa = {
        id: tarefas.length + 1,
        Horario,
        tarefa
    };
    tarefas.push(newTarefa)
    res.status(202).json(newTarefa)
})

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
});