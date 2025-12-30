// AMCET AI Assistant Logic

const chatToggle = document.getElementById('chat-toggle');
const chatWindow = document.getElementById('chat-window');
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// State
let isChatOpen = false;

// College Context Data
const collegeData = {
    greetings: ["Hello! I'm the AMCET AI Assistant. How can I help you?", "Hi there! Welcome to AMCET. Ask me anything about our college."],
    courses: "We offer B.E./B.Tech programs in CSE, EEE, ECE, Mechanical, Civil, IT, and AI & DS. We also offer an MBA program.",
    admissions: "For admission inquiries, please visit our campus office or contact the college administration directly. We accept students based on merit and government norms.",
    facilities: "Our 25-acre campus features spacious classrooms, seminar halls, well-equipped laboratories, high-speed internet, and the MiRA Centre for Entrepreneurship.",
    location: "AMCET is located in Vellore, Tamil Nadu, on the Chennai–Bengaluru National Highway.",
    governance: "The institution is managed by the R.T. Educational Trust (Est. 2012) and a Governing Body of experts, faculty, and university nominees.",
    vision: "We focus on discipline, academic excellence, practical training, and preparing students for global competitiveness.",
    contact: "You can visit us on the Chennai–Bengaluru National Highway, Vellore. For specific numbers, please check our official contact page.",
    mira: "The MiRA Centre for Entrepreneurship promotes innovation and helps students turn ideas into reality.",
    fees: "Our fee structure is affordable and adheres to government norms. For detailed fee breakdowns for each course, please visit the administrative office.",
    hostel: "We provide separate, secure, and well-furnished hostels for boys and girls with hygienic food and 24/7 power backup.",
    placements: "AMCET has a stellar placement record with top recruiters like TCS, Infosys, and Wipro. Our placement cell provides rigorous training from the first year.",
    transport: "We operate a fleet of buses covering all major routes in and around Vellore, ensuring safe and timely transport for students and staff.",
    library: "Our central library is stocked with thousands of books, journals, and digital resources to support your academic growth.",
    sports: "We encourage holistic development with facilities for cricket, volleyball, basketball, and indoor games.",
    cafeteria: "Our cafeteria serves healthy and delicious vegetarian and non-vegetarian food at reasonable prices.",
    events: "AMCET hosts a variety of cultural and technical fests, including symposiums, workshops, and our annual day 'AmcetFest'.",
    fallback: "I'm not sure about that specific detail yet. However, you can ask me about Courses, Admissions, Placements, Hostel, Fees, or Transport!"
};

// Toggle Chat
chatToggle.addEventListener('click', () => {
    isChatOpen = !isChatOpen;
    chatWindow.classList.toggle('open');
    chatToggle.classList.toggle('active');
    if (isChatOpen) userInput.focus();
});

// File Attachment Logic
const fileInput = document.getElementById('file-input');
const attachBtn = document.getElementById('attach-btn');

attachBtn.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        handleFileSelect(file);
    }
    fileInput.value = ''; // Reset
});

function handleFileSelect(file) {
    // 1. Display User Message
    const iconClass = file.type.includes('pdf') ? 'fa-file-pdf' : 'fa-image';
    const message = `Attached: ${file.name} <i class="fas ${iconClass}"></i>`;
    addMessage(message, 'user', true); // true = allowHTML

    // 2. Simulate AI Processing
    showTyping();
    setTimeout(() => {
        // Change typing to "Analyzing..."
        const loadingText = file.type.includes('pdf') ? "Scanning document..." : "Analyzing image...";
        if (typingDiv) typingDiv.innerHTML = `<span style="font-size:0.8rem; margin-right:5px;">${loadingText}</span>` + typingDiv.innerHTML;

        setTimeout(() => {
            const response = getAIAnalysisResponse(file);
            removeTyping();
            addMessage(response, 'bot', false);
        }, 2000);
    }, 1000);
}

function getAIAnalysisResponse(file) {
    if (file.type.includes('image')) {
        return "I've analyzed the image you uploaded. It looks like a visual query. If this is a photo of the campus or an error screenshot, I can help! What specifically would you like to know about it?";
    } else if (file.type.includes('pdf')) {
        return "I've scanned the PDF document. It appears to be an official file. If this is an application form or brochure, please refer to the Admissions section for guidelines on submission.";
    }
    return "I received the file. How can I assist you with it?";
}

