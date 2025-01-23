// JavaScript Fundamentals: Form Validation and Sending an Email
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const messageElement = document.getElementById('formMessage');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Collect form data
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Basic validation
    if (!name || !email || !message) {
      showMessage('Please fill in all fields.', 'error');
      return;
    }

    if (!isValidEmail(email)) {
      showMessage('Please enter a valid email address.', 'error');
      return;
    }

    // Use EmailJS for sending emails
    try {
      const response = await sendEmail(name, email, message);
      if (response.ok) {
        showMessage('Your message was sent successfully!', 'success');
        form.reset();
      } else {
        showMessage('Failed to send your message. Please try again.', 'error');
      }
    } catch (error) {
      showMessage('An error occurred. Please try again later.', 'error');
    }
  });

  // Helper Functions
  function showMessage(message, type) {
    messageElement.textContent = message;
    messageElement.style.color = type === 'success' ? 'green' : 'red';
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async function sendEmail(name, email, message) {
    const serviceID = 'service_41hq4nq';
    const templateID = 'your_template_id';
    const userID = 'your_user_id';

    return await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: serviceID,
        template_id: templateID,
        user_id: userID,
        template_params: { name, email, message },
      }),
    });
  }


});

document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelector('.slides');
  const slideCount = document.querySelectorAll('.slide').length;
  let currentIndex = 0;

  // Automatically move to the next slide every 3 seconds
  setInterval(() => {
    currentIndex = (currentIndex + 1) % slideCount; // Loop back to the first slide
    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
  }, 3000);
});