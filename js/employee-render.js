// Render employees
function renderEmployees() {
    const grid = document.getElementById('employeeGrid');
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedEmployees = filteredEmployees.slice(start, end);

    if (paginatedEmployees.length === 0) {
        grid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-users"></i>
                <h3>No employees found</h3>
                <p>Try adjusting your search or filter criteria.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = paginatedEmployees.map(employee => `
        <div class="employee-card">
            <div class="employee-id">#${employee.id}</div>
            <h3>${employee.firstName} ${employee.lastName}</h3>
            <div class="employee-info">
                <p><strong>Email:</strong> ${employee.email}</p>
                <p><strong>Department:</strong> ${employee.department}</p>
                <p><strong>Role:</strong> ${employee.role}</p>
            </div>
            <div class="employee-actions">
                <button class="btn btn-primary" onclick="editEmployee(${employee.id})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn btn-danger" onclick="deleteEmployee(${employee.id})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        </div>
    `).join('');
}

function showLoading() {
    const grid = document.getElementById('employeeGrid');
    grid.innerHTML = `
        <div class="no-results">
            <i class="fas fa-spinner fa-spin"></i>
            <h3>Loading employees...</h3>
        </div>
    `;
}

function animateCard(element) {
    element.style.transform = 'scale(0.95)';
    setTimeout(() => {
        element.style.transform = 'scale(1)';
    }, 150);
}