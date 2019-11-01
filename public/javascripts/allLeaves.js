//global variables
var httpRequest;
let dropdown = document.getElementsByClassName('user-select')[0];
let leavesDisplay = document.getElementsByClassName('all-leaves-container')[0];
let users = [];
let leaves = [];
let selectedLeaves = [];
function makeRequest() {
    httpRequest = new XMLHttpRequest();


    httpRequest.onreadystatechange = getLeaves;
    //httpRequest.onreadystatechange = addLeaves;
    httpRequest.open('GET', 'http://localhost:3000/leaves');
    httpRequest.send();
}


//get leaves to populate page


//event Listeners
dropdown.addEventListener('change', function (e) {
    getSelectedLeaves(dropdown.value)
})

document.addEventListener('DOMContentLoaded', function (e) {
    makeRequest();
    getLeaves();
    
})

function populateDropdown() {
    let defaultOption = document.createElement('option');
    dropdown.append(defaultOption);
    defaultOption.innerText = "All users";
    defaultOption.value = "all";
    defaultOption.selected = true;

    for (let i = 0; i < leaves.length; i++) {
        author = leaves[i].author;
        if (users.includes(author)) {

        } else {
            users.push(author);
            let newOption = document.createElement('option')
            dropdown.append(newOption);
            newOption.value = author;
            newOption.innerText = author;
        }

    }
}

function getSelectedLeaves(value) {
    console.log("ran")
    console.log(value)
    leavesDisplay.innerHTML = "";
    for (let i = 0; i < leaves.length; i++) {
        author = leaves[i].author;
        if (author == value || value == "all") {
            let newLeafDisplay = document.createElement('div');
            newLeafDisplay.classList.add('selectedLeaf');
            newLeafDisplay.innerText = leaves[i].content + "\n" + "-" + leaves[i].author;
            leavesDisplay.append(newLeafDisplay)
        }
    }

}

function getLeaves() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
            leaves = [];
            let response = JSON.parse(httpRequest.responseText)
            for (let i = 0; i < response.length; i++) {
                leaves.push(response[i])
            }
            console.log(leaves);
            populateDropdown();
            getSelectedLeaves("all");
        } else {
            alert('There was a problem with the request.');
        }
    }
}


