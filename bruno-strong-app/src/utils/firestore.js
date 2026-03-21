import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  addDoc,
  deleteDoc,
  Timestamp
} from 'firebase/firestore';
import { db } from '../firebase';

// Guardar una sesion de entrenamiento completa
export async function saveWorkout(userId, workoutData) {
  const workoutsRef = collection(db, 'users', userId, 'workouts');
  const docRef = await addDoc(workoutsRef, {
    ...workoutData,
    createdAt: Timestamp.now()
  });
  return docRef.id;
}

// Obtener todos los entrenamientos de un usuario
export async function getWorkouts(userId) {
  const workoutsRef = collection(db, 'users', userId, 'workouts');
  const q = query(workoutsRef, orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
}

// Obtener historial de un ejercicio especifico
export async function getExerciseHistory(userId, exerciseName) {
  const workoutsRef = collection(db, 'users', userId, 'workouts');
  const q = query(workoutsRef, orderBy('createdAt', 'asc'));
  const snapshot = await getDocs(q);

  const history = [];
  snapshot.docs.forEach((doc) => {
    const data = doc.data();
    if (data.exercises && data.exercises[exerciseName]) {
      history.push({
        date: data.date,
        routine: data.routineName,
        duration: data.duration,
        sets: data.exercises[exerciseName]
      });
    }
  });
  return history;
}

// Obtener el ultimo entrenamiento para una rutina
export async function getLastWorkout(userId, routineName) {
  const workoutsRef = collection(db, 'users', userId, 'workouts');
  const q = query(
    workoutsRef,
    where('routineName', '==', routineName),
    orderBy('createdAt', 'desc')
  );
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
}

// Obtener estadisticas generales
export async function getStats(userId) {
  const workouts = await getWorkouts(userId);

  const totalWorkouts = workouts.length;
  const totalDuration = workouts.reduce((acc, w) => acc + (w.duration || 0), 0);

  // Dias unicos entrenados
  const uniqueDays = new Set(workouts.map((w) => w.date));

  // Frecuencia semanal (ultimas 4 semanas)
  const fourWeeksAgo = new Date();
  fourWeeksAgo.setDate(fourWeeksAgo.getDate() - 28);
  const recentWorkouts = workouts.filter((w) => {
    const d = new Date(w.date);
    return d >= fourWeeksAgo;
  });
  const weeklyFrequency = recentWorkouts.length / 4;

  // Ejercicios con mas volumen
  const exerciseVolume = {};
  workouts.forEach((w) => {
    if (!w.exercises) return;
    Object.entries(w.exercises).forEach(([name, sets]) => {
      if (!exerciseVolume[name]) exerciseVolume[name] = 0;
      sets.forEach((s) => {
        const reps = parseFloat(s.reps) || 0;
        const load = parseFloat(s.load) || 0;
        exerciseVolume[name] += reps * load;
      });
    });
  });

  return {
    totalWorkouts,
    totalDuration,
    uniqueDays: uniqueDays.size,
    weeklyFrequency: Math.round(weeklyFrequency * 10) / 10,
    exerciseVolume,
    recentWorkouts
  };
}

// Eliminar un entrenamiento
export async function deleteWorkout(userId, workoutId) {
  const docRef = doc(db, 'users', userId, 'workouts', workoutId);
  await deleteDoc(docRef);
}
