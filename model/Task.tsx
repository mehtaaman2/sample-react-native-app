export default class Task {
    name: string = '';
    time: Date = new Date();
    days: boolean[] = Array(7).fill(false);
}