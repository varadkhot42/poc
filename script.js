let cropper;
let croppedImage = null;

// 📌 When user uploads image → open crop modal
document.getElementById("photo").addEventListener("change", function (e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = function (event) {
    const img = document.getElementById("cropImage");
    img.src = event.target.result;

    document.getElementById("cropModal").style.display = "flex";

    if (cropper) cropper.destroy();

    cropper = new Cropper(img, {
      aspectRatio: 1,
      viewMode: 1
    });
  };

  reader.readAsDataURL(file);
});

// 📌 Apply crop
function applyCrop() {
  const canvas = cropper.getCroppedCanvas({
    width: 300,
    height: 300
  });

  croppedImage = new Image();
  croppedImage.src = canvas.toDataURL();

  document.getElementById("cropModal").style.display = "none";
}

// 📌 Generate final poster
function generate() {
  const name = document.getElementById("name").value;
  const designation = document.getElementById("designation").value;

  if (!croppedImage) {
    alert("Upload & crop image first 😤");
    return;
  }

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  const template = new Image();
  template.src = "Gemini_Generated_Image_fsj7epfsj7epfsj7.png";

  template.onload = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(template, 0, 0, canvas.width, canvas.height);

    // =========================
    // 🖼 PHOTO (RIGHT BOX)
    // =========================
    const photoX = 940;
    const photoY = 285;
    const photoSize = 190;

    ctx.drawImage(croppedImage, photoX, photoY, photoSize, photoSize);

    // =========================
    // 📝 TEXT (CENTER BOX)
    // =========================
    ctx.textAlign = "center";

    // Auto-resize name
    let fontSize = 40;
    ctx.font = `bold ${fontSize}px Arial`;

    while (ctx.measureText(name).width > 320) {
      fontSize -= 2;
      ctx.font = `bold ${fontSize}px Arial`;
    }

    ctx.fillStyle = "#3b2e7e";
    ctx.fillText(name, 600, 465);

    // Designation
    ctx.font = "26px Arial";
    ctx.fillStyle = "#f5a623";
    ctx.fillText(designation, 600, 510);

    // =========================
    // ⬇️ DOWNLOAD
    // =========================
    const link = document.getElementById("download");
    link.href = canvas.toDataURL("image/png");
    link.style.display = "block";
  };
}