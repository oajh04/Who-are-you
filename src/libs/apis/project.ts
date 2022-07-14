import firestore from '@react-native-firebase/firestore';

export const projectCollection = firestore().collection('projectList');

export function createUser({id, displayName, photoURL}: any) {
  return projectCollection.doc(id).set({
    id,
    displayName,
    photoURL,
  });
}

export async function getProject(id: any) {
  const doc = await projectCollection.doc(id).get();
  return doc.data();
}

export async function getProjectList() {
  const doc = await projectCollection.get();
  return doc;
}
