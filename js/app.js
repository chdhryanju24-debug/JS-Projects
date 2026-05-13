const addBtn = document.querySelector("#addBtn");
const main = document.querySelector("#main");
const noteList = document.querySelector("#noteList");

/* ================= DROPDOWN ================= */

function toggleDropdown() {

    const dropdown = document.getElementById("navLinks");

    dropdown.style.display =
        dropdown.style.display === "block"
            ? "none"
            : "block";

}

/* ================= RENDER NOTE TITLES ================= */

function renderNoteTitles() {

    noteList.innerHTML = "";

    const notes = document.querySelectorAll(".note textarea");

    notes.forEach((note, index) => {

        let title = note.value.trim().split("\n")[0];

        // Default title
        if (title === "") {
            title = "Untitled Note";
        }

        const li = document.createElement("li");

        li.innerHTML = `📝 ${title}`;

        // Scroll to note
        li.addEventListener("click", () => {

            document.querySelectorAll(".note")[index]
                .scrollIntoView({
                    behavior: "smooth"
                });

        });

        noteList.appendChild(li);

    });

}

/* ================= ADD NOTE BUTTON ================= */

addBtn.addEventListener("click", () => {

    addNote();

});

/* ================= SAVE NOTES ================= */

function saveNotes() {

    const notes = document.querySelectorAll(".note textarea");

    const data = [];

    notes.forEach((note) => {

        data.push(note.value);

    });

    // Save in SESSION STORAGE
    sessionStorage.setItem(
        "notes",
        JSON.stringify(data)
    );

    renderNoteTitles();

}

/* ================= CREATE NOTE ================= */

function addNote(text = "") {

    const note = document.createElement("div");

    note.classList.add("note");

    note.innerHTML = `
        <div class="tool">
            <i class="save fas fa-save"></i>
            <i class="trash fas fa-trash"></i>
        </div>

        <textarea>${text}</textarea>
    `;

    /* DELETE NOTE */

    note.querySelector(".trash").addEventListener("click", () => {

        const check = confirm(
            "Are you sure you want to delete this note?"
        );

        if (check) {

            note.remove();

            saveNotes();

        }

    });

    /* SAVE NOTE */

    note.querySelector(".save").addEventListener("click", () => {

        saveNotes();

    });

    /* AUTO SAVE */

    note.querySelector("textarea")
        .addEventListener("focusout", () => {

            saveNotes();

        });

    main.appendChild(note);

}

/* ================= LOAD SAVED NOTES ================= */

(() => {

    const savedNotes =
        JSON.parse(sessionStorage.getItem("notes")) || [];

    if (savedNotes.length === 0) {

        addNote();

    } else {

        savedNotes.forEach((note) => {

            addNote(note);

        });

    }

    renderNoteTitles();

})();

