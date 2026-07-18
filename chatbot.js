/* ==============================================
   CHATBOT ENGINE - Sivasankaran Portfolio Assistant
   Rule-based, fully offline, zero-API chatbot
   ============================================== */

(function () {
    'use strict';

    // ===================== KNOWLEDGE BASE =====================
    const PORTFOLIO = {
        name: 'Sivasankaran E',
        title: 'AI & Data Science B.Tech Student',
        college: 'IFET College of Engineering, Villupuram',
        batch: '2023 - 2027',
        cgpa: '8.3 / 10.0',
        email: 'sivasankaranelu2006@gmail.com',
        phone: '+91-9360641905',
        location: 'Villupuram, Tamil Nadu, India',
        linkedin: 'https://www.linkedin.com/in/sivasankaran-e-0ba199292/',
        github: 'https://github.com/Siva47th',
        motto: 'Code · Build · Automate',
        aboutSummary: 'I am an AI & Data Science B.Tech student with a passion for building systems that automate repetitive work and transform raw data into functional intelligence. With real-world experience as a Web Development Intern, I blend robust backend programming in Python, database engineering (MySQL/PostgreSQL), and process automation (Playwright web scraping) with clean front-end logic in HTML, CSS, JavaScript, and React.',
        skills: {
            languages: ['Python (75%)', 'SQL / MySQL / PostgreSQL / SQLite (70%)', 'HTML5 & CSS3 (68%)', 'JavaScript & React (60%)'],
            ml: ['Machine Learning & Scikit-learn (72%)', 'Data Analysis — Pandas, NumPy, Matplotlib, Seaborn (74%)'],
            automation: ['Web Automation — Playwright, APScheduler (71%)', 'Streamlit & Flask (65%)'],
            other: ['LLM APIs (Groq, Gemini)', 'Git & GitHub', 'VS Code', 'Jupyter Notebooks', 'APScheduler', 'REST APIs', 'ETL Processes', 'Bootstrap', 'Data Visualization']
        },
        projects: [
            {
                name: 'Internship Automation System',
                period: 'Jun - Jul 2026',
                tech: ['Python', 'Playwright', 'SQLite', 'Streamlit', 'LLM APIs'],
                description: 'An end-to-end automation pipeline that scrapes internship listings across Internshala, LinkedIn, and Unstop using Playwright, filters them against user credentials, generates tailored cover letters via Groq/Gemini LLMs, and auto-fills application forms.',
                link: 'auma/index.html'
            },
            {
                name: 'Learning Progress Tracker',
                period: 'Aug - Nov 2025',
                tech: ['Python', 'MySQL', 'Streamlit'],
                description: 'A personal learning management web app that lets users log courses, track weekly goals, and render analytics showing study velocity, streaks, and completion rates with interactive Plotly charts.',
                link: 'learno/index.html'
            },
            {
                name: 'WattWise: Smart Energy Optimization',
                period: 'Feb - Mar 2024',
                tech: ['Next.js', 'React', 'TailwindCSS', 'Google Genkit', 'Gemini AI'],
                description: 'A full-stack AI-powered energy monitoring and optimization platform with an interactive dashboard, predictive analytics, personalized energy-saving advice, and a conversational assistant chatbot, all powered by Gemini 2.0 Flash.',
                link: 'energy_mgmt/index.html'
            }
        ],
        certifications: [
            { name: 'Foundations of Prompt Engineering', issuer: 'AWS Training & Certification', date: 'Jul 2026' },
            { name: 'Data Processing and Visualization', issuer: 'NASSCOM FutureSkills Prime', date: 'Jul 2026' },
            { name: 'Introduction to Data Engineering', issuer: 'IBM (via Coursera)', date: 'Mar 2026' },
            { name: 'Claude Code in Action', issuer: 'Anthropic', date: 'Feb 2026' },
            { name: 'Generative AI for All', issuer: 'Infosys Springboard', date: 'Jan 2026' },
            { name: 'Data Analytics Professional Certificate', issuer: 'NoviTech R&D', date: 'Feb-Apr 2025' }
        ],
        internship: {
            role: 'Web Development Intern',
            company: 'Macx Technologies',
            period: 'Feb 2024 - Mar 2024',
            description: 'Contributed to front-end development by building responsive web interfaces using HTML, CSS, JavaScript, and React. Handled REST API integrations and Git-based collaborative workflows.'
        }
    };

    // ===================== RESPONSE RULES =====================
    const RULES = [
        {
            keywords: ['hi', 'hello', 'hey', 'greetings', 'howdy', 'sup', 'yo'],
            response: () => `Hey there! 👋 I'm Siva's portfolio assistant. I can tell you about his **skills**, **projects**, **certifications**, **education**, or **contact info**. What are you curious about?`
        },
        {
            keywords: ['who', 'about', 'introduce', 'tell me about', 'yourself', 'siva', 'sivasankaran'],
            response: () => `**${PORTFOLIO.name}** is a ${PORTFOLIO.title} at ${PORTFOLIO.college} (Batch: ${PORTFOLIO.batch}, CGPA: ${PORTFOLIO.cgpa}). ${PORTFOLIO.aboutSummary.split('. ').slice(0, 2).join('. ')}.`
        },
        {
            keywords: ['skill', 'tech', 'technology', 'stack', 'language', 'tool', 'what can', 'proficient', 'know'],
            response: () => {
                const langs = PORTFOLIO.skills.languages.join(', ');
                const ml = PORTFOLIO.skills.ml.join(', ');
                const auto = PORTFOLIO.skills.automation.join(', ');
                return `Here's Siva's skillset:\n\n🔹 **Languages & DBs:** ${langs}\n🔹 **ML & Data:** ${ml}\n🔹 **Automation & Web:** ${auto}\n🔹 **Other tools:** ${PORTFOLIO.skills.other.join(', ')}`;
            }
        },
        {
            keywords: ['project', 'built', 'portfolio', 'work', 'made', 'created', 'develop'],
            response: () => {
                let msg = `Siva has built **${PORTFOLIO.projects.length} major projects**:\n\n`;
                PORTFOLIO.projects.forEach((p, i) => {
                    msg += `**${i + 1}. ${p.name}** (${p.period})\n${p.description.split('. ')[0]}.\nTech: ${p.tech.join(', ')}\n<a href="${p.link}">View screenshots →</a>\n\n`;
                });
                return msg;
            }
        },
        {
            keywords: ['automat', 'internship automation', 'scraper', 'playwright', 'auma'],
            response: () => {
                const p = PORTFOLIO.projects[0];
                return `**${p.name}** (${p.period})\n\n${p.description}\n\nTech stack: ${p.tech.join(', ')}\n\n<a href="${p.link}">View project screenshots →</a>`;
            }
        },
        {
            keywords: ['learn', 'tracker', 'progress', 'study'],
            response: () => {
                const p = PORTFOLIO.projects[1];
                return `**${p.name}** (${p.period})\n\n${p.description}\n\nTech stack: ${p.tech.join(', ')}\n\n<a href="${p.link}">View project screenshots →</a>`;
            }
        },
        {
            keywords: ['wattwise', 'energy', 'watt', 'genkit', 'optimization'],
            response: () => {
                const p = PORTFOLIO.projects[2];
                return `**${p.name}** (${p.period})\n\n${p.description}\n\nTech stack: ${p.tech.join(', ')}\n\n<a href="${p.link}">View project screenshots →</a>`;
            }
        },
        {
            keywords: ['certif', 'credential', 'course', 'certificat'],
            response: () => {
                let msg = `Siva holds **${PORTFOLIO.certifications.length} industry certifications**:\n\n`;
                PORTFOLIO.certifications.forEach((c, i) => {
                    msg += `🏅 **${c.name}** — ${c.issuer} (${c.date})\n`;
                });
                return msg;
            }
        },
        {
            keywords: ['intern', 'macx', 'experience', 'work experience', 'job'],
            response: () => {
                const i = PORTFOLIO.internship;
                return `**${i.role}** at ${i.company} (${i.period})\n\n${i.description}`;
            }
        },
        {
            keywords: ['education', 'college', 'university', 'degree', 'btech', 'cgpa', 'gpa', 'batch'],
            response: () => `🎓 **B.Tech in AI & Data Science**\n📍 ${PORTFOLIO.college}\n📅 Batch: ${PORTFOLIO.batch}\n📊 CGPA: ${PORTFOLIO.cgpa}`
        },
        {
            keywords: ['contact', 'email', 'phone', 'reach', 'hire', 'connect', 'message'],
            response: () => `📧 **Email:** <a href="mailto:${PORTFOLIO.email}">${PORTFOLIO.email}</a>\n📞 **Phone:** <a href="tel:${PORTFOLIO.phone}">${PORTFOLIO.phone}</a>\n📍 **Location:** ${PORTFOLIO.location}\n🔗 **LinkedIn:** <a href="${PORTFOLIO.linkedin}" target="_blank">View Profile</a>\n💻 **GitHub:** <a href="${PORTFOLIO.github}" target="_blank">View Repos</a>`
        },
        {
            keywords: ['linkedin', 'social', 'github', 'link'],
            response: () => `🔗 **LinkedIn:** <a href="${PORTFOLIO.linkedin}" target="_blank">linkedin.com/in/sivasankaran-e</a>\n💻 **GitHub:** <a href="${PORTFOLIO.github}" target="_blank">github.com/Siva47th</a>`
        },
        {
            keywords: ['resume', 'cv', 'download'],
            response: () => `You can download Siva's latest resume here:\n\n📄 <a href="certi/Sivasankaran_E_Resume_jul18.pdf" download>Download Resume PDF →</a>`
        },
        {
            keywords: ['python'],
            response: () => `Python is Siva's primary language, rated at **75%** proficiency. He uses it for ML (scikit-learn), data analysis (pandas, NumPy), web automation (Playwright), dashboard apps (Streamlit), and LLM API integrations (Groq, Gemini).`
        },
        {
            keywords: ['machine learning', 'ml', 'ai', 'artificial intelligence'],
            response: () => `Siva specializes in **Machine Learning & Scikit-learn (72%)** and **Data Analysis (74%)**. His work includes predictive analytics in energy optimization (WattWise) and building matching engines for automated internship filtering.`
        },
        {
            keywords: ['database', 'sql', 'mysql', 'postgresql', 'sqlite'],
            response: () => `Siva is skilled in **SQL/MySQL/PostgreSQL/SQLite (70%)**. He's designed normalized schemas for the Learning Progress Tracker (MySQL) and lightweight storage for his Automation System (SQLite), plus coursework in data warehousing and ETL via IBM.`
        },
        {
            keywords: ['thank', 'thanks', 'thx', 'bye', 'goodbye', 'see ya'],
            response: () => `You're welcome! 😊 Feel free to come back anytime. You can also <a href="#contact">send Siva a direct message</a> through the contact form. Have a great day!`
        },
        {
            keywords: ['help', 'what can you do', 'options', 'menu'],
            response: () => `I can help you with:\n\n🔹 **About Siva** — background & summary\n🔹 **Skills** — tech stack & proficiency\n🔹 **Projects** — featured work\n🔹 **Certifications** — industry credentials\n🔹 **Education** — college & CGPA\n🔹 **Experience** — internship details\n🔹 **Contact** — email, phone, socials\n🔹 **Resume** — download link\n\nJust type a topic or ask a question!`
        }
    ];

    const FALLBACK_RESPONSES = [
        `I'm not sure I understand that. Try asking about Siva's **skills**, **projects**, **certifications**, or **contact info**!`,
        `Hmm, I don't have an answer for that. You can ask me about Siva's **education**, **experience**, **tech stack**, or **resume**.`,
        `I didn't quite catch that. Here are some topics I can help with: skills, projects, certifications, education, contact, resume.`
    ];

    // ===================== HELPER: SIMPLE MARKDOWN =====================
    function simpleMarkdown(text) {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br>');
    }

    // ===================== MATCHING ENGINE =====================
    function findResponse(input) {
        const lower = input.toLowerCase().trim();
        
        // Score each rule by how many keywords match
        let bestMatch = null;
        let bestScore = 0;

        for (const rule of RULES) {
            let score = 0;
            for (const kw of rule.keywords) {
                if (lower.includes(kw)) {
                    score += kw.length; // Longer keyword matches = more specific
                }
            }
            if (score > bestScore) {
                bestScore = score;
                bestMatch = rule;
            }
        }

        if (bestMatch && bestScore > 0) {
            return bestMatch.response();
        }

        return FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)];
    }

    // ===================== DOM BUILDER =====================
    function buildChatbotDOM() {
        // FAB Button
        const fab = document.createElement('button');
        fab.className = 'chatbot-fab';
        fab.id = 'chatbot-fab';
        fab.setAttribute('aria-label', 'Open portfolio chatbot');
        fab.innerHTML = `
            <i class="fas fa-comment-dots"></i>
            <i class="fas fa-times"></i>
            <span class="chatbot-badge">1</span>
        `;

        // Chat Container
        const container = document.createElement('div');
        container.className = 'chatbot-container';
        container.id = 'chatbot-container';
        container.innerHTML = `
            <div class="chatbot-header">
                <div class="chatbot-avatar"><i class="fas fa-robot"></i></div>
                <div class="chatbot-header-info">
                    <h4>Portfolio Assistant</h4>
                    <span>Online — Ask me anything</span>
                </div>
            </div>
            <div class="chatbot-messages" id="chatbot-messages"></div>
            <div class="chat-suggestions" id="chat-suggestions"></div>
            <div class="chatbot-input-area">
                <input type="text" id="chatbot-input" placeholder="Ask about skills, projects..." autocomplete="off">
                <button class="chatbot-send-btn" id="chatbot-send" aria-label="Send message">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
        `;

        document.body.appendChild(fab);
        document.body.appendChild(container);
    }

    // ===================== UI CONTROLLER =====================
    function initChatbot() {
        buildChatbotDOM();

        const fab = document.getElementById('chatbot-fab');
        const container = document.getElementById('chatbot-container');
        const messagesEl = document.getElementById('chatbot-messages');
        const input = document.getElementById('chatbot-input');
        const sendBtn = document.getElementById('chatbot-send');
        const suggestionsEl = document.getElementById('chat-suggestions');

        let isOpen = false;
        let hasGreeted = false;

        // Toggle chat
        fab.addEventListener('click', () => {
            isOpen = !isOpen;
            fab.classList.toggle('active', isOpen);
            container.classList.toggle('open', isOpen);

            if (isOpen && !hasGreeted) {
                hasGreeted = true;
                addBotMessage(`Hi there! 👋 I'm Siva's portfolio assistant. Ask me about his skills, projects, certifications, or anything else!`);
                showSuggestions(['Skills', 'Projects', 'Certifications', 'Contact', 'Resume']);
            }

            if (isOpen) {
                setTimeout(() => input.focus(), 350);
            }
        });

        // Send message
        function handleSend() {
            const text = input.value.trim();
            if (!text) return;

            addUserMessage(text);
            input.value = '';
            hideSuggestions();

            // Show typing indicator, then respond
            showTyping();
            const delay = 400 + Math.random() * 600;
            setTimeout(() => {
                removeTyping();
                const reply = findResponse(text);
                addBotMessage(reply);
                showContextSuggestions(text);
            }, delay);
        }

        sendBtn.addEventListener('click', handleSend);
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') handleSend();
        });

        // Add messages
        function addBotMessage(text) {
            const div = document.createElement('div');
            div.className = 'chat-message bot';
            div.innerHTML = simpleMarkdown(text);
            messagesEl.appendChild(div);
            scrollToBottom();
        }

        function addUserMessage(text) {
            const div = document.createElement('div');
            div.className = 'chat-message user';
            div.textContent = text;
            messagesEl.appendChild(div);
            scrollToBottom();
        }

        function showTyping() {
            const div = document.createElement('div');
            div.className = 'typing-indicator';
            div.id = 'typing-indicator';
            div.innerHTML = '<span></span><span></span><span></span>';
            messagesEl.appendChild(div);
            scrollToBottom();
        }

        function removeTyping() {
            const el = document.getElementById('typing-indicator');
            if (el) el.remove();
        }

        // Suggestions
        function showSuggestions(chips) {
            suggestionsEl.innerHTML = '';
            chips.forEach(chip => {
                const btn = document.createElement('button');
                btn.className = 'chat-suggestion-chip';
                btn.textContent = chip;
                btn.addEventListener('click', () => {
                    input.value = chip;
                    handleSend();
                });
                suggestionsEl.appendChild(btn);
            });
        }

        function hideSuggestions() {
            suggestionsEl.innerHTML = '';
        }

        function showContextSuggestions(lastInput) {
            const lower = lastInput.toLowerCase();
            if (lower.includes('project')) {
                showSuggestions(['Automation System', 'WattWise', 'Learning Tracker']);
            } else if (lower.includes('skill') || lower.includes('tech')) {
                showSuggestions(['Python', 'Machine Learning', 'Database']);
            } else if (lower.includes('contact') || lower.includes('email')) {
                showSuggestions(['LinkedIn', 'Resume', 'Projects']);
            } else if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
                showSuggestions(['About Siva', 'Skills', 'Projects', 'Contact']);
            } else {
                showSuggestions(['Skills', 'Projects', 'Contact', 'Help']);
            }
        }

        function scrollToBottom() {
            setTimeout(() => {
                messagesEl.scrollTop = messagesEl.scrollHeight;
            }, 50);
        }
    }

    // ===================== INITIALIZE =====================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initChatbot);
    } else {
        initChatbot();
    }
})();
