document.addEventListener('DOMContentLoaded', () => {
    let task = document.getElementById('task'); //task container
    let db = null; //database

    if (localStorage.getItem('db') === null) {
        db = {pending:[], completed:[], deleted:[]};
    } else {
        db = loadDB();
        printTask(db, task);
    }

    document.getElementById('add').addEventListener('click', () => {
        let content = document.getElementById('content');
        let priority = document.querySelector('input[name="priority"]:checked');

        if (content.value === '') {
            content.classList.add('is-danger');
            setTimeout(() => {

                content.classList.remove('is-danger');
                content.focus();
            }, 3000);
        } else{
            addTask(db, content.value, priority.value, false);
            printTask(db, task);
            content.value = '';
    
        }
    });
    
    document.getElementById('cleardb').addEventListener('click', () => {
        localStorage.clear();
        location.reload();
    });

    (document.querySelectorAll('.delete') || []).forEach(($delete) => {
        
        $delete.addEventListener('click', () => {
            let index = getIndexById($delete.id, db.pending);
            deleteTask(db, index, task);
        });
    });

    (document.querySelectorAll('.notification .delete') || []).forEach(($delete) => {
        
        $delete.addEventListener('click', () => {
            let index = getIndexById($delete.id, db.pending);
            deleteTask(db, index);
        });
    });

    (document.querySelectorAll('.check') || []).forEach(($complete) => {
        $complete.addEventListener('change', () => {
            let id = $complete.id.split('_')[1];
            let index = getIndexById(id, db.pending);
            completedTask(db, index);
            
        });
    });

   setDate('date');
   console.log(db);
});



function addTask(database, task, priority, status) {
    database.pending.push({id: generateId(), task, priority, status, });
    saveDB(database);
    location.reload();
}


function printTask(database, container) {
    container.innerHTML = '';

    if(database.pending.length > 0){
        database.pending.forEach(el => {
            let div = document.createElement('div');
    
            if(el.priority === 'High')
                div.className = 'notification is-danger is-light m-2';
            else if(el.priority === 'Moderate')
                div.className = 'notification is-warning is-light m-2';
            else 
                div.className = 'notification is-info is-light m-2';
            
            
            div.innerHTML = `<button class="delete" id="${el.id}"></button>
                            <label class="checkbox">
                                <input type="checkbox" class="check" id="check_${el.id}">
                                <span>&nbsp;${el.task}</span>
                            </label>`;
            container.appendChild(div);
        });
    }

    if(database.completed.length > 0){
        database.completed.forEach(el => {
            let div = document.createElement('div');
    
            if(el.priority === 'High')
                div.className = 'notification is-danger is-light m-2';
            else if(el.priority === 'Moderate')
                div.className = 'notification is-warning is-light m-2';
            else 
                div.className = 'notification is-info is-light m-2';
            
            
            div.innerHTML = `<button class="delete" id="completed${el.id}" disabled></button>
                            <label class="checkbox">
                                <input type="checkbox" checked disabled class="check" id="check${el.id}">
                                <span><strike>&nbsp;${el.task}</strike></span>
                            </label>`;
            container.appendChild(div);
        });
    }

    if(database.deleted.length > 0){
        database.deleted.forEach(el => {
            let div = document.createElement('div');
    
            if(el.priority === 'High')
                div.className = 'notification is-danger is-light m-2';
            else if(el.priority === 'Moderate')
                div.className = 'notification is-warning is-light m-2';
            else 
                div.className = 'notification is-info is-light m-2';
            
            
            div.innerHTML = `<button class="delete" id="deleted${el.id}" disabled></button>
                            <label class="checkbox">
                                <input type="checkbox" checked disabled class="check" id="check${el.id}">
                                <span>&nbsp;${el.task}</span>
                            </label>`;
            container.appendChild(div);
        });
    }
}

function generateId(){
    return Math.floor(Math.random() * 1000000000) + Date.now();
}

function saveDB(database) {
    localStorage.setItem('db', JSON.stringify(database));
}

function loadDB() {
    return JSON.parse(localStorage.getItem('db'));
}

function deleteTask(database, index) {
    let deleted = database.pending.splice(index, 1);
    database.deleted.push(deleted[0]);
    saveDB(database);
    location.reload();
}

function completedTask(database, index) {
    let completed = database.pending.splice(index, 1);
    database.completed.push(completed[0]);
    saveDB(database);
    location.reload();
}

function setDate(target) {
    let today = new Date().toLocaleDateString('en-US', {weekday: 'long', month: 'long', day: 'numeric'});
    document.getElementById(target).innerHTML = today;
}

function getIndexById(id, array) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].id == parseInt(id)) {
        return i;
      }
    }
    return -1; // not found
}