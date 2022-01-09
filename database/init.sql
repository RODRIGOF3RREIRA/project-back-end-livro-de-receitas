create table public.receita (
  id integer primary key,
  name text,
  type text,
  prepare text,
  portions integer

);

insert into public.receita (id, name, type, prepare, portions) values (1, 'bololo', 'doce', 'grass', 55);

