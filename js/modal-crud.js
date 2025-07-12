// Modal functions
function openAddModal() {
    document.getElementById('modalTitle').textContent = 'Add Employee';
    document.getElementById('employeeForm').reset();
    clearValidationErrors();
    editingEmployeeId = null;
    document.getElementById('employeeModal').classList.add('active');
    document.getElementById('overlay').classList.add('active');
}

function editEmployee(id) {
    const employee = employees.find(emp => emp.id === id);
    if (!employee) return;

    document.getElementById('modalTitle').textContent = 'Edit Employee';
    document.getElementById('firstName').value = employee.firstName;
    document.getElementById('lastName').value = employee.lastName;
    document.getElementById('email').value = employee.email;
    document.getElementById('department').value = employee.department;
    document.getElementById('role').value = employee.role;
    
    clearValidationErrors();
    editingEmployeeId = id;
    document.getElementById('employeeModal').classList.add('active');
    document.getElementById('overlay').classList.add('active');
}

function closeModal() {
    document.getElementById('employeeModal').classList.remove('active');
    document.getElementById('overlay').classList.remove('active');
    editingEmployeeId = null;
}

function deleteEmployee(id) {
    const employee = employees.find(emp => emp.id === id);
    if (!employee) return;

    if (confirm(`Are you sure you want to delete ${employee.firstName} ${employee.lastName}?`)) {
        employees = employees.filter(emp => emp.id !== id);
        showNotification('Employee deleted successfully!');
        applyFilters();
    }
}

// Form validation and submission
function handleFormSubmit() {
    if (!validateForm()) {
        return;
    }

    const formData = {
        firstName: document.getElementById('firstName').value.trim(),
        lastName: document.getElementById('lastName').value.trim(),
        email: document.getElementById('email').value.trim(),
        department: document.getElementById('department').value,
        role: document.getElementById('role').value
    };

    if (editingEmployeeId) {
        // Edit existing employee
        const index = employees.findIndex(emp => emp.id === editingEmployeeId);
        if (index !== -1) {
            employees[index] = { ...employees[index], ...formData };
            showNotification('Employee updated successfully!');
        }
    } else {
        // Add new employee
        const newEmployee = {
            id: Math.max(...employees.map(emp => emp.id)) + 1,
            ...formData
        };
        employees.push(newEmployee);
        showNotification('Employee added successfully!');
    }

    closeModal();
    applyFilters();
}

function validateForm() {
    let isValid = true;
    clearValidationErrors();

    // First Name validation
    const firstName = document.getElementById('firstName').value.trim();
    if (!firstName) {
        showValidationError('firstNameError', 'First name is required');
        isValid = false;
    }

    // Last Name validation
    const lastName = document.getElementById('lastName').value.trim();
    if (!lastName) {
        showValidationError('lastNameError', 'Last name is required');
        isValid = false;
    }

    // Email validation
    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        showValidationError('emailError', 'Email is required');
        isValid = false;
    } else if (!emailRegex.test(email)) {
        showValidationError('emailError', 'Please enter a valid email address');
        isValid = false;
    } else {
        // Check for duplicate email (excluding current employee when editing)
        const existingEmployee = employees.find(emp => 
            emp.email.toLowerCase() === email.toLowerCase() && 
            emp.id !== editingEmployeeId
        );
        if (existingEmployee) {
            showValidationError('emailError', 'Email address already exists');
            isValid = false;
        }
    }

    // Department validation
    const department = document.getElementById('department').value;
    if (!department) {
        showValidationError('departmentError', 'Department is required');
        isValid = false;
    }

    // Role validation
    const role = document.getElementById('role').value;
    if (!role) {
        showValidationError('roleError', 'Role is required');
        isValid = false;
    }

    return isValid;
}

function showValidationError(elementId, message) {
    document.getElementById(elementId).textContent = message;
}

function clearValidationErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => element.textContent = '');
}