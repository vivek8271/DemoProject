const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((sec) => {
    const secTop = sec.offsetTop - 120;
    if (pageYOffset >= secTop) current = sec.getAttribute("id");
  });
  navLinks.forEach((l) => {
    l.classList.remove("active");
    if (l.getAttribute("href") === "#" + current) l.classList.add("active");
  });
});

// Quick quote form
const quickQuoteFor = document.getElementById("quickQuoteForm");
const quickQuoteMsg = document.getElementById("quickQuoteMsg");
quickQuoteFor.addEventListener("submit", async(e) => {
    e.preventDefault();

    const formData = {
    name: quickQuoteFor.name.value,
    mobile_no: quickQuoteFor.phone.value,
    email: quickQuoteFor.email.value,
    product: quickQuoteFor.product.value,
    quantity : quickQuoteFor.quantity.value,
    address : quickQuoteFor.location.value,
    message: quickQuoteFor.message.value,
    
  };

  try {
    await fetch("https://backend-plum-two-11.vercel.app/api/quick-quote-form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    // const result = await response.text();

    alert("form submit success");
  } catch (error) {
    console.error("Error sending form:", error);

    alert("form submition failed");
  }

  quickQuoteMsg.classList.remove("d-none");
  quickQuoteFor.reset();
});

// Contact form + WhatsApp deeplink
const contactFor = document.getElementById("contactForm");
const contactMsg = document.getElementById("contactMsg");
const waLink = document.getElementById("waLink");
const waFab = document.getElementById("waFab");
const whatsappNumber = "910000000000"; // Replace with your WhatsApp number, e.g., 9198XXXXXXXX

function buildWhatsAppURL(fields) {
  const text = `Hello Aditi Enterprises,%0AName: ${fields.name}%0APhone: ${
    fields.phone
  }%0AEmail: ${fields.email || "-"}%0AAddress: ${
    fields.address || "-"
  }%0AMessage: ${fields.message}`;
  return `https://wa.me/${whatsappNumber}?text=${text}`;
}
waLink.addEventListener("click", (e) => {
  e.preventDefault();
  const url = `https://wa.me/${whatsappNumber}?text=Hello%20Aditi%20Enterprises,%20I%20want%20to%20discuss%20materials%20and%20pricing.`;
  window.open(url, "_blank");
});
contactFor.addEventListener("submit", async(e) => {
  e.preventDefault();

  const formData = {
    name: contactFor.name.value,
    mobile_no: contactFor.phone.value,
    email: contactFor.email.value,
    address : contactFor.address.value,
    message: contactFor.message.value,
    
  };

  try {
    await fetch("https://backend-plum-two-11.vercel.app/api/contact-form.js", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    // const result = await response.text();

    alert("form submit success");
  } catch (error) {
    console.error("Error sending form:", error);

    alert("form submition failed");
  }

//   const formData = new FormData(contactForm);
//   const fields = Object.fromEntries(formData.entries());
//   const url = buildWhatsAppURL(fields);
//   waLink.setAttribute("href", url);
  contactMsg.classList.remove("d-none");
  contactFor.reset();
//   window.open(url, "_blank");
});

// Calculator (simple estimate)
const calcForm = document.getElementById("calcForm");
const calcOut = document.getElementById("calcOut");
const outVol = document.getElementById("outVol");
const outCem = document.getElementById("outCem");
const outSand = document.getElementById("outSand");
const outAgg = document.getElementById("outAgg");

calcForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const L = parseFloat(document.getElementById("len").value || 0);
  const W = parseFloat(document.getElementById("wid").value || 0);
  const T = parseFloat(document.getElementById("thk").value || 0);
  const mix = document.getElementById("mix").value;

  const vol = L * W * T; // m³
  // Very basic proportion for demonstration; real design may differ.
  const ratios = mix.split(":").map(Number); // [cement, sand, aggregate]
  const sum = ratios.reduce((a, b) => a + b, 0);
  const cementFraction = ratios[0] / sum;
  const sandFraction = ratios[1] / sum;
  const aggFraction = ratios[2] / sum;

  // Assume 1 m³ concrete consumes ~0.5 m³ combined dry volume (illustrative),
  // and 1 bag cement ~50 kg, density ~1440 kg/m³ => ~0.035 m³/bag.
  const dryVol = vol * 1.52; // conversion for dry volume (typical factor)
  const cementVol = dryVol * cementFraction;
  const sandVol = dryVol * sandFraction;
  const aggVol = dryVol * aggFraction;

  const bagVol = 50 / 1440; // m³ per bag ≈ 0.0347
  const cementBags = Math.ceil(cementVol / bagVol);

  outVol.textContent = vol.toFixed(2);
  outCem.textContent = cementBags;
  outSand.textContent = sandVol.toFixed(2);
  outAgg.textContent = aggVol.toFixed(2);

  calcOut.classList.remove("d-none");
});





