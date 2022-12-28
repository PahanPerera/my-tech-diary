import { AppContext } from "next/app";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import dayjs from "dayjs";
import {
  DailyRecordForMonth,
  DailyRecordWithDate,
  DailyRecordWithDateMap,
} from "@types";

/*** Putting everything into one file for now */

const MONTH = 12;
const YEAR = 2022;

/*********************** */

function DayCard({ dailyRecord }: { dailyRecord: DailyRecordWithDate }) {
  const totalSize = dailyRecord.tasks.reduce(
    (sum: number, task: any) => (sum = sum + task.size),
    0
  );
  return (
    <div className={styles.card}>
      <p className={styles.date}>{dailyRecord.date}</p>
      <div className={styles.tasks}>
        {dailyRecord.tasks.map((task: any) => (
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

function EmptyDayCard({ date }: { date: string }) {
  return (
    <div className={`${styles.card} ${styles.emptyCard}`}>
      <p className={styles.date}>{date}</p>
    </div>
  );
}

function InValidDayCard() {
  return <div className={`${styles.card} ${styles.invalidCard}`}></div>;
}

export default function Home({
  monthlyRecords,
}: {
  monthlyRecords: DailyRecordForMonth[];
}) {
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
          {monthlyRecords.map((monthRecord: DailyRecordForMonth) => {
            if (monthRecord.record) {
              return (
                <DayCard
                  key={monthRecord.id}
                  dailyRecord={monthRecord.record}
                />
              );
            } else if (monthRecord.date) {
              return (
                <EmptyDayCard key={monthRecord.id} date={monthRecord.date} />
              );
            } else {
              return <InValidDayCard key={monthRecord.id} />;
            }
          })}
        </section>
      </main>
    </>
  );
}

export async function getServerSideProps(context: AppContext) {
  // @TODO Remove HardCoded URL
  const { data }: { data: DailyRecordWithDateMap } = await fetch(
    `http://localhost:3000/api/daily-records/read`
  ).then((response: Response) => response.json());

  const monthlyRecords: Partial<DailyRecordForMonth>[] = new Array(35)
    .fill(0)
    .map((_, i: number) => {
      return { id: i };
    });

  const firstDayIndex = dayjs(`${MONTH}.01.${YEAR}`, "MM.DD.YYYY").day() - 1;

  for (let i = 0; i < 31; i++) {
    const currDayIndex = i + firstDayIndex;
    const currDate = `${MONTH}.${i + 1}.${YEAR}`;
    const dailyRecord = data[currDate];
    monthlyRecords[currDayIndex].date = currDate;
    if (dailyRecord) {
      monthlyRecords[currDayIndex].record = dailyRecord;
    }
  }

  return {
    props: { monthlyRecords },
  };
}
