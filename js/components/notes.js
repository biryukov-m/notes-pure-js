import { deleteNote, notesStore } from "../helpers.js";
import { renderPopup, togglePopup } from "./popup.js";
import { renderSummary } from "./summary.js";

const deleteNoteHandler = (event) => {
    let confirmDel = confirm("Are you sure you want to delete note?");
    if (!confirmDel) return;
    const index = event.currentTarget.note_id;
    const newNotes = deleteNote(index);
    renderNotes(newNotes);
    renderSummary(newNotes);
}

const editNoteHandler = (event) => {
    const index = event.currentTarget.note_id;
    renderPopup(index, true);
    togglePopup();
}


export const renderNotes = (notes, root = document.querySelector('.notes-list tbody')) => {
    // Remove all old notes before rendering new
    if (document.querySelector('.note')) {
        document.querySelectorAll('.note').forEach(note => note.remove());
    }

    notes.forEach((note, index) => {
        const component = `
        <tr class="note" id="note-${index}">
            <td class="icon-cell">
              <span class="icon ${note.category.selector}"><i class="${note.category.icon}"></i></span>
            </td>
            <th class="name clip">${note.title}</th>
            <td class="created">${note.date}</td>
            <td class="category">${note.category.name}</td>
            <td class="content clip">${note.text}</td>
            <td class="dates clip">${note.dates}</td>
            <td class="controls">
              <div class="wrapper">
                <span class="icon edit"><i class="fa-solid fa-pen-to-square"></i></span>
                <span class="icon archivate"><i class="fa-solid fa-file-arrow-down"></i></span>
                <span class="icon delete"><i class="fa-solid fa-trash"></i></span>
              </div>
            </td>
          </tr>
        `
        root.insertAdjacentHTML("afterbegin", component);
        document.querySelector(`#note-${index} .delete`).addEventListener("click", deleteNoteHandler);
        document.querySelector(`#note-${index} .delete`).note_id = index;

        document.querySelector(`#note-${index} .edit`).addEventListener("click", editNoteHandler);
        document.querySelector(`#note-${index} .edit`).note_id = index;

    });
}; 