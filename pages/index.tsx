import { AppContext } from "next/app";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import dayjs from "dayjs";
import { DailyRecordWithDate } from "@types";

/*** Putting everything into one file for now */

const MONTH = 12;
const YEAR = 2022;

const daysInMonth = new Array(31)
  .fill(0)
  .map((_, i: number) => `${MONTH}.${i + 1}.${YEAR}`);

/*********************** */

function DayCard({ date, tasks = [] }: any) {
  const totalSize = tasks.reduce(
    (sum: number, task: any) => (sum = sum + task.size),
    0
  );
  return (
    <div className={styles.card}>
      <p className={styles.date}>{date}</p>
      <div className={styles.tasks}>
        {tasks.map((task: any) => (
          <p
            key={task.name}
            className={`${styles[`task${task.name}`]} ${
              task.size === 0 ? `${styles.taskEmpty}` : ""
            }`}
          >
            {task.name}
            <span> {new Array(task.size).fill(0).map((_) => "■ ")}</span>
          </p>
        ))}
      </div>
      <span className={styles.badge}>{totalSize}</span>
    </div>
  );
}

function EmptyDayCard({ date }: any) {
  return (
    <div className={`${styles.card} ${styles.emptyCard}`}>
      {date && <p className={styles.date}>{date}</p>}
    </div>
  );
}

export default function Home({ tasksByMonth, monthTemplate }: any) {
  console.log(monthTemplate);
  return (
    <>
      <Head>
        <title>My Tech Diary</title>
        <meta name="description" content="My Tech Diary" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <section className={styles.cardsContainer}>
          {monthTemplate.map((day: any) => {
            if (day.record) {
              return (
                <DayCard
                  key={day.templateId}
                  date={day.date}
                  tasks={day.record.tasks}
                />
              );
            } else {
              return <EmptyDayCard key={day.templateId} date={day.date} />;
            }
          })}
        </section>
      </main>
    </>
  );
}

export async function getServerSideProps(context: AppContext) {
  // @TODO Remove HardCoded URL
  const { data } = await fetch(
    `http://localhost:3000/api/daily-records/read`
  ).then((response: Response) => response.json());
  const map: any = {};
  const tempMap: any = {};

  const monthTemplate = new Array(35).fill(0).map((_, i: number) => {
    return { templateId: i };
  });

  const firstDayIndex = dayjs(`${MONTH}.01.${YEAR}`, "MM.DD.YYYY").day() - 1;
  console.log(firstDayIndex);

  data.forEach((record: DailyRecordWithDate) => {
    map[record.date] = record.tasks;
    tempMap[record.date] = record;
  });
  for (let i = 0; i < 31; i++) {
    const currDayIndex = i + firstDayIndex;
    const currDate = `${MONTH}.${i + 1}.${YEAR}`;
    const dailyRecord = tempMap[currDate];
    (monthTemplate[currDayIndex] as any).date = currDate;
    if (dailyRecord) {
      (monthTemplate[currDayIndex] as any).record = dailyRecord;
    }
  }

  // console.log(monthTemplate);

  return {
    props: { tasksByMonth: map, monthTemplate },
  };
}
