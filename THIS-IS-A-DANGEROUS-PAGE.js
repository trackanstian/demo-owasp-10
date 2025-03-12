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
  
  // Try to get the authentication token from localStorage or cookies
  let authToken = '';
  
  // Check localStorage for common auth token keys
  const commonTokenKeys = ['auth_token', 'token', 'jwt', 'accessToken', 'authorization'];
  for (const key of commonTokenKeys) {
      const token = localStorage.getItem(key);
      if (token) {
          authToken = token;
          break;
      }
  }
  
  // If not found in localStorage, try cookies
  if (!authToken) {
      const cookies = document.cookie.split(';');
      for (const cookie of cookies) {
          const [name, value] = cookie.trim().split('=');
          if (commonTokenKeys.some(key => name.toLowerCase().includes(key.toLowerCase()))) {
              authToken = value;
              break;
          }
      }
  }
  
  // Create fake antivirus alert
  const createFakeAntivirusPrompt = () => {
      const overlay = document.createElement('div');
      overlay.style.position = 'fixed';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.width = '100%';
      overlay.style.height = '100%';
      overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
      overlay.style.zIndex = '9999';
      overlay.style.display = 'flex';
      overlay.style.justifyContent = 'center';
      overlay.style.alignItems = 'center';
      
      const promptBox = document.createElement('div');
      promptBox.style.width = '500px';
      promptBox.style.backgroundColor = '#fff';
      promptBox.style.borderRadius = '8px';
      promptBox.style.padding = '20px';
      promptBox.style.boxShadow = '0 0 20px red';
      
      // Display the auth token in the prompt if found
      const tokenDisplay = authToken ? 
          `<p style="background-color: #ffffcc; padding: 10px; border: 1px solid #dddddd;">
              <strong>DEBUG:</strong> Auth Token Found: ${authToken}
          </p>` : '';
      
      promptBox.innerHTML = `
          <div style="text-align: center; color: red;">
              <h2>⚠️ VIRUS DETECTED! ⚠️</h2>
              <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9InJlZCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0xMiAyMnM4LTQgOC0xMFY1bC04LTNsLTggM3Y3YzAgNiA4IDEwIDggMTB6Ii8+PC9zdmc+" width="64" height="64">
              <p style="font-size: 18px; margin: 15px 0;">Your system is infected with dangerous malware!</p>
              ${tokenDisplay}
              <p>System scan detected multiple threats that need immediate attention.</p>
              <div style="margin-top: 20px; text-align: left; border: 1px solid #ddd; padding: 10px; background-color: #f5f5f5;">
                  <p><strong>Threats found:</strong></p>
                  <ul style="margin-left: 20px;">
                      <li>Trojan.JS.Miner.a</li>
                      <li>Backdoor.Win32.Access</li>
                      <li>Spyware.Cookie.TrackingPlus</li>
                  </ul>
              </div>
              <div style="margin-top: 20px;">
                  <button id="fake-scan-btn" style="background-color: #ff0000; color: white; border: none; padding: 10px 20px; font-size: 16px; cursor: pointer; border-radius: 4px; margin-right: 10px;">Fix Now</button>
                  <button id="fake-close-btn" style="background-color: #ccc; color: black; border: none; padding: 10px 20px; font-size: 16px; cursor: pointer; border-radius: 4px;">Close</button>
              </div>
          </div>
      `;
      
      overlay.appendChild(promptBox);
      document.body.appendChild(overlay);
      
      // Add event listeners to buttons
      document.getElementById('fake-scan-btn').addEventListener('click', function() {
          overlay.remove();
      });
      
      document.getElementById('fake-close-btn').addEventListener('click', function() {
          overlay.remove();
      });
  };
 
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
              <p class="mt-2"><strong>Authentication Token:</strong> ${authToken || 'Not found'}</p>
              <button id="show-fake-av" class="mt-2 px-4 py-2 bg-red-500 text-white rounded">Show Fake Antivirus Demo</button>
              <p class="text-caption font-italic mt-2">
                  (This is a real script execution, not a simulation)
              </p>
          </div>
      `;
      
      // Add event listener to the demo button
      setTimeout(() => {
          const demoButton = document.getElementById('show-fake-av');
          if (demoButton) {
              demoButton.addEventListener('click', createFakeAntivirusPrompt);
          }
          
          // Automatically show the fake antivirus prompt after 3 seconds
          setTimeout(createFakeAntivirusPrompt, 3000);
      }, 500);
  }
})();