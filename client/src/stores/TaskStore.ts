import { makeAutoObservable } from "mobx";
import { PriorityType, StatusType, TaskView } from "../types/types";

export default class TaskStore {
    private _priorities: PriorityType[];
    private _statuses: StatusType[];
    private _tasks: TaskView[];
    private _oneTask: TaskView;

    constructor() {
        this._priorities = []
        this._statuses = [];
        this._tasks = [];
        this._oneTask = {} as TaskView;
        makeAutoObservable(this);
    }

    setPriorities(priorities: PriorityType[]) {
        this._priorities = priorities;
    }

    setStatuses(statuses: StatusType[]) {
        this._statuses = statuses;
    }

    setTasks(tasks: TaskView[]) {
        this._tasks = tasks;
    }

    setOneTask(task: TaskView) {
        this._oneTask = task;
    }

    get priorities() {
        return this._priorities;
    }

    get statuses() {
        return this._statuses;
    }

    get tasks() {
        return this._tasks;
    }

    get oneTask() {
        return this._oneTask;
    }
}