import { UseMutationResult } from 'react-query'; 

export interface IconProps {
    styles?:string
    imgUrl:JSX.Element;
    name:string
    isActive?:string
    navlink:string
    handleClick?: () => void
}

export interface RegInfo {
  sent: boolean;
  msg: string;
  email: string;
}

export interface User{
  [key: string]: any;
}

export interface Stats {
  [key: string]: any;
}
export interface Orders {
  [key: string]: any;
}
export interface Profile {
  [key: string]: any;
}

export interface UserContextProps {
  user?: User|null;
  signup: UseMutationResult<any, any, SignupFormData, unknown>;
  login: UseMutationResult<any, any, LoginFormData, unknown>;
  verify2fa: UseMutationResult<any, any, {code:string}, unknown>;
  userLoading: boolean;
  stats: Stats | null;
  isLoading: boolean;
  refetchUser:() => void;
  logout: () => void;
  redirectToHome: boolean;
}
export interface Link {
    name: string,
    link: string,
    key:number
  }

  export interface NavLink {
    key:number
    title: string,
    link: string,
    links: Link[],
  }

 

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean
}


export interface SignupFormData {
  [key:string] : any;
}

