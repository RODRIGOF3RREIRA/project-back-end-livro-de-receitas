import { Request, Response } from 'express';
import { ReceitaService } from '../services/receita-service';

export class ReceitaController {
  private receitaService: ReceitaService;

  constructor() {
    this.receitaService = new ReceitaService();
  }

  async createReceita(req: Request, res: Response) {
    const { nome, tipo, preparo, porcoes } = req.body;

    const receita = await this.receitaService.create(
      nome,
      tipo,
      preparo,
      porcoes,
    );
    if (receita instanceof Error) {
      return res.status(404).json({
        mensagem: receita.message,
      });
    }
    return res.status(201).json({
      id: receita.id,
      nome: receita.nome,
      tipo: receita.tipo,
      preparo: receita.preparo,
      porcoes: receita.porcoes,
    });
  }

  async getReceitaByName(req: Request, res: Response) {
    const { nome } = req.params;
    const receita = await this.receitaService.getByName(nome);
    if (!receita) {
      return res.status(404).json({
        message: 'Receita não encontrada',
      });
    }
    return res.status(200).json({
      id: receita.id,
      nome: receita.nome,
      tipo: receita.tipo,
      preparo: receita.preparo,
      porcoes: receita.porcoes,
    });
  }

  async updateReceita(req: Request, res: Response) {
    const { id } = req.params;
    const { preparo } = req.body;
    const receita = await this.receitaService.update(Number(id), preparo);
    if (receita instanceof Error) {
      return res.status(404).json({
        mensagem: receita.message,
      });
    }
    return res.status(204).send();
  }

  async deleteReceita(req: Request, res: Response) {
    const { id } = req.params;
    const receita = await this.receitaService.delete(Number(id));
    if (receita instanceof Error) {
      return res.status(404).json({
        mensagem: receita.message,
      });
    }
    return res.status(204).send();
  }

  async getAll(req: Request, res: Response) {
    const receitas = await this.receitaService.getAll();
    return res.status(200).json(receitas);
  }
}
