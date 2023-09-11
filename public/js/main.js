// public/js/main.js

document.addEventListener('DOMContentLoaded', () => {
    // Function to handle habit tracking form submission
    const trackHabitForm = document.querySelector('#trackHabitForm');
  
    if (trackHabitForm) {
      trackHabitForm.addEventListener('submit', async (e) => {
        e.preventDefault();
  
        const habitId = trackHabitForm.dataset.habitId;
        const status = trackHabitForm.querySelector('select[name="status"]').value;
  
        try {
          // Send a POST request to update the habit status
          const response = await fetch(`/habits/${habitId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status }),
          });
  
          if (response.ok) {
            // Reload the page or update UI as needed
            location.reload();
          } else {
            console.error('Failed to update habit status');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      });
    }
  
    // Add more client-side functionality as needed
  });
  