const CustomButton = document.querySelector(".custom");
const CustomsContainer = document.querySelector(".customs");

const MaleSectionWrapper = document.querySelector(".male");
const FemaleSectionWrapper = document.querySelector(".female");

const MaleToggleBtn = document.querySelector(".maleCust");
const FemaleToggleBtn = document.querySelector(".femaleCust");

const MaleParts = document.querySelectorAll(".leftM, .rightM, .centerM, .shoesM");
const FemaleParts = document.querySelectorAll(".left, .right, .center, .shoes");

const mainM1 = document.getElementById("mainImageM");
const mainM2 = document.getElementById("mainImageM2");
const mainM3 = document.getElementById("mainImageM3");

const mainF1 = document.getElementById("mainImage");
const mainF2 = document.getElementById("mainImage2");
const mainF3 = document.getElementById("mainImage3");

// Category Arrays
const shirtImages = [];
const jacketImages = [];
const pantsImages = [];
const shortImages = [];
const shoesImages = []; 

const TopImages = [];
const dressImages = []; 
const skirtImages = [];
const pantmages = [];
const shoeFemaleImages = [];

CustomButton.addEventListener("click", () => {
    CustomsContainer.style.display = "block";
    MaleParts.forEach(part => part.style.display = "none");
    FemaleParts.forEach(part => part.style.display = "none");
});

MaleToggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    MaleParts.forEach(part => part.style.display = "block");
    FemaleParts.forEach(part => part.style.display = "none");
});

FemaleToggleBtn.addEventListener("click", (e) =>{
    e.stopPropagation();
    MaleParts.forEach(part => part.style.display = "none");
    FemaleParts.forEach(part => part.style.display = "block");
});

/**
 * FIXED: 
 * 1. Pushes to specific category arrays based on uploadId.
 * 2. Added Double-Click to Delete functionality.
 */
function setupUploader(uploadId, previewId, targetMainImage) {
    const upload = document.getElementById(uploadId);
    const preview = document.getElementById(previewId);

    if(!upload || !preview) return;

    // Determine which array to use based on the ID
    let targetArray;
    if (uploadId === "upload") targetArray = shirtImages;
    else if (uploadId === "upload2") targetArray = jacketImages;
    else if (uploadId === "upload3") targetArray = pantsImages;
    else if (uploadId === "upload4") targetArray = shortImages;
    else if (uploadId === "upload5") targetArray = shoesImages;
    else if (uploadId === "uploadF") targetArray = TopImages;
    else if (uploadId === "uploadF2") targetArray = dressImages;
    else if (uploadId === "uploadF3") targetArray = skirtImages;
    else if (uploadId === "uploadF4") targetArray = pantmages;
    else if (uploadId === "uploadF5") targetArray = shoeFemaleImages;

    upload.addEventListener("change", function () {
        const files = this.files;
        for (let file of files) {
            if (!file.type.startsWith("image/")) continue;

            const reader = new FileReader();
            reader.onload = function (e) {
                const imgSrc = e.target.result;

                targetArray.push(imgSrc);

                const img = document.createElement("img");
                img.src = imgSrc;
                img.style.width = "80px"; 
                img.style.cursor = "pointer";
                img.title = "Double click to delete";
                img.classList.add("selectable-item");

                // Click to show on model
                img.addEventListener("click", () => {
                    if(targetMainImage) {
                        targetMainImage.src = img.src;
                        targetMainImage.style.display = "block";
                    }
                });

                // NEW: Double click to delete mechanism
                img.addEventListener("dblclick", () => {
                    const index = targetArray.indexOf(imgSrc);
                    if (index > -1) targetArray.splice(index, 1);
                    img.remove();
                    // Clear main image if it was the one deleted
                    if (targetMainImage.src === imgSrc) {
                        targetMainImage.src = "";
                        targetMainImage.style.display = "none";
                    }
                });

                preview.appendChild(img);
            };
            reader.readAsDataURL(file);
        }
        upload.value = "";
    });
}

// Initializing Uploaders
setupUploader("upload", "preview", mainM1);   
setupUploader("upload2", "preview2", mainM1); 
setupUploader("upload3", "preview3", mainM2); 
setupUploader("upload4", "preview4", mainM2); 
setupUploader("upload5", "preview5", mainM3); 

