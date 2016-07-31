document.addEventListener('DOMContentLoaded', function() {
  var projects = document.querySelectorAll('.example');
  var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  if (iOS) {
    for (var i = 0; i < projects.length; i++) { 
      projects[i].addEventListener('click', function() {}); // iOS fallback for hover effects
    }
  }
})