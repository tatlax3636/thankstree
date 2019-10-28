//global variables
var tree = document.getElementsByClassName('tree')[0]
var leaves = []; //array to hold leaf objects for now until DB is created
let leafCount = 0;
var testLeaf = document.getElementsByTagName('img')[1];
var tree = document.getElementById("tree");
var leafContainer = document.getElementById("leaf-container")
var details = document.getElementById("details-content")
var signature = document.getElementById("details-author")
var addButton = document.getElementById("add-leaf");

//form elements
var form = document.getElementsByTagName('form')[0];
var firstName = document.getElementById("first-name");
var lastName = document.getElementById("last-name");
var thankfulInput = document.getElementById("thankful-input");
let min = 35;
let max = 65;

//add event listener to addButton...if tree is displayed, hide it and show form. If not, add tree and leaves
addButton.addEventListener('click', function (e) {
    if (tree.style.display == "none") {
        addLeaf(firstName.value, lastName.value, thankfulInput.value);
        makeRequest();
        hideForm();
        tree.style.display = "block"
    } else {
        tree.style.display = "none"
        showForm();
        clearLeaves();
    }
})

//tree styling
tree.style.height = "70vh";
tree.style.width = "auto";

//hide form to start
hideForm();
makeRequest()


//show form so that a user can add a new leaf
function showForm() {
    form.style.height = "50vh";
    firstName.style.display = "block";
    firstName.focus();
    lastName.style.display = "block";
    thankfulInput.style.display = "block";
    for (let i = 0; i < 3; i++) {
        document.getElementsByClassName("caption")[i].style.display = "block"
    }
    for (let i=0; i<3; i++){
        document.getElementsByClassName("form-row")[i].style.height = "4vw";
    }}

//Change display of all form inputs and captions to "none"
function hideForm() {
    form.style.height = "10vh";
    firstName.style.display = "none";
    lastName.style.display = "none";
    thankfulInput.style.display = "none";
    for (let i = 0; i < 3; i++) {
        document.getElementsByClassName("caption")[i].style.display = "none"
    }
    for (let i=0; i<3; i++){
        document.getElementsByClassName("form-row")[i].style.height = "0%";
    }
}


function addLeaf(first, last, thanks) {
    let date = new Date();
    let newLeaf = { "author": first, "content": thanks};
    let xLoc = (Math.floor(Math.random() * (max - min + 1)) + min);
    let yLoc = (Math.floor(Math.random() * (max - min + 1)) + min)
    //, "month": date.getMonth(), "day": date.getDay(), "id": leafCount
    fetch('http://localhost:3000/leaves', {
        headers: {"Content-Type": "application/json; charset=utf-8"},
        method: 'POST',
        body: JSON.stringify({
            author: newLeaf.author,
            content: newLeaf.content,
            x_location: xLoc,
            y_location: yLoc
            
        })
    })
    thankfulInput.value = "";
    firstName.value = "";
    lastName.value = "";
    leafCount++;

}


function styleLeafImg(newLeafImg, location) {
    newLeafImg.classList.add("leaf-image")
    newLeafImg.style.position = "absolute";
    newLeafImg.setAttribute("src", "images/orangeLeaf.png")
    newLeafImg.style.left = location[0] + "%";
    newLeafImg.style.top = location[1] + "%";

}

function addLeaves() {
    for (let i = 0; i < leaves.length; i++) {
        let newLeafImg = document.createElement('img');
        newLeafImg.id = leaves[i].id;
        document.getElementById('leaf-container').append(newLeafImg);
        styleLeafImg(newLeafImg, [leaves[i].x_location, leaves[i].y_location]);
        addLeafListener(newLeafImg, i);
        if(i==leaves.length-1){
            console.log("in one")
            newLeafImg.setAttribute('src', 'images/yellowLeaf.png')
        }
        
    }

}
function clearLeaves() {
    leafContainer.innerHTML = "";
}

function addLeafListener(leaf, id) {
    leaf.addEventListener("click", function (e) {
        showDetails(id);
    })
}

function showDetails(id) {
    addButton.style.display = "none";

    details.innerText = leaves[id].content + "\n" + "-" + leaves[id].author;
    //signature.innerText = leaves[id].author;
    details.classList.add("details");
    details.addEventListener('click', function (e) {
        details.classList.remove("details");
        hideDetails();
    })
}

function hideDetails() {
    details.innerHTML = "";
    signature.innerText = "";
    addButton.style.display = "block";
}



var httpRequest;
//addButton.addEventListener('click', makeRequest);

function makeRequest() {
    httpRequest = new XMLHttpRequest();


    httpRequest.onreadystatechange = getLeaves;
    //httpRequest.onreadystatechange = addLeaves;
    httpRequest.open('GET', 'http://localhost:3000/leaves');
    httpRequest.send();
}

function getLeaves() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
            leaves = [];
            let response = JSON.parse(httpRequest.responseText)
            for(let i=0; i<response.length; i++){
                leaves.push(response[i])
            }
            addLeaves();
        } else {
            alert('There was a problem with the request.');
        }
    }
}



//////////NEXT STEPS///////////
//Style about page
//Show first name in cursive w/ message
//Make delete all method.
//Make sure text stays in leaf
//highlight most recently created leaf



////////////////////////////////////STRETCH GOALS/////////////////////////
//Dropdown to isolate by name, have leaves highlight
//Figure out how to store online
//Make random leaves page
