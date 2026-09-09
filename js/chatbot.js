'use strict';

function initChatbot() {
  const toggleBtn = $('#chat-toggle-btn');
  const panel = $('#chat-panel');
  const closeBtn = $('#chat-close');
  const input = $('#chat-input');
  const sendBtn = $('#chat-send');
  const messagesContainer = $('#chat-messages');

  if (!toggleBtn || !panel) return;

  let greeted = false;

  const responses = [
    {
      keywords: ['appoint', 'book', 'schedul', 'consult'],
      response: "You can book an appointment by calling our reception directly at **0861 - 2315777** or **0861 - 2315776**, sending a WhatsApp message to **9177363774**, or submitting the online booking form on our Contact page."
    },
    {
      keywords: ['emergency', 'urgent', 'casualty', 'trauma', 'serious'],
      response: "🚨 **24/7 Emergency & NICU Hotline**: Please call **0861 - 2315777** or WhatsApp **9177363774** immediately! Our Emergency Department is open 24 hours at Near Madras Busstand, Opp: District Court, Nellore."
    },
    {
      keywords: ['doctor', 'specialist', 'pediatrician', 'surgeon', 'nicu', 'picu'],
      response: "We have full-time pediatric specialists, neonatologists for NICU, pediatric surgeons, cardiologists, and emergency intensivists available 24/7. Check our Doctors page for the complete roster."
    },
    {
      keywords: ['scheme', 'insurance', 'ntr', 'vaidya', 'ehs', 'free', 'cost'],
      response: "✅ **Dr. NTR Vaidya Seva & E.H.S Scheme**: We provide cashless and government-supported medical care for eligible families and government employees under Dr. NTR Vaidya Seva and EHS."
    },
    {
      keywords: ['location', 'address', 'where', 'place', 'direction', 'court'],
      response: "📍 **Hospital Address**:\nNear Madras Busstand, Opp: District Court, Nellore – 524001, Andhra Pradesh.\nLandlines: **0861 - 2315777, 2315776**"
    },
    {
      keywords: ['ambulance', 'transport', 'vehicle'],
      response: "🚑 **24/7 Ambulance Service**: Equipped with neonatal life support, central oxygen, and emergency transport. Call **9177363774** or **0861 - 2315777** for immediate dispatch."
    },
    {
      keywords: ['timing', 'hour', 'open', 'time', 'sunday'],
      response: "⏰ **Hospital Timings**:\n- **Emergency & NICU**: Open 24 Hours / 7 Days\n- **Laboratory & Pharmacy**: 24/7 Non-stop\n- **OPD Consultation**: Monday – Saturday, 9:00 AM – 8:00 PM"
    },
    {
      keywords: ['vaccin', 'immuniz', 'shot'],
      response: "💉 **Vaccination Clinic**: All newborn and pediatric vaccines from birth to 18 years are available Mon–Sat (9 AM – 8 PM)."
    }
  ];

  const defaultResponse = "I am Stella, your virtual assistant at Nizam's Little Star Children Hospital. How can I help you today? You can ask about our 24/7 Emergency, Doctors, NICU/PICU, Dr. NTR Vaidya Seva scheme, or hospital address in Nellore.";

  function addMessage(text, type = 'bot') {
    const msg = document.createElement('div');
    msg.className = `chat-msg chat-msg-${type}`;
    msg.innerHTML = text.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    messagesContainer.appendChild(msg);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function showTyping() {
    const typing = document.createElement('div');
    typing.className = 'chat-msg chat-msg-bot chat-typing';
    typing.innerHTML = '<span>.</span><span>.</span><span>.</span>';
    typing.id = 'chat-typing-indicator';
    messagesContainer.appendChild(typing);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function removeTyping() {
    const el = $('#chat-typing-indicator');
    if (el) el.remove();
  }

  function getBotResponse(userText) {
    const lower = userText.toLowerCase();
    for (const r of responses) {
      if (r.keywords.some(k => lower.includes(k))) {
        return r.response;
      }
    }
    return defaultResponse;
  }

  function handleSend() {
    const text = input.value.trim();
    if (!text) return;
    addMessage(text, 'user');
    input.value = '';

    showTyping();
    setTimeout(() => {
      removeTyping();
      const botReply = getBotResponse(text);
      addMessage(botReply, 'bot');
    }, 600);
  }

  toggleBtn.addEventListener('click', () => {
    const isHidden = panel.hidden;
    panel.hidden = !isHidden;
    if (isHidden) {
      if (!greeted) {
        greeted = true;
        addMessage("Hello! 👋 I'm **Stella**, your virtual helper at **Nizam's Little Star Children Hospital (Nellore)**. How can I assist you today?", 'bot');
        
        const chipsContainer = document.createElement('div');
        chipsContainer.className = 'chat-quick-replies';
        chipsContainer.innerHTML = `
          <button class="chat-chip" data-query="emergency">🚨 24/7 Emergency</button>
          <button class="chat-chip" data-query="appointment">📅 Book Appointment</button>
          <button class="chat-chip" data-query="scheme">🏛️ NTR Vaidya Seva</button>
          <button class="chat-chip" data-query="location">📍 Hospital Location</button>
        `;
        messagesContainer.appendChild(chipsContainer);

        $$('.chat-chip', chipsContainer).forEach(chip => {
          chip.addEventListener('click', () => {
            input.value = chip.dataset.query;
            handleSend();
          });
        });
      }
      setTimeout(() => input.focus(), 100);
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      panel.hidden = true;
    });
  }

  if (sendBtn) sendBtn.addEventListener('click', handleSend);
  if (input) {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleSend();
    });
  }
}

document.addEventListener('DOMContentLoaded', initChatbot);
