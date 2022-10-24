console.log('welcome to notesapp');
showNotes();//used to show the info stored in local storage in assigned div

//if user adds a note , add it to a local storage
let addbtn = document.getElementById('addbtn')
addbtn.addEventListener('click', function(){

    //inserting text to local storage
    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("addTitle");
    let notes = localStorage.getItem("notes")
    if (notes == null) {
        notesobj = [];
    }
    else{
        notesobj = JSON.parse(notes)
    }
    let myobj = {
        title:addTitle.value,
        text:addTxt.value
    }
    notesobj.push(myobj);
    //updating notes
    localStorage.setItem("notes", JSON.stringify(notesobj));
    addTxt.value = "";
    addTitle.value = "";
  //  console.log(notesobj);
    showNotes();//It is  used to display the localstorage text in to webpage.
});

//Function to show notes in div, id or class from local storage.
function showNotes(){
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesobj = [];
    }
    else{
        notesobj = JSON.parse(notes)
    }
    let html = "";
    notesobj.forEach(function(element, index){
        //appending notes into html
        html +=`        
        <div class="note card my-2 mx-2 card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${element.title}</h5>
          <p class="card-text">${element.text}</p>
          <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
      </div>`;
    });

    // insert note into html
    let notesElm = document.getElementById('notes');
    if (notesobj.length != 0){
        notesElm.innerHTML = html;
    } 
    else{
        notesElm.innerHTML = `Nothing to show! Use "Add a Note" button to add a notes.`
    }
}

//function for delete note
function deleteNote(index){
      console.log("deleting", index);
      let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesobj = [];
    }
    else{
        notesobj = JSON.parse(notes)
    }
    //updating notes
    notesobj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesobj));
    showNotes();
}

let search = document.getElementById('searchTxt');
search.addEventListener('input', function(){

    let inputVal = search.value.toLowerCase();
    console.log('Input event fired', inputVal);
    let noteCards = document.getElementsByClassName('note');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else{
            element.style.display= "none";
        }
         // console.log(cardTxt);
    }) 
})