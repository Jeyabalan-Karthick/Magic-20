// Initialize Lucide icons
lucide.createIcons();

// Countdown Timer
// Set countdown to 23/08/2025 from today (12/08/2025)
const targetDate = new Date(2025, 7, 23, 0, 0, 0); // Months are 0-indexed: 7 = August
function getTimeLeft() {
  const now = new Date();
  let diff = targetDate - now;
  if (diff < 0) diff = 0;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}
let timeLeft = getTimeLeft();

function updateCountdown() {
  // Update fixed header countdown
  document.getElementById("topDays").textContent = timeLeft.days;
  document.getElementById("topHours").textContent = timeLeft.hours;
  document.getElementById("topMinutes").textContent = timeLeft.minutes;
  document.getElementById("topSeconds").textContent = timeLeft.seconds;

  // Update hero countdown
  document.getElementById("heroDays").textContent = timeLeft.days;
  document.getElementById("heroHours").textContent = timeLeft.hours;
  document.getElementById("heroMinutes").textContent = timeLeft.minutes;
  document.getElementById("heroSeconds").textContent = timeLeft.seconds;

  // Decrement timer
  if (timeLeft.seconds > 0) {
    timeLeft.seconds--;
  } else if (timeLeft.minutes > 0) {
    timeLeft.minutes--;
    timeLeft.seconds = 59;
  } else if (timeLeft.hours > 0) {
    timeLeft.hours--;
    timeLeft.minutes = 59;
    timeLeft.seconds = 59;
  } else if (timeLeft.days > 0) {
    timeLeft.days--;
    timeLeft.hours = 23;
    timeLeft.minutes = 59;
    timeLeft.seconds = 59;
  }
}

// Start countdown timer
setInterval(updateCountdown, 1000);

// FAQ Toggle Functionality
let openFaq = null;

function toggleFaq(index) {
  const answer = document.getElementById(`answer-${index}`);
  const chevron = document.getElementById(`chevron-${index}`);

  if (openFaq === index) {
    // Close current FAQ
    answer.classList.add("hidden");
    chevron.classList.remove("rotated");
    openFaq = null;
  } else {
    // Close previously open FAQ
    if (openFaq !== null) {
      const prevAnswer = document.getElementById(`answer-${openFaq}`);
      const prevChevron = document.getElementById(`chevron-${openFaq}`);
      prevAnswer.classList.add("hidden");
      prevChevron.classList.remove("rotated");
    }

    // Open current FAQ
    answer.classList.remove("hidden");
    chevron.classList.add("rotated");
    openFaq = index;
  }
}

// Testimonial Image Animation
function initTestimonialAnimation() {
  const mainVideo = document.querySelector('.main-video video');
  const sideVideos = document.querySelectorAll('.side-video video');
  const leftArrow = document.querySelector('.testimonial-arrow-left');
  const rightArrow = document.querySelector('.testimonial-arrow-right');
  const videoContainers = document.querySelectorAll('.video-container');
  
  let currentIndex = 0;
  const totalVideos = sideVideos.length + 1; // +1 for main video

  // Set initial state
  videoContainers[0].classList.add('active');
  for (let i = 1; i < videoContainers.length; i++) {
    videoContainers[i].classList.add('inactive');
  }

  // Function to pause all videos
  function pauseAllVideos() {
    mainVideo.pause();
    sideVideos.forEach(video => video.pause());
  }

  function updateActiveVideo(index) {
    // Reset all videos
    pauseAllVideos();
    
    videoContainers.forEach(container => {
      container.classList.remove('active');
      container.classList.remove('inactive');
      container.classList.remove('swap');
    });
    
    if (index === 0) {
      // Main video is active
      videoContainers[0].classList.add('active');
      mainVideo.play();
    } else {
      // Side video is active
      const targetContainer = videoContainers[index];
      targetContainer.classList.add('active');
      targetContainer.classList.add('swap');
      videoContainers[0].classList.add('swap');
      sideVideos[index - 1].play();
    }
    
    currentIndex = index;
    
    // Update mobile view - show only active video
    if (window.innerWidth <= 480) {
      // Hide all video containers first
      videoContainers.forEach(container => {
        container.style.display = 'none';
      });
      
      // Show only the active video container
      if (index === 0) {
        videoContainers[0].style.display = 'block';
        videoContainers[0].style.margin = '0 auto';
      } else {
        videoContainers[index].style.display = 'block';
        videoContainers[index].style.margin = '0 auto';
      }
    } else {
      // Desktop view - show all videos
      videoContainers.forEach(container => {
        container.style.display = 'block';
        container.style.margin = '';
      });
    }
  }

  // Add click event to main video container
  videoContainers[0].addEventListener('click', function() {
    updateActiveVideo(0);
  });

  // Add click events to side video containers
  for (let i = 1; i < videoContainers.length; i++) {
    videoContainers[i].addEventListener('click', function() {
      updateActiveVideo(i);
    });
  }

  // Left arrow click handler
  leftArrow.addEventListener('click', function() {
    const newIndex = currentIndex === 0 ? totalVideos - 1 : currentIndex - 1;
    updateActiveVideo(newIndex);
  });

  // Right arrow click handler
  rightArrow.addEventListener('click', function() {
    const newIndex = currentIndex === totalVideos - 1 ? 0 : currentIndex + 1;
    updateActiveVideo(newIndex);
  });
}

