import Student from "./Students.js";

let searchValue = "";
let StudentArray;

async function getData() {
  return await Student.AllStudents().then((res) => {
    return res;
  });
}

StudentArray = await getData();

const displayStudents = async function () {
    return StudentArray.filter((student) => {
        return searchValue === ""
        ? student
        : student.name.toLowerCase().includes(searchValue.toLowerCase());
    })
    .map((student) => {
        const { id, name, lastName, age, note } = student;
        return `
        <tr>
            <td>${id}</td>
            <td>${name}</td>
            <td>${lastName}</td>
            <td>${Student.getAge(age)} years</td>
            <td><span class=${note > 10 ? "green" : "red"}>${note}</span></td>
            <td class="actions">
                <button class="delete" data-id='${id}'>Delete</button>
                <button class="update" data-id='${id}'>Update</button>
            </td>
        </tr>  
        `;
  });
};

const getStudentDataToUpdate = async (id) => {
  const res = await Student.getOneStudent(id).then((data) => data);

  const [name, lastName, age, note] = document.querySelectorAll(
    "#update-name,#update-lastName,#update-age,#update-note"
  );
  name.value = res.name;
  lastName.value = res.lastName;
  age.value = res.age;
  note.value = res.note;
};

const addNewStudentfunction = async (event) => {
  event.preventDefault();
  const numberOfTheStudents = await Student.AllStudents().then((data) => data.length);
  const [name, lastName, age, note] = document.querySelectorAll("#name,#lastName,#age,#note");
  const student = new Student(
    name.value,
    lastName.value,
    age.value,
    note.value
  );
  await student.addNewStudent(numberOfTheStudents);
};


const deleteStudentFunction = async (id) => {
    await Student.deleteStudent(id).then(() => alert("student has been deleted"));
};


const updateStudentFunction = async (event, id) => {
    event.preventDefault();
    const [name, lastName, age, note] = document.querySelectorAll(
        "#update-name,#update-lastName,#update-age,#update-note"
    );

    const body = {
    id: id,
    name: name.value,
    lastName: lastName.value,
    age: age.value,
    note: note.value,
    };
  
    return await Student.updateStudent(id, body).then(() =>
    alert("student has been updated")
);
};

const AddUpdateAndRemoveStudentClickEvent=()=>{
  const deleteStudentBtn = document.querySelectorAll(".delete");
  const updateStudentBtn = document.querySelectorAll(".update");
  const UpdateStudentform = document.querySelector("#Update-Student-form");

    
  deleteStudentBtn.forEach((button) => {
    button.addEventListener("click", async () => {
      await deleteStudentFunction(button.dataset.id);
    });
  });

  updateStudentBtn.forEach((button) => {
    button.addEventListener("click", () => {
      UpdateStudentform.setAttribute("data-id", button.dataset.id);
      const id = document.querySelector("#Update-Student-form").dataset.id;
      getStudentDataToUpdate(id);
      UpdateStudentform.style.display = "flex";
    });
  });

  UpdateStudentform.addEventListener("submit", (event) => {
    updateStudentFunction(event, UpdateStudentform.dataset.id);
  });
}

const renderAllStudents = async () => {
    const tableBody = document.querySelector(".table-body");
    await displayStudents().then((data) => {
        tableBody.innerHTML = data.join(" ");
        AddUpdateAndRemoveStudentClickEvent()
    });
};



function init() {
  const RefreshStudentListBtn = document.querySelector("#Refresh-Students-List");
  const AddStudentform = document.querySelector("#Add-New-Student");
  const UpdateStudentform = document.querySelector("#Update-Student-form");
  const closeUpdateFormBtn = document.querySelector(".close-updateStudent-form");
  const searchInput = document.querySelector(".searchInput");

  RefreshStudentListBtn.addEventListener("click", () => {
    renderAllStudents();
    });
    
  AddStudentform.addEventListener("submit", (event) => {
        addNewStudentfunction(event);
    });

  closeUpdateFormBtn.addEventListener("click", () => {
    UpdateStudentform.style.display = "none";
  });

  searchInput.addEventListener("keyup", () => {
    searchValue = searchInput.value;
    renderAllStudents();
  });
}



init()
renderAllStudents();
