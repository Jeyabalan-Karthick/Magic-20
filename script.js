// Initialize Lucide icons
lucide.createIcons();

// Countdown Timer
let timeLeft = {
  days: 0,
  hours: 0,
  minutes: 17,
  seconds: 42,
};

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

// Register button click handlers
document
  .querySelectorAll(".register-btn, .register-btn-blue, .fixed-register-btn, .hero-cta-btn")
  .forEach((button) => {
    button.addEventListener("click", function () {
      alert("Registration functionality would be implemented here!");
    });
  });

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
});