// Initialize testimonial animation when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initTestimonialAnimation();
  
  // Handle window resize for responsive behavior
  window.addEventListener('resize', function() {
    const mainVideo = document.querySelector('.main-video');
    const sideVideos = document.querySelectorAll('.side-video');
    
    if (window.innerWidth <= 480) {
      // Mobile view - show only active video
      const activeVideo = document.querySelector('.video-container.active');
      if (activeVideo) {
        mainVideo.style.display = 'none';
        mainVideo.style.margin = '';
        sideVideos.forEach(video => {
          video.style.display = 'none';
          video.style.margin = '';
        });
        activeVideo.style.display = 'block';
        activeVideo.style.margin = '0 auto';
      }
    } else {
      // Desktop view - show all videos
      mainVideo.style.display = 'block';
      mainVideo.style.margin = '';
      sideVideos.forEach(video => {
        video.style.display = 'block';
        video.style.margin = '';
      });
    }
  });

  initModal();
});

// Modal functionality
function initModal() {
  const modal = document.getElementById('register-modal');
  const openModalBtn = document.getElementById('open-register-form');
  const closeModalBtn = document.querySelector('.close-modal');
  const registrationForm = document.getElementById('registration-form');
  
  // Open modal when register button is clicked
  openModalBtn.addEventListener('click', function() {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  });
  
  // Close modal when X is clicked
  closeModalBtn.addEventListener('click', function() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  });
  
  // Close modal when clicking outside the modal content
  window.addEventListener('click', function(event) {
    if (event.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
  
  // Handle form submission
  registrationForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Create FormData object to handle file uploads
    const formData = new FormData(registrationForm);
    
    // Send email using FormData
    sendFormDataByEmail(formData);
  });
}

// Function to handle form submission and email sending
function sendFormDataByEmail(formData) {
  // In a real implementation, you would use a server-side script or service
  // to handle the form submission and email sending with the image attachment
  // For this example, we'll simulate a successful submission

  // Normally, you would use fetch or XMLHttpRequest to send the data to a server
  // Example:
  /*
  fetch('your-server-endpoint', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    // Registration successful
    document.getElementById('register-modal').style.display = 'none';
    document.getElementById('registration-form').reset();
  })
  .catch(error => {
    console.error('Error:', error);
    // There was an error processing your registration. Please try again.
  });
  */
  
  // For demonstration purposes:
  setTimeout(function() {
    // Registration successful! Your details have been sent to dhinesh.m@magic20.co.in
    document.getElementById('register-modal').style.display = 'none';
    document.getElementById('registration-form').reset();
    document.body.style.overflow = 'auto';
  }, 1500);
}

// Update the existing register button click handlers
document
  .querySelectorAll(".register-btn, .register-btn-blue, .fixed-register-btn, .hero-cta-btn")
  .forEach((button) => {
    button.addEventListener("click", function () {
      // Open the registration modal instead of showing an alert
      const modal = document.getElementById('register-modal');
      if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
      }
    });
  });

// Initialize modal functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initModal();
});


// Prevent background scroll when modal is open
document.body.style.overflow = 'hidden';

// Show modal on page load
document.getElementById('registration-popup-modal').style.display = 'flex';

// Close modal logic
document.getElementById('close-registration-popup').onclick = function() {
  document.getElementById('registration-popup-modal').classList.add('hide');
  setTimeout(function() {
    document.getElementById('registration-popup-modal').style.display = 'none';
    document.body.style.overflow = 'auto';
  }, 200);
};

// Optional: close on overlay click (not on modal content)
document.getElementById('registration-popup-modal').addEventListener('click', function(e) {
  if (e.target === this) {
    document.getElementById('close-registration-popup').click();
  }
});

// Optional: handle form submit (AJAX or just close modal for demo)
document.getElementById('registration-popup-form').addEventListener('submit', function(e) {
  e.preventDefault();
  // You can add AJAX here to send data
  // For now, just close the modal and show a thank you
  document.querySelector('.modal-popup-content').innerHTML = '<h2 style="color:#2563eb;text-align:center;">Thank you for registering!</h2><p style="text-align:center;">We have received your details.</p>';
  setTimeout(function() {
    document.getElementById('registration-popup-modal').classList.add('hide');
    setTimeout(function() {
      document.getElementById('registration-popup-modal').style.display = 'none';
      document.body.style.overflow = 'auto';
    }, 800);
  }, 1200);
});


const carousel = document.getElementById('facultyCarousel');
            let isPaused = false;
            let scrollAmount = 0;
            let cardWidth = 0;
            let intervalId;

            function startCarousel() {
              intervalId = setInterval(() => {
                if (!isPaused) {
                  if (cardWidth === 0) {
                    // Get width of first card (including margin)
                    const firstCard = carousel.children[0];
                    cardWidth = firstCard.offsetWidth + 32; // 32px gap
                  }
                  scrollAmount += 1;
                  carousel.style.transform = `translateX(-${scrollAmount}px)`;

                  // When the first card is fully out of view, move it to the end
                  if (scrollAmount >= cardWidth) {
                    carousel.appendChild(carousel.children[0]);
                    carousel.style.transition = 'none';
                    carousel.style.transform = `translateX(0px)`;
                    scrollAmount = 0;
                    // Force reflow to reset transition
                    void carousel.offsetWidth;
                    carousel.style.transition = 'transform 0.5s linear';
                  }
                }
              }, 16); // ~60fps
            }

            carousel.addEventListener('mouseenter', () => {
              isPaused = true;
            });
            carousel.addEventListener('mouseleave', () => {
              isPaused = false;
            });

            // Duplicate cards for seamless looping
            (function duplicateForLoop() {
              const cards = Array.from(carousel.children);
              cards.forEach(card => {
                const clone = card.cloneNode(true);
                carousel.appendChild(clone);
              });
            })();

            startCarousel();