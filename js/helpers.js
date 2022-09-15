import { MONTHS, CATEGORIES } from "./config.js";


export const getDate = () => {
    const
        dateObj = new Date(),
        month = MONTHS[dateObj.getMonth()],
        day = dateObj.getDate(),
        year = dateObj.getFullYear();

    return { month, day, year };
};


export const parseDates = (text) => {
    const regEx = /((?<!\d)(0?[1-9]|1[0-2])[\/\.-](0?[1-9]|[12]\d|3[01])[\/\.-]([12]\d{3}|[12]\d))(?!\d)/g;
    let result = text.match(regEx);
    result = result ? result = result.join(', ') : '';
    return result;
}


export const notesStore = (notesArr) => {

    if (notesArr) {
        localStorage.setItem("notes_store_fix", JSON.stringify(notesArr));
        return notesStore();
    }

    return JSON.parse(localStorage.getItem("notes_store_fix"));
};


export const toggleArchivateNote = (index) => {
    const notes = [...notesStore()];

    notes[index].archived = !notes[index].archived

    return notesStore(notes);
};


export const deleteNote = (index) => {
    const notes = [...notesStore()];

    notes.splice(index, 1);

    return notesStore(notes);
};


export const addNote = (note) => {
    const notes = [...notesStore()];

    return notesStore([...notes, note]);
};


export const updateNote = (note, updateId) => {
    const notes = [...notesStore()];
    notes[updateId] = note;

    return notesStore(notes);
};


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
};