import axios, { AxiosResponse } from "axios";
import Task from "../model/Task";
import User from "../model/User";
import Config from "react-native-config";

const baseUrl = Config.API_URL;
console.log("Using base url as : ", baseUrl);

export const saveTask = (userId: string, task: Task) => {
    axios.post(`${baseUrl}/v1/api/users/${userId}/tasks`, task).then(() =>
        console.log('Tasked successfully saved via persistence API')
    ).catch((error) => console.error("Error saving the task : " + error));
}

export const getAllTasks = (userId: string) : Promise<AxiosResponse<Task[]>> => {
    return axios.get<Task[]>(`${baseUrl}/v1/api/users/${userId}/tasks`);
}

export const upsertUser = (user: User) => {
    console.log("Upserting user : ", user);
    axios.put(`${baseUrl}/v1/api/users/${user.userId}`, user).then(() =>
        console.log('User successfully upserted via persistence API')
    ).catch((error) => console.error("Error upserting user : " + error));
}

export const getAllUsers = () : Promise<AxiosResponse<User[]>> => {
    return axios.get<User[]>(`${baseUrl}/v1/api/users`);
}