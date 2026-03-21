import { useState } from 'react';

export default function ExerciseCard({ exercise, prevSets, onDataChange }) {
  const [sets, setSets] = useState([
    { reps: '', load: '' },
    { reps: '', load: '' },
    { reps: '', load: '' }
  ]);

  function handleChange(setIndex, field, value) {
    const updated = [...sets];
    updated[setIndex] = { ...updated[setIndex], [field]: value };
    setSets(updated);
    onDataChange(exercise.name, updated);
  }

  return (
    <div className="exercise-card">
      <div className="exercise-header">
        <div className="exercise-name">{exercise.name}</div>
        <div className="exercise-meta">{exercise.reps}</div>
      </div>
      <div className="sets-grid">
        <div className="set-row set-header">
          <div>Serie</div>
          <div>Reps</div>
          <div>Kg</div>
          <div style={{ textAlign: 'center' }}>Prev</div>
        </div>
        {[0, 1, 2].map((i) => {
          const prev = prevSets?.[i];
          const prevText = prev ? `${prev.reps}x${prev.load}` : '-';
          return (
            <div className="set-row" key={i}>
              <div className="set-label">#{i + 1}</div>
              <input
                type="number"
                className="input input-number"
                placeholder="-"
                value={sets[i].reps}
                onChange={(e) => handleChange(i, 'reps', e.target.value)}
                min="0"
              />
              <input
                type="number"
                className="input input-number"
                placeholder="-"
                value={sets[i].load}
                onChange={(e) => handleChange(i, 'load', e.target.value)}
                min="0"
                step="0.5"
              />
              <div className="prev-data" title={`Anterior: ${prevText}`}>{prevText}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
