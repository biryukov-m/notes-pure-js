import { CATEGORIES } from "../config.js";
import { getDate, addNote, updateNote, notesStore, parseDates } from "../helpers.js";
import { showError } from "./header.js";
import { renderNotes } from "./notes.js";
import { renderSummary } from "./summary.js";


export const togglePopup = () => {
    document.querySelector('.popup-wrapper').classList.toggle('show');
};


export const resetPopup = () => document.querySelector(".popup form").reset();


export const getPopupInfo = () => {
    const
        popup = document.querySelector(".popup"),
        title = popup.querySelector(".title input").value,
        text = popup.querySelector(".description textarea").value,
        category = popup.querySelector(".category select").value,
        { month, day, year } = getDate();

    const dates = parseDates(text);
    return {
        title: title,
        text: text,
        date: `${month} ${day}, ${year}`,
        category: CATEGORIES[category],
        dates: dates,
        archived: false
    };
};


export const handleAddBtn = (event) => {
    event.preventDefault();

    try {
        const isUpdate = event.currentTarget.is_update;
        const updateId = event.currentTarget.update_id;
        const newNote = getPopupInfo();
        const newNotes = isUpdate ? updateNote(newNote, updateId) : addNote(newNote);


        resetPopup();
        togglePopup();

        renderNotes(newNotes);
        renderPopup();
        renderSummary(newNotes);
    } catch (error) {
        showError('Something went wrong while adding or updating note')
    }

}


export const handleCloseIcon = () => {
    togglePopup();
    resetPopup();
};


export const renderPopup = (updateId, isUpdate = false) => {

    if (document.querySelector('.popup-wrapper')) {
        document.querySelector('.popup-wrapper').remove();
    }

    const component = `
        <div class="popup-wrapper">
            <div class="popup">
                <div class="content">
                    <header>
                        <p>Add a new note</p>
                        <i>X</i>
                        </header>
                    <form action="#">
                        <div class="row title">
                            <label>Title</label>
                            <input type="text" />
                        </div>
                        <div class="row category">
                            <label>Category</label>
                            <select>
                                <option value="task">Task</option>
                                <option value="idea">Idea</option>
                                <option value="random">Random thought</option>
                            </select>
                        </div>
                        <div class="row description">
                            <label class="">Description</label>
                            <textarea class="details"></textarea>
                        </div>
                        <button>Add Note</button>
                    </form>
                </div>
            </div>
        </div>
        `
    document.querySelector('body').insertAdjacentHTML("afterbegin", component);


    if (isUpdate) {
        const notes = notesStore();
        const note = notes[updateId];
        const
            popup = document.querySelector(".popup"),
            headerTag = popup.querySelector("header p"),
            titleTag = popup.querySelector(".title input"),
            addButton = document.querySelector('.popup form button'),
            textTag = popup.querySelector(".description textarea"),
            categoryTag = popup.querySelector(".category select");

        headerTag.innerText = 'Update a note'
        titleTag.value = note.title;
        textTag.value = note.text;
        categoryTag.value = note.category.selector;
        addButton.innerText = 'Update note';

        addButton.update_id = updateId;
        addButton.is_update = isUpdate;
    }


    const
        addButton = document.querySelector('.popup form button'),
        formCloseIcon = document.querySelector('.popup .content header i');

    formCloseIcon.addEventListener("click", handleCloseIcon);
    addButton.addEventListener("click", handleAddBtn);
}; 