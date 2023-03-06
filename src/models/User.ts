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
