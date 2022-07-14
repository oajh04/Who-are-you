import firestore from '@react-native-firebase/firestore';

export const userCollection = firestore().collection('user');

export function createUser({id, displayName, photoURL}: any) {
  return userCollection.doc(id).set({
    id,
    displayName,
    photoURL,
  });
}

export async function getUser(id: any) {
  const doc = await userCollection.doc(id).get();
  return doc.data();
}
