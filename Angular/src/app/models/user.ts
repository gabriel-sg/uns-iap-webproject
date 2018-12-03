export class User{
  id?: string; //? porque es opcional. Viene del back-end
  fullname: string;
  given_name: string;
  family_name: string;
  urlImage: string;
  email: string;
  email_verified_at: string;
  phone: string;
  career: string;
  department: string;
  isFirstLogIn: boolean;
  created_at: string;
  updated_at: string;

  constructor(){
    this.id = '';
    this.fullname = '';
    this.given_name = '';
    this.family_name = '';
    this.urlImage = '';
    this.email = '';
    this.email_verified_at = '';
    this.phone = '';
    this.career = '';
    this.department = '';
    this.isFirstLogIn = true;
    this.created_at = '';
    this.updated_at = '';
  }
}
