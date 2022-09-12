const CATEGORIES = {
    task: { name: "Task", selector: "task", icon: "fa-solid fa-list-check" },
    random: { name: "Random thought", selector: "random", icon: 'fa-solid fa-comment-dots' },
    idea: { name: "Idea", selector: "idea", icon: 'fa-solid fa-lightbulb' }
}

const INITIAL_NOTES = [
    {
        date: 'April 2, 2021',
        title: 'Invention idea',
        text: 'If i can find out how to do that thing',
        category: CATEGORIES.idea,
        dates: "",
        archived: false
    },
    {
        date: 'April 5, 2021',
        title: 'The theory of evolution',
        text: 'What if dinosaurs was',
        category: CATEGORIES.random,
        dates: "12/20/2012, 01/01/2022",
        archived: false
    },
    {
        date: 'April 7, 2021',
        title: 'Shopping list',
        text: 'Tomatoes, bread',
        category: CATEGORIES.task,
        dates: "12/20/2012",
        archived: false
    },
    {
        date: 'April 7, 2021',
        title: 'Invention idea',
        text: 'If i can find out how to do that thing',
        category: CATEGORIES.idea,
        dates: "",
        archived: false
    },
    {
        date: 'April 9, 2021',
        title: 'The theory of evolution',
        text: 'What if dinosaurs was',
        category: CATEGORIES.random,
        dates: "12/20/2012, 01/01/2022",
        archived: false
    },
    {
        date: 'April 20, 2021',
        title: 'Shopping list',
        text: 'Tomatoes, bread',
        category: CATEGORIES.task,
        dates: "12/20/2012",
        archived: false
    },
];

const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"];

export { INITIAL_NOTES, CATEGORIES, MONTHS }