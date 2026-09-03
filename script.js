
// =========================================================
// Doctor Filter
// =========================================================

const filter_buttons = document.querySelectorAll(".filter-btn");
const gallery_items = document.querySelectorAll(".gallery-item");

filter_buttons.forEach((button) => {

    button.addEventListener("click", () => {

        // Remove active class from all buttons
        filter_buttons.forEach((btn) => {
            btn.classList.remove("active");
        });

        // Add active class to clicked button
        button.classList.add("active");

        // Get the selected filter
        const filter_value = button.dataset.filter;

        // Show or hide doctors
        gallery_items.forEach((item) => {

            if (
                filter_value === "all" ||
                item.classList.contains(filter_value)
            ) {
                item.classList.remove("hidden");
            } else {
                item.classList.add("hidden");
            }

        });

    });

});


// =========================================================
// Swiper Slider
// =========================================================

const swiperContainer = document.querySelector(".slider-wrapper.swiper");

if (swiperContainer) {

    const swiper = new Swiper(swiperContainer, {

        loop: true,

        grabCursor: true,

        spaceBetween: 30,

        slidesPerView: 1,

        pagination: {
            el: swiperContainer.querySelector(".swiper-pagination"),
            clickable: true,
            dynamicBullets: true
        },

        navigation: {
            nextEl: swiperContainer.querySelector(".swiper-button-next"),
            prevEl: swiperContainer.querySelector(".swiper-button-prev")
        },

        breakpoints: {

            // Mobile
            0: {
                slidesPerView: 1
            },

            // Tablet
            620: {
                slidesPerView: 1
            },

            // Desktop
            1024: {
                slidesPerView: 1
            }

        }

    });

}


// =========================================================
// Mobile Sidebar
// =========================================================

function showsidebar() {

    const sidebar = document.querySelector(".sidebar");

    if (sidebar) {
        sidebar.style.display = "flex";
    }

}


function hidesidebar() {

    const sidebar = document.querySelector(".sidebar");

    if (sidebar) {
        sidebar.style.display = "none";
    }

}


// =========================================================
// Appointment Form Validation
// =========================================================

const myform = document.getElementById("myform");
const validationMessage = document.getElementById("validationMessage");


// Check that form exists before adding event
if (myform) {

    myform.addEventListener("submit", function (e) {

        e.preventDefault();

        // Clear previous validation message
        validationMessage.innerHTML = "";


        // =====================================================
        // Get Form Elements
        // =====================================================

        const fullname = document.querySelector('[name="fullname"]');
        const email = document.querySelector('[name="email"]');
        const phone = document.querySelector('[name="tel"]');
        const doctor = document.querySelector('[name="doctors"]');
        const date = document.querySelector('[name="date"]');
        const message = document.querySelector('[name="message"]');


        // =====================================================
        // Remove Previous Validation Classes
        // =====================================================

        const inputs = [
            fullname,
            email,
            phone,
            doctor,
            date,
            message
        ];

        inputs.forEach((input) => {

            input.classList.remove("valid");
            input.classList.remove("invalid");

        });


        // =====================================================
        // Validation State
        // =====================================================

        let isValid = true;


        // =====================================================
        // Full Name Validation
        // =====================================================

        const fullnameValue = fullname.value.trim();

        if (fullnameValue === "") {

            fullname.classList.add("invalid");

            isValid = false;

        }
        else if (fullnameValue.length < 3) {

            fullname.classList.add("invalid");

            isValid = false;

        }
        else {

            fullname.classList.add("valid");

        }


        // =====================================================
        // Email Validation
        // =====================================================

        const emailValue = email.value.trim();

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (emailValue === "") {

            email.classList.add("invalid");

            isValid = false;

        }
        else if (!emailPattern.test(emailValue)) {

            email.classList.add("invalid");

            isValid = false;

        }
        else {

            email.classList.add("valid");

        }


        // =====================================================
        // Phone Validation
        // =====================================================

        const phoneValue = phone.value.trim();

        const phonePattern = /^[0-9]{10,15}$/;


        if (phoneValue === "") {

            phone.classList.add("invalid");

            isValid = false;

        }
        else if (!phonePattern.test(phoneValue)) {

            phone.classList.add("invalid");

            isValid = false;

        }
        else {

            phone.classList.add("valid");

        }


        // =====================================================
        // Doctor Validation
        // =====================================================

        if (doctor.value === "selectdoctor") {

            doctor.classList.add("invalid");

            isValid = false;

        }
        else {

            doctor.classList.add("valid");

        }


        // =====================================================
        // Date Validation
        // =====================================================

        if (date.value === "") {

            date.classList.add("invalid");

            isValid = false;

        }
        else {

            date.classList.add("valid");

        }


        // =====================================================
        // Message Validation
        // =====================================================

        const messageValue = message.value.trim();

        if (messageValue.length > 500) {

            message.classList.add("invalid");

            isValid = false;

        }
        else {

            message.classList.add("valid");

        }


        // =====================================================
        // Stop If Form Is Invalid
        // =====================================================

        if (!isValid) {

            validationMessage.innerHTML = `
                <div class="danger-message">
                    Please check the highlighted fields and correct the errors.
                </div>
            `;

            return;

        }


        // =====================================================
        // Form Is Valid
        // =====================================================

        validationMessage.innerHTML = `
            <div class="success-message">
                Your appointment request has been submitted successfully!
            </div>
        `;


        // =====================================================
        // Create FormData
        // =====================================================

        const formData = new FormData(myform);


        // =====================================================
        // Send Data to PHP
        // =====================================================

        fetch("login.php", {

            method: "POST",

            body: formData

        })

        .then(function (response) {

            if (!response.ok) {
                throw new Error("Server error");
            }

            return response.text();

        })

        .then(function (text) {

            console.log("Server response:", text);

        })

        .catch(function (error) {

            console.log("Fetch error:", error);

            validationMessage.innerHTML = `
                <div class="danger-message">
                    Something went wrong. Please try again later.
                </div>
            `;

        });

    });

}

