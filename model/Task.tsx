export default class Task {
    name: string = '';
    time: Date = new Date();
    daysToRemind: boolean[] = Array(7).fill(false);

    constructor(task?: Task) {
        if (task) {
            this.name = task.name;
            this.time = new Date(task.time);
            this.daysToRemind = task.daysToRemind;
        }
    }
}