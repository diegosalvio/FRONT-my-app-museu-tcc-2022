export interface User {
  _id?: string,
  name: string;
  birthDate: string,
  phone?: string,
  email: string;
  login: string;
  password: string;
}

export interface EditedUser {
  name: string,
  phone: string,
  email: string
}

export interface Login {
  email: string;
  password: string
}
