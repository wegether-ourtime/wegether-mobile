export default interface User {
  userId: string;
  email: string;
  password: string;
  idNo: string;
  telNo: string;
  fullname: string;
  createdAt: Date;
  updatedAt: Date;
  files: any;
}
