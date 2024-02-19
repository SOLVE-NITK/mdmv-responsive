const data = [
  {
    title: "Free vibration of cantilever beam",
    path: "",
  },
  {
    title: "Free vibration of simply supported beam",
    path: "",
  },
  {
    title: "Free vibration of fixed beam",
    path: "",
  },
  {
    title: "Forced vibration of SDOF system",
    path: "exp-sdof-system-nitk",
  },
  {
    title: "Base Excitation",
    path: "",
  },
  {
    title: "Rotating Unbalance",
    path: "exp-rotating-unbalance-nitk",
  },
  {
    title: "2DOF Forced vibration",
    path: "",
  },
  {
    title: "Dynamic Vibration Absorber",
    path: "exp-dynamic-vibration-absorber-nitk",
  },
];

const filterInput = function (val) {
  const filteredArray = data.filter(
    (d) =>
      d.title.toLowerCase().includes(val.toLowerCase()) ||
      d.intern.toLowerCase().includes(val.toLowerCase())
  );
  displayExperiments(filteredArray);
};

const searchInput = document.querySelector(".search__input");
searchInput.addEventListener("input", function (e) {
  filterInput(e.target.value);
});

const row = document.querySelector(".row");
const displayExperiments = function (data) {
  row.innerHTML = "";
  data.forEach((d) => {
    if (!d.path) return;
    const col = document.createElement("div");
    col.classList.add("col");
    col.textContent = d.title;
    const intern = document.createElement("p");
    intern.classList.add("intern");
    // intern.textContent = d.intern;
    const link = document.createElement("a");
    link.classList.add("link");
    link.href = `${d.path}/index.html`;
    link.target = "_blank";
    // link.textContent = "Click Here";
    // col.appendChild(intern);
    link.appendChild(col);
    row.appendChild(link);
  });
};
displayExperiments(data);

console.log(data.map((d) => d.title));
