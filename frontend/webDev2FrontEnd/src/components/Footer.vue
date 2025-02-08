<template>
    <!-- Footer Section -->
    <footer class="bg-dark text-white py-4 mt-5 fixed-bottom">
      <div class="container">
        <div class="row justify-content-between">
          <!-- Logo Section -->
          <div class="col-12 col-md-3 text-center text-md-left mb-3 mb-md-0">
            <img src="/public/controllerlogo.png" alt="Logo" class="logo-img" style="height: 40px;">
          </div>
  
          <!-- Contact Info Section -->
          <div class="col-12 col-md-3 text-center text-md-left mb-3 mb-md-0">
            <h5 class="h6">Contact Us</h5>
            <p>Email: <a href="mailto:contact@gamereview.com" class="text-white">contact@gamereview.com</a></p>
            <p>Phone: <a href="tel:+1234567890" class="text-white">+1 234 567 890</a></p>
          </div>
  
          <!-- Quick Links Section -->
          <div class="col-12 col-md-3 text-center text-md-left mb-3 mb-md-0">
            <h5 class="h6">Quick Links</h5>
            <ul class="list-unstyled">
              <li><a href="/about" class="text-white">About Us</a></li>
              <li><a href="/privacy" class="text-white">Privacy Policy</a></li>
              <li><a href="/terms" class="text-white">Terms of Service</a></li>
            </ul>
          </div>
  
          <!-- Social Media Links Section -->
          <div class="col-12 col-md-3 text-center text-md-left mb-3 mb-md-0">
            <h5 class="h6">Follow Us</h5>
            <a href="#" class="text-white me-3"><i class="bi bi-facebook"></i></a>
            <a href="#" class="text-white me-3"><i class="bi bi-twitter"></i></a>
            <a href="#" class="text-white me-3"><i class="bi bi-instagram"></i></a>
            <a href="#" class="text-white"><i class="bi bi-youtube"></i></a>
          </div>
        </div>
  
        <!-- Footer Bottom -->
        <div class="row mt-4 justify-content-center">
          <div class="col-12 text-center">
            <p class="mb-0 small text-muted">© 2025 The Game Review Platform. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  </template>
  
  <script setup>
    import 'bootstrap-icons/font/bootstrap-icons.css';
  </script>
  
  <style scoped>
  footer .logo-img {
    max-height: 40px;
  }
  
  footer .container {
    max-width: 1200px;
  }
  </style>
