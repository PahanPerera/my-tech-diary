import * as admin from "firebase-admin";
import { ServiceAccount } from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import * as serviceAccount from "/Users/pahan/Development/my-tech-diary-firebase-key.json";
import mockData from "./../mock.json";
import {
  DailyRecord,
  DailyRecordWithDate,
  DailyRecordWithDateMap,
} from "@types";

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

export const readDailyRecords = async (): Promise<DailyRecordWithDateMap> => {
  const snapshot = await db.collection(dailyRecordsCollectionName).get();
  const results: DailyRecordWithDateMap = {};
  snapshot.forEach((doc) => {
    const { metadata, tasks } = doc.data();
    results[doc.id] = {
      date: doc.id,
      metadata,
      tasks,
    };
  });
  return results;
};

export const readDailyRecordsMock =
  async (): Promise<DailyRecordWithDateMap> => {
    return Promise.resolve<DailyRecordWithDateMap>(mockData as any);
  };
