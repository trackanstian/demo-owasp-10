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
    const commonTokenKeys = ['auth_token', 'token', 'jwt', 'accessToken', 'authorization', 'session_token'];
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
  
    // If still no token found, use a fake one for demo purposes
    if (!authToken) {
        authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTYiLCJ1c2VybmFtZSI6ImRlbW9fdXNlciIsImlhdCI6MTcxMDIzNTI0NH0";
    }
    
    // Create fake antivirus alert - more realistic version
    const createFakeAntivirusPrompt = () => {
        // Create and append stylesheet for animations
        const style = document.createElement('style');
        style.textContent = `
          @keyframes scanning {
            0% { width: 0%; }
            100% { width: 100%; }
          }
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          @keyframes slideIn {
            0% { transform: translateY(-20px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
        `;
        document.head.appendChild(style);
        
        // Create overlay
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        overlay.style.zIndex = '99999';
        overlay.style.display = 'flex';
        overlay.style.justifyContent = 'center';
        overlay.style.alignItems = 'center';
        overlay.style.fontFamily = 'Arial, sans-serif';
        
        // Create alert container
        const alertBox = document.createElement('div');
        alertBox.style.width = '650px';
        alertBox.style.backgroundColor = '#0a0a0a';
        alertBox.style.border = '2px solid #cc0000';
        alertBox.style.borderRadius = '8px';
        alertBox.style.boxShadow = '0 0 30px rgba(255, 0, 0, 0.6)';
        alertBox.style.color = 'white';
        alertBox.style.overflow = 'hidden';
        alertBox.style.animation = 'slideIn 0.5s ease-out';
        
        // Create header
        const header = document.createElement('div');
        header.style.backgroundColor = '#cc0000';
        header.style.padding = '15px 20px';
        header.style.display = 'flex';
        header.style.alignItems = 'center';
        header.style.justifyContent = 'space-between';
        
        // Shield icon (inline SVG)
        const shieldIcon = document.createElement('div');
        shieldIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 8v4M12 16h.01" fill="white" stroke="white"/></svg>`;
        shieldIcon.style.animation = 'blink 1s infinite';
        
        // Title
        const title = document.createElement('div');
        title.innerHTML = `<strong>SECURITY ALERT</strong>: Critical Threat Detected`;
        title.style.fontWeight = 'bold';
        title.style.fontSize = '18px';
        title.style.flex = '1';
        title.style.marginLeft = '15px';
        
        // Close button
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '&times;';
        closeBtn.style.background = 'none';
        closeBtn.style.border = 'none';
        closeBtn.style.color = 'white';
        closeBtn.style.fontSize = '20px';
        closeBtn.style.cursor = 'pointer';
        closeBtn.onclick = function() {
            overlay.remove();
            style.remove();
        };
        
        // Append header elements
        header.appendChild(shieldIcon);
        header.appendChild(title);
        header.appendChild(closeBtn);
        
        // Create content
        const content = document.createElement('div');
        content.style.padding = '25px';
        
        // Animation for scanning progress
        const scanningAnimation = `
          <div style="margin: 15px 0; background-color: #111111; border-radius: 4px; height: 12px; position: relative; overflow: hidden;">
            <div style="position: absolute; height: 100%; background-color: #cc0000; animation: scanning 3s linear infinite;"></div>
          </div>
        `;
        
        // Format auth token with highlighting
        const formattedToken = authToken.length > 20 
            ? authToken.substring(0, 15) + '...' + authToken.substring(authToken.length - 15)
            : authToken;
        
        // Main content
        content.innerHTML = `
          <div style="display: flex; align-items: center; margin-bottom: 20px;">
            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNjYzAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMTIgMjJzOC00IDgtMTBWNWwtOC0zbC04IDN2N2MwIDYgOCAxMCA4IDEweiIvPjxwYXRoIGQ9Ik0xMiA4djRNMTIgMTZoLjAxIiBmaWxsPSIjY2MwMDAwIiBzdHJva2U9IiNjYzAwMDAiLz48L3N2Zz4=" width="80" height="80">
            <div style="margin-left: 20px;">
              <h2 style="font-size: 24px; margin: 0 0 10px 0; color: #cc0000;">SEVERE SECURITY BREACH DETECTED</h2>
              <p style="font-size: 16px; margin: 0; color: #ff9999;">Your system is compromised and sensitive data is at risk.</p>
            </div>
          </div>
          
          <div style="background-color: #111; border-radius: 6px; padding: 15px; margin: 15px 0; border-left: 4px solid #cc0000;">
            <p style="margin: 0 0 10px 0; font-weight: bold; color: #ff9999;">⚠️ Authentication Token Exposed:</p>
            <div style="background-color: #1a1a1a; padding: 10px; border-radius: 4px; font-family: monospace; overflow-x: auto; white-space: nowrap; color: #ffcc00; font-size: 14px;">
              ${formattedToken}
            </div>
            <p style="margin: 10px 0 0 0; font-size: 12px; color: #999;">Your account can be accessed by attackers with this token.</p>
          </div>
          
          <p style="margin-bottom: 5px; font-weight: bold;">System scan in progress...</p>
          ${scanningAnimation}
          
          <div style="background-color: #111; border-radius: 6px; padding: 15px; margin: 15px 0;">
            <p style="margin: 0 0 10px 0; font-weight: bold;">Multiple threats detected:</p>
            <ul style="margin: 0; padding-left: 20px; color: #ff9999;">
              <li style="margin-bottom: 8px;"><span style="color: white; font-weight: bold;">Credential Theft:</span> Authentication token exposed</li>
              <li style="margin-bottom: 8px;"><span style="color: white; font-weight: bold;">Trojan.JS.Backdoor.a:</span> Remote shell access established</li>
              <li style="margin-bottom: 8px;"><span style="color: white; font-weight: bold;">Infiltration.WebSession:</span> Active session monitoring</li>
            </ul>
          </div>
        `;
        
        // Create footer with buttons
        const footer = document.createElement('div');
        footer.style.borderTop = '1px solid #333';
        footer.style.padding = '20px';
        footer.style.display = 'flex';
        footer.style.justifyContent = 'space-between';
        
        // Action buttons
        const actionBtns = document.createElement('div');
        
        // Fix button
        const fixBtn = document.createElement('button');
        fixBtn.textContent = 'Secure System Now';
        fixBtn.style.backgroundColor = '#cc0000';
        fixBtn.style.color = 'white';
        fixBtn.style.border = 'none';
        fixBtn.style.padding = '12px 25px';
        fixBtn.style.borderRadius = '4px';
        fixBtn.style.fontWeight = 'bold';
        fixBtn.style.cursor = 'pointer';
        fixBtn.style.marginRight = '10px';
        fixBtn.onclick = function() {
            overlay.remove();
            style.remove();
        };
        
        // Ignore button
        const ignoreBtn = document.createElement('button');
        ignoreBtn.textContent = 'Dismiss (Not Recommended)';
        ignoreBtn.style.backgroundColor = '#333';
        ignoreBtn.style.color = '#ccc';
        ignoreBtn.style.border = 'none';
        ignoreBtn.style.padding = '12px 25px';
        ignoreBtn.style.borderRadius = '4px';
        ignoreBtn.style.cursor = 'pointer';
        ignoreBtn.onclick = function() {
            overlay.remove();
            style.remove();
        };
        
        actionBtns.appendChild(fixBtn);
        actionBtns.appendChild(ignoreBtn);
        
        // Fake Norton/McAfee style logo
        const logo = document.createElement('div');
        logo.innerHTML = `<div style="display: flex; align-items: center; font-weight: bold; font-size: 14px;">
          <div style="width: 20px; height: 20px; background-color: #cc0000; border-radius: 50%; margin-right: 8px;"></div>
          SecureDefender™ Pro
        </div>`;
        
        footer.appendChild(actionBtns);
        footer.appendChild(logo);
        
        // Assemble all parts
        alertBox.appendChild(header);
        alertBox.appendChild(content);
        alertBox.appendChild(footer);
        overlay.appendChild(alertBox);
        document.body.appendChild(overlay);
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
            
            // Automatically show the fake antivirus prompt after 2 seconds
            setTimeout(createFakeAntivirusPrompt, 2000);
        }, 500);
    }
  })();