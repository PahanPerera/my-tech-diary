import { AppContext } from "next/app";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { DailyRecordWithId, DailyRecordAsMap, DailyRecord } from "@types";
import { getDate, getDateMetadata } from "@utils";
import {
  DailyRecordCard,
  DailyRecordEmptyCard,
  InValidDayCard,
} from "@components";
import { Drawer, DailyRecordDetails } from "@components";
import { useState } from "react";

/*** Putting everything into one file for now */

const MONTH = 12;
const YEAR = 2022;

/*********************** */

export default function Home({
  monthlyRecords,
}: {
  monthlyRecords: DailyRecordWithId[];
}) {
  const [selected, setSelected] = useState<DailyRecord>();
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
          {monthlyRecords.map((monthRecord: DailyRecordWithId) => {
            if (monthRecord.tasks?.length > 0) {
              return (
                <DailyRecordCard
                  key={monthRecord.id}
                  dailyRecord={monthRecord}
                  onClick={() => setSelected(monthRecord)}
                />
              );
            } else if (monthRecord.date) {
              return (
                <DailyRecordEmptyCard
                  key={monthRecord.id}
                  dailyRecord={monthRecord}
                />
              );
            } else {
              return <InValidDayCard key={monthRecord.id} />;
            }
          })}
        </section>
      </main>
      <Drawer>
        <DailyRecordDetails dailyRecord={selected} />
      </Drawer>
    </>
  );
}

export async function getServerSideProps(context: AppContext) {
  // @TODO Remove HardCoded URL
  const { data }: { data: DailyRecordAsMap } = await fetch(
    `http://localhost:3000/api/daily-records/read`
  ).then((response: Response) => response.json());

  const monthlyRecords: Partial<DailyRecordWithId>[] = new Array(35)
    .fill(0)
    .map((_, i: number) => {
      return { id: i };
    });

  const firstDayIndex = getDate(`${MONTH}.01.${YEAR}`).day();

  for (let i = 0; i < 31; i++) {
    const currDayIndex = i + firstDayIndex;
    const currDate = `${MONTH}.${i + 1}.${YEAR}`;
    const dailyRecord = data[currDate];
    const id = monthlyRecords[currDayIndex].id;
    const date = currDate;
    const metadata = dailyRecord
      ? dailyRecord.metadata
      : getDateMetadata(currDate);
    const tasks = dailyRecord ? dailyRecord.tasks : [];
    monthlyRecords[currDayIndex] = {
      id,
      date,
      metadata,
      tasks,
    };
  }

  return {
    props: { monthlyRecords },
  };
}
