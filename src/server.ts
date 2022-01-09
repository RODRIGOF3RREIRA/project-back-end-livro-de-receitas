import express from 'express';
import { ReceitaController } from './controller/receita-controller';

const app = express();

app.use(express.json());
const receitaController = new ReceitaController();

app.post('/receita', (req, res) => receitaController.createReceita(req, res));
app.get('/receita/:nome', (req, res) =>
  receitaController.getReceitaByName(req, res),
);

app.patch('/receita/:nome', (req, res) =>
  receitaController.updateReceita(req, res),
);

app.delete('/receita/:nome', (req, res) =>
  receitaController.deleteReceita(req, res),
);

app.get('/receita', (req, res) => receitaController.getAll(req, res));

app.listen(3333, () => {
  console.log('Server iniciado na porta 3333');
});
