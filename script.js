document.getElementById("mode-toggle").addEventListener("click", () => {
  const t = document.documentElement.getAttribute("data-theme");
  document.documentElement.setAttribute("data-theme", t === "light" ? "dark" : "light");
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
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalContent");
const closeBtn = document.querySelector(".close");

certificates.forEach(c => {
  const d = document.createElement("div");
  d.className = "cert-item";
  d.innerHTML = `<p>${c.name}</p>`;
  d.onclick = () => {
    modalImg.src = c.path;
    modal.style.display = "flex";
  };
  certContainer.appendChild(d);
});

closeBtn.onclick = () => modal.style.display = "none";
window.onclick = e => { if (e.target === modal) modal.style.display = "none"; };
