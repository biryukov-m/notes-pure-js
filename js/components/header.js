import { togglePopup } from "./popup.js";
import { renderNotes } from "./notes.js";
import { notesStore } from "../helpers.js";


export const showArchiveHandler = (event) => {
    const isShowArchive = event.currentTarget.toggled_show_archive;
    renderHeader(isShowArchive);
    const notes = notesStore();
    renderNotes(notes, isShowArchive);
};


export const showError = (text) => {
    document.querySelector('section.notes-list header h2').innerHTML = text;
    document.querySelector('section.notes-list header h2').classList.add('error');
}


export const renderHeader = (isShowArchive = false) => {

    if (document.querySelector('section.notes-list header')) {
        document.querySelector('section.notes-list header').remove();
    }

    const headerText = isShowArchive ? "Archivated notes" : "List"
    const archiveBtnText = isShowArchive ? "Show unarchived notes" : "Show archived notes";
    const icon = isShowArchive ? `<i class="fa-solid fa-note-sticky"></i>` : `<i class="fa-solid fa-box-archive"></i>`;

    const component = `
        <header>
            <h2>${headerText}</h2>
            <div class="top-controls">
            <div class="control add-note">
                <i>+</i>
                <span>Add new note</span>
            </div>
            <div class="control show-archive">
                ${icon}
                <span>${archiveBtnText}</span>
            </div>
            </div>
        </header>
    `
    document.querySelector("section.notes-list").insertAdjacentHTML("afterbegin", component);


    const addNote = document.querySelector('.control.add-note i');
    addNote.addEventListener("click", togglePopup);


    const showArchived = document.querySelector('.control.show-archive i');
    showArchived.addEventListener("click", showArchiveHandler);
    showArchived.toggled_show_archive = !isShowArchive;
};