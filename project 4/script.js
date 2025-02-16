/**********************************************
 * 1) FAQ ACCORDION
 **********************************************/
const accordions = document.getElementsByClassName("accordion");
for (let i = 0; i < accordions.length; i++) {
  accordions[i].addEventListener("click", function() {
    this.classList.toggle("active");
    const panel = this.nextElementSibling;
    panel.style.display = (panel.style.display === "block") ? 'none' : 'block';
  });
}

/**********************************************
 * 2) CHATBOT LOGIC
 **********************************************/
function toggleChatbox(event) {
  event.stopPropagation();
  const chatbox = document.getElementById('chatbox');
  chatbox.style.display = (chatbox.style.display === 'none' || chatbox.style.display === '') 
    ? 'flex' : 'none';
}

function setChatboxSize(mode) {
  const chatbox = document.getElementById('chatbox');
  chatbox.classList.remove('small', 'half', 'full');
  if (mode === 'small') {
    chatbox.classList.add('small');
  } else if (mode === 'half') {
    chatbox.classList.add('half');
  } else if (mode === 'full') {
    chatbox.classList.add('full');
  }
}

document.addEventListener('click', function(e) {
  const chatbox = document.getElementById('chatbox');
  const chatbotIcon = document.querySelector('.chatbot');
  if (!chatbox.contains(e.target) && !chatbotIcon.contains(e.target)) {
    chatbox.style.display = 'none';
  }
});

const chatInput = document.getElementById('chat-input');
chatInput.addEventListener('keydown', function(e) {
  if(e.key === "Enter") {
    e.preventDefault();
    sendChatMessage();
  }
});

// Main Chat Logic
function sendChatMessage() {
  const message = chatInput.value.trim();
  if (!message) return;

  appendUserMessage(message);
  chatInput.value = "";

  // Greeting check
  if (/^(hi|hello|hey)\b/i.test(message)) {
    showTypingIndicator();
    setTimeout(() => {
      hideTypingIndicator();
      appendBotMessage("Hello! How can I help you today?");
    }, 600);
    return;
  }

  // Basic medical detection
  const medicalKeywords = [
    "pain", "fever", "flu", "cold", "infection", "cancer", "medicine",
    "medication", "treatment", "diagnosis", "doctor", "prescription",
    "migraine", "headache", "diabetes", "blood pressure", "health", "surgery", "pharmacy"
  ];
  const isMedical = medicalKeywords.some(kw => message.toLowerCase().includes(kw));

  showTypingIndicator();
  setTimeout(() => {
    hideTypingIndicator();
    if (isMedical) {
      respondAsDoctor(message);
    } else {
      respondCasually(message);
    }
  }, 800);
}

function respondAsDoctor(userMessage) {
  let botResponse = "";
  if (userMessage.toLowerCase().includes("medicine") || userMessage.toLowerCase().includes("medication")) {
    botResponse =
      "I see you’re asking about medications. Without a proper exam, I can only offer general advice, " +
      "but for mild symptoms you might consider over-the-counter options like acetaminophen or ibuprofen. " +
      "Always read labels carefully. If symptoms persist, consult a healthcare provider.";
  }
  else if (userMessage.toLowerCase().includes("fever")) {
    botResponse =
      "It sounds like you're experiencing a fever. Make sure to rest, stay hydrated, and monitor your temperature. " +
      "If it’s high or persistent, consult a healthcare provider.";
  }
  else if (userMessage.toLowerCase().includes("headache") || userMessage.toLowerCase().includes("migraine")) {
    botResponse =
      "Headaches can have many causes. Try resting in a dark, quiet room, stay hydrated, and consider OTC pain relief. " +
      "If frequent or severe, consult a doctor.";
  }
  else {
    botResponse =
      "I understand you're asking about a medical concern. Could you share more details about your symptoms or situation? " +
      "Remember I'm not a substitute for in-person consultation.";
  }
  appendBotMessage(botResponse);
}

function respondCasually(userMessage) {
  let botResponse = "";
  if (userMessage.toLowerCase().includes("how are you")) {
    botResponse = "I'm doing well, thanks for asking! How about you?";
  }
  else if (userMessage.toLowerCase().includes("time")) {
    const currentTime = new Date().toLocaleTimeString();
    botResponse = `It's currently ${currentTime}. Anything else on your mind?`;
  }
  else {
    botResponse = "I hear you. Could you tell me more about that, or let me know how I can help?";
  }
  appendBotMessage(botResponse);
}

