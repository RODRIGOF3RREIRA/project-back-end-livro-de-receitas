import { Request, Response } from 'express';
import { Receita } from '../entities/receita';
import { ReceitaRepository } from '../repositories/receita-repository';
import { ReceitaTypeRepository } from '../repositories/receita-type-repository';

export class ReceitaController {
  private receitaRepository: ReceitaRepository;
  private receitaTypeRepository: ReceitaTypeRepository;

  constructor() {
    this.receitaRepository = new ReceitaRepository();
    this.receitaTypeRepository = new ReceitaTypeRepository();
  }

  async createReceita(req: Request, res: Response) {
    const { nome, tipo, preparo, porcoes } = req.body;
    const ReceitaType = await this.receitaTypeRepository.findById(tipo);
    if (!ReceitaType) {
      return res.status(404).json({
        mensagem: 'Tipo de receita não encontrado',
      });
    }
    const receita = new Receita(nome, ReceitaType, preparo, porcoes);
    await this.receitaRepository.insert(receita);
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