setupUploader("uploadF", "previewF", mainF1);  
setupUploader("uploadF2", "previewF2", mainF1); 
setupUploader("uploadF3", "previewF3", mainF2); 
setupUploader("uploadF4", "previewF4", mainF2); 
setupUploader("uploadF5", "previewF5", mainF3); 

// RANDOM FUNCTIONS
function randomM() {
  const combinedTops = [...shirtImages, ...jacketImages];
  const combinedBottoms = [...pantsImages, ...shortImages];

  if (combinedTops.length === 0 || combinedBottoms.length === 0 || shoesImages.length === 0) {
    alert("Please upload at least one Top, one Bottom, and one pair of Shoes!");
    return;
  }

  mainM1.src = combinedTops[Math.floor(Math.random() * combinedTops.length)];
  mainM2.src = combinedBottoms[Math.floor(Math.random() * combinedBottoms.length)];
  mainM3.src = shoesImages[Math.floor(Math.random() * shoesImages.length)];

  mainM1.style.display = "block";
  mainM2.style.display = "block";
  mainM3.style.display = "block";
}

function getRandom(arr){
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomF(){

  // choose outfit type randomly
  const outfitType = Math.random() < 0.5 ? "DRESS" : "SEPARATE";

  /* ---------------- DRESS MODE ---------------- */
  if(outfitType === "DRESS" && dressImages.length){

    mainF1.src = getRandom(dressImages); // dress
    mainF3.src = getRandom(shoeFemaleImages); // shoes

    mainF1.style.display = "block";
    mainF2.style.display = "none"; // hide tops
    mainF3.style.display = "block";

    console.log("Dress outfit selected");
  }

  /* ---------------- TOP + BOTTOM MODE ---------------- */
  else if(
    TopImages.length &&
    skirtImages.length &&
    shoeFemaleImages.length
  ){

    mainF1.src = getRandom(TopImages); // top
    mainF2.src = getRandom(skirtImages); // bottom
    mainF3.src = getRandom(shoeFemaleImages); // shoes

    mainF1.style.display = "block";
    mainF2.style.display = "block";
    mainF3.style.display = "block";

    console.log("Top + Bottom outfit selected");
  }
}
// DOWNLOAD FUNCTIONS
function downloadF() {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const width = 400;
  const height = 600;

  canvas.width = width;
  canvas.height = height;


// Total canvas height is 600px. We divide it proportionally:
  const images = [
    { img: mainImage, ySlot: 0, boxW: 350, boxH: 220 },     // Shirt: Top slot (Height: 220)
    { img: mainImage2, ySlot: 220, boxW: 350, boxH: 280 },  // Pants: Middle slot (Height: 280 -> BIGGEST)
    { img: mainImage3, ySlot: 500, boxW: 200, boxH: 100 }   // Shoes: Bottom slot (Height: 100 -> SMALLEST)
  ];
  const activeImages = images.filter(item => {
    const hasSrc = item.img.src && item.img.getAttribute('src') !== "";
    const isVisible = window.getComputedStyle(item.img).display !== "none";
    return hasSrc && isVisible;
  });
 if (activeImages.length === 0) {
    alert("Warning: Please select at least one clothing item before downloading!");
    return;
  }
  let loadedImages = 0;

  activeImages.forEach(item => {
    const image = new Image();
    image.src = item.img.src;

    image.onload = function () {
      const scale = Math.min(item.boxW / image.width, item.boxH / image.height);
      const drawWidth = image.width * scale;
      const drawHeight = image.height * scale;

      // 2. Center the image horizontally in the 400px canvas, and vertically inside its 200px slot
      const drawX = (400 - drawWidth) / 2;
      const drawY = item.ySlot + (item.boxH - drawHeight) / 2;

      // 3. Draw it!
      ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight);
      
      loadedImages++;

      if (loadedImages === activeImages.length) {
        const link = document.createElement("a");
        link.download = "MyFemaleOutfit.jpg";
        link.href = canvas.toDataURL("image/jpg");
        link.click();
      }
    };
  });
}
function downloadM() {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const width = 400;
  const height = 600;

  canvas.width = width;
  canvas.height = height;


const images = [
    { img: mainImageM, ySlot: 0, boxW: 350, boxH: 204 },     // Shirt
    { img: mainImageM2, ySlot: 220, boxW: 350, boxH: 255 },  // Pants (Biggest)
    { img: mainImageM3, ySlot: 500, boxW: 200, boxH: 98 }   // Shoes (Smallest)
  ];
   const activeImages = images.filter(item => {
    const hasSrc = item.img.src && item.img.getAttribute('src') !== "";
    const isVisible = window.getComputedStyle(item.img).display !== "none";
    return hasSrc && isVisible;
  });


  // ✅ VALIDATION FIRST
if (activeImages.length === 0) {
    alert("Warning: Please select at least one clothing item before downloading!");
    return;
  }
  let loadedImages = 0;

  activeImages.forEach(item => {
    const image = new Image();
    image.src = item.img.src;

    image.onload = function () {
      const scale = Math.min(item.boxW / image.width, item.boxH / image.height);
      const drawWidth = image.width * scale;
      const drawHeight = image.height * scale;

      // 2. Center the image horizontally in the 400px canvas, and vertically inside its 200px slot
      const drawX = (400 - drawWidth) / 2;
      const drawY = item.ySlot + (item.boxH - drawHeight) / 2;

      // 3. Draw it!
      ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight);
      
      loadedImages++;

      if (loadedImages === activeImages.length) {
        const link = document.createElement("a");
        link.download = "MyMaleOutfit.jpg";
        link.href = canvas.toDataURL("image/png");
        link.click();
      }
    };
  });
}

