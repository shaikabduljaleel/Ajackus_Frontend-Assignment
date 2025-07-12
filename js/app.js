// Mock employee data (simulating Freemarker data injection)
let employees = [
    { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@company.com', department: 'HR', role: 'Manager' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@company.com', department: 'IT', role: 'Developer' },
    { id: 3, firstName: 'Mike', lastName: 'Johnson', email: 'mike.johnson@company.com', department: 'Finance', role: 'Analyst' },
    { id: 4, firstName: 'Sarah', lastName: 'Williams', email: 'sarah.williams@company.com', department: 'Marketing', role: 'Designer' },
    { id: 5, firstName: 'David', lastName: 'Brown', email: 'david.brown@company.com', department: 'IT', role: 'Developer' },
    { id: 6, firstName: 'Lisa', lastName: 'Davis', email: 'lisa.davis@company.com', department: 'Sales', role: 'Manager' },
    { id: 7, firstName: 'Tom', lastName: 'Wilson', email: 'tom.wilson@company.com', department: 'HR', role: 'Coordinator' },
    { id: 8, firstName: 'Anna', lastName: 'Garcia', email: 'anna.garcia@company.com', department: 'Finance', role: 'Analyst' },
    { id: 9, firstName: 'Chris', lastName: 'Martinez', email: 'chris.martinez@company.com', department: 'IT', role: 'Developer' },
    { id: 10, firstName: 'Emma', lastName: 'Anderson', email: 'emma.anderson@company.com', department: 'Marketing', role: 'Manager' },
    { id: 11, firstName: 'Ryan', lastName: 'Taylor', email: 'ryan.taylor@company.com', department: 'Sales', role: 'Coordinator' },
    { id: 12, firstName: 'Sophie', lastName: 'Thomas', email: 'sophie.thomas@company.com', department: 'HR', role: 'Analyst' },
    { id: 13, firstName: 'Alex', lastName: 'Jackson', email: 'alex.jackson@company.com', department: 'IT', role: 'Designer' },
    { id: 14, firstName: 'Megan', lastName: 'White', email: 'megan.white@company.com', department: 'Finance', role: 'Manager' },
    { id: 15, firstName: 'Kevin', lastName: 'Harris', email: 'kevin.harris@company.com', department: 'Marketing', role: 'Coordinator' }
];

let filteredEmployees = [...employees];
let currentPage = 1;
let itemsPerPage = 10;
let editingEmployeeId = null;

document.addEventListener('DOMContentLoaded', function() {
    renderEmployees();
    setupEventListeners();
    renderPagination();
});

function setupEventListeners() {

    document.getElementById('searchInput').addEventListener('input', 
        debounce(applyFilters, 300)
    );

    
    document.getElementById('employeeForm').addEventListener('submit', function(e) {
        e.preventDefault();
        handleFormSubmit();
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
            toggleFilterSidebar(false);
        }
    });

    document.getElementById('overlay').addEventListener('click', function() {
        toggleFilterSidebar(false);
        closeModal();
    });

    
    document.getElementById('filterSidebar').addEventListener('click', function(e) {
        e.stopPropagation();
    });

    
    document.querySelector('.modal-content').addEventListener('click', function(e) {
        e.stopPropagation();
    });

    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
            e.preventDefault();
            openAddModal();
        }
        
        if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
            e.preventDefault();
            document.getElementById('searchInput').focus();
        }
    });
}

function initializeApp() {
    renderEmployees();
    renderPagination();
    
    if (employees.length === 0) {
        const grid = document.getElementById('employeeGrid');
        grid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-users"></i>
                <h3>Welcome to Employee Directory</h3>
                <p>Get started by adding your first employee!</p>
                <button class="btn btn-primary" onclick="openAddModal()">
                    <i class="fas fa-plus"></i> Add First Employee
                </button>
            </div>
        `;
    }
}