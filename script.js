document.addEventListener('DOMContentLoaded', function() {
    
    
    
    // --- LÓGICA DE LA APLICACIÓN ---

    const routineSelect = document.getElementById('routine-select');
    const exerciseDisplay = document.getElementById('exercise-display');
    const timerDisplay = document.getElementById('timer-display');
    const startBtn = document.getElementById('start-btn');
    const finishBtn = document.getElementById('finish-btn');
    const importBtn = document.getElementById('import-btn');
    const exportBtn = document.getElementById('export-btn');
    const fileInput = document.getElementById('file-input');
    
    let timerInterval = null, startTime = 0, elapsedTime = 0;

    for (const routineName in routines) {
        const option = document.createElement('option');
        option.value = routineName;
        option.textContent = routineName;
        routineSelect.appendChild(option);
    }

    routineSelect.addEventListener('change', function() {
        stopTimer();
        resetTimerDisplay();
        displayExercises(this.value);
        startBtn.disabled = !this.value;
        finishBtn.disabled = true;
    });

    startBtn.addEventListener('click', startTimer);
    finishBtn.addEventListener('click', () => {
        stopTimer();
        saveWorkoutData();
    });

    // --- NUEVOS EVENTOS PARA IMPORTAR Y EXPORTAR ---
    exportBtn.addEventListener('click', exportData);
    importBtn.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', importData);

    function exportData() {
        const history = localStorage.getItem('workoutHistory');
        if (!history || history === '{}') {
            alert('No hay datos para exportar.');
            return;
        }
        const blob = new Blob([history], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `workout_history_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    function importData(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const importedData = JSON.parse(e.target.result);
                // Simple validación para asegurar que es un objeto
                if (typeof importedData === 'object' && importedData !== null) {
                    localStorage.setItem('workoutHistory', JSON.stringify(importedData));
                    alert('Datos importados con éxito.');
                    // Refrescar la vista actual
                    displayExercises(routineSelect.value);
                } else {
                    throw new Error('El archivo no tiene el formato correcto.');
                }
            } catch (error) {
                alert('Error al importar el archivo. Asegúrate de que es un archivo JSON válido.');
            }
        };
        reader.readAsText(file);
        // Limpiar el input para poder cargar el mismo archivo otra vez
        fileInput.value = '';
    }

    function saveWorkoutData() {
        const history = loadHistory();
        const today = new Date().toISOString().split('T')[0];
        document.querySelectorAll('.exercise-block').forEach(block => {
            const exerciseName = block.dataset.exerciseName;
            const setsData = [];
            block.querySelectorAll('.reps-input').forEach((repInput, index) => {
                const setNumber = index + 1;
                const loadInput = block.querySelector(`.load-input[data-set="${setNumber}"]`);
                const reps = repInput.value;
                const load = loadInput.value;
                if (reps && load) {
                    setsData.push({ set: setNumber, reps, load });
                }
            });

            if (setsData.length > 0) {
                if (!history[exerciseName]) history[exerciseName] = [];
                history[exerciseName].push({ date: today, sets: setsData });
            }
        });
        localStorage.setItem('workoutHistory', JSON.stringify(history));
        alert('¡Rutina guardada con éxito!');
        displayExercises(routineSelect.value);
    }

    function loadHistory() {
        const history = localStorage.getItem('workoutHistory');
        return history ? JSON.parse(history) : {};
    }

    function displayExercises(routineName) {
        exerciseDisplay.innerHTML = '';
        const history = loadHistory();
        if (!routineName) return;

        routines[routineName].forEach(circuit => {
            const circuitBlock = document.createElement('div');
            circuitBlock.className = 'circuit-block';
            circuitBlock.innerHTML = `<h2 class="circuit-title">${circuit.groupName}</h2>`;

            circuit.exercises.forEach(exercise => {
                const exerciseName = exercise.name;
                const exerciseReps = exercise.reps;
                const exerciseBlock = document.createElement('div');
                exerciseBlock.className = 'exercise-block';
                exerciseBlock.dataset.exerciseName = exerciseName;
                let setsGridHTML = `<div class="exercise-name">${exerciseName} (${exerciseReps})</div>
                                    <div class="sets-grid">
                                        <div class="grid-header">Serie</div><div class="grid-header">Reps</div>
                                        <div class="grid-header">Carga (kg)</div><div class="grid-header">Anterior</div>`;
                let lastEntry = history[exerciseName]?.slice(-1)[0];
                for (let i = 1; i <= 3; i++) {
                    let lastDataText = 'Sin datos';
                    if (lastEntry?.sets) {
                        const setData = lastEntry.sets.find(s => s.set === i);
                        if (setData) lastDataText = `${setData.reps}x${setData.load} kg`;
                    }
                    setsGridHTML += `<div class="set-label">Serie ${i}</div>
                                     <input type="number" placeholder="Reps" class="reps-input" data-set="${i}">
                                     <input type="number" placeholder="Carga" class="load-input" data-set="${i}">
                                     <div class="last-data">${lastDataText}</div>`;
                }
                setsGridHTML += `</div>`;
                exerciseBlock.innerHTML = setsGridHTML;
                circuitBlock.appendChild(exerciseBlock);
            });
            exerciseDisplay.appendChild(circuitBlock);
        });
    }

    function startTimer() {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTimerDisplay, 1000);
        startBtn.disabled = true;
        finishBtn.disabled = false;
        routineSelect.disabled = true;
    }

    function stopTimer() {
        clearInterval(timerInterval);
        if (routineSelect.value) startBtn.disabled = false;
        finishBtn.disabled = true;
        routineSelect.disabled = false;
    }

    function updateTimerDisplay() {
        elapsedTime = Date.now() - startTime;
        const totalSeconds = Math.floor(elapsedTime / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        timerDisplay.textContent = `${pad(minutes)}:${pad(seconds)}`;
    }
    
    function resetTimerDisplay() {
        elapsedTime = 0;
        timerDisplay.textContent = '00:00';
    }

    function pad(number) { return number < 10 ? '0' + number : number; }
});
