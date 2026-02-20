document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const todoList = document.getElementById('todo-list');
    const todoInput = document.getElementById('todo-input');
    const dateInput = document.getElementById('date-input');
    const filterInput = document.getElementById('filter-input');
    const totalCount = document.getElementById('total-count');

    function updateCounter() {
        totalCount.innerText = todoList.children.length;
    }

    // 1. ADD & VALIDASI
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="task-text">
                <strong>${todoInput.value}</strong><br>
                <small>${dateInput.value}</small>
            </div>
            <button class="delete-btn">Hapus</button>
        `;

        // Fitur Tambahan: Mark as Done
        li.querySelector('.task-text').addEventListener('click', function() {
            this.classList.toggle('done');
        });

        // 2. DELETE
        li.querySelector('.delete-btn').addEventListener('click', () => {
            if(confirm("Hapus tugas ini?")) {
                li.remove();
                updateCounter();
            }
        });

        todoList.appendChild(li);
        updateCounter();
        form.reset();
    });

    // 3. FILTER
    filterInput.addEventListener('keyup', (e) => {
        const text = e.target.value.toLowerCase();
        const items = todoList.getElementsByTagName('li');
        Array.from(items).forEach(item => {
            const taskContent = item.textContent.toLowerCase();
            item.style.display = taskContent.includes(text) ? 'flex' : 'none';
        });
    });
});