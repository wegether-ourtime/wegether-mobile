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
  gender: string;
  bio: string;
  livingPlace: any;
}

export interface UserProfileForm {
  fullName: string;
  gender: string;
  bio: string;
  livingPlace: any;
}

export const initialUserProfileForm = {
  fullName: '',
  gender: '',
  bio: '',
  livingPlace: null,
} as UserProfileForm;
