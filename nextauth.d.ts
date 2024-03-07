import { DefaultSession, DefaultUser } from "next-auth";



interface IUser extends DefaultUser {
  // Roles del usuario

  roles?: string[];

  // Agregar cualquiero otro campo
}

declare module "next-auth" {
  interface User extends IUser { }


  interface Session {
    user?: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends IUser { }
}