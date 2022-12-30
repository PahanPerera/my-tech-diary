import styles from "./DailyRecordDetails.module.css";

export function TaskDetails({ type }: any) {
  return (
    <div className={` ${styles.taskInputCard} task${type}Bg`}>
      <select name="TaskType" id={`task-${type}`} value={type} disabled>
        <option value="Coding">Coding</option>
        <option value="Reading">Reading</option>
        <option value="Algo">Algo</option>
      </select>
      <input type="number" name="size" id="size" value={0} />
      <textarea name="comment" id="comment" rows={3}></textarea>
    </div>
  );
}

export default function DailyRecordDetails() {
  return (
    <>
      <div className={styles.heading}>
        <input type="date" name="date" id="date" />
      </div>
      <div className={styles.tasksContainer}>
        <TaskDetails type={"Coding"} />
        <TaskDetails type={"Reading"} />
        <TaskDetails type={"Algo"} />
      </div>
    </>
  );
}
