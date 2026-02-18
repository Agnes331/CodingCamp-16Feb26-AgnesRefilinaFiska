document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const todoList = document.getElementById('todo-list');
    const todoInput = document.getElementById('todo-input');
    const dateInput = document.getElementById('date-input');
    const filterInput = document.getElementById('filter-input');

    // 1. FITUR TAMBAH (ADD) & VALIDASI
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Validasi: Mencegah input kosong
        if (todoInput.value.trim() === "" || dateInput.value === "") {
            alert("Harap isi deskripsi tugas dan tanggal!");
            return;
        }

        createTodoElement(todoInput.value, dateInput.value);
        form.reset(); // Mengosongkan form setelah input
    });

    function createTodoElement(task, date) {
        const li = document.createElement('li');
        
        // Struktur list yang rapi dengan tombol hapus
        li.innerHTML = `
            <div>
                <strong>${task}</strong>
                <small>${date}</small>
            </div>
            <button class="delete-btn">Hapus</button>
        `;

        todoList.appendChild(li);
    }

    // 2. FITUR HAPUS (DELETE) DENGAN KONFIRMASI
    todoList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            // Tambahan fitur keamanan agar tidak sengaja terhapus
            if (confirm("Apakah Anda yakin ingin menghapus tugas ini?")) {
                e.target.parentElement.remove();
            }
        }
    });

    // 3. FITUR CARI (FILTER)
    filterInput.addEventListener('keyup', (e) => {
        const searchText = e.target.value.toLowerCase();
        const tasks = todoList.getElementsByTagName('li');

        Array.from(tasks).forEach((task) => {
            const taskText = task.textContent.toLowerCase();
            // Logika menyaring daftar berdasarkan teks
            if (taskText.indexOf(searchText) !== -1) {
                task.style.display = 'flex';
            } else {
                task.style.display = 'none';
            }
        });
    });
});