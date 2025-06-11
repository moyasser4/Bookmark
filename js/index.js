var siteNameInput = document.getElementById("siteName");
var siteURLInput = document.getElementById("siteURL");

var linksContainer = [];
if (localStorage.getItem("links") !== null) {
  linksContainer = JSON.parse(localStorage.getItem("links"));
  display();
}

function addLink() {
  if (validateInput(siteNameInput) && validateInput(siteURLInput)) {
    var link = {
      linkName: siteNameInput.value,
      linkURL: siteURLInput.value,
    };
    linksContainer.push(link);
    localStorage.setItem("links", JSON.stringify(linksContainer));
    display();
    clear();
  } else {
    Swal.fire({
      icon: "error",
      title: "Site Name or Url is not valid, Please follow the rules below :",
      text: "Site name must contain at least 3 characters, Site URL must be a valid one",
    });
  }
}

function display() {
  var cartona = ``;
  for (var i = 0; i < linksContainer.length; i++) {
    cartona += `
  <tr>
  <th>${i + 1}</th>
  <td class="linkName">${linksContainer[i].linkName}</td>
  <td><a class="btn btn-success" href="http://${
    linksContainer[i].linkURL
  }" target="_blank"><i class="fa-solid fa-eye"></i> Visite</a></td>
  <td><button onclick="deleteLink(${i})" type="button" class="btn btn-danger text-white"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
  </tr>
  `;
  }
  document.getElementById("tableBody").innerHTML = cartona;
}

function clear() {
  siteNameInput.value = null;
  siteURLInput.value = null;
}

function deleteLink(deletedIndex) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      linksContainer.splice(deletedIndex, 1);
      display();
      localStorage.setItem("links", JSON.stringify(linksContainer));
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
    }
  });
}

function deleteAll() {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      linksContainer.splice(0);
      display();
      localStorage.setItem("links", JSON.stringify(linksContainer));
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
    }
  });
}

function validateInput(ele) {
  var regex = {
    siteName: /^[a-zA-Z0-9\s]{3,}$/,
    siteURL: /^(https?:\/\/)?(www\.)?[a-zA-Z0-9\-]+(\.[a-zA-Z]{2,})(\/\S*)?$/,
  };

  if (regex[ele.id].test(ele.value)) {
    ele.classList.add("is-valid");
    ele.classList.remove("is-invalid");
    return true;
  } else {
    ele.classList.remove("is-valid");
    ele.classList.add("is-invalid");
    return false;
  }
}
