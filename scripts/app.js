import { addTask, getTaskData, removeTask } from "./localstorage.js";

const btnAddTask = document.getElementById("btnAddTask");
const modalAddTask = document.getElementById("modalAddTask");
const btnModalClose = document.getElementById("btnModalClose");
const btnModalClose2 = document.getElementById("btnModalClose2");
const btnModalConfirm = document.getElementById("btnModalConfirm");
const taskList = document.getElementById("taskList");
const taskToDo = document.getElementById("taskToDo");
const taskProgress = document.getElementById("taskProgress");
const taskDone = document.getElementById("taskDone");
const nameInput = document.getElementById("nameInput");
const descInput = document.getElementById("descInput");
const priorityType = document.getElementById("priorityType");
const dateInput = document.getElementById("default-datepicker");

const modalEditTask = document.getElementById("modalEditTask");
const btnModalClose3 = document.getElementById("btnModalClose3");
const nameInputEdit = document.getElementById("nameInputEdit");
const descInputEdit = document.getElementById("descInputEdit");
const priorityTypeEdit = document.getElementById("priorityTypeEdit");
const dateInputEdit = document.getElementById("edit-datepicker");
const btnModalConfirm2 = document.getElementById("btnModalConfirm2");
const btnModalClose4 = document.getElementById("btnModalClose4");
const btnModalDelete = document.getElementById("btnModalDelete");

// localStorage.clear("taskData")

btnAddTask.addEventListener('click', () => {
    modalAddTask.classList.add("block");
    modalAddTask.classList.remove("hidden");

    nameInput.value = "";
    descInput.value = "";
    priorityType.value = "";
    dateInput.value = "";
});

btnModalClose.addEventListener('click', () => {
    modalAddTask.classList.add("hidden");
    modalAddTask.classList.remove("block");
});

btnModalClose2.addEventListener('click', () => {
    modalAddTask.classList.add("hidden");
    modalAddTask.classList.remove("block");
});

btnModalClose3.addEventListener('click', () => {
    modalEditTask.classList.add("hidden");
    modalEditTask.classList.remove("block");
});

btnModalClose4.addEventListener('click', () => {
    modalEditTask.classList.add("hidden");
    modalEditTask.classList.remove("block");
});

btnModalConfirm.addEventListener('click', async () => {
    if (nameInput.value != "" && descInput.value != "" && priorityType.value != "" && dateInput.value != "")
    {
        let taskData = [await getTaskData().length, nameInput.value, descInput.value, priorityType.value, dateInput.value, "todo"];
        console.log(taskData)
        addTask(taskData);
        console.log(getTaskData());
        modalAddTask.classList.add("hidden");
        modalAddTask.classList.remove("block");
        displayData();
    } else {
        btnModalConfirm.classList.remove("bg-blue-600")
        btnModalConfirm.classList.add("shake", "bg-red-500", "hover:bg-red-600");
        setTimeout(() => {
            btnModalConfirm.classList.remove("shake", "bg-red-500", "hover:bg-red-600");
            btnModalConfirm.classList.add("bg-blue-600");
        }, 500);
    }
});

async function displayData()
{
    taskToDo.innerHTML = "";
    taskProgress.innerHTML = "";
    taskDone.innerHTML = "";
    let taskData = await getTaskData();
    // console.clear();
    console.log("DATA REFRESH:\n",taskData)
    
    
    taskData.map(index => {
        console.log(index);
        let taskCard = document.createElement("div");
        taskCard.classList = `w-auto p-6 border-gray-300 border-2 bg-slate-800 ${index[5] == "todo" ? "col-start-1" : index[5] == "progress" ? "col-start-2" : index[5] == "done" ? "col-start-3" : "hidden"}`

        taskCard.innerHTML = `  
            <a>
                <h5 class="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">${index[1]}</h5>
            </a>
            <p class="mb-3 font-normal text-3xl text-gray-400">${index[2]}</p>
            <p class="mb-3 font-bold text-2xl ${index[3] == "lw" ? "text-green-400" : index[3] == "md" ? "text-yellow-400" : index[3] == "hi" ? "text-red-400" : "text-purple-400"}">${index[3] == "lw" ? "Low Priority" : index[3] == "md" ? "Medium Priority" : index[3] == "hi" ? "High Priority" : "Priority Unknown"}</p>
            <p class="font-extrabold text-2xl text-gray-300 pb-5"> Due Date: ${index[4]}</p>
        `
        let btnEdit = document.createElement("button");
        btnEdit.innerHTML = `<a href="#" class="inline-flex items-center mb-4 px-3 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-s-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">Edit Task</a>`
        let btnToDo = document.createElement("button");
        btnToDo.innerHTML = `<a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300">Mark As "To Do"</a>`
        let btnProgress = document.createElement("button");
        btnProgress.innerHTML = `<a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-yellow-600 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-blue-300">Mark As "In Progress"</a> `
        let btnDone = document.createElement("button");
        btnDone.innerHTML = `<a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-600 rounded-e-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300">Mark As "Done"</a> `;

        btnEdit.addEventListener('click', () => {
            modalEditTask.classList.add("block");
            modalEditTask.classList.remove("hidden");

            nameInputEdit.value = index[1];
            descInputEdit.value = index[2];
            priorityTypeEdit.value = index[3];
            dateInputEdit.value = index[4];

            btnModalConfirm2.addEventListener('click', async () => {
                if (nameInputEdit.value != "" && descInputEdit.value != "" && priorityTypeEdit.value != "" && dateInputEdit.value != "")
                {
                    let tempData = [await getTaskData().length, nameInputEdit.value, descInputEdit.value, priorityTypeEdit.value, dateInputEdit.value, index[5]];
                    removeTask(index);
                    console.log(tempData)
                    addTask(tempData);
                    console.log(getTaskData());
                    modalEditTask.classList.add("hidden");
                    modalEditTask.classList.remove("block");
                    displayData();
                } else {
                    btnModalConfirm2.classList.remove("bg-blue-600")
                    btnModalConfirm2.classList.add("shake", "bg-red-500", "hover:bg-red-600");
                    setTimeout(() => {
                        btnModalConfirm2.classList.remove("shake", "bg-red-500", "hover:bg-red-600");
                        btnModalConfirm2.classList.add("bg-blue-600");
                    }, 500);
                }
            });

            btnModalDelete.addEventListener('click', async () => {
                removeTask(index);
                modalEditTask.classList.add("hidden");
                modalEditTask.classList.remove("block");
                displayData();
            });
        })

        // localStorage.clear()

        btnToDo.addEventListener('click', () => {
            let tempData = index;
            removeTask(index[0]);
            tempData[5] = "todo";
            addTask(tempData);
            displayData();
        });

        btnProgress.addEventListener('click', () => {
            let tempData = index;
            removeTask(index[0]);
            tempData[5] = "progress";
            addTask(tempData);
            displayData();
            
        });

        btnDone.addEventListener('click', () => {
            let tempData = index;
            removeTask(index[0]);
            tempData[5] = "done";
            addTask(tempData);
            displayData();
            
        });

        if(index[5] == "todo")
        {
            taskToDo.append(taskCard);
        }
        if(index[5] == "progress")
        {
            taskProgress.append(taskCard);
        }
        if(index[5] == "done")
        {
            taskDone.append(taskCard);
        }

        taskCard.append(btnEdit);
        taskCard.append(btnToDo);
        taskCard.append(btnProgress);
        taskCard.append(btnDone);
    })


}

displayData();