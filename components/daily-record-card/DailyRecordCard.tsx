import { DailyRecord } from "@types";
import styles from "./DailyRecordCard.module.css";

export type DailyRecordCardProps = {
  dailyRecord: DailyRecord;
  onClick?: () => void;
};
const getDayIcon = (day: string) => {
  return day[0].toUpperCase();
};

export function DailyRecordCard({
  dailyRecord,
  onClick,
}: DailyRecordCardProps) {
  const totalSize = dailyRecord.tasks.reduce(
    (sum: number, task: any) => (sum = sum + task.size),
    0
  );
  return (
    <div className={styles.card} onClick={onClick}>
      <p className={styles.date}>
        {dailyRecord.date} <span>{getDayIcon(dailyRecord.metadata.day)}</span>
      </p>
      <div className={styles.tasks}>
        {dailyRecord.tasks.map((task: any) => (
          <p key={task.name} className={`task${task.name}`}>
            {task.name}
            <span> {new Array(task.size).fill(0).map((_) => "■ ")}</span>
          </p>
        ))}
      </div>
      <span className={styles.badge}>{totalSize}</span>
    </div>
  );
}

export function DailyRecordEmptyCard({ dailyRecord }: DailyRecordCardProps) {
  return (
    <div className={`${styles.card} ${styles.emptyCard}`}>
      <p className={styles.date}>
        {dailyRecord.date} <span>{getDayIcon(dailyRecord.metadata.day)}</span>
      </p>
    </div>
  );
}

export function InValidDayCard() {
  return <div className={`${styles.card} ${styles.invalidCard}`}></div>;
}
