export class TaskModel {
    constructor(
        public header: string,
        public description: string,
        public date_end: Date,
        public creator_id: number,
        public responsible_id: number,
        public priority_id: number,
        public status_id: number,
        public task_id: number) {}
}