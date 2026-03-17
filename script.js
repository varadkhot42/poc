let uploadedImage = null;

// 📌 Handle image upload
document.getElementById("photo").addEventListener("change", function (e) {
 const file = e.target.files[0];
 if (!file) return;

 const img = new Image();
 img.src = URL.createObjectURL(file);

 img.onload = function () {
 uploadedImage = img;
 };
});

// 📌 Generate Poster
document.getElementById("generateBtn").addEventListener("click", function () {

 const name = document.getElementById("name").value;
 const designation = document.getElementById("designation").value;

 if (!uploadedImage) {
 alert("Please upload an image 😤");
 return;
 }

 const canvas = document.getElementById("canvas");
 const ctx = canvas.getContext("2d");

 const template = new Image();
 template.src = "./Gemini_Generated_Image_oy8g12oy8g12oy8g.png";

 template.onload = function () {

 // Draw background
 ctx.clearRect(0, 0, canvas.width, canvas.height);
 ctx.drawImage(template, 0, 0, canvas.width, canvas.height);

 // =========================
 // 📸 PHOTO (TOP RIGHT)
 // =========================
 const photoX = 900;
 const photoY = 200;
 const size = 220;

 ctx.save();
 ctx.beginPath();
 ctx.arc(photoX + size/2, photoY + size/2, size/2, 0, Math.PI * 2);
 ctx.clip();
 ctx.drawImage(uploadedImage, photoX, photoY, size, size);
 ctx.restore();

 // =========================
 // 📝 NAME
 // =========================
 ctx.textAlign = "center";

 let fontSize = 42;
 ctx.font = `bold ${fontSize}px Arial`;

 while (ctx.measureText(name).width > 300) {
 fontSize -= 2;
 ctx.font = `bold ${fontSize}px Arial`;
 }

 ctx.fillStyle = "hashtag#ffffff";
 ctx.fillText(name, 1010, 470);

 // =========================
 // 📝 DESIGNATION
 // =========================
 ctx.font = "26px Arial";
 ctx.fillStyle = "hashtag#f0d48a";
 ctx.fillText(designation, 1010, 510);

 // =========================
 // ⬇️ DOWNLOAD
 // =========================
 const link = document.getElementById("download");
 link.href = canvas.toDataURL("image/png");
 link.style.display = "block";
 };

 template.onerror = function () {
 alert("Template image not found!");
 };
});