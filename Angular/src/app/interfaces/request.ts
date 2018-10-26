export interface Request{
  id?: number; //? porque es opcional. Viene del back-end
  title: string;
  description: string;
  department: string;
  department_id: number;
  category: string;
  user_id: number;
  created_at: string;
  updated_at: string;
}
