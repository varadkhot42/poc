function generate() {
  const name = document.getElementById("name").value;
  const designation = document.getElementById("designation").value;
  const file = document.getElementById("photo").files[0];

  if (!file) {
    alert("Upload image 😤");
    return;
  }

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  const template = new Image();
  template.src = "Gemini_Generated_Image_oy8g12oy8g12oy8g.png";

  template.onload = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(template, 0, 0, canvas.width, canvas.height);

    const reader = new FileReader();

    reader.onload = function (e) {
      const img = new Image();
      img.src = e.target.result;

      img.onload = function () {

        // =========================
        // 🔥 AUTO SQUARE CROP
        // =========================
        const minSize = Math.min(img.width, img.height);
        const sx = (img.width - minSize) / 2;
        const sy = (img.height - minSize) / 2;

        // =========================
        // 📍 POSITION (BOTTOM RIGHT BLOCK)
        // =========================
        const centerX = 1000;
        const photoY = 360;
        const photoSize = 100;

        // =========================
        // 🟡 CIRCULAR PHOTO
        // =========================
        ctx.save();
        ctx.beginPath();
        ctx.arc(centerX, photoY, photoSize / 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();

        ctx.drawImage(
          img,
          sx,
          sy,
          minSize,
          minSize,
          centerX - photoSize / 2,
          photoY - photoSize / 2,
          photoSize,
          photoSize
        );

        ctx.restore();

        // =========================
        // 📝 TEXT (CENTERED BELOW PHOTO)
        // =========================
        ctx.textAlign = "center";

        // Name
        let fontSize = 30;
        ctx.font = `bold ${fontSize}px Arial`;

        while (ctx.measureText(name).width > 220 && fontSize > 18) {
          fontSize -= 2;
          ctx.font = `bold ${fontSize}px Arial`;
        }

        ctx.fillStyle = "#5a2d0c"; // dark warm brown
        ctx.fillText(name, centerX, 450);

        // Designation
        ctx.font = "20px Arial";
        ctx.fillStyle = "#8b5e34";
        ctx.fillText(designation, centerX, 480);

        // =========================
        // ⬇️ DOWNLOAD
        // =========================
        const link = document.getElementById("download");
        link.href = canvas.toDataURL("image/png");
        link.style.display = "block";
      };
    };

    reader.readAsDataURL(file);
  };
}