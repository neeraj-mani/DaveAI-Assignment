const modalContainer = document.querySelector(".modal-container");
const modal = document.querySelector(".modal");
const openModalBtn = document.querySelector(".btn.open-modal");
const closeModalBtn = modal.querySelector(".close-modal-btn");
const form = document.querySelector(".modal-form");
const personListSection = document.querySelector(".person-list-section");
const detailContainer = document.querySelector(".detail-container");
const personDetailSection = document.querySelector(".person-all-details");
const closePersonDetailBtn = document.querySelector(".cross-icon");
const searchBar = document.querySelector(".search-bar");
const searchSection = document.querySelector(".search-section");
const searchSectionBg = searchSection.querySelector(".bg");
const searchForm = searchSection.querySelector(".search-form");

const personsArray = [];

// Utility Variables
const cityList = [
  "Agra",
  "Allahabad",
  "Aligarh",
  "Ambedkar Nagar",
  "Auraiya",
  "Azamgarh",
  "Barabanki",
  "Budaun",
  "Bagpat",
  "Bahraich",
  "Bijnor",
  "Ballia",
  "Banda",
  "Balrampur",
  "Bareilly",
  "Basti",
  "Bulandshahr",
  "Chandauli",
  "Chhatrapati Shahuji Maharaj Nagar",
  "Chitrakoot",
  "Deoria",
  "Etah",
  "Kanshi Ram Nagar",
  "Etawah",
  "Firozabad",
  "Farrukhabad",
  "Fatehpur",
  "Faizabad",
  "Gautam Buddh Nagar",
  "Gonda",
  "Ghazipur",
  "Gorakhpur",
  "Ghaziabad",
  "Hamirpur",
  "Hardoi",
  "Mahamaya Nagar",
  "Jhansi",
  "Jalaun",
  "Jyotiba Phule Nagar",
  "Jaunpur district",
  "Ramabai Nagar (Kanpur Dehat)",
  "Kannauj",
  "Kanpur",
  "Kaushambi",
  "Kushinagar",
  "Lalitpur",
  "Lakhimpur Kheri",
  "Lucknow",
  "Mau",
  "Meerut",
  "Maharajganj",
  "Mahoba",
  "Mirzapur",
  "Moradabad",
  "Mainpuri",
  "Mathura",
  "Muzaffarnagar",
  "Panchsheel Nagar district (Hapur)",
  "Pilibhit",
  "Shamli",
  "Pratapgarh",
  "Rampur",
  "Raebareli",
  "Saharanpur",
  "Sitapur",
  "Shahjahanpur",
  "Sant Kabir Nagar",
  "Siddharthnagar",
  "Sonbhadra",
  "Sant Ravidas Nagar",
  "Sultanpur",
  "Shravasti",
  "Unnao",
  "Varanasi",
];

// All Utility functions

const paginationCount = 6;
let currentPage = 1;

function renderPersonsList(persons) {
  personListSection.textContent = "";
  persons.forEach((person) => {
    personListSection.insertAdjacentHTML(
      "beforeend",
      `<div class="card">
          <div class="avatar-container">
            <img src="./assets/user.svg" alt="" class="avatar" />
          </div>
          <div class="person-info">
            <span class="person-fullname">${person.firstName} ${person.lastName}</span>
            <span class="person-city">${person.city}</span>
          </div>
          <button data-id="${person.id}" class="btn get-detail btn-bordered">Get Details</button>
        </div>`
    );
  });
  loadPaginationNumbers();
}

function showPersonDetails(id) {
  const [person] = personsArray.filter((value) => value.id === id);
  detailContainer.textContent = "";
  personDetailSection.classList.remove("closed");
  detailContainer.insertAdjacentHTML(
    "beforeend",
    `
  <div class="details">
            <span class="label-text">Full Name</span>
            <span class="label-value">${person.firstName} ${person.lastName}</span>
          </div>
          <div class="details">
            <span class="label-text">Phone</span>
            <span class="label-value">${person.phone}</span>
          </div>
          <div class="details">
            <span class="label-text">Email</span>
            <span class="label-value">${person.email}</span>
          </div>
          <div class="details">
            <span class="label-text">Date Of Birth</span>
            <span class="label-value">${person.dob}</span>
          </div>
          <div class="details">
            <span class="label-text">City</span>
            <span class="label-value">${person.city}</span>
          </div>
          <div class="details">
            <span class="label-text">Pincode</span>
            <span class="label-value">${person.pincode}</span>
          </div>
          
  `
  );
}

