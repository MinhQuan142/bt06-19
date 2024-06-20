let employeesForm = document.getElementById("employeesForm");
let employeesTable = document.getElementById("employeesTable");
let employees = []; // Tạo mảng rỗng để lưu trữ thông tin của nhân viên
let editIndex = -1; // Biến để lưu chỉ số của nhân viên đang được chỉnh sửa

employeesForm.addEventListener("submit", function (event) {
  // Lấy giá trị từ form
  let name = document.getElementById("name").value;
  let age = parseInt(document.getElementById("age").value);
  let salary = parseInt(document.getElementById("salary").value);
  let position = document.getElementById("position").value;
  let email = document.getElementById("email").value;

  if (editIndex === -1) {
    // Nếu không ở chế độ chỉnh sửa, thêm nhân viên mới
    let employee = { name, age, salary, position, email };
    employees.push(employee);
  } else {
    // Nếu đang ở chế độ chỉnh sửa, cập nhật thông tin nhân viên
    employees[editIndex] = { name, age, salary, position, email };
    editIndex = -1; // Reset chế độ chỉnh sửa
  }

  // Cập nhật bảng
  updateTable();

  event.preventDefault(); // Ngăn form submit mặc định
  // Dùng reset() của form
  document.getElementById("employeesForm").reset();
});

// In các phần tử ra thẻ tbody
function updateTable(filteredEmployees = employees) {
  let bodyTable = document.querySelector("tbody");
  bodyTable.innerHTML = "";

  for (let i = 0; i < filteredEmployees.length; i++) {
    let employee = filteredEmployees[i];
    bodyTable.innerHTML += `
      <tr>
        <td>${employee.name}</td>
        <td>${employee.age}</td>
        <td>${employee.salary}</td>
        <td>${employee.position}</td>
        <td>${employee.email}</td>
        <td>
          <button onclick="editEmployee(${i})">Edit</button>
          <button onclick="deleteEmployee(${i})">Delete</button>
        </td>
      </tr>
    `;
  }
}

// Hàm sắp xếp bảng theo cột
function sortTable(column) {
  employees.sort((a, b) => {
    if (a[column] < b[column]) return -1;
    if (a[column] > b[column]) return 1;
    return 0;
  });

  updateTable();
}

// Hàm chỉnh sửa nhân viên
function editEmployee(index) {
  let employee = employees[index];
  document.getElementById("name").value = employee.name;
  document.getElementById("age").value = employee.age;
  document.getElementById("salary").value = employee.salary;
  document.getElementById("position").value = employee.position;
  document.getElementById("email").value = employee.email;

  editIndex = index; // Cập nhật chỉ số của nhân viên đang được chỉnh sửa
}

// Hàm xóa nhân viên
function deleteEmployee(index) {
  employees.splice(index, 1); // Xóa nhân viên khỏi mảng
  updateTable(); // Cập nhật lại bảng
}

// Hàm tìm kiếm nhân viên theo tên
function searchEmployee() {
  let searchValue = document.getElementById("search").value.toLowerCase();
  let filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchValue)
  );
  updateTable(filteredEmployees);
}
