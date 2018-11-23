export class User{
  id?: number; //? porque es opcional. Viene del back-end
  fullname: string;
  urlImage: string;
  email: string;
  phone: string;
  career: string;
  department: string;
  created_at: string;
  updated_at: string;

  constructor(){
    this.id = 0;
    this.fullname = '';
    this.email = '';
    this.urlImage = '';
    this.phone = '';
    this.career = '';
    this.department = '';
    this.created_at = '';
    this.updated_at = '';
  }
}
