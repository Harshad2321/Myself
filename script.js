AOS.init();

const toggle = document.getElementById('toggle-mode');
toggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

// Modal logic
function openModal(certName) {
  const modal = document.getElementById("modal");
  const content = document.getElementById("modal-content");
  content.src = `assets/certificates/${certName}`;
  modal.style.display = "block";
}
function closeModal() {
  document.getElementById("modal").style.display = "none";
}
