const express = require("express");
const { Storage } = require("@google-cloud/storage");
const mysql = require("mysql");
const cors = require("cors");
const multer = require("multer");

// Configuração do servidor
const app = express();
const port = 5000;

// Habilitar CORS
app.use(cors());

// Configuração do body-parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuração do banco de dados MySQL
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "glowhair",
});

conn.connect((erro) => {
  if (erro) {
    console.error("Erro ao conectar ao banco:", erro);
  } else {
    console.log("Conectado ao banco com sucesso");
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  }
});

// Configuração do cliente Google Cloud Storage
const gcStorage = new Storage({
  credentials: {
    type: "service_account",
    project_id: "third-arcadia-442200-a9",
    private_key_id: "0baef1869b67245465f774f20bd0036e8cfb018f",
    private_key: `-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDZz/tHgRplOzA5\n8i19ekMzAG2sOg3fshhYqOnuU3jSJB/SIlqvmqheFlJ6aY4L6m+5xfFpoLEh6ReO\nI5tiimjDFm5pyYyDtq7YpObxAxpGtU+BIQ3WMb+Zp/BzjoxFj1rIR7gnKPrf9iab\nQ5xxSjyizyUP0kAhHtnchhX2Z7xnvDPbCKAIlgasmH58O42Zg5PhnmF1fySYoT2J\nLi8CA2PJjE9a38kZ46l0F7EKZV0HfTn3l20sA3bwzrEMQAjDhfWS1NawNt8bDRSq\nRRbCpJ9dy2qknqCMatgBQa4N4QJl9s7Kefmi01rsUvrzC20I3V/59IiysLvRkzYB\nBbp2NWyPAgMBAAECggEAP5jOHlUwX1F2Zdzz8ljCCUC9RRXYWjH2kOCVGUzPENCS\nZ/k28GIgegRbhbmPS6RiheQpdnWAcs3L3mlAI/gU2a2RhJrgR88N41zWv5Vv1Sh4\nc9QyZZG2B4f1GdCL3X2bfLIQL4L0KXOGVzxZD+0kokcIY8O4jNMkupJ+FCm65bCQ\nV/dOnFTmM9crQbFBr9A50dS7EmqEp8FczfiE1KjU3lqrA5WjG3Sg0xI+vnfMPse7\nVdLp8OXI9SJMx2WFxTk9RI+OcFBpqM38tceow+dSDcNC3+WSPjPO3GwlRheRaJIY\nCyySKeoVEajYucJDHQxSjLoKYwcuZ5OlPjH9xM/2rQKBgQD9bpiSL1iWqY7Ipy4F\n1ho/UslQTOhHInqWTlkf+/CuCwcosbJzOlEB6uQxBUQEFVcw6wgbOfYMP3+6tK6H\ndOk4IbFSHoxtBOMuDPm4zb2ap3X8S58m/gfb+5DYbKiVcA3RD3V5ZhjtsPCvo3jQ\nEWmYdLKh6hko99S/D7KhMOp09QKBgQDcBPz5H7CanlP3EQp2LTitrTNHNG9ARRKS\nV4SEdmiGRo5/XLRwqX6mcWTC6JgF9ZtvU0K9Qwqdr1vENgZm+a/Ut1SJLfdYJl6X\nSoLpu2bEpH8K1oHIt+6laH71KMBLnry7+QSF7gwbpC1YMVTOpj2ECjPtJpSLWvNi\ngm3PFYXI8wKBgHKUVAqTuVu0oUd6vkYJPKiwhy/09Xdj0USve4AIahJmDgCKBoIu\nNX3GcxDuroeiFl+Zg3q7w9BZzSfelKHNa7vjD8Zu5VJMyWGCoEy7SCPp3mAI2JXK\neEcu/5e52KZnmPeSI6yVSmP8gXUHVZHMrY8uA61Mp79r/RW8xSg3c2kZAoGBAKl1\n2hZTFyXv3oIECQe+itIR/dXRCAL7cHNwnuube6Q4QdbM41mG4rp1ygLpPPYSFrbm\n7RdyxIFxJ//3EHVNyOTQk3bZBZJKcz6ZsD0wDtZUUFlboDilmlSiKG7RBVL5Hyq0\ngIxbLc44ZIhx7nz/w4+ogBgfR/gRhDYSeVsvm4yLAoGBAKkulK1G60790f5otlhR\nRrIzD+ZBhlzexjpvC0o7fm8CQIyx2GJX6VEuH2bLbCicalKiBhEsrLZPe+ramGNC\nqmszbTJJHw1Vb8S/OB4b8Qg03DHXvkhKGTJfsIEw6facjkKuwv78xKD/wzoHyQhs\n7bU0xqgeqgvdvXEqHAoUnU4R\n-----END PRIVATE KEY-----\n`,
    client_email: "pedroivo@third-arcadia-442200-a9.iam.gserviceaccount.com",
    client_id: "112128965113234083622",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url:
      "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/pedroivo%40third-arcadia-442200-a9.iam.gserviceaccount.com",
  },
  projectId: "third-arcadia-442200-a9",
});

// Nome do bucket
const bucketName = "glowhair";
const bucket = gcStorage.bucket(bucketName);

// Configuração do Multer para armazenar arquivos na memória
const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage });

