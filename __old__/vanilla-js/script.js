document.addEventListener('DOMContentLoaded', function() {
    
    // --- LÓGICA DE LA APLICACIÓN ---

    const routineSelect = document.getElementById('routine-select');
    const exerciseDisplay = document.getElementById('exercise-display');
    const timerDisplay = document.getElementById('timer-display');
    const startBtn = document.getElementById('start-btn');
    const finishBtn = document.getElementById('finish-btn');
    const importBtn = document.getElementById('import-btn');
    const exportBtn = document.getElementById('export-btn');
    const resetBtn = document.getElementById('reset-btn');
    const fileInput = document.getElementById('file-input');
    
    let timerInterval = null, startTime = 0, elapsedTime = 0;

    // Populate Routine Select
    for (const routineName in routines) {
        const option = document.createElement('option');
        option.value = routineName;
        option.textContent = routineName;
        routineSelect.appendChild(option);
    }

    // Event Listeners
    routineSelect.addEventListener('change', function() {
        stopTimer();
        resetTimerDisplay();
        if (this.value) {
            displayExercises(this.value);
            startBtn.disabled = false;
        } else {
            exerciseDisplay.innerHTML = `
                <div class="placeholder-message">
                    <i class="fas fa-running"></i>
                    <p>Selecciona una rutina para comenzar</p>
                </div>`;
            startBtn.disabled = true;
        }
        finishBtn.disabled = true;
    });

    startBtn.addEventListener('click', startTimer);

    finishBtn.addEventListener('click', () => {
        stopTimer();
        saveWorkoutData();
    });

    if(resetBtn) {
        resetBtn.addEventListener('click', resetRoutine);
    }

    // Import/Export Logic
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
                if (typeof importedData === 'object' && importedData !== null) {
                    localStorage.setItem('workoutHistory', JSON.stringify(importedData));
                    alert('Datos importados con éxito.');
                    if (routineSelect.value) {
                        displayExercises(routineSelect.value);
                    }
                } else {
                    throw new Error('El archivo no tiene el formato correcto.');
                }
            } catch (error) {
                alert('Error al importar el archivo. Asegúrate de que es un archivo JSON válido.');
            }
        };
        reader.readAsText(file);
        fileInput.value = '';
    }

    function saveWorkoutData() {
        const history = loadHistory();
        const today = new Date().toISOString().split('T')[0];

        // Note: Using the original logic hooks (classes) to find data
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
        // Refresh display to show updated 'Last' data
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

                // IMPORTANT: Keeping .exercise-block and .dataset.exerciseName for saveWorkoutData
                const exerciseCard = document.createElement('div');
                exerciseCard.className = 'exercise-card exercise-block';
                exerciseCard.dataset.exerciseName = exerciseName;

                let cardHTML = `
                    <div class="exercise-header">
                        <div class="exercise-name">${exerciseName}</div>
                        <div class="exercise-meta"><i class="fas fa-bullseye"></i> ${exerciseReps}</div>
                    </div>
                    <div class="sets-container">
                        <div class="set-row set-header-row">
                            <div class="col">Serie</div>
                            <div class="col">Reps</div>
                            <div class="col">Kg</div>
                            <div class="col last-col">Prev</div>
                        </div>
                `;

                let lastEntry = history[exerciseName]?.slice(-1)[0];

                for (let i = 1; i <= 3; i++) {
                    let lastDataText = '-';
                    if (lastEntry?.sets) {
                        const setData = lastEntry.sets.find(s => s.set === i);
                        if (setData) lastDataText = `${setData.reps}x${setData.load}`;
                    }

                    // IMPORTANT: Keeping .reps-input and .load-input with data-set for saveWorkoutData
                    cardHTML += `
                        <div class="set-row">
                            <div class="set-label">#${i}</div>
                            <div class="input-group">
                                <input type="number" class="reps-input" data-set="${i}">
                            </div>
                            <div class="input-group">
                                <input type="number" class="load-input" data-set="${i}">
                            </div>
                            <div class="last-data" title="Anterior: ${lastDataText}">${lastDataText}</div>
                        </div>
                    `;
                }

                cardHTML += `</div>`; // Close sets-container
                exerciseCard.innerHTML = cardHTML;
                circuitBlock.appendChild(exerciseCard);
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

    function resetRoutine() {
        routineSelect.value = '';
        // Reset to placeholder
         exerciseDisplay.innerHTML = `
                <div class="placeholder-message">
                    <i class="fas fa-running"></i>
                    <p>Selecciona una rutina para comenzar</p>
                </div>`;
        stopTimer();
        resetTimerDisplay();
        startBtn.disabled = true;
        finishBtn.disabled = true;
        routineSelect.disabled = false;
    }
});
