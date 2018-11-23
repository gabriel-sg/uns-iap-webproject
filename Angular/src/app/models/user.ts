export class User{
  id?: number; //? porque es opcional. Viene del back-end
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  token: string;
  isLoggedIn: boolean;
  phone: string;
  career: string;
  department: string;
  created_at: string;
  updated_at: string;

  constructor(){
    this.id = 0;
    this.username = '';
    firstName: '';
    lastName: '';
    this.email = '';
    this.token = '';
    this.isLoggedIn = false;
    this.phone = '';
    this.career = '';
    this.department = '';
    this.created_at = '';
    this.updated_at = '';
  }
}
