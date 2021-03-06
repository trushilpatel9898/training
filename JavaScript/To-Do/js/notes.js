function renderNotes(showSelected, searchText) {
  let notesDiv = document.querySelector("#showNotes")
  let Notes = getNotes()
  let children = []

  if (showSelected === false) {
    Notes = Notes.filter(function (note) {
      return !note.complete;
    })
  }

  if (searchText) {
    searchText = searchText.trim();
    Notes = Notes.filter(function (note) {
      return note.text.toLowerCase().includes(searchText.toLowerCase())
    })
  }

  console.log("Final Notes :" )
  console.log(Notes)

  for (let note of Notes) {
    children.push(getNoteHTML(note));
  }

  notesDiv.innerHTML = children.join(' ');
}


function getNoteHTML(note) {

  if (!note) note = {};
  if (!note.id) note.id = " ";
  if (!note.text) note.text = "No text is available";

  let color = ["bg-primary", "bg-success", "bg-warning", "bg-dark"]
  let checkBoxStyle = ["fa-square-o", "fa-check-square-o"]
  let selectedColor = note.complete ? color[3] : color[Math.round(Math.random() * (2))];

  let card = `<div class="card text-center shadow">
    <div id=${'noteHeader-' + note.id} class="card-header py-3 form-inline  text-white ${selectedColor} ">
      <div class="form-group form-inline">
      <label class="lead mx-3 px-2" style="transform: scale(1.2)">${note.date}</label>
    </div>
    <div class="form-group ml-auto px-4">
    <button class="float-right text-white   bg-transparent border-0" onClick="completedNote(${note.id})">
      <i class="fa ${checkBoxStyle[Number(note.complete)]} " style="transform: scale(3);"></i>
    </button>
  </div>
  <div class="form-group px-4">
          <button class="float-right text-danger bg-transparent border-0" onClick="deleteNote(${note.id})">
            <i class="fa fa-trash " style="transform: scale(3);"></i>
          </button>
        </div>
      </div>
      <div class="card-body">
        <h3 class="lead note-text">${note.text}
  </div>
      </div>`

  return card;
}
renderNotes();