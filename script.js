document.addEventListener('DOMContentLoaded', function() {
    
    // --- ESTRUCTURA DE RUTINAS CON CIRCUITOS (sin cambios) ---
    const routines = {
        "Starter Pack - Fase 1, Día 1": [ { groupName: "Block 1", exercises: ["Box Jumps", "Elevated pigeon rotations"] }, { groupName: "Block 2", exercises: ["3- Part Pressing Mechanical drop set", "Long lever dumbbell plank rows"] }, { groupName: "Block 3", exercises: ["Floating heels suitcase squats", "1-arm lean in lateral raise"] }, { groupName: "Block 4", exercises: ["Hanging lateral leg rise", "Copenhagen side plank reverse flyes", "2 up 1 down dumbbell curls"] } ],
        "Starter Pack - Fase 1, Día 2": [ { groupName: "Block 1", exercises: ["Dumbbel squat jumps", "Paused plyo push ups"] }, { groupName: "Block 2", exercises: ["1- Arm/1 Leg Hip thrust press", "Bird dog row iso-hold", "Prone 3 way shoulder raise"] }, { groupName: "Block 3", exercises: ["Skater squats", "Floor triceps extensions / Close grip bench combo"] } ],
        "Starter Pack - Fase 1, Día 3": [ { groupName: "Complex", exercises: ["Alternating rotational overhead press", "Front loaded reverse lunge", "Alternating batwing rows", "Split stance single leg RDL"] }, { groupName: "Block 1", exercises: ["Bench supported pullovers", "Hinged alternating lateral raise"] } ],
        "Starter Pack - Fase 2, Día 1": [ { groupName: "Block 1", exercises: ["Lateral box jumps", "Rotational 1-arm push press"] }, { groupName: "Block 2", exercises: ["Split stance Batwing bentover row", "Rear foot elevated single leg RDL", "Hollow body crunches"] }, { groupName: "Block 3", exercises: ["Single leg bench squats", "Inclune Y press", "Incline dumbbell hammer curls"] } ],
        "Starter Pack - Fase 2, Día 2": [ { groupName: "Block 1", exercises: ["Rear foot elevated split squat jumps", "Jack-knife pull ups"] }, { groupName: "Block 2", exercises: ["1- Arm eccentric dumbbell snach", "Low step-through lunges"] }, { groupName: "Block 3", exercises: ["Supinated chest-supported dumbbell rows", "Low incline 1-Arm dumbbell press"] }, { groupName: "Block 4", exercises: ["Front reaching lateral split squat", "Long lever bodyweight triceps extension"] } ],
        "Starter Pack - Fase 2, Día 3": [ { groupName: "Block 1", exercises: ["Seated Alternating Z-Press", "Floating Heel Dumbbell Front Squat"] }, { groupName: "Block 2", exercises: ["Bird-dog reverse flyes", "Signle leg Bench triceps extensions", "Rear foot elevated chops"] }, { groupName: "Block 3", exercises: ["Wall supported rotational single RDL", "Prone 3-way shoulder raise", "Crossbody pinwheel curls"] } ],
        "Sequel - Fase 1, Día 1": [ { groupName: "Block 1", exercises: ["Seated dumbbell overhead press", "Kickstad goblet squat"] }, { groupName: "Block 2", exercises: ["Bird Dog dumbbell row", "Copenhagen side plank press out", "Prone alternating overhead press"] }, { groupName: "Block 3", exercises: ["Tranverse Lunges", "Lateral raises", "Bodyweight triceps extensions / close grip push ups"] } ],
        "Sequel - Fase 1, Día 2": [ { groupName: "Block 1", exercises: ["Chin-Ups", "Rotational goblet rear foot elevated split squat"] }, { groupName: "Block 2", exercises: ["Dubbell floor press", "Contralateral single leg RDL", "Goble cossack squat"] }, { groupName: "Block 3", exercises: ["Incline press/flye combo", "Chest supported row to reverse flye combo", "Incline curt to triceps extension"] } ],
        "Sequel - Fase 1, Día 3": [ { groupName: "Complex", exercises: ["Alternating overhead press", "2-Dumbbell front squat", "Bentover batwind row", "Dumbbell RDL"] }, { groupName: "Block 1", exercises: ["Push ups", "Foam roller leg curl", "TRX face pull into overhead press", "Split stance (1- Arm Lateral rise)"] } ],
        "Sequel - Fase 2, Día 1": [ { groupName: "Block 1", exercises: ["Trap Bar deadlift 'Contrast Training'", "Plyo Push ups"] }, { groupName: "Block 2", exercises: ["2 ups 1 down overhead press", "Head supported reverse flyes", "Deadbug crunch"] }, { groupName: "Block 3", exercises: ["Abducted single Leg RDL", "V - Sit lateral rise", "Alternating hammer curls"] } ],
        "Sequel - Fase 2, Día 2": [ { groupName: "Block 1", exercises: ["Feet elevated inverted row", "Step-through lunges"] }, { groupName: "Block 2", exercises: ["Landmine Z Press/floor press", "Landmine single leg RDL /offset dumbbell single leg RDL", "Landmine rotations / hollow body Rotations"] }, { groupName: "Block 3", exercises: ["Incline squeeze press", "Head supported batwind row", "Incline iso curls"] } ],
        "Sequel - Fase 2, Día 3": [ { groupName: "Complex:", exercises: ["1 arm overhead press", "Offset reverse lunge", "1-arm staggered stance row", "Offset dumbbell ingle leg RDL"] }, { groupName: "Ejercicios", exercises: ["Close grips push ups", "Glute bridge hamstrings drop", "TRX revers flyes", "TRX triceps extesions"] } ],
        "The Trilogy - Fase 1, Día 1": [ { groupName: "Block 1", exercises: ["Box Jumps", "Elevated pigeon rotations"] }, { groupName: "Block 2", exercises: ["3- Part Pressing Mechanical drop set", "Long lever dumbbell plank rows"] }, { groupName: "Block 3", exercises: ["Floating heels suitcase squats", "1-arm lean in lateral raise"] }, { groupName: "Block 4", exercises: ["Hanging lateral leg rise", "Copenhagen side plank reverse flyes", "2 up 1 down dumbbell curls"] } ],
        "The Trilogy - Fase 1, Día 2": [ { groupName: "Block 1", exercises: ["Dumbbel squat jumps", "Paused plyo push ups"] }, { groupName: "Block 2", exercises: ["$1-Arm/1$ Leg Hip thrust press", "Bird dog row iso-hold", "Prone 3 way shoulder raise"] }, { groupName: "Block 3", exercises: ["Skater squats", "Floor triceps extensions / Close grip bench combo"] } ],
        "The Trilogy - Fase 1, Día 3": [ { groupName: "Complex", exercises: ["Alternating rotational overhead press", "Front loaded reverse lunge", "Alternating batwing rows", "Split stance single leg RDL"] }, { groupName: "Block 1", exercises: ["Bench supported pullovers", "Hinged alternating lateral raise", "Split stance chops", "Hamstring bridge march"] } ],
        "The Trilogy - Fase 2, Día 1": [ { groupName: "Block 1", exercises: ["Lateral box jumps", "Rotational 1-arm push press"] }, { groupName: "Block 2", exercises: ["Split stance Batwing bentover row", "Rear foot elevated single leg RDL", "Hollow body crunches"] }, { groupName: "Block 3", exercises: ["Single leg bench squats", "Inclune Y press", "Incline dumbbell hammer curls"] } ],
        "The Trilogy - Fase 2, Día 2": [ { groupName: "Block 1", exercises: ["Rear foot elevated split squat jumps", "Jack-knife pull ups"] }, { groupName: "Block 2", exercises: ["1- Arm eccentric dumbbell snach", "Low step-through lunges"] }, { groupName: "Block 3", exercises: ["Supinated chest-supported dumbbell rows", "Low incline 1-Arm dumbbell press"] }, { groupName: "Block 4", exercises: ["Front reaching lateral split squat", "Long lever bodyweight triceps extension"] } ],
        "The Trilogy - Fase 2, Día 3": [ { groupName: "Block 1", exercises: ["Seated Alternating Z-Press", "Floating Heel Dumbbell Front Squat"] }, { groupName: "Block 2", exercises: ["Bird-dog reverse flyes", "Signle leg Bench triceps extensions", "Rear foot elevated chops"] }, { groupName: "Block 3", exercises: ["Wall supported rotational single RDL", "Prone 3-way shoulder raise", "Crossbody pinwheel curls"] } ]
    };
    
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

            circuit.exercises.forEach(exerciseName => {
                const exerciseBlock = document.createElement('div');
                exerciseBlock.className = 'exercise-block';
                exerciseBlock.dataset.exerciseName = exerciseName;
                let setsGridHTML = `<div class="exercise-name">${exerciseName}</div>
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
