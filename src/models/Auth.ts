export interface Login {
  email: string;
  password: string;
}

export interface Register {
  email: string;
  password: string;
  idNo: string;
  telNo: string;
  fullname: string;
  createdAt: Date;
  updatedAt: Date;
}
