class Tasks{
    constructor(task, status){
        this.task=task;
        this.status=status;
    }
}


//Elementos del DOM
const taskInput = document.querySelector("#taskInput");
const formulario = document.querySelector("form");
const divInput = document.querySelector(".divInput");
const taskInputCheck = document.createElement("div");


function addTask(taskInputFunct){
    let task = String(taskInputFunct);
    let status = true;
    tasksA.unshift(new Tasks(task, status));
    addLS(tasksA);
}

function showTask(){
    const listado = document.body.querySelector(".taskList");
    listado.innerHTML="";
    tasksA.forEach( i => {
        $('.taskList').append(`<label class="col-12 mt-1 rounded list-group-item  btn-outline-dark efectTask" for="">${i.task}</label>`);
        $(`.efectTask`).slideDown(2000);
     })
}

//ADD LS
function addLS(tasksAO){
    const xToJSON = JSON.stringify(tasksAO);
    localStorage.setItem("task1", xToJSON);
}

const taskLS = localStorage.getItem("task1");

// ARRAY
let tasksA;

if (taskLS === null) {
	tasksA = [];
} else {
	tasksA = JSON.parse(taskLS);
    showTask();
}


//Control de que la tarea cargada no supera 70 caracteres

function checkInput (e) { 
    e.preventDefault();

	if (taskInput.value.length > 70 || taskInput.value.length < 3) {
		taskInput.classList.add('is-invalid');
		taskInput.classList.remove('is-valid');
        taskInputCheck.className="invalid-feedback quitar";
        taskInputCheck.textContent="La tarea no contiene de 3 a 70 caracteres.";
        divInput.appendChild(taskInputCheck); 
	}else {
		taskInput.classList.remove('is-invalid');
		taskInput.classList.add('is-valid');
        taskInputCheck.className="valid-feedback quitar";
        taskInputCheck.textContent="La tarea se agrego correctamente.";
        divInput.appendChild(taskInputCheck);
        addTask(taskInput.value);
        showTask();
	}
}

$('form').submit(checkInput);

$('.taskInputC').focusin(function () { 
    $('.efectTask')
        .animate({ opacity: .2} , "slow")
                .slideUp();
});


$('.taskInputC').focusout(function () { 
    $('.efectTask')
        .slideDown()
                .animate({ opacity: 1} , "slow");
});


function numeroRandom(){
    return Math.floor((Math.random()*(100)));
}

$(document).ready( () => {
    
    const url =`https://jsonplaceholder.typicode.com/posts`;
    $(`.addTasks`).append(`<div class="col-12 col-sm-6 col-md-3 d-flex flex-row justify-content-center alig-items-center"><button class="btn btn-secondary" id="addRandomTaskbtn">Agregar Random Task</button></div>`);

    $("#addRandomTaskbtn").click(()=> { 
        $.ajax({
            type: "GET",
            url: url,
            success: function (response) {
                let takRandom=`${response[numeroRandom()].id} - ${response[numeroRandom()].title}`
                addTask(takRandom);
        showTask();
                
            }
        });
    });

});