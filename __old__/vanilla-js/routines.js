
    // --- BASE DE DATOS DE RUTINAS - RECONSTRUIDA DESDE CERO SEGÚN EL ÚLTIMO PDF ---
    const routines = {
        "Starter Pack - Fase 1, Día 1": [
            { groupName: "Block 1", exercises: [{name: "Incline dumbbell press", reps: "8"}, {name: "Trap bar deadlifts (goblet squat)", reps: "8"}] },
            { groupName: "Block 2", exercises: [{name: "Batwing chest supported row", reps: "8"}, {name: "Side plank pressouts", reps: "8"}] },
            { groupName: "Block 3", exercises: [{name: "Prone overhead press", reps: "8"}, {name: "Lateral deficit squats", reps: "8 x leg"}, {name: "Lateral raise", reps: "12"}, {name: "TRX Triceps extensions", reps: "12"}] },
            { groupName: "Block 4", exercises: [{name: "Goblet squats", reps: "12"}, {name: "Elbows-out triceps extensions", reps: "12"}] }
        ],
        "Starter Pack - Fase 1, Día 2": [
            { groupName: "Block 1", exercises: [{name: "Goblet rear foot elevated split squat (Bulgarian squat)", reps: "8"}, {name: "1 - Arm standing overhead press", reps: "8"}] },
            { groupName: "Block 2", exercises: [{name: "Chin ups (TRX Rows o 3 point dumbbell row)", reps: "AMRAP"}, {name: "Single legs Hip Thrusts", reps: "10 x leg"}, {name: "Ab Wheel Rollouts", reps: "10 reps"}] },
            { groupName: "Block 3", exercises: [{name: "Hollow Body 1-Arm Press", reps: "8"}, {name: "Bentover reverse flye", reps: "20"}, {name: "Iso hammer Curls", reps: "10xarm"}] }
        ],
        "Starter Pack - Fase 1, Día 3": [
            { groupName: "Block 1", exercises: [{name: "1- Arm landmine press /alternating dumbell overhead press", reps: "8 ps"}, {name: "Landmine squat / 2 dumbell front squat", reps: "8"}, {name: "Landmine bench row / Bent over batwing row", reps: "8 ps"}] },
            { groupName: "Block 2", exercises: [{name: "Push ups", reps: "AMRAP"}, {name: "Hanging knees raises", reps: "10"}, {name: "Goblet reverse lunge", reps: "6ps"}] },
            { groupName: "Block 3", exercises: [{name: "Alternating lateral raises", reps: "10 ps"}, {name: "TRX biceps curls", reps: "10"}, {name: "TRX reverse flyes", reps: "10"}] }
        ],
        "Starter Pack - Fase 2, Día 1": [
            { groupName: "Block 1", exercises: [{name: "Trap bar deadlifts/kettle bell deadlifts", reps: "6"}, {name: "Chin ups /TRX Rows /Staggered stance dumbbell rows", reps: "AMRAP"}] },
            { groupName: "Block 2", exercises: [{name: "1- Arm incline dumbell press", reps: "8 parm"}, {name: "Squat pressout", reps: "8"}] },
            { groupName: "Block 3", exercises: [{name: "Hollow body triceps extension and Chest flye combo", reps: "8"}, {name: "Bench Plank Row", reps: "8"}, {name: "Lateral countdown raise (5 to 1)", reps: "(5 to 1)"}] },
            { groupName: "Block 4", exercises: [{name: "Kettelbell deadlifts", reps: "8"}, {name: "Staggered stance dumbell row (rowing to the hip)", reps: "8"}] }
        ],
        "Starter Pack - Fase 2, Día 2": [
            { groupName: "Block 1", exercises: [{name: "1-Arm push press", reps: "6"}, {name: "Rear foot elevated split squat with dumbbells", reps: "6"}] },
            { groupName: "Block 2", exercises: [{name: "1- Arm chest support row", reps: "8 parm"}, {name: "Single leg RDL (Rumanian deadlift)", reps: "6 per leg"}, {name: "Eccentric dragonflags", reps: "6"}] },
            { groupName: "Block 3", exercises: [{name: "Hollow body pullover", reps: "10"}, {name: "Alternating bentover reverse flyes", reps: "8"}, {name: "Pinwheel curls", reps: "10"}] }
        ],
        "Starter Pack - Fase 2, Día 3": [
            { groupName: "Block 1", exercises: [{name: "Alternating Shoulder to Shoulder press / high incline dumbell press", reps: "6 p side"}, {name: "Landmine reverse lunge / two dumbbell reverse lunges", reps: "8 pleg"}] },
            { groupName: "Block 2", exercises: [{name: "3 point dumbbell row", reps: "8"}, {name: "Offset lateral lunge", reps: "6"}, {name: "Side plank reverse flyes", reps: "8"}] },
            { groupName: "Block 3", exercises: [{name: "1- Arm lateral raises", reps: "10"}, {name: "Incline dumbbell curls", reps: "10"}, {name: "Close grip Push-ups", reps: "AMRAP"}] },
            { groupName: "Block 4", exercises: [{name: "High incline dumbbell press", reps: "8"}, {name: "2 dumbbell reverse lunges", reps: "8"}] }
        ],
        "Sequel - Fase 1, Día 1": [
            { groupName: "Block 1", exercises: [{name: "Seated dumbbell overhead press", reps: "8"}, {name: "Kickstad goblet squat", reps: "6 ps"}] },
            { groupName: "Block 2", exercises: [{name: "Bird Dog dumbbell row", reps: "8"}, {name: "Copenhagen side plank press out", reps: "8 ps"}, {name: "Prone alternating overhead press", reps: "6 ps"}] },
            { groupName: "Block 3", exercises: [{name: "Tranverse Lunges", reps: "6 ps"}, {name: "Lateral raises", reps: "8"}, {name: "Bodyweight triceps extensions / close grip push ups", reps: "8"}] }
        ],
        "Sequel - Fase 1, Día 2": [
            { groupName: "Block 1", exercises: [{name: "Chin-Ups", reps: "AMRAP"}, {name: "Rotational goblet rear foot elevated split squat", reps: "6 ps"}] },
            { groupName: "Block 2", exercises: [{name: "Dubbell floor press", reps: "7"}, {name: "Contralateral single leg RDL", reps: "7ps"}, {name: "Goble cossack squat", reps: "7 ps"}] },
            { groupName: "Block 3", exercises: [{name: "Incline press/flye combo", reps: "8"}, {name: "Chest supported row to reverse flye combo", reps: "8"}, {name: "Incline curt to triceps extension", reps: "8"}] }
        ],
        "Sequel - Fase 1, Día 3": [
            { groupName: "Complex", exercises: [{name: "Alternating overhead press", reps: "5 ps"}, {name: "2-Dumbbell front squat", reps: "10"}, {name: "Bentover batwind row", reps: "5ps"}, {name: "Dumbbell RDL", reps: "10"}] },
            { groupName: "Block 1", exercises: [{name: "Push ups", reps: "AMRAP"}, {name: "Foam roller leg curl", reps: "6"}, {name: "TRX face pull into overhead press", reps: "10"}, {name: "Split stance (1- Arm Lateral rise)", reps: "7 ps"}] }
        ],
        "Sequel - Fase 2, Día 1": [
            { groupName: "Block 1", exercises: [{name: "Trap Bar deadlift 'Contrast Training'", reps: "6"}, {name: "Plyo Push ups", reps: "6"}] },
            { groupName: "Block 2", exercises: [{name: "2 ups 1 down overhead press", reps: "5 p arm"}, {name: "Head supported reverse flyes", reps: "8"}, {name: "Deadbug crunch", reps: "8 p. side"}] },
            { groupName: "Block 3", exercises: [{name: "Abducted single Leg RDL", reps: "6 p leg"}, {name: "V - Sit lateral rise", reps: "8 p side"}, {name: "Alternating hammer curls", reps: "8 p arm"}] }
        ],
        "Sequel - Fase 2, Día 2": [
            { groupName: "Block 1", exercises: [{name: "Feet elevated inverted row", reps: "8"}, {name: "Step-through lunges", reps: "7 p. side"}] },
            { groupName: "Block 2", exercises: [{name: "Landmine Z Press/floor press", reps: "7 p. leg"}, {name: "Landmine single leg RDL /offset dumbbell single leg RDL", reps: "6 p. side"}, {name: "Landmine rotations / hollow body Rotations", reps: "8"}] },
            { groupName: "Block 3", exercises: [{name: "Incline squeeze press", reps: "8"}, {name: "Head supported batwind row", reps: "8"}, {name: "Incline iso curls", reps: "8"}] }
        ],
        "Sequel - Fase 2, Día 3": [
            { groupName: "Complex", exercises: [{name: "1 arm overhead press", reps: "5 p. arm"}, {name: "Offset reverse lunge", reps: "5 p. leg"}, {name: "1-arm staggered stance row", reps: "5 p. side"}, {name: "Offset dumbbell ingle leg RDL", reps: "5 p. leg"}] },
            { groupName: "Ejercicios", exercises: [{name: "Close grips push ups", reps: "AMRAP"}, {name: "Glute bridge hamstrings drop", reps: ""}, {name: "TRX revers flyes", reps: ""}, {name: "TRX triceps extesions", reps: ""}] }
        ],
        "The Trilogy - Fase 1, Día 1": [
            { groupName: "Block 1", exercises: [{name: "Box Jumps", reps: "5"}, {name: "Elevated pigeon rotations", reps: "5"}] },
            { groupName: "Block 2", exercises: [{name: "3- Part Pressing Mechanical drop set", reps: "4/4/4"}, {name: "Long lever dumbbell plank rows", reps: "8"}] },
            { groupName: "Block 3", exercises: [{name: "Floating heels suitcase squats", reps: "8"}, {name: "1-arm lean in lateral raise", reps: "8"}] },
            { groupName: "Block 4", exercises: [{name: "Hanging lateral leg rise", reps: "5 p. side"}, {name: "Copenhagen side plank reverse flyes", reps: "8"}, {name: "2 up 1 down dumbbell curls", reps: "6"}] }
        ],
        "The Trilogy - Fase 1, Día 2": [
            { groupName: "Block 1", exercises: [{name: "Dumbbel squat jumps", reps: "5"}, {name: "Paused plyo push ups", reps: "5"}] },
            { groupName: "Block 2", exercises: [{name: "1-Arm/1 Leg Hip thrust press", reps: "8"}, {name: "Bird dog row iso-hold", reps: "8"}, {name: "Prone 3 way shoulder raise", reps: "3 p arm"}] },
            { groupName: "Block 3", exercises: [{name: "Skater squats", reps: "5"}, {name: "Floor triceps extensions / Close grip bench combo", reps: "8/8"}] }
        ],
        "The Trilogy - Fase 1, Día 3": [
            { groupName: "Complex", exercises: [{name: "Alternating rotational overhead press", reps: "6"}, {name: "Front loaded reverse lunge", reps: "6 p. leg"}, {name: "Alternating batwing rows", reps: "6 p. arm"}, {name: "Split stance single leg RDL", reps: "6 p. leg"}] },
            { groupName: "Block 1", exercises: [{name: "Bench supported pullovers", reps: "10"}, {name: "Hinged alternating lateral raise", reps: "8 p. arm"}] },
            { groupName: "Block 2", exercises: [{name: "Split stance chops", reps: "8 p. side"}, {name: "Hamstring bridge march", reps: "8 p. side"}] }
        ],
        "The Trilogy - Fase 2, Día 1": [
            { groupName: "Block 1", exercises: [{name: "Lateral box jumps", reps: "3 p. side"}, {name: "Rotational 1-arm push press", reps: "6 p. side"}] },
            { groupName: "Block 2", exercises: [{name: "Split stance Batwing bentover row", reps: "8 p. side"}, {name: "Rear foot elevated single leg RDL", reps: "8 p. leg"}, {name: "Hollow body crunches", reps: "12"}] },
            { groupName: "Block 3", exercises: [{name: "Single leg bench squats", reps: "6 p. leg"}, {name: "Inclune 'Y' press", reps: "8"}, {name: "Incline dumbbell hammer curls", reps: "8"}] }
        ],
        "The Trilogy - Fase 2, Día 2": [
            { groupName: "Block 1", exercises: [{name: "Rear foot elevated split squat jumps", reps: "5 p side"}, {name: "Jack-knife pull ups", reps: "AMRAP"}] },
            { groupName: "Block 2", exercises: [{name: "1- Arm eccentric dumbbell snach", reps: "5 p side"}, {name: "Low step-through lunges", reps: "5 p side"}] },
            { groupName: "Block 3", exercises: [{name: "Supinated chest-supported dumbbell rows", reps: "8"}, {name: "Low incline 1-Arm dumbbell press", reps: "6 p side"}] },
            { groupName: "Block 4", exercises: [{name: "Front reaching lateral split squat", reps: ""}, {name: "Long lever bodyweight triceps extension", reps: "AMRAP-1"}] }
        ],
        "The Trilogy - Fase 2, Día 3": [
            { groupName: "Block 1", exercises: [{name: "Seated Alternating Z-Press", reps: "6 p side"}, {name: "Floating Heel' Dumbbell Front Squat", reps: "8 reps"}] },
            { groupName: "Block 2", exercises: [{name: "Bird-dog reverse flyes", reps: "8 p side"}, {name: "Signle leg Bench triceps extensions", reps: "6 p side"}, {name: "Rear foot elevated chops", reps: "8 p side"}] },
            { groupName: "Block 3", exercises: [{name: "Wall supported rotational single RDL", reps: "6 p side"}, {name: "Prone 3-way shoulder raise", reps: "3"}, {name: "Crossbody pinwheel curls", reps: "8 p side"}] }
        ]
    };
    