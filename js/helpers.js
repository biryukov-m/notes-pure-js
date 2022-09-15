import { MONTHS, CATEGORIES } from "./config.js";

// Returns current date in proper form
export const getDate = () => {
    const
        dateObj = new Date(),
        month = MONTHS[dateObj.getMonth()],
        day = dateObj.getDate(),
        year = dateObj.getFullYear();

    return { month, day, year };
};

// Parse dates from text
export const parseDates = (text) => {
    const regEx = /((?<!\d)(0?[1-9]|1[0-2])[\/\.-](0?[1-9]|[12]\d|3[01])[\/\.-]([12]\d{3}|[12]\d))(?!\d)/g;
    let result = text.match(regEx);
    result = result ? result = result.join(', ') : '';
    return result;
}

// Getter and setter for localstorage  where "notes" stored
export const notesStore = (notesArr) => {
    // Setter: set notesArr to local storage and return new storage
    if (notesArr) {
        localStorage.setItem("notes_store_fix", JSON.stringify(notesArr));
        return notesStore();
    }
    // Getter: if no arguments sent returns notes from local storage
    return JSON.parse(localStorage.getItem("notes_store_fix"));
};

// Toggles note property ".archived" 
export const toggleArchivateNote = (index) => {
    const notes = [...notesStore()];
    // Inverse archived value for note 
    notes[index].archived = !notes[index].archived
    // Updating local storage of notes with new notes list
    return notesStore(notes);
};

// Handles note delete, returns new object without note
export const deleteNote = (index) => {
    const notes = [...notesStore()];
    // Deleting note from[]
    notes.splice(index, 1);
    // Updating local storage of notes with new notes list
    return notesStore(notes);
};

// Handles note add, returns new object with new note
export const addNote = (note) => {
    const notes = [...notesStore()];
    // Updates notes to storage with new note
    return notesStore([...notes, note]);
};

// Handles note update, returns new object with updated note
export const updateNote = (note, updateId) => {
    const notes = [...notesStore()];
    notes[updateId] = note;
    // Updates notes to storage with new note
    return notesStore(notes);
};

// Performs calculating of active/archived note count in each category
// Returns summary object
export const calculateSummary = (notes) => {
    let summary = {};

    // Create object with keys of each category present in global CATEGORIES
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
};