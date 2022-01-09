import { Request, Response } from 'express';
import { Receita } from '../entities/receita';
import { ReceitaRepository } from '../repositories/receita-repository';

export class ReceitaController {
  private receitaRepository: ReceitaRepository;

  constructor() {
    this.receitaRepository = new ReceitaRepository();
  }

  createReceita(req: Request, res: Response) {
    const { nome, tipo, preparo, porcoes } = req.body;
    const receita = new Receita(nome, tipo, preparo, porcoes);
    this.receitaRepository.insert(receita);
    res.status(201).json({
      id: receita.id,
      nome: receita.nome,
      tipo: receita.tipo,
      preparo: receita.preparo,
      porcoes: receita.porcoes,
    });
  }

  getReceitaByName(req: Request, res: Response) {
    const { nome } = req.params;
    const receita = this.receitaRepository.findByName(nome);
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

  updateReceita(req: Request, res: Response) {
    const { nome } = req.params;
    const { preparo } = req.body;
    const receita = this.receitaRepository.findByName(nome);
    if (!receita) {
      return res.status(404).json({
        mensagem: 'Receita não encontrada',
      });
    }
    this.receitaRepository.updatePreparo(nome, preparo);
    return res.status(204).send();
  }

  deleteReceita(req: Request, res: Response) {
    const { nome } = req.params;
    const receita = this.receitaRepository.findByName(nome);
    if (!receita) {
      return res.status(404).json({
        mensagem: 'Receita não encontrada',
      });
    }
    this.receitaRepository.remove(nome);
    return res.status(204).send();
  }

  getAll(req: Request, res: Response) {
    const receitas = this.receitaRepository.findAll();
    return res.status(200).json(receitas);
  }
}
