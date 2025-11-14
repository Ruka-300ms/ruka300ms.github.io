
let currentScene = 'StartMenu'; 


const sceneTextElement = document.getElementById('scene-text');
const dialogueBoxElement = document.getElementById('dialogue-box');
const choiceContainerElement = document.getElementById('choice-container');
const imageContainerElement = document.getElementById('scene-image-container');
const statsBoxElement = document.getElementById('stats-box'); 


function hideEmotionDisplay() {
    
    if (statsBoxElement) {
        statsBoxElement.style.display = 'none';
    }
}

function updateScene(sceneKey) {
    currentScene = sceneKey;
    const scene = scenes[sceneKey];

 
    imageContainerElement.innerHTML = ''; 
    if (scene.image) {
        const img = document.createElement('img');
        img.src = `images/${scene.image}`; 
        img.alt = `Scene Image: ${sceneKey}`;
        imageContainerElement.appendChild(img);
    }

    sceneTextElement.innerHTML = scene.narrative;

    
    dialogueBoxElement.innerHTML = scene.dialogue 
        ? `<span class="character-name">${scene.dialogue.character}:</span> ${scene.dialogue.text}` 
        : '';


    choiceContainerElement.innerHTML = '';
    if (scene.choices) {
        scene.choices.forEach(choice => {
            const button = document.createElement('button');
            button.className = 'choice-button';
            button.textContent = choice.text;
            button.onclick = () => handleChoice(choice);
            choiceContainerElement.appendChild(button);
        });
    } else if (scene.next) {
        const button = document.createElement('button');
        button.className = 'choice-button';
        button.textContent = 'Continue...';
        button.onclick = () => updateScene(scene.next);
        choiceContainerElement.appendChild(button);
    } else if (scene.ending) {
        displayEnding(scene.ending);
    }
}

function handleChoice(choice) {
    updateScene(choice.nextScene);
}

function displayEnding(endingKey) {
    const ending = endings[endingKey];
    sceneTextElement.innerHTML = `<h2 class="ending-text">${ending.title}</h2><p>${ending.text}</p>`;
    dialogueBoxElement.innerHTML = '';
    
    imageContainerElement.innerHTML = '';
    const img = document.createElement('img');
    img.src = `images/${ending.image}`; 
    img.alt = `Ending Image: ${endingKey}`;
    imageContainerElement.appendChild(img);

    const restartButton = document.createElement('button');
    restartButton.className = 'choice-button restart-button';
    restartButton.textContent = 'Restart Game';
    restartButton.onclick = () => window.location.reload(); 
    choiceContainerElement.appendChild(restartButton);
}

