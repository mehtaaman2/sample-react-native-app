import axios, { AxiosResponse } from "axios";
import Task from "../model/Task";
import User from "../model/User";

export const saveTask = (userId: string, task: Task) => {
    axios.post(`http://localhost:8080/v1/api/users/${userId}/tasks`, task).then(() =>
        console.log('Tasked successfully saved via persistence API')
    ).catch((error) => console.error("Error saving the task : " + error));
}

export const getAllTasks = (userId: string) : Promise<AxiosResponse<Task[]>> => {
    return axios.get<Task[]>(`http://localhost:8080/v1/api/users/${userId}/tasks`);
}

export const upsertUser = (user: User) => {
    console.log("Upserting user : ", user);
    axios.put(`http://localhost:8080/v1/api/users/${user.userId}`, user).then(() =>
        console.log('User successfully upserted via persistence API')
    ).catch((error) => console.error("Error upserting user : " + error));
}

export const getAllUsers = () : Promise<AxiosResponse<User[]>> => {
    return axios.get<User[]>(`http://localhost:8080/v1/api/users`);
}