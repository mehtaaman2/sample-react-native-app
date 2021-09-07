import axios, { AxiosResponse } from "axios";
import Task from "../model/Task";

export const saveTask = (userId: string, task: Task) => {
    axios.post(`http://localhost:8080/v1/api/users/${userId}/tasks`, task).then(() =>
        console.log('Tasked successfully saved via persistence API')
    ).catch((error) => console.error("Error saving the task : " + error));
}

export const getAllTasks = (userId: string) : Promise<AxiosResponse<Task[]>> => {
    return axios.get<Task[]>(`http://localhost:8080/v1/api/users/${userId}/tasks`);
}