const scenes = {
    'StartMenu': {
        image: 'main_menu.png', 
        narrative: 'The world did not end with fire, but with ash. A vast, desolate realm of shattered infrastructure and bruised twilight awaits your first step. This land, known only as the Ashfall Wastes, screams of a history violently undone. You are the lone survivor carrying the echo of a forgotten legacy, the Sundered Blade. The fate of time itself rests upon the monumental choice you are yet to make: to reclaim the past or to forge a new future.',
        dialogue: null,
        choices: [
            { text: 'Start New Journey', nextScene: 'S1_Awakening' }
        ]
    },

    'S1_Awakening': {
        image: 'awakening.png', 
        narrative: 'A groan escapes the rubble. Dean slowly regains consciousness, his mind a void. Clutched in his hand is the strange, unadorned Sundered Blade. A skeletal Creature emerges from the ash.',
        dialogue: { character: 'Dean (Internal)', text: '"Where am I? Who... am I? My head is a void."' },
        next: 'S1_2_Creature_Fight'
    },
    'S1_2_Creature_Fight': {
        image: 'creature_fight.png', 
        narrative: 'Dean defeats the grotesque creature instinctively. He is alive, but utterly alone. He surveys the wreckage.',
        dialogue: { character: 'Dean (Internal)', text: '"This world... it screams of death. What happened here?"' },
        choices: [
            { text: 'Search the immediate ruins for anything useful (Scavenge).', nextScene: 'S1_3_Search_Ruins' },
            { text: 'Head straight toward the only visible smoke plume in the distance (Seek Contact).', nextScene: 'S2_Marika_Intro' }
        ]
    },
    'S1_3_Search_Ruins': {
        image: 'awakening_search.png', 
        narrative: 'You find a discarded leather waterskin with a sip of stale water. You notice a cryptic symbol scratched onto the sword\'s hilt, it looks ancient.',
        dialogue: { character: 'Dean (Internal)', text: '"This symbol... it feels like a clue. I need direction."' },
        next: 'S2_Marika_Intro'
    },
    
    'S2_Marika_Intro': {
        image: 'dilapidated_village.png', 
        narrative: 'Dean stumbles into a ruined village and encounters Marika, a grizzled scavenger, who raises a rusty weapon.',
        dialogue: { character: 'Marika', text: '"Drop the blade, stranger. What’s your story?"' },
        choices: [
            { text: 'Lower the sword immediately and explain his amnesia gently.', nextScene: 'S2_2_Marika_Info' },
            { text: 'Maintain a defensive posture and demand information first.', nextScene: 'S2_2_Marika_Wary' }
        ]
    },
    'S2_2_Marika_Info': {
        image: 'dilapidated_village.png', 
        narrative: 'Marika softens, seeing the confusion in his eyes. She mentions the vanished Swordsmith Clan of time and steel and gives him basic directions north.',
        dialogue: { character: 'Marika', text: '"That blade looks ancient. They vanished overnight after the Sundering. Strange business."' },
        next: 'S3_Discovery_Choice'
    },
    'S2_2_Marika_Wary': {
        image: 'dilapidated_village.png', 
        narrative: 'Marika remains suspicious but gives meager supplies, warning him sharply away from the North, where the old Swordsmith Clan supposedly lived.',
        dialogue: { character: 'Marika', text: '"I don\'t trust you, but I don\'t see a killer. If you head north, you\'ll find trouble."' },
        next: 'S3_Discovery_Choice'
    },

    'S3_Discovery_Choice': {
        image: 'broken_seal_mural.png', 
        narrative: 'Dean knows he needs to investigate the North. He finds a trail leading to a collapsed temple.',
        dialogue: { character: 'Dean (Internal)', text: '"The clan name haunts me. I must find proof of who I was."' },
        choices: [
            { text: 'Enter the temple immediately and search for answers (Risk).', nextScene: 'S3_2_Mural_Vision' },
            { text: 'Circle the ruins first, looking for signs of the clan emblem or recent visitors (Caution).', nextScene: 'S3_2_Search_Mural' }
        ]
    },
    'S3_2_Mural_Vision': {
        image: 'mural_vision.png', 
        narrative: 'Inside, Dean finds a mural matching his sword\'s hilt. The Sundered Blade flares, triggering a vision of fire and a dark shadow.',
        dialogue: { character: 'Dean (Internal)', text: '"This symbol... it\'s the mark of my sword. That vision... destruction."' },
        next: 'S4_Tyrant_Intro'
    },
    'S3_2_Search_Mural': {
        image: 'boots.png', 
        narrative: 'You find a recent boot print near a hidden entrance. Inside, Dean finds the mural. The Sundered Blade flares, triggering a vision of fire and a dark shadow.',
        dialogue: { character: 'Dean (Internal)', text: '"Someone else was here recently. My past is being hunted."' },
        next: 'S4_Tyrant_Intro'
    },

    'S4_Tyrant_Intro': {
        image: 'tyrans_keep.png', 
        narrative: 'The trail leads to the fortress of Lord Valerius. He must be the one who left the boot print, holding a key fragment of memory. Dean finds Marika and other scavengers preparing to attack a supply route.',
        dialogue: { character: 'Marika', text: '"We need that supply run. If you help us, we\'ll draw attention away from the main fortress entrance. Deal?"' },
        choices: [
            { text: 'Agree to help the allies with the supply distraction (Cooperation).', nextScene: 'S4_2_Tyrant_Fragment' },
            { text: 'Refuse, and focus solely on infiltrating the main keep alone for the fragment (Self-Reliance).', nextScene: 'S4_2_Tyrant_Fragment' }
        ]
    },
    'S4_2_Tyrant_Fragment': {
        image: 'past_fragment.png', 
        narrative: 'Dean defeats Lord Valerius and claims a clan relic. Touching it triggers a clear memory: his father\'s face and the warmth of his clan\'s life before the darkness. He now knows he was sent forward in time.',
        dialogue: { character: 'Dean (Internal)', text: '"Father... his face. The memory strengthens me. I am not a ghost. I am Dean."' },
        next: 'S5_Final_Truth'
    },

    'S5_Final_Truth': {
        image: 'time_rift.png', 
        narrative: 'Dean, now joined by Marika and his allies, reaches the Time Rift. The full vision is revealed: The sorceress Lace destroyed his clan to obtain the time secrets. The Sundered Blade is ready to change the past.',
        dialogue: { character: 'Marika', text: '"You can erase this present, Dean. All the people you’ve helped... it just vanishes. What will you do?"' },
        next: 'S6_Council'
    },

    'S6_Council': {
        image: 'choices.png', 
        narrative: 'Dean stands before his friends. The two timelines call to him: the lost echo of his blood, and the living warmth of the friends standing here.',
        dialogue: { character: 'Ally A', text: '"You\'ve changed things, Dean. We found family here. Is that not worth something?"' },
        choices: [
            { text: 'CHOICE A: Embrace the Present. Fight Lace here to heal this world.', nextScene: 'S7A_Present_Fight' },
            { text: 'CHOICE B: Return to the Past. Save his family, erasing this timeline.', nextScene: 'S7B_Past_Fight' }
        ]
    },

    'S7A_Present_Fight': {
        image: 'stronghold.png', 
        narrative: 'Dean chooses the world he knows. He and his allies assault Lace’s stronghold. Lace taunts him about sacrificing his bloodline, but Dean is resolute.',
        dialogue: { character: 'Dean', text: '"My legacy is forged now, in this present, with these people. You won\'t shatter it again!"' },
        next: 'S8A_Present_Ending'
    },

    'S8A_Present_Ending': {
        image: 'legacy_new_beginnings.jpg', 
        narrative: 'Lace is defeated, and her temporal magic unravels, subtly mending the world. Years pass. Dean and his allies guide the reconstruction, the memory of his clan honored and integrated into this new history.',
        dialogue: { character: 'Marika', text: '"Look at this, Dean. You built this. You gave us this future."' },
        ending: 'E1_New_Legacy' 
    },

    'S7B_Past_Fight': {
        image: 'past_fight.png', 
        narrative: 'Dean plunges into the past, arriving in the midst of the destruction. He fights a younger, powerful Lace alone, sacrificing his knowledge of the future for pure, desperate skill.',
        dialogue: { character: 'Lace', text: '"Who are you?! This shouldn\'t be possible! I accounted for everything!"' },
        next: 'S8B_Past_Ending'
    },

    'S8B_Past_Ending': {
        image: 'new_history_forge.jpg', 
        narrative: 'Lace is defeated. The timeline shifts violently, and the world he knew vanishes. Dean is now a master swordsmith in a new, un-shattered history, surrounded by his family.',
        dialogue: { character: "Dean (Internal)", text: '"Sometimes... I feel a strange pull. Like there was another path... But this life is all I know. And it is peaceful."' },
        ending: 'E2_Past_Restored'
    }
};

const endings = {
    'E1_New_Legacy': {
        title: 'Ending: The Hero\'s New Legacy',
        text: 'You chose the Present. Your actions fully healed the deepest wounds of the world. Your legacy is not the past you reclaimed, but the vibrant, thriving future you forged alongside the family you found. The Sundered Blade becomes a symbol of enduring hope.',
        image: 'new_legacy.png'
    },
    'E2_Past_Restored': {
        title: 'Ending: The Cost of Restoration',
        text: 'You chose the Past. You saved your clan, restoring them to a vibrant, un-shattered history. You live a peaceful life, but the powerful connections forged in the dark, and the allies who fought beside you, are gone, existing only as phantom memories.',
        image: 'restore.png'
    }
};

document.addEventListener('DOMContentLoaded', () => {
    updateScene(currentScene);
    hideEmotionDisplay(); 
});