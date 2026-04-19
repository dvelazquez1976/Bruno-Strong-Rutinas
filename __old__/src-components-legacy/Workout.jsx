import { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Square, Dumbbell } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import routines from '../data/routines';
import ExerciseCard from '../components/ExerciseCard';
import RestTimer from '../components/RestTimer';
import { saveWorkout, getLastWorkout } from '../utils/firestore';

export default function Workout() {
  const { currentUser } = useAuth();
  const [selectedRoutine, setSelectedRoutine] = useState('');
  const [exerciseData, setExerciseData] = useState({});
  const [prevWorkout, setPrevWorkout] = useState(null);
  const [timerRunning, setTimerRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const intervalRef = useRef(null);
  const startRef = useRef(0);

  // Cargar datos anteriores
  useEffect(() => {
    if (!selectedRoutine || !currentUser) {
      setPrevWorkout(null);
      return;
    }
    getLastWorkout(currentUser.uid, selectedRoutine)
      .then(setPrevWorkout)
      .catch(() => setPrevWorkout(null));
  }, [selectedRoutine, currentUser]);

  const startTimer = useCallback(() => {
    startRef.current = Date.now() - elapsed;
    setTimerRunning(true);
    intervalRef.current = setInterval(() => {
      setElapsed(Date.now() - startRef.current);
    }, 1000);
  }, [elapsed]);

  const stopTimer = useCallback(() => {
    clearInterval(intervalRef.current);
    setTimerRunning(false);
  }, []);

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  function handleRoutineChange(e) {
    const val = e.target.value;
    stopTimer();
    setElapsed(0);
    setExerciseData({});
    setSaved(false);
    setSelectedRoutine(val);
  }

  function handleExerciseData(name, sets) {
    setExerciseData((prev) => ({ ...prev, [name]: sets }));
  }

  async function handleFinish() {
    stopTimer();
    setSaving(true);

    const exercises = {};
    Object.entries(exerciseData).forEach(([name, sets]) => {
      const validSets = sets
        .filter((s) => s.reps && s.load)
        .map((s, i) => ({ set: i + 1, reps: s.reps, load: s.load }));
      if (validSets.length > 0) {
        exercises[name] = validSets;
      }
    });

    if (Object.keys(exercises).length === 0) {
      alert('No hay datos para guardar. Rellena al menos un set.');
      setSaving(false);
      return;
    }

    try {
      await saveWorkout(currentUser.uid, {
        routineName: selectedRoutine,
        date: new Date().toISOString().split('T')[0],
        duration: Math.floor(elapsed / 1000),
        exercises
      });
      setSaved(true);
    } catch (err) {
      alert('Error al guardar: ' + err.message);
    }
    setSaving(false);
  }

  const formatTimer = (ms) => {
    const total = Math.floor(ms / 1000);
    const m = Math.floor(total / 60);
    const s = total % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const routineNames = Object.keys(routines);
  const currentRoutine = selectedRoutine ? routines[selectedRoutine] : null;

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Entrenamiento</h1>
        <p className="page-subtitle">Selecciona tu rutina y registra tu sesion</p>
      </div>

      {/* Selector de rutina */}
      <div style={{ marginBottom: '20px' }}>
        <label className="label">Rutina de hoy</label>
        <select className="select" value={selectedRoutine} onChange={handleRoutineChange}>
          <option value="">Selecciona una rutina...</option>
          {routineNames.map((name) => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
      </div>

      {/* Timer + Rest */}
      {selectedRoutine && (
        <div className="timer-container">
          <div>
            <div className="timer-label">Duracion</div>
            <div className="timer-display">{formatTimer(elapsed)}</div>
            <div className="timer-controls">
              {!timerRunning ? (
                <button className="btn btn-success btn-sm" onClick={startTimer} disabled={saved}>
                  <Play size={14} /> Iniciar
                </button>
              ) : (
                <button className="btn btn-danger btn-sm" onClick={handleFinish} disabled={saving}>
                  <Square size={14} /> {saving ? 'Guardando...' : 'Terminar'}
                </button>
              )}
            </div>
          </div>
          <RestTimer />
        </div>
      )}

      {saved && (
        <div style={{
          padding: '14px 20px',
          background: '#f0fdf4',
          border: '1px solid #bbf7d0',
          borderRadius: 'var(--radius-md)',
          color: '#15803d',
          marginBottom: '20px',
          fontSize: '0.9rem',
          fontWeight: 500
        }}>
          Sesion guardada correctamente.
        </div>
      )}

      {/* Ejercicios */}
      {currentRoutine ? (
        currentRoutine.map((circuit, ci) => (
          <div className="circuit-block" key={ci}>
            <div className="circuit-title">{circuit.groupName}</div>
            {circuit.exercises.map((exercise, ei) => {
              const prevSets = prevWorkout?.exercises?.[exercise.name] || null;
              return (
                <ExerciseCard
                  key={`${ci}-${ei}`}
                  exercise={exercise}
                  prevSets={prevSets}
                  onDataChange={handleExerciseData}
                />
              );
            })}
          </div>
        ))
      ) : (
        <div className="empty-state">
          <Dumbbell size={48} />
          <p>Selecciona una rutina para comenzar</p>
        </div>
      )}
    </div>
  );
}
