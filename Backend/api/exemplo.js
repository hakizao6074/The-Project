const express = require("express");
const app = express();
app.use(express.json());

// "Banco de dados" fake
let usuarios = [
    { id: 1, nome: "Davi", idade: 16 },
    { id: 2, nome: "Ana", idade: 18 },
    { id: 3, nome: "João", idade: 20 },
    { id: 4, nome: "Marcos", idade: 22 },
    { id: 5, nome: "Luiza", idade: 25 }
];

// Rota inicial para mostrar que está rodando
app.get("/", (req, res) => {
    res.send("Servidor está rodando!");
});

// GET - listar todos os usuários
app.get("/usuarios", (req, res) => {
    res.json(usuarios);
});

// GET por ID
app.get("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const user = usuarios.find(u => u.id === id);

    if (!user) return res.status(404).json({ erro: "Usuário não encontrado" });

    res.json(user);
});

// POST - adicionar usuário
app.post("/usuarios", (req, res) => {
    const { nome, idade } = req.body;

    const novo = {
        id: usuarios.length + 1,
        nome,
        idade
    };

    usuarios.push(novo);
    res.status(201).json(novo);
});

// PUT - editar usuário
app.put("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, idade } = req.body;

    const user = usuarios.find(u => u.id === id);
    if (!user) return res.status(404).json({ erro: "Usuário não encontrado" });

    user.nome = nome ?? user.nome;
    user.idade = idade ?? user.idade;

    res.json(user);
});

// DELETE - remover usuário
app.delete("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    usuarios = usuarios.filter(u => u.id !== id);
    res.json({ mensagem: "Usuário removido" });
});

// Servidor rodando
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em: http://localhost:${PORT}`);
});
