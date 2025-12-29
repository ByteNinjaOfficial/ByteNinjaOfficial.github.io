// Data storage using LocalStorage
let customers = JSON.parse(localStorage.getItem('bankCustomers')) || [];
let transactions = JSON.parse(localStorage.getItem('bankTransactions')) || [];

// Tab switching
function showTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');
    
    if (tabName === 'transactions') {
        document.getElementById('transType').onchange();
    }
    updateDashboard();
    if (tabName === 'customers') loadCustomers();
    if (tabName === 'transactions') loadTransactions();
}

// Add Customer
function addCustomer() {
    const name = document.getElementById('customerName').value.trim();
    const accountNo = document.getElementById('accountNo').value.trim();
    const balance = parseFloat(document.getElementById('initialBalance').value) || 0;
    const type = document.getElementById('accountType').value;

    if (!name || !accountNo) {
        showSuccess('Please fill name and account number');
        return;
    }

    if (customers.find(c => c.accountNo === accountNo)) {
        showSuccess('Account number already exists!');
        return;
    }

    const customer = {
        id: Date.now(),
        name, accountNo, balance, type,
        createdAt: new Date().toLocaleString()
    };

    customers.push(customer);
    localStorage.setItem('bankCustomers', JSON.stringify(customers));
    
    document.getElementById('customerName').value = '';
    document.getElementById('accountNo').value = '';
    document.getElementById('initialBalance').value = '';
    showSuccess('Customer added successfully!');
    updateDashboard();
}

// Process Transaction
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('transType').onchange = function() {
        const transferGroup = document.getElementById('transferToGroup');
        transferGroup.style.display = this.value === 'transfer' ? 'block' : 'none';
    };
});

function processTransaction() {
    const accountNo = document.getElementById('transAccountNo').value.trim();
    const type = document.getElementById('transType').value;
    const amount = parseFloat(document.getElementById('transAmount').value);
    const transferTo = document.getElementById('transferToAccount').value.trim();

    const customer = customers.find(c => c.accountNo === accountNo);
    if (!customer) {
        showSuccess('Customer account not found!');
        return;
    }
    if (amount <= 0) {
        showSuccess('Enter valid amount');
        return;
    }

    let newBalance = customer.balance;
    let message = '';

    if (type === 'deposit') {
        newBalance += amount;
        message = `Deposited ₹${amount}`;
    } else if (type === 'withdraw') {
        if (newBalance < amount) {
            showSuccess('Insufficient balance!');
            return;
        }
        newBalance -= amount;
        message = `Withdrew ₹${amount}`;
    } else if (type === 'transfer') {
        if (!transferTo) {
            showSuccess('Enter target account number');
            return;
        }
        const targetCustomer = customers.find(c => c.accountNo === transferTo);
        if (!targetCustomer) {
            showSuccess('Target account not found!');
            return;
        }
        if (newBalance < amount) {
            showSuccess('Insufficient balance for transfer!');
            return;
        }
        customer.balance = newBalance - amount;
        targetCustomer.balance += amount;
        message = `Transferred ₹${amount} to ${transferTo}`;
    }

    customer.balance = newBalance;

    // Add transaction record
    transactions.push({
        id: Date.now(),
        accountNo, type, amount, balance: newBalance,
        date: new Date().toLocaleString()
    });

    localStorage.setItem('bankCustomers', JSON.stringify(customers));
    localStorage.setItem('bankTransactions', JSON.stringify(transactions));

    document.getElementById('transAccountNo').value = '';
    document.getElementById('transAmount').value = '';
    document.getElementById('transferToAccount').value = '';
    showSuccess(`${message}. New balance: ₹${newBalance}`);
    updateDashboard();
    loadTransactions();
}

// Load Customers Table
function loadCustomers() {
    const tbody = document.querySelector('#customersTable tbody');
    tbody.innerHTML = '';
    
    customers.forEach(customer => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${customer.name}</td>
            <td>${customer.accountNo}</td>
            <td>₹${customer.balance.toLocaleString()}</td>
            <td>${customer.type}</td>
            <td>
                <button class="btn btn-danger" onclick="deleteCustomer(${customer.id})" style="padding:8px 15px;font-size:14px;">Delete</button>
            </td>
        `;
    });
}

// Delete Customer
function deleteCustomer(id) {
    if (confirm('Delete this customer?')) {
        customers = customers.filter(c => c.id !== id);
        localStorage.setItem('bankCustomers', JSON.stringify(customers));
        loadCustomers();
        updateDashboard();
        showSuccess('Customer deleted');
    }
}

// Load Transactions
function loadTransactions() {
    const tbody = document.querySelector('#transactionsTable tbody');
    tbody.innerHTML = '';
    
    transactions.slice(-10).reverse().forEach(trans => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${trans.date}</td>
            <td>${trans.accountNo}</td>
            <td>${trans.type.toUpperCase()}</td>
            <td>₹${trans.amount.toLocaleString()}</td>
            <td>₹${trans.balance.toLocaleString()}</td>
        `;
    });
}

// Update Dashboard Stats
function updateDashboard() {
    const totalBalance = customers.reduce((sum, c) => sum + c.balance, 0);
    const totalCustomersCount = customers.length;
    const totalTransCount = transactions.length;
    const avgBalance = totalCustomersCount ? (totalBalance / totalCustomersCount) : 0;

    document.getElementById('totalBalance').textContent = `₹ ${totalBalance.toLocaleString()}`;
    document.getElementById('totalCustomers').textContent = totalCustomersCount;
    document.getElementById('totalTransactions').textContent = totalTransCount;
    document.getElementById('avgBalance').textContent = `₹ ${avgBalance.toLocaleString()}`;
}

// Success message
function showSuccess(msg) {
    const msgEl = document.getElementById('successMsg');
    msgEl.textContent = msg;
    msgEl.style.display = 'block';
    setTimeout(() => msgEl.style.display = 'none', 3000);
}

// Initialize
updateDashboard();
loadCustomers();
loadTransactions();
