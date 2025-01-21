import { Client, Account, ID, Databases, Storage } from 'react-native-appwrite';

const client = new Client()
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_ID)
    .setPlatform('com.suramyavns.regenix');

export const account = new Account(client);
export const db = new Databases(client);
export const storage = new Storage(client);