function isFormValidated() {
  if (!form["f-name"].value.trim()) {
    form["f-name"].nextElementSibling.textContent = "This field is required!";
    return false;
  } else {
    form["f-name"].nextElementSibling.textContent = "";
  }
  if (!form["l-name"].value.trim()) {
    form["l-name"].nextElementSibling.textContent = "This field is required!";
    return false;
  } else {
    form["l-name"].nextElementSibling.textContent = "";
  }
  if (!form["dob"].value.trim()) {
    form["dob"].nextElementSibling.textContent = "This field is required!";

    return false;
  } else {
    const age = new Date(
      Date.now() - new Date(form["dob"].value).getTime()
    ).getUTCFullYear();
    console.log(age - 1970);
    if (age - 1970 <= 18) {
      form["dob"].nextElementSibling.textContent = "Age must be above 18!";
      return false;
    }
    form["dob"].nextElementSibling.textContent = "";
  }
  if (!form["phone"].value.trim()) {
    form.querySelectorAll(".error")[4].textContent = "This field is required!";
    return false;
  } else {
    if (form["phone"].value.length !== 10) {
      form.querySelectorAll(".error")[4].textContent =
        "Phone number must be 10 digit long!";
      return false;
    }
    form.querySelectorAll(".error")[4].textContent = "";
  }
  if (form["city"].value === "none") {
    form["city"].nextElementSibling.textContent = "This field is required!";
    return false;
  } else {
    form["city"].nextElementSibling.textContent = "";
  }
  if (!form["pincode"].value.trim()) {
    form["pincode"].nextElementSibling.textContent = "This field is required!";
    return false;
  } else {
    form["pincode"].nextElementSibling.textContent = "";
  }
  if (!form["email"].value.trim()) {
    form["email"].nextElementSibling.textContent = "This field is required!";
    return false;
  } else {
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!form["email"].value.match(emailRegex)) {
      form["email"].nextElementSibling.textContent = "Invalid Email Address!";
      return false;
    }
    form["email"].nextElementSibling.textContent = "";
  }
  return true;
}

// All Events and handlers

openModalBtn.addEventListener("click", (e) => {
  modalContainer.classList.remove("closed");
  modal.classList.add("modal-opened");
});
closeModalBtn.addEventListener("click", (e) => {
  modalContainer.classList.add("closed");
  modal.classList.remove("modal-opened");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!isFormValidated()) return;
  const firstName = form["f-name"].value;
  form["f-name"].value = "";
  const lastName = form["l-name"].value;
  form["l-name"].value = "";
  const email = form["email"].value;
  form["email"].value = "";
  const phone = `+${form["country-code"].value} ${form["phone"].value}`;
  form["phone"].value = "";
  const dob = form["dob"].value;
  form["dob"].value = "";
  const city = form["city"].value;
  form["city"].value = "none";
  const pincode = form["pincode"].value;
  form["pincode"].value = "";
  const personDetail = {
    id: Date.now().toString(),
    firstName,
    lastName,
    email,
    phone,
    dob,
    city,
    pincode,
  };
  personsArray.unshift(personDetail);
  renderPersonsList(personsArray.slice(0, paginationCount));
  console.log(personDetail);
  modalContainer.classList.add("closed");
  modal.classList.remove("modal-opened");
});

personListSection.addEventListener("click", (e) => {
  if (e.target.classList.contains("get-detail")) {
    showPersonDetails(e.target.dataset.id);
  }
});

closePersonDetailBtn.addEventListener("click", (e) => {
  personDetailSection.classList.add("closed");
});

searchBar.addEventListener("click", (e) => {
  searchSection.classList.remove("closed");
  searchSectionBg.style.visibility = "visible";
});
searchSectionBg.addEventListener("click", (e) => {
  searchSection.classList.add("closed");
  searchSectionBg.style.visibility = "hidden";
});

(function loadCityList() {
  const cityOption = form.querySelector("select#city");
  const searchCityOption = searchForm.querySelector("select");
  console.log(cityOption);
  cityList.forEach((val) => {
    cityOption.insertAdjacentHTML(
      "beforeend",
      `<option value="${val}">${val}</option>`
    );
    searchCityOption.insertAdjacentHTML(
      "beforeend",
      `<option value="${val}">${val}</option>`
    );
  });
})();

// Searching

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchedPerson = personsArray
    .filter((person) => {
      return (person.firstName + " " + person.lastName)
        .toLowerCase()
        .includes(searchForm["name"].value.toLowerCase());
    })
    .filter((person) => {
      if (searchForm["city"].value === "none") return true;
      return (
        person.city.toLowerCase() === searchForm["city"].value.toLowerCase()
      );
    });
  console.log(searchedPerson);
  renderPersonsList(searchedPerson.slice(0, paginationCount));
});
// renderPersonsList(personsArray);

document
  .querySelector(".sort-section select")
  .addEventListener("change", function (e) {
    const sortedArray = personsArray.sort((personA, personB) => {
      if (
        personA.firstName + personA.lastName <
        personB.firstName + personB.lastName
      ) {
        return -1;
      } else {
        return 1;
      }
    });
    if (this.value === "asc") renderPersonsList(sortedArray.reverse());
    else if (this.value === "desc") renderPersonsList(sortedArray);
  });

// Pagination

const prevButton = document.querySelector("prev-button");
const nextButton = document.querySelector("next-button");
const pagination = document.querySelector(".pagination");

function loadPaginationNumbers() {
  const pageCount = Math.ceil(personsArray.length / paginationCount);
  pagination.textContent = "";
  for (let i = 1; i <= pageCount; i++) {
    pagination.insertAdjacentHTML(
      "beforeend",
      `<span class="page-number ${
        currentPage === i ? "active" : ""
      }">${i}</span>`
    );
  }
}

pagination.addEventListener("click", (e) => {
  if (e.target.classList.contains("page-number")) {
    pagination.querySelectorAll(".page-number").forEach((pageNum) => {
      pageNum.classList.remove("active");
    });
    e.target.classList.add("active");
    console.log(e.target);
    const pageNumber = Number(e.target.textContent);
    currentPage = pageNumber;
    const index = pageNumber - 1;
    console.log(index);
    renderPersonsList(
      personsArray.slice(
        index * paginationCount,
        index * paginationCount + paginationCount
      )
    );
  }
});

renderPersonsList(personsArray.slice(0, paginationCount));
