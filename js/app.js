import { INITIAL_NOTES } from "./config.js";
import { renderNotes } from "./components/notes.js";
import { togglePopup, renderPopup } from "./components/popup.js";
import { notesStore } from "./helpers.js";
import { renderSummary } from "./components/summary.js";

// Checks if notes exists in local storage and set const notes as notesStore 
// value or set initial_notes values to storage and set them to const notes
const notes = notesStore() ? notesStore() : notesStore(INITIAL_NOTES);

renderNotes(notes);
renderPopup();
renderSummary(notes);

const state = {
    isUpdate: false,
    updateId: ''
}

const headerAddNote = document.querySelector('.control.add-note i');

// Add listeners
headerAddNote.addEventListener("click", togglePopup);



