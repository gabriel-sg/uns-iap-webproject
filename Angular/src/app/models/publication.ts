export class Publication{
  id?: number; //? porque es opcional. Viene del back-end
  title: string;
  description: string;
  visible:number;
  category: string;
  user_id: number;
  department_id: number;
  created_at: string;
  updated_at: string;

  constructor(){
    this.id = 0;
    this.title = '';
    this.description = '';
    this.visible = 1 ;
    this.category = '';
    this.user_id =0 ;
    this.department_id =0 ;
    this.created_at = '';
    this.updated_at = '';
  }
}
