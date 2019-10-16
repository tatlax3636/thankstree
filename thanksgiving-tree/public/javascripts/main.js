//global variables
var tree = document.getElementsByClassName('tree')[0]
var leaves = []; //array to hold leaf objects for now until DB is created
let leafCount = 0;
var testLeaf = document.getElementsByTagName('img')[1];
var tree = document.getElementById("tree");
var leafContainer = document.getElementById("leaf-container")
var details = document.getElementsByClassName("details-container")[0];
var addButton = document.getElementById("add-leaf");
var firstName=document.getElementById("first-name");
var lastName= document.getElementById("last-name");
var thankfulInput= document.getElementById("thankful-input");
let min = 35;
let max = 65;

//add event listener to addButton...if tree is displayed, hide it and show form. If not, add tree and leaves
addButton.addEventListener('click', function(e){
    if(tree.style.display == "none"){
        addLeaf(firstName.value, lastName.value, thankfulInput.value);
        hideForm();
        tree.style.display = "block"
        addLeaves();
    }else{
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

//show form so that a user can add a new leaf
function showForm(){
    firstName.style.display = "block";
    firstName.focus();
    lastName.style.display = "block";
    thankfulInput.style.display = "block";
    for(let i=0; i<3; i++){
        document.getElementsByClassName("caption")[i].style.display = "block"
    }
    document.getElementsByTagName("form")[0].style.height = "30vw";    
}

//Change display of all form inputs and captions to "none"
function hideForm(){
    firstName.style.display = "none";
    lastName.style.display = "none";
    thankfulInput.style.display = "none";
    for(let i=0; i<3; i++){
        document.getElementsByClassName("caption")[i].style.display = "none"
    }
    document.getElementsByTagName("form")[0].style.height = "0%";   
}


function addLeaf(first, last, thanks) {
    let date = new Date();
    let newLeaf = { "first": first, "last": last, "thanks": thanks, "month": date.getMonth(), "day": date.getDay(), "id": leafCount};
    leaves.push(newLeaf);
    console.log(leaves);
    thankfulInput.value = "";
    firstName.value = "";
    lastName.value = "";
    leafCount++;

}


function styleLeafImg(newLeafImg){
    newLeafImg.classList.add("leaf-image")
    newLeafImg.style.position = "absolute";
    newLeafImg.setAttribute("src","images/orangeLeaf.png")
    newLeafImg.style.left = (Math.floor(Math.random() * (max - min + 1)) + min) + "%";
    newLeafImg.style.top = (Math.floor(Math.random() * (max - min + 1)) + min) + "%";
    
}

function addLeaves(){
    for(let i=0; i<leaves.length; i++){
        let newLeafImg = document.createElement('img');
        document.getElementById('leaf-container').append(newLeafImg);
        styleLeafImg(newLeafImg);
        console.log(leaves[i].id);
        addLeafListener(newLeafImg, i);
    }
    
}
function clearLeaves(){
    leafContainer.innerHTML = "";
}

function addLeafListener(leaf, id){
    leaf.addEventListener("click",function(e){
       showDetails(id);
    })
}

function showDetails(id){
    addButton.style.display = "none";

    details.innerText = leaves[id].thanks;
    details.classList.add("details");
    details.addEventListener('click', function(e){
        details.classList.remove("details");
        hideDetails();
    })
}

function hideDetails(){
    details.innerHTML = "";
    addButton.style.display = "block";
}

//Add a large div with leaf background that shows the thankful message and the first name in cursive
//Attach the position to the leaf permanently
//Dropdown to isolate by name, have leaves highlight
//Figure out how to store online
//Make random leaves page
//Make about page
//Download git and make repo