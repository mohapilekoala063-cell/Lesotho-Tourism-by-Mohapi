document.addEventListener("DOMContentLoaded", function () {
    const bookingForm = document.getElementById("bookingForm");
    const alertBox = document.getElementById("alertBox");

    function showAlert(message, type) {
        if (!alertBox) return;
        alertBox.textContent = message;
        alertBox.className = "alert alert-" + type + " d-block";
        alertBox.setAttribute("role", "alert");
        alertBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    if (bookingForm) {
        bookingForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const fullName = document.getElementById("fullName").value.trim();
            const email = document.getElementById("email").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const password = document.getElementById("password").value;
            const confirmPassword = document.getElementById("confirmPassword").value;
            const genderSelected = document.querySelector('input[name="gender"]:checked');

            if (!fullName || !email || !phone || !genderSelected || !password || !confirmPassword) {
                showAlert("Please fill in all required fields dear.", "danger");
                return;
            }
            if (password.length < 6) {
                showAlert("Password must be at least 6 characters long.", "danger");
                document.getElementById("password").focus();
                return;
            }
            if (password !== confirmPassword) {
                showAlert("Passwords do not match. Please check again.", "danger");
                document.getElementById("confirmPassword").focus();
                return;
            }
            showAlert("Thank you, " + fullName + "! Your booking request has been submitted successfully. We will contact you soon.", "success");
            bookingForm.reset();
        });
    }

    const whatsappButton = document.querySelector("#send .submit");
    const messageBox = document.getElementById("message");
    if (whatsappButton && messageBox) {
        whatsappButton.addEventListener("click", function () {
            const message = messageBox.value.trim();
            if (!message) {
                messageBox.setCustomValidity("Please type your message before opening WhatsApp.");
                messageBox.reportValidity();
                messageBox.addEventListener("input", function clearMessageError() {
                    messageBox.setCustomValidity("");
                    messageBox.removeEventListener("input", clearMessageError);
                });
                return;
            }
        
        });
    }

    const galleryImages = Array.from(document.querySelectorAll(".gallery-card img"));
    if (galleryImages.length && window.bootstrap) {
        const modal = document.createElement("div");
        modal.className = "modal fade gallery-lightbox";
        modal.tabIndex = -1;
        modal.setAttribute("aria-hidden", "true");
        modal.innerHTML = `
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content bg-dark text-white">
                    <div class="modal-header border-secondary">
                        <h2 class="modal-title fs-5">Lesotho Tourism Gallery</h2>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body text-center p-2">
                        <div class="gallery-preview-wrap">
                            <button type="button" class="gallery-prev" aria-label="Previous picture"><i class="bi bi-chevron-left"></i></button>
                            <img class="img-fluid rounded" alt="" style="max-height:75vh;object-fit:contain">
                            <button type="button" class="gallery-next" aria-label="Next picture"><i class="bi bi-chevron-right"></i></button>
                        </div>
                        <p class="gallery-modal-caption mt-2 mb-1"></p>
                        <p class="gallery-modal-count small text-white-50 mb-0"></p>
                    </div>
                </div>
            </div>`;
        document.body.appendChild(modal);
        const modalInstance = new bootstrap.Modal(modal);
        const preview = modal.querySelector("img");
        const caption = modal.querySelector(".gallery-modal-caption");
        const count = modal.querySelector(".gallery-modal-count");
        let currentIndex = 0;

        function showGalleryImage(index) {
            currentIndex = (index + galleryImages.length) % galleryImages.length;
            const image = galleryImages[currentIndex];
            preview.src = image.src;
            preview.alt = image.alt || "Lesotho tourism destination";
            caption.textContent = image.alt || "";
            count.textContent = (currentIndex + 1) + " of " + galleryImages.length;
        }

        galleryImages.forEach(function (image, index) {
            image.addEventListener("click", function () {
                showGalleryImage(index);
                modalInstance.show();
            });
        });
        modal.querySelector(".gallery-prev").addEventListener("click", function () {
            showGalleryImage(currentIndex - 1);
        });
        modal.querySelector(".gallery-next").addEventListener("click", function () {
            showGalleryImage(currentIndex + 1);
        });
        modal.addEventListener("keydown", function (event) {
            if (event.key === "ArrowRight") showGalleryImage(currentIndex + 1);
            if (event.key === "ArrowLeft") showGalleryImage(currentIndex - 1);
        });
        modal.addEventListener("hidden.bs.modal", function () {
            preview.removeAttribute("src");
        });
    }
});
