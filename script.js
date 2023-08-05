let data = JSON.parse(localStorage.getItem("Tasks")) || []

const buttonCreate = document.getElementById('buttonCreate');
const input = document.getElementById('input')
const tasks = document.getElementById('tasks')

const viewTasks = () => {
    data = JSON.parse(localStorage.getItem("Tasks")) || []

    tasks.innerHTML = ''

    data.forEach((task, index) => {
        let contenedor = document.createElement("div")
        let texto = document.createElement('p')
        let actions = document.createElement('div')
        let value = task.value
        let check = document.createElement('input')
        let iconDelete = document.createElement('i')
        let position = document.createElement('select')
        let defaultOption = document.createElement('option')
        defaultOption.innerHTML =`${index+1}`
        defaultOption.selected = true
        position.appendChild(defaultOption)

        //select
        position.id = index
        position.className = 'position'
        data.forEach((number, indes) => {
            if(indes != index) {
                let option = document.createElement('option')
                option.innerText = indes+1
                option.value = indes
                position.appendChild(option)
            }

        })


        iconDelete.className = 'fa-sharp fa-solid fa-delete-left remove'
        iconDelete.id = task.id

        //check
        check.className = "mark"
        check.type = 'checkbox'
        check.id = task.id
        check.checked = task.state ? true : false

        contenedor.id = task.id
        contenedor.className = 'element'
        texto.className = `text ${task.state ? 'completed' : ''}`
        actions.className = 'actions'
        tasks.appendChild(contenedor)
        contenedor.appendChild(position)
        contenedor.appendChild(texto)
        contenedor.appendChild(actions)
        actions.appendChild(check)
        actions.appendChild(iconDelete)
        texto.innerText = value

    })

    //checkbox
    const texto2 = document.querySelectorAll('.text')
    const checkbox = document.querySelectorAll('.mark')
    checkbox.forEach((element, index) => {
        element.addEventListener('click', event => {
            if (element.checked) {
                completeTask(element.id, true)
            } else {
                completeTask(element.id, false)
            }
        })
        element.addEventListener('mouseover', (event) => {
            if (element.checked) return
            else {
                texto2[index].style.textDecorationLine = 'line-through'
            }
        })
        element.addEventListener('mouseout', event => {
            if(element.checked) return
            else {
                texto2[index].removeAttribute('style')
            }
        })

    })

    //iconDelete
    const inconDelete = document.querySelectorAll('.remove')
    inconDelete.forEach((element) => {
        element.addEventListener('click', event => {
            removeTask(element.id)
            viewTasks()
        })
    })

    const chagePosition = document.querySelectorAll('select')
    chagePosition.forEach((element, index) => {
        element.addEventListener('change', () => {
            let selectedOption = element.options[element.selectedIndex];
            let textSelect = selectedOption.text -1;
            let aux = 0;
            aux = data[textSelect]
            data[textSelect] = data[index] 
            data[index] = aux
            localStorage.setItem('Tasks', JSON.stringify(data))
            viewTasks()
        })
    })

}

viewTasks()




const save = () => {
    let task = {
        id: Date.now(),
        value: input.value,
        state: false
    }
    data.push(task)
    localStorage.setItem('Tasks', JSON.stringify(data))
}

const completeTask = (id, comprobante) => {
    let updated = data.map(task => {
        if (task.id == id && comprobante) {
            task.state = true;
        } else if (task.id == id) {
            task.state = false

        }
        return task
    })
    localStorage.setItem('Tasks', JSON.stringify(updated));
    viewTasks()
}


const removeTask = (id) => {
    let remove = data.filter(task => {
        if (task.id != id) {
            return task
        }
    })
    localStorage.setItem('Tasks', JSON.stringify(remove));
    viewTasks()
}


buttonCreate.addEventListener("click", (event) => {
    event.preventDefault()

    if (input.value == '') {
        return
    }
    console.log(input.value)
    save()
    viewTasks()

    input.value = ''
})

