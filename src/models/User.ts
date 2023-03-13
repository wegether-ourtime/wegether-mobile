export default interface User {
  userId: string;
  email: string;
  password: string;
  idNo: string;
  telNo: string;
  fullName: string;
  createdAt: Date;
  updatedAt: Date;
  files: any;
}

export interface UserForm {
  email: string;
  password: string;
  idNo: string;
  telNo: string;
  fullName: string;
  confirmPassword: string;
}

export const initialUserForm = {
  email: '',
  password: '',
  idNo: '',
  telNo: '',
  fullName: '',
  confirmPassword: '',
} as UserForm;