// Rota para inserir produto com upload de imagem
// Rota para inserir produto com upload de imagem
app.post("/produto/insert", upload.single("imagem"), async (req, res) => {
  try {
    console.log("Recebendo requisição...");
    console.log("Corpo da requisição:", req.body);

    // Verificar se o arquivo foi enviado
    if (!req.file) {
      console.error("Nenhuma imagem foi enviada.");
      return res.status(400).json({ error: "Imagem não enviada" });
    }

    console.log("Arquivo recebido:", req.file);

    let imageUrl;

    // Upload para o bucket do Google Cloud Storage
    console.log("Iniciando upload para o Google Cloud Storage...");
    const blob = bucket.file(req.file.originalname);
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    await new Promise((resolve, reject) => {
      blobStream.on("error", (error) => {
        console.error("Erro no upload da imagem:", error);
        reject(error);
      });

      blobStream.on("finish", () => {
        imageUrl = `https://storage.googleapis.com/${bucketName}/${blob.name}`;
        console.log("Upload concluído. URL da imagem:", imageUrl);
        resolve();
      });

      blobStream.end(req.file.buffer);
    });

    // Após o upload, salvar os dados no banco
    const sql = `
      INSERT INTO tbl_produto (
        nome_produto, nome_loja, descricao, beneficios, como_usar, status, nota, problema, tipo_cabelo, imagem
      ) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      req.body.nomeProduto,
      req.body.nomeLoja,
      req.body.descricaoProduto,
      req.body.beneficios,
      req.body.comoUsar,
      'pendente', // status inicial
      0, // nota inicial
      req.body.problema,
      req.body.tipoCabelo,
      imageUrl, // URL da imagem no bucket
    ];

    conn.query(sql, values, (erro) => {
      if (erro) {
        console.error("Erro ao salvar no banco:", erro);
        return res
          .status(500)
          .json({ error: "Erro ao salvar no banco de dados", details: erro.message });
      }

      console.log("Produto cadastrado com sucesso no banco.");
      res.status(200).json({
        message: "Produto cadastrado com sucesso!",
        imageUrl,
      });
    });
  } catch (error) {
    console.error("Erro geral na requisição:", error);
    res
      .status(500)
      .json({ error: "Erro ao processar a requisição", details: error.message });
  }
});

// Rota para buscar produtos
app.get("/produto", (req, res) => {
  const sql = `SELECT * FROM tbl_produto`;

  conn.query(sql, (erro, dados) => {
    if (erro) {
      console.error("Erro ao buscar produtos:", erro);
      return res.status(500).json({ error: "Erro ao buscar produtos" });
    }
    res.status(200).json(dados);
  });
});
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



// Sua rota para buscar produtos aprovados
app.get('/produto/aprovados', (req, res) => {
  const sql = 'SELECT * FROM tbl_produto WHERE status = \'aprovado\'';
  
  conn.query(sql, (erro, resultados) => {
    if (erro) {
      console.error('Erro ao buscar produtos aprovados:', erro);
      res.status(500).json({ erro: 'Erro ao buscar produtos aprovados' });
    } else {
      res.status(200).json(resultados);
    }
  });
});


// Sua rota para buscar produtos pendentes
app.get('/produto/pendentes', (req, res) => {
  const sql = 'SELECT * FROM tbl_produto WHERE status = \'pendente\'';
  
  conn.query(sql, (erro, resultados) => {
    if (erro) {
      console.error('Erro ao buscar produtos pendentes:', erro);
      res.status(500).json({ erro: 'Erro ao buscar produtos pendentes' });
    } else {
      res.status(200).json(resultados);
    }
  });
});



// Sua rota para buscar um produto pelo ID
app.get('/produto/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM tbl_produto WHERE id_produto = ?';

  conn.query(sql, [id], (erro, resultados) => {
    if (erro) {
      console.error('Erro ao buscar o produto:', erro);
      res.status(500).json({ erro: 'Erro ao buscar o produto' });
    } else if (resultados.length === 0) {
      res.status(404).json({ erro: 'Produto não encontrado' });
    } else {
      res.status(200).json(resultados[0]); // Retorna o primeiro (e único) resultado
    }
  });
});


app.put('/produto/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // Validação de status (ajuste opcional)
  const validStatuses = ['aprovado', 'rejeitado', 'pendente'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ erro: 'Status inválido. Use aprovado, rejeitado ou pendente.' });
  }

  const sql = 'UPDATE tbl_produto SET status = ? WHERE id_produto = ?';

  conn.query(sql, [status, id], (erro, resultado) => {
    if (erro) {
      console.error('Erro ao atualizar status do produto:', erro);
      return res.status(500).json({ erro: 'Erro ao atualizar status do produto' });
    }

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ erro: 'Produto não encontrado' });
    }

    res.status(200).json({ mensagem: `Status do produto atualizado para ${status}` });
  });
});


// // Aprovar Produto
// app.get("/produto/aprovar", (req, res) => {
//   const sql = `UPDATE tbl_produto SET status = 1 WHERE id_produto = (SELECT id_produto FROM tbl_produto ORDER BY id_produto DESC LIMIT 1)`;

//   conn.query(sql, (erro) => {
//     if (erro) {
//       console.error(erro);
//       return res.status(500).json({ error: "Erro ao aprovar produto" });
//     }
//     res.status(200).json("Produto aprovado com sucesso");
//   });
// });


// Rejeitar Produto
app.put(" ", (req, res) => {
  const sql = `UPDATE tbl_produto SET status = -1 WHERE id_produto = (SELECT id_produto FROM tbl_produto ORDER BY id_produto DESC LIMIT 1)`;

  conn.query(sql, (erro) => {
    if (erro) {
      console.error(erro);
      return res.status(500).json({ error: "Erro ao rejeitar produto" });
    }
    res.status(200).json("Produto rejeitado com sucesso");
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
app.get("/login", (req, res) => {
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