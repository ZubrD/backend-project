document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;
    
    remove(id).then(()=>{
        event.target.closest('li').remove()
    })
  }

  if (event.target.dataset.type === "edit") {
    const id = event.target.dataset.id;
    const newTitle = prompt('Введите новое название', 1000)
    if(newTitle){
      edit(id, newTitle)
    }
  }  
});

async function remove(id) {
  await fetch(`/${id}`, { method: "DELETE" });
}

async function edit(id, newTitle){
  const data = {
    id,
    newTitle
  }
  const dataForSend = JSON.stringify(data)
  await fetch(`/${dataForSend}`, {method: "PUT"})
}
