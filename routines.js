 const routines = {
        "Starter Pack - Fase 1, Día 1": [
            { groupName: "Block 1", exercises: [{name: "Box Jumps", reps: "5"}, {name: "Elevated pigeon rotations", reps: "5"}] },
            { groupName: "Block 2", exercises: [{name: "3- Part Pressing Mechanical drop set", reps: "4/4/4"}, {name: "Long lever dumbbell plank rows", reps: "8"}] },
            { groupName: "Block 3", exercises: [{name: "Floating heels suitcase squats", reps: "8"}, {name: "1-arm lean in lateral raise", reps: "8"}] },
            { groupName: "Block 4", exercises: [{name: "Hanging lateral leg rise", reps: "5 p. side"}, {name: "Copenhagen side plank reverse flyes", reps: "8"}, {name: "2 up 1 down dumbbell curls", reps: "6"}] }
        ],
        "Starter Pack - Fase 1, Día 2": [
            { groupName: "Block 1", exercises: [{name: "Dumbbel squat jumps", reps: "5"}, {name: "Paused plyo push ups", reps: "5"}] },
            { groupName: "Block 2", exercises: [{name: "1- Arm/1 Leg Hip thrust press", reps: "8"}, {name: "Bird dog row iso-hold", reps: "8"}, {name: "Prone 3 way shoulder raise", reps: "3 p arm"}] },
            { groupName: "Block 3", exercises: [{name: "Skater squats", reps: "5"}, {name: "Floor triceps extensions / Close grip bench combo", reps: "8/8"}] }
        ],
        "Starter Pack - Fase 1, Día 3": [
            { groupName: "Complex", exercises: [{name: "Alternating rotational overhead press", reps: "6"}, {name: "Front loaded reverse lunge", reps: "6 p. leg"}, {name: "Alternating batwing rows", reps: "6 p. arm"}, {name: "Split stance single leg RDL", reps: "6 p. leg"}] },
            { groupName: "Block 1", exercises: [{name: "Bench supported pullovers", reps: "10"}, {name: "Hinged alternating lateral raise", reps: "8 p. arm"}] }
        ],
        "Starter Pack - Fase 2, Día 1": [
            { groupName: "Block 1", exercises: [{name: "Lateral box jumps", reps: "3 p. side"}, {name: "Rotational 1-arm push press", reps: "6 p. side"}] },
            { groupName: "Block 2", exercises: [{name: "Split stance Batwing bentover row", reps: "8 p. side"}, {name: "Rear foot elevated single leg RDL", reps: "8 p. leg"}, {name: "Hollow body crunches", reps: "12"}] },
            { groupName: "Block 3", exercises: [{name: "Single leg bench squats", reps: "6 p. leg"}, {name: "Incline Y press", reps: "8"}, {name: "Incline dumbbell hammer curls", reps: "8"}] }
        ],
        "Starter Pack - Fase 2, Día 2": [
            { groupName: "Block 1", exercises: [{name: "Rear foot elevated split squat jumps", reps: "5 p side"}, {name: "Jack-knife pull ups", reps: "AMRAP"}] },
            { groupName: "Block 2", exercises: [{name: "1- Arm eccentric dumbbell snach", reps: "5 p side"}, {name: "Low step-through lunges", reps: "5 p side"}] },
            { groupName: "Block 3", exercises: [{name: "Supinated chest-supported dumbbell rows", reps: "8"}, {name: "Low incline 1-Arm dumbbell press", reps: "6 p side"}] },
            { groupName: "Block 4", exercises: [{name: "Front reaching lateral split squat", reps: ""}, {name: "Long lever bodyweight triceps extension", reps: "AMRAP-1"}] }
        ],
        "Starter Pack - Fase 2, Día 3": [
            { groupName: "Block 1", exercises: [{name: "Seated Alternating Z-Press", reps: "6 p side"}, {name: "Floating Heel Dumbbell Front Squat", reps: "8 reps"}] },
            { groupName: "Block 2", exercises: [{name: "Bird-dog reverse flyes", reps: "8 p side"}, {name: "Single leg Bench triceps extensions", reps: "6 p side"}, {name: "Rear foot elevated chops", reps: "8 p side"}] },
            { groupName: "Block 3", exercises: [{name: "Wall supported rotational single RDL", reps: "6 p side"}, {name: "Prone 3-way shoulder raise", reps: "3"}, {name: "Crossbody pinwheel curls", reps: "8 p side"}] }
        ],
        "Sequel - Fase 1, Día 1": [
            { groupName: "Block 1", exercises: [{name: "Seated dumbbell overhead press", reps: "8"}, {name: "Kickstand goblet squat", reps: "6 ps"}] },
            { groupName: "Block 2", exercises: [{name: "Bird Dog dumbbell row", reps: "8"}, {name: "Copenhagen side plank press out", reps: "8 ps"}, {name: "Prone alternating overhead press", reps: "6 ps"}] },
            { groupName: "Block 3", exercises: [{name: "Tranverse Lunges", reps: "6 ps"}, {name: "Lateral raises", reps: "8"}, {name: "Bodyweight triceps extensions / close grip push ups", reps: "8"}] }
        ],
        "Sequel - Fase 1, Día 2": [
            { groupName: "Block 1", exercises: [{name: "Chin-Ups", reps: "AMRAP"}, {name: "Rotational goblet rear foot elevated split squat", reps: "6 ps"}] },
            { groupName: "Block 2", exercises: [{name: "Dumbbell floor press", reps: "7"}, {name: "Contralateral single leg RDL", reps: "7ps"}, {name: "Goblet cossack squat", reps: "7 ps"}] },
            { groupName: "Block 3", exercises: [{name: "Incline press/flye combo", reps: "8"}, {name: "Chest supported row to reverse flye combo", reps: "8"}, {name: "Incline curl to triceps extension", reps: "8"}] }
        ],
        "Sequel - Fase 1, Día 3": [
            { groupName: "Complex", exercises: [{name: "Alternating overhead press", reps: "5 ps"}, {name: "2-Dumbbell front squat", reps: "10"}, {name: "Bentover batwing row", reps: "5ps"}, {name: "Dumbbell RDL", reps: "10"}] },
            { groupName: "Block 1", exercises: [{name: "Push ups", reps: "AMRAP"}, {name: "Foam roller leg curl", reps: "6"}, {name: "TRX face pull into overhead press", reps: "10"}, {name: "Split stance (1- Arm Lateral raise)", reps: "7 ps"}] }
        ],
        "Sequel - Fase 2, Día 1": [
            { groupName: "Block 1", exercises: [{name: "Trap Bar deadlift 'Contrast Training'", reps: "6"}, {name: "Plyo Push ups", reps: "6"}] },
            { groupName: "Block 2", exercises: [{name: "2 ups 1 down overhead press", reps: "5 p arm"}, {name: "Head supported reverse flyes", reps: "8"}, {name: "Deadbug crunch", reps: "8 p. side"}] },
            { groupName: "Block 3", exercises: [{name: "Abducted single Leg RDL", reps: "6 p leg"}, {name: "V-Sit lateral rise", reps: "8 p side"}, {name: "Alternating hammer curls", reps: "8 p arm"}] }
        ],
        "Sequel - Fase 2, Día 2": [
            { groupName: "Block 1", exercises: [{name: "Feet elevated inverted row", reps: "8"}, {name: "Step-through lunges", reps: "7 p. side"}] },
            { groupName: "Block 2", exercises: [{name: "Landmine Z Press/floor press", reps: "7 p. side"}, {name: "Landmine single leg RDL /offset dumbbell single leg RDL", reps: "7 p. leg"}, {name: "Landmine rotations / hollow body Rotations", reps: "6 p. side"}] },
            { groupName: "Block 3", exercises: [{name: "Incline squeeze press", reps: "8"}, {name: "Head supported batwing row", reps: "8"}, {name: "Incline iso curls", reps: "8"}] }
        ],
        "Sequel - Fase 2, Día 3": [
            { groupName: "Complex:", exercises: [{name: "1 arm overhead press", reps: "5 p. arm"}, {name: "Offset reverse lunge", reps: "5 p. leg"}, {name: "1-arm staggered stance row", reps: "5 p. side"}, {name: "Offset dumbbell single leg RDL", reps: "5 p. leg"}] },
            { groupName: "Ejercicios", exercises: [{name: "Close grips push ups", reps: "AMRAP"}, {name: "Glute bridge hamstrings drop", reps: ""}, {name: "TRX reverse flyes", reps: ""}, {name: "TRX triceps extensions", reps: ""}] }
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
            { groupName: "Block 1", exercises: [{name: "Bench supported pullovers", reps: "10"}, {name: "Hinged alternating lateral raise", reps: "8 p. arm"}, {name: "Split stance chops", reps: "8 p. side"}, {name: "Hamstring bridge march", reps: "8 p. side"}] }
        ],
        "The Trilogy - Fase 2, Día 1": [
            { groupName: "Block 1", exercises: [{name: "Lateral box jumps", reps: "3 p. side"}, {name: "Rotational 1-arm push press", reps: "6 p. side"}] },
            { groupName: "Block 2", exercises: [{name: "Split stance Batwing bentover row", reps: "8 p. side"}, {name: "Rear foot elevated single leg RDL", reps: "8 p. leg"}, {name: "Hollow body crunches", reps: "12"}] },
            { groupName: "Block 3", exercises: [{name: "Single leg bench squats", reps: "6 p. leg"}, {name: "Incline Y press", reps: "8"}, {name: "Incline dumbbell hammer curls", reps: "8"}] }
        ],
        "The Trilogy - Fase 2, Día 2": [
            { groupName: "Block 1", exercises: [{name: "Rear foot elevated split squat jumps", reps: "5 p side"}, {name: "Jack-knife pull ups", reps: "AMRAP"}] },
            { groupName: "Block 2", exercises: [{name: "1- Arm eccentric dumbbell snach", reps: "5 p side"}, {name: "Low step-through lunges", reps: "5 p side"}] },
            { groupName: "Block 3", exercises: [{name: "Supinated chest-supported dumbbell rows", reps: "8"}, {name: "Low incline 1-Arm dumbbell press", reps: "6 p side"}] },
            { groupName: "Block 4", exercises: [{name: "Front reaching lateral split squat", reps: ""}, {name: "Long lever bodyweight triceps extension", reps: "AMRAP-1"}] }
        ],
        "The Trilogy - Fase 2, Día 3": [
            { groupName: "Block 1", exercises: [{name: "Seated Alternating Z-Press", reps: "6 p side"}, {name: "Floating Heel Dumbbell Front Squat", reps: "8 reps"}] },
            { groupName: "Block 2", exercises: [{name: "Bird-dog reverse flyes", reps: "8 p side"}, {name: "Single leg Bench triceps extensions", reps: "6 p side"}, {name: "Rear foot elevated chops", reps: "8 p side"}] },
            { groupName: "Block 3", exercises: [{name: "Wall supported rotational single RDL", reps: "6 p side"}, {name: "Prone 3-way shoulder raise", reps: "3"}, {name: "Crossbody pinwheel curls", reps: "8 p side"}] }
        ]
    };