function getTaskData()
{
    let taskData = localStorage.getItem('taskData');

    if (taskData == null)
    {
        return [];
    }

    return JSON.parse(taskData);
}

function addTask(item)
{
    let itemArray = getTaskData();    
    if (!itemArray.includes(item))
    {
        itemArray.push(item);
    }
    console.log("ITEM ARRAY UPDATE", itemArray);
        
    localStorage.setItem('taskData', JSON.stringify(itemArray));
}

function removeTask(item)
{
    let taskData = getTaskData();
    let itemIndex = taskData.indexOf(item);
    taskData.splice(itemIndex, 1);
    localStorage.setItem('taskData', JSON.stringify(taskData));
}

export { getTaskData, addTask, removeTask };