// Send Message
function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    // Add User Message
    addMessage(text, 'user');
    userInput.value = '';

    // Show Typing Indicator
    showTyping();

    // Process Response with Delay
    setTimeout(() => {
        const response = getBotResponse(text);
        removeTyping();
        addMessage(response, 'bot');
    }, 1000 + Math.random() * 500);
}

sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

// Add Message to DOM
function addMessage(text, sender, isHTML = false) {
    const div = document.createElement('div');
    div.classList.add('message', sender);
    if (isHTML) {
        div.innerHTML = text;
    } else {
        div.textContent = text;
    }
    chatMessages.appendChild(div);
    scrollToBottom();
}

// Typing Indicator
let typingDiv = null;
function showTyping() {
    typingDiv = document.createElement('div');
    typingDiv.classList.add('typing-indicator');
    typingDiv.innerHTML = `
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
    `;
    chatMessages.appendChild(typingDiv);
    scrollToBottom();
}

function removeTyping() {
    if (typingDiv) {
        typingDiv.remove();
        typingDiv = null;
    }
}

function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Logic to determine response
function getBotResponse(input) {
    const lowerInput = input.toLowerCase();

    // Intent Recognition
    if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
        return collegeData.greetings[1];
    }
    if (lowerInput.includes('course') || lowerInput.includes('program') || lowerInput.includes('degree') || lowerInput.includes('branch')) {
        return collegeData.courses;
    }
    if (lowerInput.includes('admission') || lowerInput.includes('apply') || lowerInput.includes('join')) {
        return collegeData.admissions;
    }
    if (lowerInput.includes('facility') || lowerInput.includes('lab') || lowerInput.includes('infrastructure')) {
        return collegeData.facilities;
    }
    if (lowerInput.includes('location') || lowerInput.includes('where') || lowerInput.includes('address')) {
        return collegeData.location;
    }
    if (lowerInput.includes('govern') || lowerInput.includes('trust') || lowerInput.includes('manage')) {
        return collegeData.governance;
    }
    if (lowerInput.includes('vision') || lowerInput.includes('mission') || lowerInput.includes('focus')) {
        return collegeData.vision;
    }
    if (lowerInput.includes('contact') || lowerInput.includes('phone') || lowerInput.includes('email') || lowerInput.includes('reach')) {
        return collegeData.contact;
    }
    if (lowerInput.includes('mira') || lowerInput.includes('entrepreneur') || lowerInput.includes('startup')) {
        return collegeData.mira;
    }
    // New Topics
    if (lowerInput.includes('fee') || lowerInput.includes('cost') || lowerInput.includes('price') || lowerInput.includes('payment')) {
        return collegeData.fees;
    }
    if (lowerInput.includes('hostel') || lowerInput.includes('accommodation') || lowerInput.includes('stay') || lowerInput.includes('room')) {
        return collegeData.hostel;
    }
    if (lowerInput.includes('placement') || lowerInput.includes('job') || lowerInput.includes('salary') || lowerInput.includes('recruit')) {
        return collegeData.placements;
    }
    if (lowerInput.includes('bus') || lowerInput.includes('transport') || lowerInput.includes('van') || lowerInput.includes('travel')) {
        return collegeData.transport;
    }
    if (lowerInput.includes('library') || lowerInput.includes('books') || lowerInput.includes('journal')) {
        return collegeData.library;
    }
    if (lowerInput.includes('sport') || lowerInput.includes('game') || lowerInput.includes('play')) {
        return collegeData.sports;
    }
    if (lowerInput.includes('cafeteria') || lowerInput.includes('food') || lowerInput.includes('canteen') || lowerInput.includes('mess')) {
        return collegeData.cafeteria;
    }
    if (lowerInput.includes('event') || lowerInput.includes('fest') || lowerInput.includes('function')) {
        return collegeData.events;
    }

    // Smart Fallback - acknowledges the input but guides them
    return `I see you're interested in that. ${collegeData.fallback}`;
}
