export class Request{
  id?: number; //? porque es opcional. Viene del back-end
  title: string;
  description: string;
  department: string;
  department_id: number;
  category: string;
  user_id: number;
  created_at: string;
  updated_at: string;

  constructor(){
    this.id = 0;
    this.title = '';
    this.description = '';
    this.department = '';
    this.department_id = 0;
    this.category = '';
    this.user_id = 0;
    this.created_at = '';
    this.updated_at = '';
  }
}
