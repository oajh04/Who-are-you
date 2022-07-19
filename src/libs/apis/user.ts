import firestore from '@react-native-firebase/firestore';

export const userCollection = firestore().collection('user');

export async function getUser(id: any) {
  const doc = await userCollection.doc(id).get();
  return doc.data();
}

export async function getUserList() {
  const doc = await userCollection.get();
  return doc;
}
