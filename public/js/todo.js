const form = document.querySelector("form");
const submitBtn = document.querySelector("#submit-btn");
const file = document.querySelector("#add-file");
const taskName = document.querySelector("#task-name");
const taskList = document.querySelector(".task-list");

function createNewTask(data)
{
    const div = document.createElement("div");
    const html = 
    `<span class="hidden">${taskList.children.length}</span>
    <h3>${data.taskName}</h3>
    <input type="checkbox" name="complete" class="complete-btn">
    <img src= /upload/${data.url} alt="image" height="40px">
    <button class="delete-btn hidden">Delete</button>
    `
    div.innerHTML = html;
    div.setAttribute("class","task");
    taskList.append(div);
}

function addNewTask(e)
{
    e.preventDefault();
    const formdata = new FormData(form);
                
    fetch('upload', {
    method: 'POST',
    body: formdata
    })
    .then(response => {
    if (response.ok) {
        return response.json();
    } else {
        throw new Error('File upload failed');
    }
    })
    .then(data => {
    createNewTask(data.data)
    })
    .catch(error => {
    alert(`Error ${error}`);
    })
    .finally(() => 
    {
        file.value='';
        taskName.value='';

    })
}

function completeTask(parentElement){
    let i=parentElement.children[0].textContent;
    const body = {index: i};
    fetch("/task", 
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "put",
        body: JSON.stringify(body)
    })
    .then((response) =>
    {
        if(response.ok){    
            parentElement.children[1].classList.toggle("task-done")
            parentElement.children[4].classList.toggle("hidden")
        }
    })
    .catch((err) => console.log(err));
}

submitBtn.addEventListener("click", addNewTask)

taskList.addEventListener("click", function(e)
{
    if(e.target.className==="delete-btn"){
        let i=e.target.parentElement.children[0].textContent;
        const body = {index: i};
        fetch("/task", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "delete",
            body: JSON.stringify(body)
        }).then((response) => {
            if(response.ok){
                e.target.parentElement.remove();
                for(;i<taskList.children.length;i++){
                    console.log(i);
                    taskList.children[i].children[0].textContent=i;
                }
            }
            else
                response.json();
        })
        .catch((err) => console.log(err));
    }
    else if(e.target.className==="complete-btn")
        completeTask(e.target.parentElement);
})

