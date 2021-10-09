document.getElementById('btnshw').addEventListener("click", function () {
    if (btnshw.innerHTML == "Show Form Add new Student") {
        btnshw.innerHTML = "Hide Form Add new Student";
    } else {
        btnshw.innerHTML = "Show Form Add new Student";
    }
});

const submit_button = document.querySelector("#submitbutton");

submit_button.addEventListener('click', () => {
    let std_nim = document.querySelector("#NIM").value;
    let std_name = document.querySelector("#Nama").value;
    let std_gender = document.querySelector('input#Male').checked;
    if (std_gender == true) {
        std_gender = 'Male';
    } else {
        std_gender = 'Female';
    }
    // let std_gender = document.querySelector('input[name="gender"]:checked').value;
    let std_faculty = document.querySelector("#Faculty").options[document.querySelector("#Faculty").selectedIndex].value;
    let std_program_study = document.querySelector("#Prodi").options[document.querySelector("#Prodi").selectedIndex].value;;


    //validating form data
    if (/^\d+$/.test(std_nim) != true) {
        alert("Invalid Student NIM");
        return;
    }

    if (/^[a-zA-Z]+(?: [a-zA-Z]+)*$/.test(std_name) != true) {
        alert("Invalid Student Name");
        return;
    }

    if (std_faculty == "") {
        alert("Invalid Faculty");
        return;
    }

    if (std_program_study == "") {
        alert("Invalid Program Study");
        return;
    }

    if (dataStudent.map((s) => s.NIM).includes(std_nim) == true) {
        alert(`Duplicate NIM Detected!`);
        return;
    }

    //append valid form data to student list
    dataStudent.push({
        NIM: std_nim,
        nama: std_name,
        gender: std_gender,
        fakultas: std_faculty,
        study: std_program_study,
    });

    //update student list and reset form data
    alert(`${std_name} added.`);
    update_student_list();
    document.querySelector("form").reset();


});

//display all students
const student_list = document.querySelector("#students");

function update_student_list() {

    student_list.innerHTML = "";

    for (student of dataStudent) {

        let tr = document.createElement("tr");

        for (key in student) {

            let td = document.createElement("td");
            td.appendChild(document.createTextNode(student[key]));
            td.className = [key];
            tr.appendChild(td);
        }

        //action, #delete, 
        let action = document.createElement("td");
        let trash_icon = `<button type="button" onclick="delete_row(this)" class="btn btn-danger"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/> </svg></button>`
        action.innerHTML = trash_icon;
        tr.appendChild(action);

        student_list.appendChild(tr);
    }
}
update_student_list();
//end display all students


//Delete
function delete_row(btn) {
    var row = btn.closest('tr').rowIndex - 1;
    const confirm_delete = confirm("Are You Sure To Delete?");
    if (confirm_delete == true) {
        dataStudent.splice(row, 1);
    }
    update_student_list();
}

let search_student = document.querySelector("#nameSearch");

search_student.addEventListener("input", () => {
    if (search_student.length == 0) {
        update_student_list();
    } else {
        student_list.innerHTML = "";

        //filter the student
        let filtered_students = dataStudent.filter((s) => {
            return s.nama.toLowerCase().includes(search_student.value.toLowerCase());
        });

        for (student of filtered_students) {

            let tr = document.createElement("tr");

            for (key in student) {

                let td = document.createElement("td");
                td.appendChild(document.createTextNode(student[key]));

                tr.appendChild(td);
            }

            //action #delete, 
            let action = document.createElement("td");
            let trash_icon = `<button type="button" onclick="delete_row(this)" class="btn btn-danger"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/> </svg></button>`
            action.innerHTML = trash_icon;
            tr.appendChild(action);

            student_list.appendChild(tr);
        }

    }
});

//Filter Faculty
function FilterFaculty() {
    var input, filter, table, tr, td, i, txtValue;

    input = document.getElementById('filtfaculty');
    filter = input.value.toUpperCase();
    table = document.getElementById("students");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByClassName("fakultas")[0];
        if (td) {
            txtValue = td.textContent || td.innerText || td.value;
            if (txtValue.toUpperCase().indexOf(filter) > -1 || filter == "0") {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function FilterStudy() {
    var input, filter, table, tr, td, i, txtValue;

    input = document.getElementById('filtprodi');
    filter = input.value.toUpperCase();
    table = document.getElementById("students");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByClassName("study")[0];
        if (td) {
            txtValue = td.textContent || td.innerText || td.value;
            if (txtValue.toUpperCase().indexOf(filter) > -1 || filter == "0") {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

var form = document.getElementById("add-student-form");

function handleForm(event) {
    event.preventDefault();
}
form.addEventListener('submit', handleForm);