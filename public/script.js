document.addEventListener('DOMContentLoaded', () => {
    const messageButton = document.getElementById('getMessage');
    const messageDiv = document.getElementById('message');

    messageButton.addEventListener('click', async () => {
        try {
            messageDiv.textContent = 'Loading...';
            
            // Fetch message from our API
            const response = await fetch('/api/hello');
            const data = await response.json();
            
            // Display the message
            messageDiv.textContent = data.message;
        } catch (error) {
            messageDiv.textContent = 'Error fetching message from server';
            console.error('Error:', error);
        }
    });
}); 