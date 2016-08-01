document.addEventListener('DOMContentLoaded', function() {
  var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  if (iOS) {
    var projects = document.querySelectorAll('.example');
    for (var i = 0; i < projects.length; i++) { // iOS fallback for hover effects
      projects[i].addEventListener('click', function() {
        for (var i = 0; i < projects.length; i++) {
          projects[i].classList.remove('iOS-Fallback');
        }
        this.classList.add('iOS-Fallback');
      }); 
    }
  }
});