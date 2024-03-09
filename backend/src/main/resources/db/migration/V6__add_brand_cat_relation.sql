alter table if exists brand add column category_id integer;
alter table if exists brand add constraint FKqg4ujw966n0rdwm86l9dwgj19 foreign key (category_id) references category;
