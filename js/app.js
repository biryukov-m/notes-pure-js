import { INITIAL_NOTES } from "./config.js";
import { notesStore } from "./helpers.js";
import { renderNotes } from "./components/notes.js";
import { renderPopup } from "./components/popup.js";
import { renderSummary } from "./components/summary.js";
import { renderHeader } from "./components/header.js";


const notes = notesStore() ? notesStore() : notesStore(INITIAL_NOTES);


renderNotes(notes);
renderPopup();
renderSummary(notes);
renderHeader();