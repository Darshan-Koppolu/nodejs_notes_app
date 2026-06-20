const API_URL = "http://localhost:5000";

const form = document.getElementById("noteForm");
const notesDiv = document.getElementById("notes");

async function loadNotes() {
  const response = await fetch(`${API_URL}/notes`);
  const notes = await response.json();

  notesDiv.innerHTML = "";

  notes.forEach((note) => {
    const div = document.createElement("div");
    div.className = "note";

    div.innerHTML = `
      <h3>${note.title}</h3>
      <p>${note.content || ""}</p>
      <div class="actions">
        <button class="delete" onclick="deleteNote(${note.id})">
          Delete
        </button>
      </div>
    `;

    notesDiv.appendChild(div);
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  await fetch(`${API_URL}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title, content })
  });

  form.reset();
  loadNotes();
});

async function deleteNote(id) {
  await fetch(`${API_URL}/notes/${id}`, {
    method: "DELETE"
  });

  loadNotes();
}

loadNotes();
