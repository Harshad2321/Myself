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

const container = document.getElementById("certificate-container");
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-content");
const closeModal = document.getElementById("close");

certificates.forEach(cert => {
  const img = document.createElement("img");
  img.src = cert.path;
  img.alt = cert.name;
  img.title = cert.name;
  img.addEventListener("click", () => {
    modal.style.display = "block";
    modalImg.src = cert.path;
    modalImg.alt = cert.name;
  });
  container.appendChild(img);
});

closeModal.onclick = () => {
  modal.style.display = "none";
};

window.onclick = (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};
