import { useState, useEffect } from 'react';
import { Calendar, Clock, ChevronRight, X, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getWorkouts, deleteWorkout } from '../utils/firestore';

export default function History() {
  const { currentUser } = useAuth();
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (!currentUser) return;
    loadWorkouts();
  }, [currentUser]);

  async function loadWorkouts() {
    setLoading(true);
    try {
      const data = await getWorkouts(currentUser.uid);
      setWorkouts(data);
    } catch (err) {
      console.error('Error loading workouts:', err);
    }
    setLoading(false);
  }

  async function handleDelete(workoutId) {
    if (!confirm('Eliminar este entrenamiento?')) return;
    try {
      await deleteWorkout(currentUser.uid, workoutId);
      setWorkouts((prev) => prev.filter((w) => w.id !== workoutId));
      setSelected(null);
    } catch (err) {
      alert('Error al eliminar: ' + err.message);
    }
  }

  function formatDuration(seconds) {
    if (!seconds) return '-';
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  function formatDate(dateStr) {
    if (!dateStr) return '-';
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('es-ES', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }

  if (loading) {
    return (
      <div>
        <div className="page-header">
          <h1 className="page-title">Historial</h1>
        </div>
        <div className="empty-state"><p>Cargando...</p></div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Historial</h1>
        <p className="page-subtitle">{workouts.length} sesiones registradas</p>
      </div>

      {workouts.length === 0 ? (
        <div className="empty-state">
          <Calendar size={48} />
          <p>Aun no hay entrenamientos registrados</p>
        </div>
      ) : (
        <div className="history-list">
          {workouts.map((w) => (
            <div key={w.id} className="history-item" onClick={() => setSelected(w)}>
              <div>
                <div className="history-date">{formatDate(w.date)}</div>
                <div className="history-routine">{w.routineName}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ textAlign: 'right' }}>
                  <div className="history-duration">
                    <Clock size={13} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                    {formatDuration(w.duration)}
                  </div>
                  <div className="history-exercises-count">
                    {w.exercises ? Object.keys(w.exercises).length : 0} ejercicios
                  </div>
                </div>
                <ChevronRight size={16} style={{ color: 'var(--text-muted)' }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de detalle */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h3>{selected.routineName}</h3>
                <div className="text-sm text-muted">{formatDate(selected.date)} - {formatDuration(selected.duration)}</div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button className="btn-icon" onClick={() => handleDelete(selected.id)} title="Eliminar">
                  <Trash2 size={16} />
                </button>
                <button className="btn-icon" onClick={() => setSelected(null)}>
                  <X size={16} />
                </button>
              </div>
            </div>
            <div className="modal-body">
              {selected.exercises && Object.entries(selected.exercises).map(([name, sets]) => (
                <div key={name} style={{ marginBottom: '16px' }}>
                  <div className="font-semibold" style={{ marginBottom: '8px' }}>{name}</div>
                  <div className="sets-grid">
                    <div className="set-row set-header" style={{ gridTemplateColumns: '50px 1fr 1fr' }}>
                      <div>Serie</div>
                      <div>Reps</div>
                      <div>Kg</div>
                    </div>
                    {sets.map((s, i) => (
                      <div className="set-row" key={i} style={{ gridTemplateColumns: '50px 1fr 1fr' }}>
                        <div className="set-label">#{s.set || i + 1}</div>
                        <div style={{ textAlign: 'center' }}>{s.reps}</div>
                        <div style={{ textAlign: 'center' }}>{s.load}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
