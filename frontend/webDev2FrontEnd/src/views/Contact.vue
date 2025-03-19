<template>
    <div class="contact-container">
        <div class="container py-5">
            <div class="text-center">
                <h1 class="mb-4 text-uppercase fw-bold text-dark">Contact Us</h1>
                <p class="lead text-muted">
                    We'd love to hear from you, whether it's to request a game or any other reason! Reach out to us
                    through
                    any of the methods below.
                </p>
            </div>

            <!-- Contact Details Section -->
            <div class="row mt-5">
                <div class="col-md-4">
                    <div class="card contact-card text-center shadow-sm">
                        <div class="card-body">
                            <i class="bi bi-telephone-fill contact-icon text-primary"></i>
                            <h4 class="mt-3">Phone</h4>
                            <p class="text-muted">+31 6 12345678</p>
                        </div>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="card contact-card text-center shadow-sm">
                        <div class="card-body">
                            <i class="bi bi-envelope-fill contact-icon text-success"></i>
                            <h4 class="mt-3">Email</h4>
                            <p class="text-muted">contact@pixelcritic.com</p>
                        </div>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="card contact-card text-center shadow-sm">
                        <div class="card-body">
                            <i class="bi bi-geo-alt-fill contact-icon text-danger"></i>
                            <h4 class="mt-3">Address</h4>
                            <p class="text-muted">Bijdorplaan 15, 2015 CE Haarlem, The Netherlands</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Social Media Section -->
            <div class="text-center mt-5">
                <h5 class="fw-bold text-dark">Follow Us</h5>
                <div class="social-links">
                    <a href="https://www.instagram.com/damisavg/" class="btn btn-outline-dark mx-2 social-btn"
                        target="_blank" rel="noopener noreferrer">
                        <i class="bi bi-instagram"></i> Instagram
                    </a>
                    <a href="https://www.youtube.com/@thainoodleboii" class="btn btn-outline-danger mx-2 social-btn"
                        target="_blank" rel="noopener noreferrer">
                        <i class="bi bi-youtube"></i> YouTube
                    </a>
                    <a href="https://nl.linkedin.com/in/damisa-vooges-14a96b302"
                        class="btn btn-outline-info mx-2 social-btn" target="_blank" rel="noopener noreferrer">
                        <i class="bi bi-linkedin"></i> LinkedIn
                    </a>
                    <a href="https://www.facebook.com/damisa.vooges" class="btn btn-outline-primary mx-2 social-btn"
                        target="_blank" rel="noopener noreferrer">
                        <i class="bi bi-facebook"></i> Facebook
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Contact",
};
</script>

<style scoped>
/* Background Styling */
.contact-container {
    background: linear-gradient(to right, #f8f9fa, #e9ecef);
    min-height: 100vh;
    padding-top: 3rem;
    /* Reduced whitespace at the top */
}

/* Contact Card Styling */
.contact-card {
    border: none;
    border-radius: 10px;
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.contact-card:hover {
    transform: translateY(-5px);
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.15);
}

/* Icon Styling */
.contact-icon {
    font-size: 3rem;
    transition: transform 0.3s ease;
}

.contact-card:hover .contact-icon {
    transform: scale(1.1);
}

/* Social Media Buttons */
.social-btn {
    transition: all 0.2s ease-in-out;
}

.social-btn:hover {
    transform: scale(1.1);
}
</style>
