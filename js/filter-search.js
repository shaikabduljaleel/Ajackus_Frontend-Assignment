// Apply filters and search
function applyFilters() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filterFirstName = document.getElementById('filterFirstName').value.toLowerCase();
    const filterDepartment = document.getElementById('filterDepartment').value;
    const filterRole = document.getElementById('filterRole').value;

    filteredEmployees = employees.filter(employee => {
        const matchesSearch = !searchTerm || 
            employee.firstName.toLowerCase().includes(searchTerm) ||
            employee.lastName.toLowerCase().includes(searchTerm) ||
            employee.email.toLowerCase().includes(searchTerm);

        const matchesFirstName = !filterFirstName || 
            employee.firstName.toLowerCase().includes(filterFirstName);

        const matchesDepartment = !filterDepartment || 
            employee.department === filterDepartment;

        const matchesRole = !filterRole || 
            employee.role === filterRole;

        return matchesSearch && matchesFirstName && matchesDepartment && matchesRole;
    });

    currentPage = 1;
    renderEmployees();
    renderPagination();
}

// Clear filters
function clearFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('filterFirstName').value = '';
    document.getElementById('filterDepartment').value = '';
    document.getElementById('filterRole').value = '';
    document.getElementById('sortBy').value = '';
    
    filteredEmployees = [...employees];
    currentPage = 1;
    renderEmployees();
    renderPagination();
}

// Apply sorting
function applySorting() {
    const sortBy = document.getElementById('sortBy').value;
    
    if (!sortBy) {
        applyFilters();
        return;
    }

    filteredEmployees.sort((a, b) => {
        const aValue = a[sortBy].toLowerCase();
        const bValue = b[sortBy].toLowerCase();
        return aValue.localeCompare(bValue);
    });

    currentPage = 1;
    renderEmployees();
    renderPagination();
}

// Filter sidebar functions
function toggleFilterSidebar(show) {
    const sidebar = document.getElementById('filterSidebar');
    const overlay = document.getElementById('overlay');
    
    if (show === undefined) {
        show = !sidebar.classList.contains('active');
    }

    if (show) {
        sidebar.classList.add('active');
        overlay.classList.add('active');
    } else {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
    }
}

// Performance optimization: debounce search
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}