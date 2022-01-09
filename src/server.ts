import express from 'express';
import { ReceitaController } from './controller/receita-controller';

const app = express();
app.use(express.json());
const receitaController = new ReceitaController();

app.post('/receita', async (req, res) =>
  receitaController.createReceita(req, res),
);

app.get('/receita/:nome', async (req, res) =>
  receitaController.getReceitaByName(req, res),
);

app.patch('/receita/:nome', (req, res) =>
  receitaController.updateReceita(req, res),
);

app.delete('/receita/:nome', (req, res) =>
  receitaController.deleteReceita(req, res),
);

app.get('/receita', async (req, res) => receitaController.getAll(req, res));

app.listen(3333, () => {
  console.log('Server iniciado na porta 3333');
});
