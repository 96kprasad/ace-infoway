import {
  SignUp,
  SignIn,
  GetAllTasks,
  CreateTask,
  UpdateTask,
  RemoveTask,
} from '../ApiEndPoints';
import {
  axiosPost,
  axiosGetAuthorize,
  axiosPostAuthorize,
  axiosPutAuthorize,
  axiosDeleteAuthorize,
} from '../AxiosRequests';

export default class TaskManagerServices {
  async signUp(request) {
    return axiosPost(SignUp, request);
  }
  async signIn(request) {
    return axiosPost(SignIn, request);
  }
  async getAllTasks(request) {
    return axiosGetAuthorize(GetAllTasks, request);
  }
  async createTask(request) {
    return axiosPostAuthorize(CreateTask, request);
  }
   async updateTask(id, request) {
    return axiosPutAuthorize(UpdateTask, id, request);
  }
   async deleteTask(id) {
    return axiosDeleteAuthorize(RemoveTask, id);
  }
}
