export interface Login {
  email: string;
  password: string;
}

export interface Register {
  email: string;
  password: string;
  idNo: string;
  telNo: string;
  fullName: string;
}

export interface RegisterForm {
  email: string;
  password: string;
  idNo: string;
  telNo: string;
  fullName: string;
  confirmPassword: string;
}

export const initialRegisterForm = {
  email: '',
  password: '',
  idNo: '',
  telNo: '',
  fullName: '',
  confirmPassword: '',
} as RegisterForm;
