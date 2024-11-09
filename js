// Tab Switching
function openTab(evt, tabName) {
    evt.preventDefault();
    const tabcontent = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    const tablinks = document.getElementsByClassName("tablink");
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.classList.add("active");
}

// Default Open Tab (Welcome Page)
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("welcome").style.display = "block";
});

// Countdown to Event (Calendar + Countdown)
const eventForm = document.getElementById("event-form");
const eventList = document.getElementById("event-list");

eventForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const eventName = document.getElementById("event-name").value;
    const eventDate = new Date(document.getElementById("event-date").value);
    const li = document.createElement("li");

    function updateCountdown() {
        const now = new Date();
        const timeDifference = eventDate.getTime() - now.getTime();
        const daysLeft = Math.ceil(timeDifference / (1000 * 3600 * 24));

        if (daysLeft >= 0) {
            li.textContent = `${eventName} - ${daysLeft} days left`;
        } else {
            li.textContent = `${eventName} - Time's up!`;
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 86400000); // Update daily
    eventList.appendChild(li);
    eventForm.reset();
});

// College List with Edit/Delete functionality
const collegeForm = document.getElementById("college-form");
const collegeList = document.getElementById("college-list-items");
let collegeCounter = 0;

collegeForm.addEventListener("submit", function (e) {
    e.preventDefault();
    collegeCounter++;
    const collegeName = document.getElementById("college-name").value;
    const collegeCategory = document.getElementById("college-category").value;
    const li = document.createElement("li");
    li.classList.add("college-item");

    const span = document.createElement("span");
    span.textContent = `${collegeCounter}. ${collegeName}`;
    li.appendChild(span);
    li.classList.add(collegeCategory); 

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = function () {
        const newName = prompt("Edit college name:", collegeName);
        if (newName) {
            span.textContent = `${collegeCounter}. ${newName}`;
        }
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = function () {
        li.remove();
        updateCollegeNumbers();
    };

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("college-item-buttons");
    buttonContainer.appendChild(editBtn);
    buttonContainer.appendChild(deleteBtn);
    li.appendChild(buttonContainer);

    collegeList.appendChild(li);
    collegeForm.reset();
});

function updateCollegeNumbers() {
    const collegeItems = document.querySelectorAll("#college-list-items li span");
    collegeItems.forEach((item, index) => {
        item.textContent = `${index + 1}. ${item.textContent.split(". ")[1]}`;
    });
}

// Notes Section
const noteForm = document.getElementById("note-form");
const noteList = document.getElementById("note-list");

noteForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const noteText = document.getElementById("note-text").value;
    const li = document.createElement("li");
    const noteSpan = document.createElement("span");
    noteSpan.textContent = noteText;
    li.appendChild(noteSpan);

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = function () {
        const newNote = prompt("Edit note:", noteText);
        if (newNote) {
            noteSpan.textContent = newNote;
        }
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = function () {
        li.remove();
    };

    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    noteList.appendChild(li);
    noteForm.reset();
});

// AI Tool Section
const aiToolForm = document.getElementById("ai-tool-form");
const aiToolList = document.getElementById("ai-tool-list");

aiToolForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const aiToolName = document.getElementById("ai-tool-name").value;

    if (aiToolName) {
        const li = document.createElement("li");
        li.textContent = aiToolName;
        aiToolList.appendChild(li);

        document.getElementById("ai-tool-name").value = '';
    }
});

// Scholarships Section Fix
const scholarshipForm = document.getElementById("scholarship-form");
const scholarshipList = document.getElementById("scholarship-list-items");

scholarshipForm.addEventListener("submit", function (e) {
    e.preventDefault();
    
    const scholarshipName = document.getElementById("scholarship-name").value;
    const scholarshipDate = document.getElementById("scholarship-date").value;
    const scholarshipLink = document.getElementById("scholarship-link").value;
    
    if (scholarshipName && scholarshipDate && scholarshipLink) {
        const li = document.createElement("li");
        
        const link = document.createElement("a");
        link.href = scholarshipLink;
        link.textContent = scholarshipName;
        link.target = "_blank";
        
        li.appendChild(link);
        const dateSpan = document.createElement("span");
        dateSpan.textContent = ` - Due: ${scholarshipDate}`;
        li.appendChild(dateSpan);
        
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = function () {
            li.remove();  
        };
        
        li.appendChild(deleteBtn);
        scholarshipList.appendChild(li);  
        scholarshipForm.reset();
    } else {
        alert("Please fill out all fields before submitting the scholarship.");
    }
});
