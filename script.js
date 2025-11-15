const form=document.getElementById('task-form')
const input=document.getElementById('task-input')
const list=document.getElementById('task-list')
const clearCompletedBtn=document.getElementById('clear-completed')
const clearAllBtn=document.getElementById('clear-all')
const stats=document.getElementById('stats')
let tasks=JSON.parse(localStorage.getItem('tasks')||'[]')
function save(){localStorage.setItem('tasks',JSON.stringify(tasks))}
function render(){list.innerHTML=''
tasks.forEach(task=>{
const li=document.createElement('li')
li.className='task-item'
li.dataset.id=task.id
li.innerHTML=`<div class="task-left"><button class="checkbox ${task.done? 'checked':''}" aria-label="toggle"></button><div class="task-text ${task.done? 'completed':''}">${escapeHtml(task.text)}</div></div><div class="task-actions"><button class="remove-btn" aria-label="remove">✕</button></div>`
list.appendChild(li)
})
const total=tasks.length
const done=tasks.filter(t=>t.done).length
stats.textContent=`Total: ${total} • Completed: ${done}`
}
function addTask(text){const trimmed=text.trim()
if(!trimmed) return
tasks.unshift({id:Date.now().toString(36)+Math.random().toString(36).slice(2,6),text:trimmed,done:false})
save()
render()
}
function toggleTask(id){const idx=tasks.findIndex(t=>t.id===id)
if(idx===-1) return
tasks[idx].done=!tasks[idx].done
save()
render()
}
function removeTask(id){tasks=tasks.filter(t=>t.id!==id)
save()
render()
}
function clearCompleted(){tasks=tasks.filter(t=>!t.done)
save()
render()
}
function clearAll(){tasks=[]
save()
render()
}
form.addEventListener('submit',e=>{e.preventDefault();addTask(input.value);input.value='';input.focus()})
list.addEventListener('click',e=>{
const li=e.target.closest('li')
if(!li) return
const id=li.dataset.id
if(e.target.classList.contains('remove-btn')){removeTask(id);return}
if(e.target.classList.contains('checkbox')){toggleTask(id);return}
if(e.target.classList.contains('task-text')){toggleTask(id);return}
})
clearCompletedBtn.addEventListener('click',clearCompleted)
clearAllBtn.addEventListener('click',clearAll)
document.addEventListener('keydown',e=>{if(e.key==='Enter'&&document.activeElement===input){e.preventDefault();addTask(input.value);input.value=''}})
function escapeHtml(s){return s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'","&#39;")}
render()