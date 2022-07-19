var selectedRow = null
var personId=null;
function addTable() {
    $("#table tbody tr").remove();
    $.ajax({
        url: 'https://localhost:7165/api/PeopleInfo',
        type: 'GET',
        dataType: 'json',
        success: function (data, textStatus, xhr) {
            $.each(data, function (i, person) {

                if (selectedRow == null)
                    insertNewRecord(person);
                else
                    updateRecord(person);

                document.getElementById("list").classList.remove("hidden")
                
                resetForm();

            });
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log('Error in Database')
        }
    });
}
function FormEdit() {
    var Postdata = {}
    Postdata.firstName = $("#fName").val();
    Postdata.lastName = $("#lName").val();
    Postdata.phoneNumber = $("#phone").val();
    Postdata.city = $("#city").val();
    

    $.ajax({
        url: 'https://localhost:7165/api/PeopleInfo/\{'+personId+'\}',
        type: 'PUT',
        dataType: 'json',
        data: JSON.stringify(Postdata),
        contentType: "application/json;charset=utf-8",
        success: function (data, textStatus, xhr) {
            alert("Edited Successfully!!!")
            document.getElementById("btnSave").classList.add("hidden");
            document.getElementById("btn-Submit").classList.remove("hidden");
            resetForm();
            addTable();

        },
        error: function (xhr, textStatus, errorThrown) {
            console.log('Error in Operation');
        }
    });
}

function onSubmit() {

    {


        var PersonalDetails = {
            firstName: $("#fName").val(),
            lastName: $("#lName").val(),
            city: $("#city").val(),
            phoneNumber:$("#phone").val()

        };

        $.ajax({
            type: "POST",
            url: 'https://localhost:7165/api/PeopleInfo',
            data: JSON.stringify(PersonalDetails),
            contentType: "application/json;charset=utf-8",
            success: function (data, status, xhr) {
                alert("Submission Successful");
                addTable();
                },
            error: function (xhr) {
                alert("Enter the correct credentials!!");
            }
        });
    };
}
function FormDelete(idToDelete) {

    alert(idToDelete);
    $.ajax({
        type: "DELETE",
        url: 'https://localhost:7165/api/PeopleInfo/\{' + idToDelete + '\}',
        dataType: 'json',
        success: function (data, status, xhr) {
            alert("Deleted Successfully");
            addTable();
        },
        error: function (xhr) {
            alert(xhr.responseText);
        }
    });
}

function resetForm() {
    document.getElementById("fName").value = "";
    document.getElementById("lName").value = "";
    document.getElementById("city").value = "";
    document.getElementById("phone").value = "";
    selectedRow = null;
}
function updateRecord(data) {
    selectedRow.cells[0].innerHTML = data.fisrtName;
    selectedRow.cells[1].innerHTML = data.lastName;
    selectedRow.cells[2].innerHTML = data.city;
    selectedRow.cells[3].innerHTML = data.phoneNumber;
    sortTable();
}
function insertNewRecord(data) {
    var table = document.getElementById("list").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.firstName;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.lastName;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.city;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.phoneNumber;
    cell4 = newRow.insertCell(4);
    cell4.innerHTML = '<a onClick="onEdit(this,\'' + data.id + '\');">Edit</a>' 
        + '<a onClick="onDelete(this);FormDelete(\'' + data.id + '\')">Delete</a>';

     
    //    console.log(table.innerHTML);

    sortTable();
}
function onEdit(td,id) {
    selectedRow = td.parentElement.parentElement;
    personId = id;
    document.getElementById("fName").value = selectedRow.cells[0].innerHTML;
    document.getElementById("lName").value = selectedRow.cells[1].innerHTML;
    document.getElementById("city").value = selectedRow.cells[2].innerHTML;
    document.getElementById("phone").value = selectedRow.cells[3].innerHTML;
    document.getElementById("btnSave").classList.remove("hidden");
    document.getElementById("btn-Submit").classList.add("hidden");

    
    
}

function sortTable() {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("table");
    switching = true;
    dir = "asc";
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("td")[1];
            y = rows[i + 1].getElementsByTagName("td")[1];
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}
function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        deleteRow(td);
        resetForm();
    }
}
var deleteRow = function (link) {
    var row = link.parentNode.parentNode;
    var table = row.parentNode;
    table.removeChild(row);
}
function onLoad() {
    document.getElementById("btn-Submit").classList.remove("hidden");

}