import firestore from '@react-native-firebase/firestore';

export const projectCollection = firestore().collection('projectList');

export async function getProject(id: string) {
  const doc = await projectCollection.doc(id).get();
  return doc.data();
}

export async function getProjectList(id: string) {
  console.log(id);
  const doc = await projectCollection.where('user_id', '==', `${id}`);
  return doc.get();
}
