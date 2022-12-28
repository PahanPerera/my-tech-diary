import * as admin from "firebase-admin";
import { ServiceAccount } from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import * as serviceAccount from "/Users/pahan/Development/my-tech-diary-firebase-key.json";
import mockData from "./../mock.json";
import { DailyRecord, DailyRecordWithDate } from "@types";

// ********* INIT FIRESTORE  ********************

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount),
  });
}

const db = getFirestore();
const dailyRecordsCollectionName = "daily-records";

// ********* END INIT FIRESTORE  ********************

export const updateDailyRecord = async (date: string, data: DailyRecord) => {
  return db.collection(dailyRecordsCollectionName).doc(date).set(data);
};

export const readDailyRecords = async (): Promise<DailyRecordWithDate[]> => {
  const snapshot = await db.collection(dailyRecordsCollectionName).get();
  const results: DailyRecordWithDate[] = [];
  snapshot.forEach((doc) => {
    results.push({
      date: doc.id,
      metadata: doc.data().metadata,
      tasks: doc.data().tasks,
    });
  });
  return results;
};

export const readDailyRecordsMock = async (): Promise<
  DailyRecordWithDate[]
> => {
  return Promise.resolve<DailyRecordWithDate[]>(mockData as any);
};
