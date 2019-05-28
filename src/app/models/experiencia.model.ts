export class ExperienciaLaboral {
  id: number;
  empresa?: string;
  cargo?: string;
  tiempo?: string;

  constructor() {
    this.empresa = '';
    this.cargo = '';
    this.tiempo = '';
    this.id = new Date().getTime();
  }
}

