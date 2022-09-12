import { MONTHS, CATEGORIES } from "./config.js";

export const getDate = () => {
    const
        dateObj = new Date(),
        month = MONTHS[dateObj.getMonth()],
        day = dateObj.getDate(),
        year = dateObj.getFullYear();

    return { month, day, year };
}

export const notesStore = (notesArr) => {
    // Setter: set notesArr to local storage and return new storage
    if (notesArr) {
        localStorage.setItem("notes", JSON.stringify(notesArr));
        return notesStore();
    }
    // Getter: if no arguments sent returns notes from local storage
    return JSON.parse(localStorage.getItem("notes"));
}

export const deleteNote = (index) => {
    const notes = [...notesStore()];
    // Deleting note from[]
    notes.splice(index, 1);
    // Updating local storage of notes with new notes list
    return notesStore(notes);
}

export const addNote = (note) => {
    const notes = [...notesStore()];
    // Updates notes to storage with new note
    return notesStore([...notes, note]);
}

export const updateNote = (note, updateId) => {
    const notes = [...notesStore()];
    notes[updateId] = note;
    // Updates notes to storage with new note
    return notesStore(notes);
}


export const calculateSummary = (notes) => {
    let summary = {};

    for (const category in CATEGORIES) {
        summary[category] = { active: 0, archived: 0 };
    }

    notes.map(note => {
        if (note.archived) {
            summary[note.category.selector].archived += 1;
        }
        else {
            summary[note.category.selector].active += 1;
        }

    });

    return summary;
}