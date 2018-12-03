export class Publication{
  id?: number; //? porque es opcional. Viene del back-end
  title: string;
  description: string;
  visible:boolean;
  category: string;
  user_id: string;
  department_id: number;
  created_at: string;
  updated_at: string;

  constructor(){
    this.id = 0;
    this.title = '';
    this.description = '';
    this.visible = true ;
    this.category = '';
    this.user_id ='' ;
    this.department_id =0 ;
    this.created_at = '';
    this.updated_at = '';
  }
}
