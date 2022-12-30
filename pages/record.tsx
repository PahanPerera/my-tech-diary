import Head from "next/head";
import DailyRecordDetails from "../components/daily-record-details/DailyRecordDetails";
import styles from "../styles/Record.module.css";

export function TaskInput({ type }: any) {
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

export default function RecordPage() {
  return (
    <>
      <Head>
        <title>My Tech Diary</title>
        <meta name="description" content="My Tech Diary" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <DailyRecordDetails />
      </main>
    </>
  );
}
