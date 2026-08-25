'use strict';

function initChatbot() {
  const toggleBtn = document.getElementById('chat-toggle-btn');
  const panel = document.getElementById('chat-panel');
  const closeBtn = document.getElementById('chat-close');
  const input = document.getElementById('chat-input');
  const sendBtn = document.getElementById('chat-send');
  const messagesContainer = document.getElementById('chat-messages');

  if (!toggleBtn || !panel) return;

  let hasGreeted = false;

  const responses = [
    { 
      regex: /appoint|book|schedul|slot/i, 
      reply: 'You can book an appointment directly through our online form or call our reception at <strong>0861 - 2315777 / 2315776</strong> or WhatsApp at <a href="https://wa.me/919177363774" target="_blank" style="color:#25D366;font-weight:700;">9177363774</a>.' 
    },
    { 
      regex: /emergency|urgent|er|ambulance|icu|nicu|picu/i, 
      reply: '🚨 <strong>24/7 Pediatric Emergency & Ambulance Hotline:</strong> Call <strong style="color:#E63946;">0861 - 2315777</strong> or <strong style="color:#E63946;">9177363774</strong>. Our 50-bed hospital with Level III NICU & PICU is open 24 hours opposite Dist Court, Nellore.' 
    },
    { 
      regex: /scheme|ntr|vaidya|ehs|insurance|cashless|aarogyasri/i, 
      reply: '✅ <strong>Dr. NTR Vaidya Seva (డా॥ ఎన్.టి.ఆర్ వైద్యసేవ)</strong> and <strong>E.H.S (Employees Health Scheme)</strong> are fully available with cashless treatment for eligible families and government employees!' 
    },
    { 
      regex: /location|address|where|direction|map/i, 
      reply: '📍 We are located at: <strong>Near Madras Busstand, Opp: District Court, Nellore – 524001</strong>. Scan our QR code or click <a href="contact.html" style="text-decoration:underline;font-weight:700;">Contact Page</a> for directions.' 
    },
    { 
      regex: /facility|bed|facilities|ventilator|lab|xray|pharmacy|vaccin|op/i, 
      reply: '🏥 <strong>Our Facilities:</strong><br>• 50-Bed Pediatric Hospital<br>• NICU (Ventilators, Phototherapy & Exchange Transfusion)<br>• PICU (Heart, Fits, Pneumonia, Toxic Fevers)<br>• 24/7 Ambulance & Pharmacy<br>• 24/7 Lab with Mobile Digital X-Ray<br>• All Childhood Vaccinations<br>• 0-18 Years Complete Pediatric Care' 
    },
    { 
      regex: /hour|time|open|timing/i, 
      reply: '⏰ <strong>Timings:</strong> 24 Hours Emergency, NICU, PICU, Ambulance, Lab & Pharmacy. OPD Consultations available Monday to Saturday: 9:00 AM – 8:00 PM.' 
    },
    { 
      regex: /phone|contact|number|call|whatsapp/i, 
      reply: '📞 <strong>Phone:</strong> 0861 - 2315777, 2315776<br>📱 <strong>WhatsApp:</strong> 9177363774' 
    },
    { 
      regex: /hello|hi|hey|namaste/i, 
      reply: 'నమస్కారం! Hello! 👋 I am <strong>Stella</strong> from Nizam\'s Little Star Children Hospital, Nellore. How can I assist you with your child\'s care today?' 
    }
  ];

  function addMessage(htmlText, type = 'bot') {
    const div = document.createElement('div');
    div.className = `chat-msg chat-msg-${type}`;
    div.innerHTML = htmlText;
    messagesContainer.appendChild(div);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function handleSend() {
    const text = input?.value.trim();
    if (!text) return;

    addMessage(text, 'user');
    input.value = '';

    setTimeout(() => {
      let matched = responses.find(r => r.regex.test(text));
      let reply = matched ? matched.reply : 'Thank you for your message! For immediate assistance, please call our 24/7 helpline at <strong>0861 - 2315777</strong> or WhatsApp <a href="https://wa.me/919177363774" target="_blank">9177363774</a>.';
      addMessage(reply, 'bot');
    }, 500);
  }

  toggleBtn.addEventListener('click', () => {
    const isHidden = panel.hidden;
    panel.hidden = !isHidden;
    panel.style.display = isHidden ? 'flex' : 'none';

    if (isHidden && !hasGreeted) {
      hasGreeted = true;
      addMessage('నమస్కారం! 👋 Welcome to <strong>Nizam\'s Little Star Children Hospital</strong> (Nellore). How can I help you today?');
      const chipsDiv = document.createElement('div');
      chipsDiv.className = 'chat-quick-replies';
      ['24/7 Emergency', 'NTR Vaidya Seva', 'Hospital Facilities', 'Contact Numbers', 'Location'].forEach(label => {
        const chip = document.createElement('button');
        chip.className = 'chat-chip';
        chip.textContent = label;
        chip.addEventListener('click', () => {
          input.value = label;
          handleSend();
        });
        chipsDiv.appendChild(chip);
      });
      messagesContainer.appendChild(chipsDiv);
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      panel.hidden = true;
      panel.style.display = 'none';
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