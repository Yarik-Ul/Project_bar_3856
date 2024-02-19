// table reservation

let orderedTables = {};

// We get data from localStorage and parse it, if there is any
if (localStorage.getItem("orderedTables") !== null) {
  orderedTables = JSON.parse(localStorage.getItem("orderedTables"));
}

const btnOrdertable = document.querySelector(".btn_order_table");

function orderTable() {
  let personsValue = document.querySelector(".number_persons").value;
  let dateValue = document.querySelector(".date_input").value;
  let timeValue = document.querySelector(".time_input").value;

  if (dateValue !== "" && timeValue !== "") {
    // We check whether there is an entry for dateValue in orderedTables
    if (!orderedTables[dateValue]) {
      orderedTables[dateValue] = [];
    }

    function showPopup(text) {
      let popUp = document.createElement("div");
      let firstview = document.querySelector(".first-view");
      firstview.append(popUp);
      popUp.classList.add("pop_up");
      popUp.innerText = `${text}`;
      setTimeout(() => {
        popUp.remove();
      }, 3000);
    }
    // We check whether the number of records for this dateValue does not exceed 10
    if (orderedTables[dateValue].length >= 10) {
      showPopup("Sorry, all tables are occupied for this date");
    } else {
      // We add a new object to the array for the specified key
      orderedTables[dateValue].push({
        persons: personsValue,
        date: dateValue,
        time: timeValue,
      });
      showPopup("Thank you for choosing us");

      // We store the updated object in localStorage
      localStorage.setItem("orderedTables", JSON.stringify(orderedTables));
    }
  } else {
    let popUp = document.createElement("div");
    let firstview = document.querySelector(".first-view");
    firstview.append(popUp);
    popUp.classList.add("pop_up");
    popUp.innerText = "All fields must be filled";
    setTimeout(() => {
      popUp.remove();
    }, 3000);
  }
}

btnOrdertable.addEventListener("click", orderTable);

// END table reservation

// smooth anchor links
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("list-link")) {
    e.preventDefault();
    const href = e.target.href.substr(e.target.href.indexOf("#") + 1);
    let elem = document.getElementById(href);
    const offset = elem.offsetTop;
    setTimeout(() => (window.location.hash = href), 100);
    window.scrollTo({ top: offset, left: 0, behavior: "smooth" });
  }
});
// END smooth anchor links

// button to up
const arrow = document.querySelector(".to-top");
const screenHeight = window.screen.height;
let arrowIsShown = false;

window.onscroll = () => {
  if (!arrowIsShown && window.scrollY >= screenHeight) {
    arrowIsShown = true;
    arrow.classList.remove("top-btn-hidden");
    arrow.classList.add("to-top");
  }
  if (arrowIsShown && window.scrollY < screenHeight) {
    arrowIsShown = false;
    arrow.classList.add("top-btn-hidden");
    arrow.classList.remove("to-top");
  }
};

arrow.onclick = () => window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
// END button to up
