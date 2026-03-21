import { useState, useEffect, useMemo } from 'react';
import { TrendingUp, BarChart3, CalendarDays } from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { useAuth } from '../contexts/AuthContext';
import { getWorkouts, getStats } from '../utils/firestore';
import routines from '../data/routines';

export default function Progress() {
  const { currentUser } = useAuth();
  const [workouts, setWorkouts] = useState([]);
  const [stats, setStats] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;
    Promise.all([
      getWorkouts(currentUser.uid),
      getStats(currentUser.uid)
    ]).then(([w, s]) => {
      setWorkouts(w);
      setStats(s);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [currentUser]);

  // Extraer todos los ejercicios unicos del historial
  const allExercises = useMemo(() => {
    const set = new Set();
    workouts.forEach((w) => {
      if (w.exercises) {
        Object.keys(w.exercises).forEach((name) => set.add(name));
      }
    });
    return Array.from(set).sort();
  }, [workouts]);

  // Datos de progreso por ejercicio (peso maximo por sesion)
  const exerciseProgressData = useMemo(() => {
    if (!selectedExercise) return [];
    const sorted = [...workouts]
      .filter((w) => w.exercises?.[selectedExercise])
      .sort((a, b) => a.date?.localeCompare(b.date));

    return sorted.map((w) => {
      const sets = w.exercises[selectedExercise];
      const maxLoad = Math.max(...sets.map((s) => parseFloat(s.load) || 0));
      const totalVolume = sets.reduce((acc, s) => {
        return acc + (parseFloat(s.reps) || 0) * (parseFloat(s.load) || 0);
      }, 0);
      return {
        date: w.date,
        pesoMax: maxLoad,
        volumen: Math.round(totalVolume)
      };
    });
  }, [selectedExercise, workouts]);

  // Datos de frecuencia semanal
  const frequencyData = useMemo(() => {
    if (workouts.length === 0) return [];
    const weekMap = {};
    workouts.forEach((w) => {
      if (!w.date) return;
      const d = new Date(w.date + 'T00:00:00');
      const weekStart = new Date(d);
      weekStart.setDate(d.getDate() - d.getDay() + 1); // Monday
      const key = weekStart.toISOString().split('T')[0];
      weekMap[key] = (weekMap[key] || 0) + 1;
    });

    return Object.entries(weekMap)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-12)
      .map(([week, count]) => ({
        semana: new Date(week + 'T00:00:00').toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }),
        sesiones: count
      }));
  }, [workouts]);

  // Volumen total por sesion
  const volumeData = useMemo(() => {
    const sorted = [...workouts]
      .filter((w) => w.exercises)
      .sort((a, b) => a.date?.localeCompare(b.date))
      .slice(-20);

    return sorted.map((w) => {
      let totalVolume = 0;
      Object.values(w.exercises).forEach((sets) => {
        sets.forEach((s) => {
          totalVolume += (parseFloat(s.reps) || 0) * (parseFloat(s.load) || 0);
        });
      });
      return {
        date: w.date,
        volumen: Math.round(totalVolume),
        rutina: w.routineName?.split(' - ').pop() || ''
      };
    });
  }, [workouts]);

  if (loading) {
    return (
      <div>
        <div className="page-header"><h1 className="page-title">Progreso</h1></div>
        <div className="empty-state"><p>Cargando datos...</p></div>
      </div>
    );
  }

  if (workouts.length === 0) {
    return (
      <div>
        <div className="page-header"><h1 className="page-title">Progreso</h1></div>
        <div className="empty-state">
          <TrendingUp size={48} />
          <p>Completa entrenamientos para ver tu progreso</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Progreso</h1>
        <p className="page-subtitle">Analisis de tu rendimiento</p>
      </div>

      {/* Stats */}
      {stats && (
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">Total sesiones</div>
            <div className="stat-value">{stats.totalWorkouts}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Dias entrenados</div>
            <div className="stat-value">{stats.uniqueDays}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Media semanal</div>
            <div className="stat-value">{stats.weeklyFrequency}</div>
            <div className="stat-detail">sesiones / semana</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Tiempo total</div>
            <div className="stat-value">{Math.round(stats.totalDuration / 60)}</div>
            <div className="stat-detail">minutos</div>
          </div>
        </div>
      )}

      {/* Frecuencia semanal */}
      {frequencyData.length > 0 && (
        <div className="chart-container">
          <div className="chart-title">
            <CalendarDays size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
            Frecuencia semanal
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={frequencyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="semana" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="sesiones" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Volumen total por sesion */}
      {volumeData.length > 0 && (
        <div className="chart-container">
          <div className="chart-title">
            <BarChart3 size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
            Volumen total por sesion (reps x kg)
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={volumeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip formatter={(value) => [`${value} kg`, 'Volumen']} />
              <Bar dataKey="volumen" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Progreso por ejercicio */}
      <div className="chart-container">
        <div className="chart-title">
          <TrendingUp size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
          Progreso por ejercicio
        </div>

        <div className="exercise-select-grid">
          {allExercises.map((name) => (
            <button
              key={name}
              className={`exercise-chip ${selectedExercise === name ? 'active' : ''}`}
              onClick={() => setSelectedExercise(name)}
            >
              {name}
            </button>
          ))}
        </div>

        {selectedExercise && exerciseProgressData.length > 0 ? (
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={exerciseProgressData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="pesoMax" stroke="#6366f1" name="Peso max (kg)" strokeWidth={2} dot={{ r: 4 }} />
              <Line yAxisId="right" type="monotone" dataKey="volumen" stroke="#f59e0b" name="Volumen (reps*kg)" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-center text-muted text-sm" style={{ padding: '40px 0' }}>
            {selectedExercise ? 'No hay datos para este ejercicio' : 'Selecciona un ejercicio para ver su progreso'}
          </div>
        )}
      </div>
    </div>
  );
}
