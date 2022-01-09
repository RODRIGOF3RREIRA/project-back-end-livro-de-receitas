import { Request, Response } from 'express';
import { Receita } from '../entities/receita';
import { ReceitaRepository } from '../repositories/receita-repository';

export class ReceitaController {
  private receitaRepository: ReceitaRepository;

  constructor() {
    this.receitaRepository = new ReceitaRepository();
  }

  async createReceita(req: Request, res: Response) {
    const { nome, tipo, preparo, porcoes } = req.body;
    const receita = new Receita(nome, tipo, preparo, porcoes);
    await this.receitaRepository.insert(receita);
    res.status(201).json({
      id: receita.id,
      nome: receita.nome,
      tipo: receita.tipo,
      preparo: receita.preparo,
      porcoes: receita.porcoes,
    });
  }

  async getReceitaByName(req: Request, res: Response) {
    const { nome } = req.params;
    const receita = await this.receitaRepository.findByName(nome);
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
    const receita = await this.receitaRepository.findById(Number(id));
    if (!receita) {
      return res.status(404).json({
        mensagem: 'Receita não encontrada',
      });
    }
    await this.receitaRepository.updatePreparo(Number(id), preparo);
    return res.status(204).send();
  }

  async deleteReceita(req: Request, res: Response) {
    const { id } = req.params;
    const receita = await this.receitaRepository.findById(Number(id));
    if (!receita) {
      return res.status(404).json({
        mensagem: 'Receita não encontrada',
      });
    }
    await this.receitaRepository.remove(Number(id));
    return res.status(204).send();
  }

  async getAll(req: Request, res: Response) {
    const receitas = await this.receitaRepository.findAll();
    return res.status(200).json(receitas);
  }
}
