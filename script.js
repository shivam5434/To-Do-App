const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById('task-list');
const emptyImage = document.querySelector('.empty-image');

const toggleEmptyState = () => {
  emptyImage.style.display = taskList.children.length === 0 ? 'block': 'none';

}


const addTask = (text, completed = false) =>{
  // e.preventDefault();     // wtf
  const taskText = text || taskInput.value.trim();
  if(!taskText){
    addTaskBtn.disabled = true;
    return;
  }

  const li = document.createElement("li");
  li.innerHTML = `
  <input type="checkbox" class="checkbox" ${completed ? 'checked' : ''}>
  <span>${taskText}</span>
  <div class="task-button">
    <button class="edit-btn"><i class="fa-solid fa-pen"></i></button>
    <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
  </div>
  `;
  
  

  
  const editBtn = li.querySelector('.edit-btn');
  editBtn.addEventListener('click', () => {
    if(!checkbox.checked){
      taskInput.value = li.querySelector('span').textContent;
      li.remove();
      toggleEmptyState();
    }
  })
  
  
  const deleteBtn = li.querySelector('.delete-btn');
  deleteBtn.addEventListener('click', () => {
    li.remove();
    toggleEmptyState();
  })
  const checkbox = li.querySelector('.checkbox');

  if(completed){
    li.classList.add('completed');
    editBtn.disabled = true;
    editBtn.style.opacity = '0.5';
    editBtn.style.pointerEvents = 'none';
  }

  checkbox.addEventListener('change', () => {
    const isChecked = checkbox.checked;
    li.classList.toggle('completed', isChecked);
    editBtn.disabled = isChecked;
    editBtn.style.opacity = isChecked ? '0.5': '1';
    editBtn.style.pointerEvents = isChecked ? 'none' : 'auto';
  })


  
  taskList.appendChild(li);
  taskInput.value = '';
  toggleEmptyState();
};

addTaskBtn.addEventListener('click', () => addTask());      // where is ()
taskInput.addEventListener('keypress', (e) => {
  if(e.key === 'Enter'){
    e.preventDefault();
    addTask();
  }
});

