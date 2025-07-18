document.addEventListener("DOMContentLoaded", () => {
    const certificates = [
        "2 FAST 2 HACK.pdf",
        "Basic Of AI-ML.pdf",
        "CERTIFICATE OF NATION BUILDING.pdf",
        "Certificate ICFAMEAD.pdf",
        "EXERGY Harshad Agrawal.png",
        "Harshad_Agrawal_Resume.pdf",
        "IN12103479_go4youth_certificate.pdf",
        "CERTIFICATE OF PYTHON-1.png"
    ];
    const container = document.querySelector(".certificate-list");

    certificates.forEach(file => {
        const link = document.createElement("a");
        link.href = `assets/certificates/${file}`;
        link.target = "_blank";
        link.innerText = file.replace(/_/g, " ");
        container.appendChild(link);
    });
});
