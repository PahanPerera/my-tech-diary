import { AppContext } from "next/app";
import Head from "next/head";
import styles from "../styles/Home.module.css";

/*** Putting everything into one file for now */

const MONTH = 12;
const YEAR = 2022;

const daysInMonth = new Array(31)
  .fill(0)
  .map((_, i: number) => `${MONTH}.${i + 1}.${YEAR}`);

/*********************** */

function DayCard({ date, tasks }: any) {
  const totalSize = tasks.reduce(
    (sum: number, task: any) => (sum = sum + task.size),
    0
  );
  return (
    <div className={styles.card}>
      <p className={styles.date}>{date}</p>
      <div className={styles.tasks}>
        {tasks.map((task: any) => (
          <p key={task.name} className={styles[`task${task.name}`]}>
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
      <p className={styles.date}>{date}</p>
    </div>
  );
}

export default function Home({ tasksByMonth }: any) {
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
          {daysInMonth.map((day: string) => {
            if (tasksByMonth[day]) {
              return <DayCard key={day} date={day} tasks={tasksByMonth[day]} />;
            } else {
              return <EmptyDayCard key={day} date={day} />;
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

  data.forEach((record: any) => {
    map[record.date] = record.tasks;
  });

  return {
    props: { tasksByMonth: map },
  };
}
