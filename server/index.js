const express = require("express");
const app = express();
const port = 5000;

const path = require("path");
const basePath = path.join(__dirname, "pages");

const mysql = require("mysql");
const exp = require("constants");

const cors = require('cors');
app.use(cors());

//Conectando ao banco
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "glowhair",
  });
  
  conn.connect((erro) => {
    if (erro) {
      console.log(erro);
    } else {
      console.log("Conectado com sucesso");
      app.listen(port, () => {
        console.log(`Servidor rodando na porta ${port}`);
      });
    }
  });
  

//Ler o body e transformar em json
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());


//BUSCAR SEMPRE O ULTIMO PRODUTO PARA A ANALISE
app.get("/produto/ultimo", (req, res) => {
  const sql = `SELECT * FROM tbl_produto ORDER BY id_produto DESC LIMIT 1`; // Buscar o último produto inserido

  conn.query(sql, (erro, dados) => {
    if (erro) {
      console.error(erro);
      return res.status(500).json({ error: "Erro ao buscar o produto" });
    }

    if (dados.length > 0) {
      return res.json(dados[0]); // Retorna o último produto cadastrado
    } else {
      return res.status(404).json({ message: "Nenhum produto encontrado" });
    }
  });
});









//Busca no banco um registro específico de avaliacao via ID
app.get("/avaliacao/:id", (req, res) => {
  const id = req.params.id;

  const sql = `SELECT * FROM tbl_avaliacao WHERE id_produto = ${id}`;

  conn.query(sql, (erro, dados) => {
    if (erro) {
      console.log(erro);
    } else {
      res.json(dados[0]);
    }
  });
});


//Busca no banco um registro específico de usuario via ID

app.get("/usuario/:id", (req, res) => {
  const id = req.params.id;

  const sql = `SELECT * FROM tbl_usuario WHERE id_usuario = ${id}`;

  conn.query(sql, (erro, dados) => {
    if (erro) {
      console.log(erro);
    } else {
      res.json(dados[0]);
    }
  });
});


app.post("/usuario/atualizar", (req, res) => {
  const nome_usuario = req.body.nomeUsuario;
  const email = req.body.email;
  const senha = req.body.senha;
  const telefone = req.body.telefone;
  const tipo_usuario = req.body.tipoUsuario;
  const cpf = req.body.cpf;

  const sql = `UPDATE tbl_usuario SET email =  nome_usuario= '${nome_usuario}', email ='${email}', senha='${senha}', telefone = '${telefone}' , tipo_usuario = '${tipo_usuario}' , cpf = '${cpf}' WHERE id_usuario = ${id}`;

  conn.query(sql, (erro) => {
    if (erro) {
      console.log(erro);
    } else {
      res.sendFile(`${basePath}/`);
    }
  });
});

//rota para pegar lista de produtos do banco
app.get("/produto", (req, res) => {
  const sql = `SELECT * FROM tbl_produto`;

  conn.query(sql, (erro, dados) => {
    if (erro) {
      console.log(erro);
    } else {
      res.json(dados);
    }
  });
});

//rota para pegar lista de AVALIACAO do banco
app.get("/avaliacao", (req, res) => {
  const sql = `SELECT * FROM tbl_avaliacao`;

  conn.query(sql, (erro, dados) => {
    if (erro) {
      console.log(erro);
    } else {
      res.json(dados);
    }
  });
});

//rota para pegar lista de usuarios do banco
app.get("/usuario", (req, res) => {
  const sql = `SELECT * FROM tbl_usuario`;

  conn.query(sql, (erro, dados) => {
    if (erro) {
      console.log(erro);
    } else {
      res.json(dados);
    }
  });
});




// Rota de login corrigida
app.post("/login", (req, res) => {
  const { email, senha } = req.body;

  // Verificar se email e senha foram fornecidos
  if (!email || !senha) {
    return res
      .status(400)
      .json({ success: false, message: "Email e senha são obrigatórios" });
  }

  const sql = `SELECT * FROM tbl_usuario WHERE email = ? AND senha = ?`;

  conn.query(sql, [email, senha], (erro, dados) => {
    if (erro) {
      console.error("Erro ao buscar usuário:", erro);
      return res.status(500).json({ success: false, error: "Erro interno do servidor" });
    }

    if (dados.length > 0) {
      const usuario = dados[0];
      return res.json({
        success: true,
        message: "Login realizado com sucesso",
        userName: usuario.nome_usuario,
        userId: usuario.id_usuario,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Email ou senha incorretos",
      });
    }
  });
});



//ROTAS PARA CADASTRO DE PRODUTO
// app.get("/produto/cadastrar", (req, res) => {
//   res.sendFile(`${basePath}/cadastrarproduto.html`);
// });


//ROTAS PARA CADASTRO DE PRODUTO
// app.get("/produto/cadastrar", (req, res) => {
//   res.sendFile(`${basePath}/cadastrarproduto.html`);
// });

app.post("/produto/insert", (req, res) => {
  const nome_produto = req.body.nomeProduto;
  const nome_loja = req.body.nomeLoja;
  const descricao = req.body.descricao;
  const beneficios = req.body.beneficios;
  const como_usar = req.body.comoUsar;
//   const status = req.body.status;
//   const nota = req.body.nota;
  const problema = req.body.problema;
  const tipo_cabelo = req.body.tipoCabelo;

  const sql = `INSERT INTO tbl_produto (nome_produto, nome_loja, descricao, beneficios, como_usar, status, nota, problema, tipo_cabelo) VALUES ('${nome_produto}','${nome_loja}','${descricao}','${beneficios}' , '${como_usar}' , 0, 0, '${problema}' , '${tipo_cabelo}')`;

  conn.query(sql, (erro) => {
    if (erro) {
      console.log(erro);
    } else {
      // res.redirect("/");
      res.status(200).json("Produto Cadastrado");
    }
  });
});



//ROTAS PARA CADASTRO DE USUARIOS
// app.get("/usuario/cadastrar", (req, res) => {
//   res.sendFile(`${basePath}/cadastro-login.html`);
// });

app.post("/usuario/insert", (req, res) => {
  console.log(req.body)
  const nome_usuario = req.body.nome;
  const email = req.body.email;
  const senha = req.body.senha;
  const telefone = req.body.telefone;
  const cpf = req.body.cpf;

  const sql = `INSERT INTO tbl_usuario (nome_usuario, email, senha, telefone, cpf) VALUES ('${nome_usuario}','${email}','${senha}','${telefone}', '${cpf}')`;

  conn.query(sql, (erro) => {
    if (erro) {
      console.log(erro);
    } else {
      // res.redirect("/");
      res.status(200).json("Usuário Cadastrado");
    }
  });
});

//ROTAS PARA CADASTRO DE AVALIACAO
// app.get("/produto/cadastrar", (req, res) => {
//   res.sendFile(`${basePath}/cadastrarproduto.html`);
// });

app.post("/avaliacao/insert", (req, res) => {
  const qtde_avaliacao = req.body.qtdeAvaliacao;
  const titulo = req.body.titulo;
  const comentario = req.body.comentarios;
  const qtde_qualidade = req.body.qtdeQualidade;
  

  const sql = `INSERT INTO tbl_avaliacao (qtde_avaliacao, titulo, comentario, qtde_qualidade) VALUES ('${qtde_avaliacao}','${titulo}','${comentario}','${qtde_qualidade}')`;

  conn.query(sql, (erro) => {
    if (erro) {
      console.log(erro);
    } else {
      res.redirect("/");
    }
  });
});

