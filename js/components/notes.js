import { deleteNote, toggleArchivateNote } from "../helpers.js";
import { renderPopup, togglePopup } from "./popup.js";
import { renderSummary } from "./summary.js";
import { showError } from "./header.js";


const deleteNoteHandler = (event) => {
  let confirmDel = confirm("Are you sure you want to delete note?");
  if (!confirmDel) return;

  try {
    const index = event.currentTarget.note_id;
    const newNotes = deleteNote(index);
    renderNotes(newNotes);
    renderSummary(newNotes);
  } catch (error) {
    showError('Something went wrong while deleting');
  }

}


const editNoteHandler = (event) => {
  const index = event.currentTarget.note_id;
  renderPopup(index, true);
  togglePopup();
}


const archivateNoteHandler = (event) => {
  showError('Something went wrong while archivating');

  try {
    const index = event.currentTarget.note_id;
    const isRenderToArchived = event.currentTarget.is_show_archivate;
    const newNotes = toggleArchivateNote(index);

    renderNotes(newNotes, isRenderToArchived);
    renderSummary(newNotes);
  } catch (error) {
    showError('Something went wrong while archivating');
  }


};


export const renderNotes = (notes, isShowArchived = false) => {
  // Remove all old notes before rendering new
  if (document.querySelector('.note')) {
    document.querySelectorAll('.note').forEach(note => note.remove());
  }
  notes.forEach((note, index) => {

    const hide = note.archived == isShowArchived ? '' : 'hide';
    const archiveIcon = note.archived ?
      `<i class="fa-solid fa-file-arrow-up"></i>` : `<i class="fa-solid fa-file-arrow-down"></i>`;

    const component = `
        <tr class="note ${hide}" id="note-${index}">
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
              <span class="icon archivate">${archiveIcon}</span>
              <span class="icon delete"><i class="fa-solid fa-trash"></i></span>
              </div>
            </td>
          </tr>
        `

    // Render to html
    document.querySelector('.notes-list tbody').insertAdjacentHTML("afterbegin", component);

    // Add listeners
    const noteSelector = document.querySelector(`#note-${index}`);
    // Add listener to delete button
    noteSelector.querySelector(`.delete`).addEventListener("click", deleteNoteHandler);
    noteSelector.querySelector(`.delete`).note_id = index;
    // Add listener to edit button
    noteSelector.querySelector(`.edit`).addEventListener("click", editNoteHandler);
    noteSelector.querySelector(`.edit`).note_id = index;
    // Add listener to archivate button
    noteSelector.querySelector(`.archivate`).addEventListener("click", archivateNoteHandler);
    noteSelector.querySelector(`.archivate`).note_id = index;
    noteSelector.querySelector(`.archivate`).is_show_archivate = isShowArchived;
  });
}; 