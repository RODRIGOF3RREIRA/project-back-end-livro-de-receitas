import { Receita } from '../entities/receita';
import { ReceitaService } from './receita-service';

describe('ReceitaService', () => {
  it('should create receita', async () => {
    const receitaService = new ReceitaService();
    const receita = await receitaService.create('Bolo', 1, 'fogo a gosto', 8);
    expect(receita).toBeInstanceOf(Receita);
    expect(receita).toHaveProperty('nome', 'Bolo');
  });

  it('should not create receita if not found receita type', async () => {
    const receitaService = new ReceitaService();
    const error = await receitaService.create('Bolo', 111, 'fogo a gosto', 8);
    expect(error).toBeInstanceOf(Error);
  });
});

it('should get receita by name', async () => {
  const receitaService = new ReceitaService();
  const receita = await receitaService.getByName('Bolo');
  expect(receita).toBeInstanceOf(Receita);
  expect(receita).toHaveProperty('preparo');
});

it('should return undefined if not found a receita', async () => {
  const receitaService = new ReceitaService();
  const receita = await receitaService.getByName('zzzzz');
  expect(receita).toBeUndefined();
});

it('should update the receita level', async () => {
  const receitaService = new ReceitaService();
  const receita = await receitaService.update(345, 'sal a gosto');
  expect(receita).toBeUndefined();
});

it('should update the receita level (Error)', async () => {
  const receitaService = new ReceitaService();
  const receita = await receitaService.update(-1, 'sal a ');
  expect(receita).toBeInstanceOf(Error);
});

// it('should return undefined if you remove receita', async () => {
//   const receitaService = new ReceitaService();
//   const receita = await receitaService.delete(753);
//   expect(receita).toBeUndefined();
// });

it('should return Error if it doesnt find the id', async () => {
  const receitaService = new ReceitaService();
  const receita = await receitaService.delete(4141212);
  expect(receita).toBeInstanceOf(Error);
});

it('must return an array containing all elements in the expected array', async () => {
  const receitaService = new ReceitaService();
  const receita = await receitaService.getAll();
  expect.arrayContaining(receita);
});
