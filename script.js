// Array to store items
var items = [];
// Function to initialize
function initialize() {
    // Retrieve items from localStorage if present
    var storedItems = localStorage.getItem('Product');
    if (storedItems) {
        items = JSON.parse(storedItems);
    }

    document.addEventListener("DOMContentLoaded", function () {
        showItems();
        DisplayTotal();
    });
}
//totally
function DisplayTotal() {
    var totally = 0;
    var totalText = document.getElementById('Total');
    for (var i = 0; i < items.length; i++) {
        totally += items[i]['total'];
    }
    totalText.innerHTML = totally.toLocaleString(undefined, {
        style: "currency",
        currency: "USD"
    });;
}
// Function to save items to localStorage
function saveItems() {
    localStorage.setItem('Product', JSON.stringify(items));
}

//clear localstorage

function clearlocalStorage() {
    localStorage.clear();
    showItems();
}


// Function to display items
var array = ['Product', "Price", "Qty", "Total"];
function showItems() {
    var header = document.createElement('table');
    header.classList.add('HeaderItem');
    var headerrow = header.insertRow();
    var headerDiv = document.getElementsByClassName('header')[0];
    headerDiv.innerHTML = "";
    for (var r = 0; r < array.length; r++) {
        var headercell = headerrow.insertCell();
        headercell.innerHTML = array[r];
        if (r == 0) headercell.style.width = "4%";
    }
    headerDiv.appendChild(header);
    var divItemForm = document.getElementsByClassName('ItemsForm')[0];
    divItemForm.innerHTML = "";
    var tblItem = document.createElement('table');
    tblItem.classList.add('itemtable');
    for (var r = 0; r < items.length; r++) {
        var row = tblItem.insertRow();
        row.classList.add('item');
        for (var key in items[r]) {
            if (key == "name") {
                var cell = row.insertCell();
                cell.innerHTML = items[r][key];
                cell.style.width="6%";
                continue;
            }
            if (key == "price") {
                var cell = row.insertCell();
                cell.innerHTML = items[r][key].toLocaleString(undefined, {
                    style: "currency",
                    currency: "USD"
                });
                cell.style.width="4%"
                continue;
            }
            if (key == "total") {
                var cell = row.insertCell();
                cell.innerHTML = items[r][key].toLocaleString(undefined, {
                    style: "currency",
                    currency: "USD"
                });
                cell.style.width="3.4%"
                continue;
            }
            var cell = row.insertCell();
            cell.innerHTML = items[r][key];
        }
        divItemForm.appendChild(tblItem);
    }
}

// Function to show add form
function showAddForm() {
    document.getElementById('ForBlur').style.display = 'block';
}

// Function to close add form
function closeAddForm() {
    document.getElementById('ForBlur').style.display = 'none';
}

// Function to add new item
function pushArray() {
    // Retrieve values from input fields
    var txtPName = document.getElementById('txtProductName').value;
    var txtPrice = parseFloat(document.getElementById('txtPrice').value);
    var txtQty = document.getElementById('txtQty').value;
    var total = txtPrice * txtQty;
    var isNull = false

    // Check if any input field is empty
    var textbox = document.querySelectorAll('.inputAddProduct');
    textbox.forEach(function (input) {
        if (input.value == '') {
            isNull = true;
        }
    });

    // If all input fields are filled, add the new item to the items array
    if (!isNull) {
        var newItem = {
            name: txtPName,
            price: txtPrice,
            qty: txtQty,
            total: total
        };
        items.push(newItem);
        // Save items to localStorage
        saveItems();

        // Update the displayed items
        showItems();

        // Clear input fields
        clearText();
        DisplayTotal();
    } else {
        alert('Please fill all fields.');
    }
}

// Function to clear input fields
function clearText() {
    var textbox = document.querySelectorAll('.inputAddProduct');
    textbox.forEach(function (input) {
        input.value = '';
    });
}

// Initialize the page
initialize();