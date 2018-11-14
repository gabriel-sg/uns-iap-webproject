export class Department{
  id?: number; //? porque es opcional. Viene del back-end
  name: string;
  created_at: string;
  updated_at: string;

  constructor() {
    this.id = 0;
    this.name = '';
    this.created_at = '';
    this.updated_at = '';
  }
}
