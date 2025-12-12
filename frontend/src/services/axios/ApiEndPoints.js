// import {IsProdMode} from '../../../../utils/AppSetting';
export const APIURL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/';

// Authentication API Endpoints
export const SignUp = 'auth/register';
export const SignIn = 'auth/login';

// Tasks API Endpoints
export const GetAllTasks = 'tasks';
export const CreateTask = 'tasks';
export const UpdateTask = 'tasks/:id';
export const RemoveTask = 'tasks/:id';
