const data = [
  {
    title: "Free vibration of cantilever beam",
    path: "FreeVibrationCantileverBeam",
  },
  {
    title: "Free vibration of cantilever beam 1",
    path: "FreeVibrationCantileverBeam1",
  },
  {
    title: "Free vibration of cantilever beam 2",
    path: "FreeVibrationCantileverBeam2",
  },
  {
    title: "Free vibration of cantilever beam 3",
    path: "FreeVibrationCantileverBeam3",
  },
  {
    title: "Free vibration of simply supported beam",
    path: "exp-simply-supported-beam-nitk",
  },
  {
    title: "Free vibration of fixed beam",
    path: "exp-fixed-beam-nitk",
  },
  {
    title: "Forced vibration of SDOF system",
    path: "exp_sdof_system_nitk",
  },
  {
    title: "Base Excitation",
    path: "exp_base_excitation_nitk",
  },
  {
    title: "Rotating Unbalance",
    path: "exp-rotating-unbalance-nitk",
  },
  {
    title: "2DOF Forced vibration",
    path: "exp-forced-vibration-nitk",
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
