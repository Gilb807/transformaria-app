const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

// Rota para transformar imagens
app.post('/api/transform', async (req, res) => {
  const { image } = req.body;
  if (!image) return res.status(400).json({ error: 'Imagem não enviada.' });

  try {
    // Aqui, você integraria a IA para transformar a imagem
    const exemploResultado = 'https://via.placeholder.com/300x300.png?text=Imagem+Estilo+Ghibli';
    return res.json({ result: exemploResultado });
  } catch (error) {
    console.error('Erro ao transformar imagem:', error);
    return res.status(500).json({ error: 'Erro ao processar a imagem.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