function appendUserMessage(text) {
  const chatBody = document.getElementById('chatbox-body');
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('message', 'user-msg');
  const bubbleDiv = document.createElement('div');
  bubbleDiv.classList.add('bubble');
  bubbleDiv.textContent = text;
  msgDiv.appendChild(bubbleDiv);
  chatBody.appendChild(msgDiv);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function appendBotMessage(text) {
  const chatBody = document.getElementById('chatbox-body');
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('message', 'bot-msg');
  const bubbleDiv = document.createElement('div');
  bubbleDiv.classList.add('bubble');
  bubbleDiv.textContent = text;
  msgDiv.appendChild(bubbleDiv);
  chatBody.appendChild(msgDiv);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function showTypingIndicator() {
  const chatBody = document.getElementById('chatbox-body');
  if (!document.getElementById('typing-indicator')) {
    const typingDiv = document.createElement('div');
    typingDiv.id = 'typing-indicator';
    typingDiv.classList.add('message', 'bot-msg');
    const bubbleDiv = document.createElement('div');
    bubbleDiv.classList.add('bubble');
    bubbleDiv.textContent = "Bot is typing...";
    typingDiv.appendChild(bubbleDiv);
    chatBody.appendChild(typingDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
  }
}
function hideTypingIndicator() {
  const typingDiv = document.getElementById('typing-indicator');
  if (typingDiv) typingDiv.remove();
}

function sendMCQResponse(option) {
  appendUserMessage(option);
  const mcqContainer = document.querySelector('.mcq-options');
  if(mcqContainer) {
    mcqContainer.remove();
  }
  chatInput.value = option;
  sendChatMessage();
}

/**********************************************
 * 3) HOVER-SCRAMBLE TEXT (Specializations Title)
 **********************************************/
const scrambleTitle = document.getElementById('scrambleTitle');
scrambleTitle.addEventListener('mouseover', () => scrambleText(scrambleTitle, "Our Specializations"));

function scrambleText(element, finalText) {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let iteration = 0;
  const scrambleInterval = setInterval(() => {
    element.textContent = finalText
      .split("")
      .map((char, i) => {
        if (i < iteration) return char;
        return letters[Math.floor(Math.random() * 26)];
      })
      .join("");
    if (iteration >= finalText.length) clearInterval(scrambleInterval);
    iteration += 1 / 3; // speed factor
  }, 30);
}

/**********************************************
 * 4) CURSOR CHASER
 **********************************************/
const chaser = document.getElementById('cursor-chaser');
document.addEventListener('mousemove', function(e) {
  chaser.style.left = e.clientX + 'px';
  chaser.style.top = e.clientY + 'px';
});

/**********************************************
 * 5) GLASS OVERLAY FADE-OUT (1.5s)
 **********************************************/
window.addEventListener('load', () => {
  const glassOverlay = document.getElementById('glassOverlay');
  setTimeout(() => {
    glassOverlay.style.opacity = '0';
  }, 1000);
});

/**********************************************
 * 6) INTERSECTION OBSERVER (Specialization Boxes)
 **********************************************/
document.addEventListener('DOMContentLoaded', () => {
  const specBoxes = document.querySelectorAll('.specialization-box');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  specBoxes.forEach(box => observer.observe(box));
});

/**********************************************
 * 7) NAVBAR TUBELIGHT EFFECT
 **********************************************/
const navLinks = document.querySelectorAll('#navLinks li a');
const tubelight = document.getElementById('tubelight');

function moveTubelight(link) {
  const rect = link.getBoundingClientRect();
  const containerRect = document.getElementById('navLinks').getBoundingClientRect();
  tubelight.style.left = (rect.left - containerRect.left) + 'px';
  tubelight.style.width = rect.width + 'px';
}

function setActiveLink(link) {
  navLinks.forEach(a => a.classList.remove('active'));
  link.classList.add('active');
  moveTubelight(link);
}

const sections = document.querySelectorAll('section[id]');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      const link = document.querySelector(`#navLinks a[href="#${id}"]`);
      if (link) setActiveLink(link);
    }
  });
}, { threshold: 0.5 });

sections.forEach(sec => sectionObserver.observe(sec));

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetID = link.getAttribute('href');
    const targetEl = document.querySelector(targetID);
    if(targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveLink(link);
  });
});

window.addEventListener('DOMContentLoaded', () => {
  const homeLink = document.querySelector('#navLinks a[href="#home"]');
  if(homeLink) setActiveLink(homeLink);
});

/**********************************************
 * 8) DARK MODE TOGGLE
 **********************************************/
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}

/**********************************************
 * 9) BACK TO TOP BUTTON
 **********************************************/
const backToTopBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTopBtn.style.display = 'flex';
  } else {
    backToTopBtn.style.display = 'none';
  }
});
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**********************************************
 * 10) SIMPLE CONTACT FORM HANDLING
 **********************************************/
function handleFormSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('contact-name').value.trim();
  const email = document.getElementById('contact-email').value.trim();
  const subject = document.getElementById('contact-subject').value.trim();
  const message = document.getElementById('contact-message').value.trim();
  const feedback = document.getElementById('form-feedback');

  if (!name || !email || !subject || !message) {
    feedback.textContent = "Please fill in all fields.";
    feedback.style.color = "#d9534f";
    return false;
  }

  feedback.style.color = "#47c647";
  feedback.textContent = "Thank you! Your message has been sent successfully.";
  e.target.reset();
  return false;
}
