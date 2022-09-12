import { INITIAL_NOTES } from "./config.js";
import { notesStore } from "./helpers.js";
import { renderNotes } from "./components/notes.js";
import { renderPopup } from "./components/popup.js";
import { renderSummary } from "./components/summary.js";
import { renderHeader } from "./components/header.js";

// Checks if notes exists in local storage and set const notes as notesStore 
// value or set initial_notes values to storage and set them to const notes
const notes = notesStore() ? notesStore() : notesStore(INITIAL_NOTES);

// Renders components
renderNotes(notes);
renderPopup();
renderSummary(notes);
renderHeader();