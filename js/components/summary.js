import { notesStore, calculateSummary } from "../helpers.js";
import { CATEGORIES } from "../config.js";

export const renderSummary = (notes, root = document.querySelector('.summary tbody')) => {
    // Remove old summary before rendering new
    if (document.querySelector('.summary tbody tr')) {
        document.querySelectorAll('.summary tbody tr').forEach(tr => tr.remove());
    }

    // Calculating summary
    const summary = calculateSummary(notes);

    for (const category in CATEGORIES) {
        const component = `
        <tr>
            <td class="icon-cell">
              <span class="icon ${CATEGORIES[category].selector}"><i class="${CATEGORIES[category].icon}"></i></span>
            </td>
            <th class="name">${CATEGORIES[category].name}</th>
            <td class="active">${summary[CATEGORIES[category].selector].active}</td>
            <td class="archived">${summary[CATEGORIES[category].selector].archived}</td>
          </tr>
        `
        root.insertAdjacentHTML("afterbegin", component);
    }
}; 