const slide = document.querySelectorAll(".slider img")
let sliderIndex = 0
let intervaId = null
document.addEventListener("DOMContentLoaded" , init)

function init(){
   if(slide.length > 0){
    slide[sliderIndex].classList.add("displaySlide")
   
   intervaId = setInterval(next,3000)
   }
}

function showSlide(index) {

    if (index >= slide.length) {
        sliderIndex = 0;
    } 
    else if (index < 0) {
        sliderIndex = slide.length - 1;
    } 
    slide.forEach(s => s.classList.remove("displaySlide"));
    slide[sliderIndex].classList.add("displaySlide");
}
function pre(){
  clearInterval(intervaId);
    sliderIndex--;
   showSlide(sliderIndex);

}
function next(){
  sliderIndex++;
    showSlide(sliderIndex);

}
async function loadModel() {
  const net = await bodyPix.load();
  console.log("Model Loaded!");
}

loadModel();
/* ==========================================
   FOOTER & NAVIGATION LOGIC 
   (Appended to make the site fully functional)
   ========================================== */

// 1. Dynamic Year Update
const footElement = document.querySelector(".foot");
if (footElement) {
    const currentYear = new Date().getFullYear();
    footElement.innerHTML = `&copy; ${currentYear} Rebecca Mafito | All Rights Reserved`;
}

// 2. Mobile Menu Toggle (Making the Menu Icon work)
/* ==========================================
   MOBILE NAVIGATION LOGIC 
   ========================================== */

const menuBtn = document.getElementById("menu-icon");
const navMenu = document.querySelector(".nav-link");

if (menuBtn && navMenu) {
    menuBtn.addEventListener("click", function() {
        // Toggle the 'active' class to show/hide the menu
        navMenu.classList.toggle("active");
        
        // Change the icon from hamburger to "X"
        const iconElement = menuBtn.querySelector("i");
        if (navMenu.classList.contains("active")) {
            iconElement.classList.replace("bx-menu", "bx-x");
        } else {
            iconElement.classList.replace("bx-x", "bx-menu");
        }
    });

    document.querySelectorAll(".nav-link a").forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            const iconElement = menuBtn.querySelector("i");
            iconElement.classList.replace("bx-x", "bx-menu");
        });
    });
}

/* ============================================================
   END OF MOBILE NAVBAR LOGIC
   ============================================================ */
// 3. Smooth Scrolling for Navigation (Making links work)
document.querySelectorAll('.nav-link li a').forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove("active");
        const icon = menuIcon.querySelector("i");
        icon.classList.replace("bx-x", "bx-menu");
    });
});
// 4. "Back to Top" behavior (Clicking footer text scrolls up)
if (footElement) {
    footElement.style.cursor = "pointer";
    footElement.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}
