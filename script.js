function addColumn() {
    let table = document.getElementById('editableTable');
    let rows = table.rows;

    for (let i = 0; i < rows.length; i++) {
        let cell = rows[i].insertCell(-1);
        let input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Empty';
        cell.appendChild(input);
    }
}

function addRow() {
    let table = document.getElementById('editableTable');
    let newRow = table.insertRow(-1);
    let columns = table.rows[0].cells.length;

    for (let i = 0; i < columns; i++) {
        let cell = newRow.insertCell(-1);
        let input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Empty';
        cell.appendChild(input);
    }
}

function exportToJson() {
    let table = document.getElementById('editableTable');
    let rows = table.rows;
    let tableData = [];

    for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        let rowData = [];
        for (let j = 0; j < row.cells.length; j++) {
            let cell = row.cells[j].querySelector('input');
            rowData.push(cell.value);
        }
        tableData.push(rowData);
    }

    let json = JSON.stringify(tableData);
    downloadJson(json, 'tableData.json');
}

function downloadJson(data, filename) {
    let blob = new Blob([data], { type: 'application/json' });
    let url = URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function importFromJson(event) {
    let file = event.target.files[0];
    let reader = new FileReader();
    
    reader.onload = function(e) {
        let json = e.target.result;
        let tableData = JSON.parse(json);
        populateTable(tableData);
    };

    reader.readAsText(file);
}

function populateTable(tableData) {
    let table = document.getElementById('editableTable');
    table.innerHTML = ''; // Clear existing table

    for (let i = 0; i < tableData.length; i++) {
        let row = table.insertRow(-1);
        for (let j = 0; j < tableData[i].length; j++) {
            let cell = row.insertCell(-1);
            let input = document.createElement('input');
            input.type = 'text';
            input.value = tableData[i][j];
            cell.appendChild(input);
        }
    }
}
