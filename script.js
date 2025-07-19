document.getElementById("mode-toggle").addEventListener("click", () => {
  const theme = document.documentElement.getAttribute("data-theme");
  document.documentElement.setAttribute("data-theme", theme === "light" ? "dark" : "light");
});

document.getElementById("back-to-top").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const certificates = [
  { name: "Python", path: "assets/certificates/python-certificate.png" },
  { name: "AI-ML", path: "assets/certificates/basic-aiml.png" },
  { name: "Nation Building", path: "assets/certificates/nation-building.png" },
  { name: "EXERGY IIT Kanpur", path: "assets/certificates/exergy-iitk.png" },
  { name: "Simplilearn", path: "assets/certificates/python-simplilearn.png" },
  { name: "Go4Youth", path: "assets/certificates/go4youth.png" },
  { name: "ICFAMEAD", path: "assets/certificates/icfamead.png" },
  { name: "Hackathon", path: "assets/certificates/2fast2hack.png" }
];

const certContainer = document.getElementById("certContainer");

certificates.forEach(cert => {
  const div = document.createElement("div");
  div.className = "cert-item";
  div.innerHTML = `<p>${cert.name}</p>`;
  div.addEventListener("click", () => openModal(cert.path));
  certContainer.appendChild(div);
});

const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");

function openModal(src) {
  modalContent.src = src;
  modal.style.display = "flex";
}

document.querySelector(".close").onclick = () => {
  modal.style.display = "none";
  modalContent.src = "";
};

window.onclick = e => {
  if (e.target === modal) {
    modal.style.display = "none";
    modalContent.src = "";
  }
};
