import { DailyRecord } from "@types";
import dayjs from "dayjs";
import styles from "./DailyRecordDetails.module.css";

const getDateForInput = (date?: string) => {
  return dayjs(date).format("YYYY-MM-DD");
};

export function TaskDetails({ type, task }: any) {
  return (
    <div className={` ${styles.taskInputCard} task${type}Bg`}>
      <select name="TaskType" id={`task-${type}`} value={type} disabled>
        <option value="Coding">Coding</option>
        <option value="Reading">Reading</option>
        <option value="Algo">Algo</option>
      </select>
      <input type="number" name="size" id="size" value={task?.size} />
      <textarea
        name="comment"
        id="comment"
        rows={3}
        value={task?.comments}
      ></textarea>
    </div>
  );
}

export function DailyRecordDetails({
  dailyRecord,
}: {
  dailyRecord?: DailyRecord;
}) {
  return (
    <div className={styles.detailsContainer}>
      <div className={styles.heading}>
        <input type="date" value={getDateForInput(dailyRecord?.date)} />
      </div>
      <div className={styles.tasksContainer}>
        <TaskDetails type={"Coding"} task={dailyRecord?.tasks[0]} />
        <TaskDetails type={"Algo"} task={dailyRecord?.tasks[1]} />
        <TaskDetails type={"Reading"} task={dailyRecord?.tasks[2]} />
      </div>
    </div>
  );
}
