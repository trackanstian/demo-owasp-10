/**
 * This is an example of an external script that will be loaded
 * for the security misconfiguration demonstration.
 * 
 * In a real scenario, this could be a malicious script,
 * but for educational purposes we're just modifying the DOM.
 */

(function() {
    console.log('External script has been loaded and executed!');
    
    // Find our target container
    const dangerousContainer = document.getElementById('dangerousOutputContainer');
    
    if (dangerousContainer) {
      // Update the container with our content
      dangerousContainer.innerHTML = `
        <div class="text-center pa-4 bg-error-lighten-4">
          <h3 class="error--text mb-2">⚠️ External Script Executed! ⚠️</h3>
          <p>This script has full access to the page's DOM and JavaScript context.</p>
          <p>It could potentially:</p>
          <ul class="text-left ml-4">
            <li>Steal user data or cookies</li>
            <li>Make unauthorized API calls</li>
            <li>Manipulate form inputs</li>
            <li>Redirect to phishing sites</li>
          </ul>
          <p class="text-caption font-italic mt-2">
            (This is a real script execution, not a simulation)
          </p>
        </div>
      `;
      
      // You could also demonstrate more capabilities here, such as:
      // 1. Reading cookies: console.log('Cookies:', document.cookie);
      // 2. Capturing form inputs
      // 3. Making background fetch requests
      // 4. etc.
    }
  })();