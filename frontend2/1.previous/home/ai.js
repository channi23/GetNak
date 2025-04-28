// ai.js - Enhanced AI Search Bar Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Get elements - using more specific selectors to avoid duplicates
    const searchInput = document.querySelector('.search-bar input');
    const searchBar = document.querySelector('.search-bar');
    const gearIcon = document.querySelector('.gear-icon');
    
    // Only continue initialization if we have the search elements
    if (!searchInput || !searchBar || !gearIcon) {
        console.error('Search bar elements not found, aborting AI initialization');
        return;
    }
    
    // Check if we already have a results container
    let resultsContainer = document.querySelector('.ai-results');
    
    // Only create the results container if it doesn't exist
    if (!resultsContainer) {
        resultsContainer = document.createElement('div');
        resultsContainer.className = 'ai-results';
        resultsContainer.style.display = 'none';
        
        // Insert results container after the search bar
        searchBar.parentNode.insertBefore(resultsContainer, searchBar.nextSibling);
        
        // Style the results container
        resultsContainer.style.backgroundColor = '#1f1f1f';
        resultsContainer.style.borderRadius = '8px';
        resultsContainer.style.padding = '1rem';
        resultsContainer.style.marginTop = '1rem';
        resultsContainer.style.maxWidth = '600px';
        resultsContainer.style.width = '100%';
        resultsContainer.style.margin = '1rem auto';
        resultsContainer.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
        resultsContainer.style.transition = 'all 0.3s ease';
        resultsContainer.style.border = '1px solid #3d3d3d';
    }
    
    // Enhanced AI response knowledge base
    const knowledgeBase = {
        greeting: [
            "Hello! How can I help you today?", 
            "Hi there! Looking for freelance services?", 
            "Welcome to TaskBridge! How can I assist you?",
            "Hey! Ready to find the perfect freelancer for your project?"
            
        ],
        services: {
            general: "TaskBridge offers a wide range of freelance services including web development, graphic design, writing, marketing, and more. Would you like to browse a specific category?",
            webDevelopment: "Our web development services include frontend and backend development, full-stack solutions, e-commerce sites, and website maintenance. Browse our services page to find the right developer for your project.",
            design: "Graphic design services on TaskBridge include logo design, UI/UX design, illustration, branding, and more. Check out our services page to explore options from talented designers.",
            writing: "Our writing services include blog posts, copywriting, technical writing, content marketing, and more. Visit our services page to connect with professional writers.",
            marketing: "Marketing services on TaskBridge include social media management, SEO, email marketing, PPC advertising, and content strategy. Browse our services page to find marketing experts.",
            videoProduction: "Video services include editing, animation, motion graphics, and video marketing. Check out our services page to find talented video professionals."
        },
        pricing: {
            general: "Pricing on TaskBridge varies by freelancer and service type. Each freelancer sets their own rates based on experience and project requirements.",
            fees: "TaskBridge charges a service fee on all transactions. This fee covers our secure payment processing, dispute resolution, and platform maintenance.",
            tiers: "Many freelancers offer tiered pricing (Basic, Standard, Premium) with different deliverables and turnaround times for each tier.",
            negotiation: "You can negotiate with freelancers by sending a custom request with your specific budget and requirements."
        },
        payment: {
            methods: "TaskBridge offers secure payments through credit/debit cards, PayPal, and bank transfers. Funds are held in escrow until you approve the delivered work.",
            security: "All payment information is encrypted and processed through secure, PCI-compliant payment gateways.",
            escrow: "Our escrow system protects both clients and freelancers by holding payment until work is completed and approved.",
            refunds: "If you're not satisfied with the delivered work, you can request revisions or a refund within 14 days of delivery."
        },
        account: {
            manage: "You can manage your account through the profile dropdown menu in the top right. This includes updating your profile, viewing your dashboard, and changing settings.",
            create: "To create an account, click the 'Sign up' button in the top right corner and follow the registration process.",
            verification: "Account verification requires a valid email address and phone number. Additional verification is required for freelancers.",
            delete: "To delete your account, go to Settings > Account > Delete Account. Note that this action cannot be undone."
        },
        upload : {
            portfolio: "To upload your portfolio or samples, go to the 'Upload' page. You can upload images, documents, and other file types to showcase your work.",
            formats: "TaskBridge supports upload of PNG, JPG, PDF, DOC/DOCX, and ZIP files. For larger files, we recommend using cloud storage links.",
            organization: "You can organize your uploads into different folders and categories to showcase different aspects of your work.",
            visibility: "Control who can see your uploads by adjusting privacy settings for each file or collection."
        },
        process: {
            hiring: "To hire a freelancer: 1) Browse services or post a job, 2) Compare proposals/portfolios, 3) Contact and discuss details, 4) Make payment through escrow, 5) Receive and approve work.",
            freelancing: "To start freelancing: 1) Create a detailed profile, 2) Upload portfolio samples, 3) Set up your service offerings, 4) Set your rates, 5) Start bidding on projects.",
            communication: "All communication should happen through TaskBridge's messaging system to ensure protection under our Terms of Service.",
            delivery: "Freelancers deliver work through our secure delivery system, which timestamps and records all submissions."
        },
        dashboard: {
            client: "Your dashboard allows you to track orders, communicate with freelancers, download completed work, and manage your projects in one place.",
            freelancer: "From your dashboard, you can track orders, submit completed work, communicate with clients, and manage your services.",
            tracking: "The dashboard provides real-time updates on project progress, milestone completions, and payment status.",
            messages: "Access all your project-related messages directly from your dashboard for streamlined communication."
        },
        contact: {
            support: "Need more help? You can contact our support team through the 'Support' page, or join our Discord community for assistance.",
            hours: "Our support team is available Monday-Friday, 9am-6pm EST. Typical response time is within 24 hours.",
            emergencies: "For urgent issues, use the live chat feature available at the bottom right of every page during business hours.",
            faq: "Check our FAQ section for quick answers to common questions on our Support page."
        },
        community: {
            discord: "Join our Discord community to connect with other freelancers and clients, share tips, and get help with platform-related questions.",
            joining: "To join our Discord community, click the 'Community' link in the navigation menu and follow the invitation link.",
            benefits: "Our community offers networking opportunities, learning resources, and direct access to TaskBridge team members.",
            events: "We regularly host events, webinars, and AMAs in our Discord community to help you grow your freelance business."
        },
        security: {
            data: "TaskBridge uses industry-standard encryption to protect your personal and payment data. We never store complete credit card information on our servers.",
            privacy: "Your privacy is important to us. We only collect information necessary to provide our services and never sell your data to third parties.",
            protection: "We offer dispute resolution and buyer protection for all transactions made through our platform.",
            terms: "Review our full Terms of Service and Privacy Policy at TaskBridge.com/terms and TaskBridge.com/privacy."
        },
        features: {
            messaging: "Our built-in messaging system allows you to communicate with freelancers/clients directly through the platform.",
            contracts: "Create and manage legally binding contracts with our contract templates or custom agreements.",
            milestones: "Break larger projects into milestones with separate payments and deliverables for better project management.",
            reviews: "Leave and receive reviews after project completion to build your reputation on the platform.",
            analytics: "Track your performance, earnings, and project history through detailed analytics dashboards."
        },
        getStarted: {
            client: "To get started as a client: 1) Create an account, 2) Browse services or post a job, 3) Connect with freelancers, 4) Make payment, 5) Receive quality work.",
            freelancer: "To get started as a freelancer: 1) Create a detailed profile, 2) Set up your services, 3) Build your portfolio, 4) Set your rates, 5) Start applying for jobs.",
            tips: "For best results, complete your profile with a professional photo, detailed description, and showcase your best work in your portfolio.",
            recommendation: "We recommend starting with smaller projects to build your reputation before taking on larger commitments."
        },
        default: "I can help you find freelance services, manage projects, or learn more about TaskBridge. What would you like to know?"
    };
    
    function getAIResponse(query) {
        const lowercaseQuery = query.toLowerCase();
        
        if (lowercaseQuery === "fuck you" || lowercaseQuery === "fuck u"||lowercaseQuery==="fuck") {
            return "FUCK YOU TOO!!!";
        }
        if(lowercaseQuery==="ass hole" || lowercaseQuery ==="ass"){
            return "That is you,Nigga!!";
        }
        if(lowercaseQuery==="hariharan"||lowercaseQuery==="sri hariharan"||lowercaseQuery==="who is hariharan"||lowercaseQuery==="who is the ceo"||lowercaseQuery==="who is the founder"){
            return "Sri Hari Haran is the Founder and CEO of TaskBridge"
        }
        if(lowercaseQuery==="wasif"||lowercaseQuery==="wasif ahmed"||lowercaseQuery==="who is wasif"){
            return "Wasif Ahmed is the CTO of TaskBridge"
        }
        if(lowercaseQuery=="vamshi"||lowercaseQuery==="who is vamhsi"){
            return "Executive Lead and CA at TaskBridge"
        }
        if(lowercaseQuery==="good bye"||lowercaseQuery==="bye"){
            return "FuckOff,this site is better without you!!"
        }
        if(lowercaseQuery==="irfan pasha"){
            return"SuperVisor and Guide for TaskBridge Solutions!!"
        }
        if(lowercaseQuery==="nigga"){
            return "https://www.youtube.com/@IShowSpeed";
        }
        if(lowercaseQuery==="porn"){
            return "Aha! Aatagaadive";
        }
        if (containsAny(lowercaseQuery, ['hello', 'hi', 'hey', 'greetings', 'howdy', 'good day'])) {
            return randomItem(knowledgeBase.greeting);
        }
        
        if (containsAny(lowercaseQuery, ['service', 'offer', 'provide', 'work', 'job'])) {
            if (containsAny(lowercaseQuery, ['web', 'development', 'website', 'app', 'application'])) {
                return knowledgeBase.services.webDevelopment;
            } else if (containsAny(lowercaseQuery, ['design', 'logo', 'graphic', 'ui', 'ux'])) {
                return knowledgeBase.services.design;
            } else if (containsAny(lowercaseQuery, ['write', 'writing', 'content', 'blog', 'article'])) {
                return knowledgeBase.services.writing;
            } else if (containsAny(lowercaseQuery, ['marketing', 'advertise', 'promotion', 'seo', 'social media'])) {
                return knowledgeBase.services.marketing;
            } else if (containsAny(lowercaseQuery, ['video', 'film', 'animation', 'editing'])) {
                return knowledgeBase.services.videoProduction;
            } else {
                return knowledgeBase.services.general;
            }
        }
        
        if (containsAny(lowercaseQuery, ['price', 'cost', 'fee', 'charge', 'expensive', 'cheap', 'affordable'])) {
            if (containsAny(lowercaseQuery, ['service fee', 'platform fee', 'commission'])) {
                return knowledgeBase.pricing.fees;
            } else if (containsAny(lowercaseQuery, ['package', 'tier', 'level', 'basic', 'standard', 'premium'])) {
                return knowledgeBase.pricing.tiers;
            } else if (containsAny(lowercaseQuery, ['negotiate', 'bargain', 'haggle', 'discount'])) {
                return knowledgeBase.pricing.negotiation;
            } else {
                return knowledgeBase.pricing.general;
            }
        }
        
        if (containsAny(lowercaseQuery, ['account', 'profile', 'dashboard', 'settings', 'login', 'sign up', 'register'])) {
            if (containsAny(lowercaseQuery, ['create', 'register', 'sign up', 'join'])) {
                return knowledgeBase.account.create;
            } else if (containsAny(lowercaseQuery, ['verify', 'verification', 'validate', 'confirm'])) {
                return knowledgeBase.account.verification;
            } else if (containsAny(lowercaseQuery, ['delete', 'remove', 'cancel'])) {
                return knowledgeBase.account.delete;
            } else if (containsAny(lowercaseQuery, ['dashboard', 'track', 'order', 'submit'])) {
                if (containsAny(lowercaseQuery, ['freelancer', 'provider', 'seller'])) {
                    return knowledgeBase.dashboard.freelancer;
                } else {
                    return knowledgeBase.dashboard.client;
                }
            } else {
                return knowledgeBase.account.manage;
            }
        }
        
        if (containsAny(lowercaseQuery, ['upload', 'portfolio', 'sample', 'showcase', 'file', 'document'])) {
            if (containsAny(lowercaseQuery, ['format', 'type', 'file type', 'supported'])) {
                return knowledgeBase.upload.formats;
            } else if (containsAny(lowercaseQuery, ['organize', 'folder', 'category', 'sort'])) {
                return knowledgeBase.upload.organization;
            } else if (containsAny(lowercaseQuery, ['private', 'public', 'visibility', 'see'])) {
                return knowledgeBase.upload.visibility;
            } else {
                return knowledgeBase.upload.portfolio;
            }
        }
        
        if (containsAny(lowercaseQuery, ['pay', 'payment', 'money', 'transaction', 'escrow', 'deposit'])) {
            if (containsAny(lowercaseQuery, ['secure', 'security', 'safe', 'protect'])) {
                return knowledgeBase.payment.security;
            } else if (containsAny(lowercaseQuery, ['escrow', 'hold', 'release'])) {
                return knowledgeBase.payment.escrow;
            } else if (containsAny(lowercaseQuery, ['refund', 'money back', 'return', 'cancel'])) {
                return knowledgeBase.payment.refunds;
            } else {
                return knowledgeBase.payment.methods;
            }
        }
        
        if (containsAny(lowercaseQuery, ['process', 'how to', 'steps', 'procedure', 'start'])) {
            if (containsAny(lowercaseQuery, ['hire', 'find', 'get', 'client'])) {
                return knowledgeBase.process.hiring;
            } else if (containsAny(lowercaseQuery, ['freelance', 'work', 'sell', 'provider'])) {
                return knowledgeBase.process.freelancing;
            } else if (containsAny(lowercaseQuery, ['communicate', 'message', 'contact'])) {
                return knowledgeBase.process.communication;
            } else if (containsAny(lowercaseQuery, ['deliver', 'submission', 'complete'])) {
                return knowledgeBase.process.delivery;
            } else if ( containsAny(lowercaseQuery, ['start', 'begin', 'new', 'first time'])) {
                if (containsAny(lowercaseQuery, ['freelancer', 'seller', 'provider'])) {
                    return knowledgeBase.getStarted.freelancer;
                } else {
                    return knowledgeBase.getStarted.client;
                }
            }
        }
        
        if (containsAny(lowercaseQuery, ['help', 'support', 'contact', 'assistance', 'issue', 'problem'])) {
            if (containsAny(lowercaseQuery, ['hours', 'time', 'available', 'when'])) {
                return knowledgeBase.contact.hours;
            } else if (containsAny(lowercaseQuery, ['urgent', 'emergency', 'immediate', 'now'])) {
                return knowledgeBase.contact.emergencies;
            } else if (containsAny(lowercaseQuery, ['faq', 'question', 'answer', 'common'])) {
                return knowledgeBase.contact.faq;
            } else {
                return knowledgeBase.contact.support;
            }
        }
        
        if (containsAny(lowercaseQuery, ['community', 'discord', 'chat', 'forum', 'connect', 'network'])) {
            if (containsAny(lowercaseQuery, ['join', 'access', 'invitation', 'invite'])) {
                return knowledgeBase.community.joining;
            } else if (containsAny(lowercaseQuery, ['benefit', 'advantage', 'value'])) {
                return knowledgeBase.community.benefits;
            } else if (containsAny(lowercaseQuery, ['event', 'webinar', 'workshop', 'ama'])) {
                return knowledgeBase.community.events;
            } else {
                return knowledgeBase.community.discord;
            }
        }
        
        if (containsAny(lowercaseQuery, ['security', 'private', 'privacy', 'protect', 'safe', 'data'])) {
            if (containsAny(lowercaseQuery, ['data', 'information', 'personal'])) {
                return knowledgeBase.security.data;
            } else if (containsAny(lowercaseQuery, ['privacy', 'policy', 'personal'])) {
                return knowledgeBase.security.privacy;
            } else if (containsAny(lowercaseQuery, ['protect', 'buyer', 'protection', 'guarantee'])) {
                return knowledgeBase.security.protection;
            } else if (containsAny(lowercaseQuery, ['terms', 'conditions', 'policy', 'legal'])) {
                return knowledgeBase.security.terms;
            }
        }
        
        if (containsAny(lowercaseQuery, ['feature', 'tool', 'function', 'capability', 'able to'])) {
            if (containsAny(lowercaseQuery, ['message', 'chat', 'communicate', 'talk'])) {
                return knowledgeBase.features.messaging;
            } else if (containsAny(lowercaseQuery, ['contract', 'agreement', 'legal', 'terms'])) {
                return knowledgeBase.features.contracts;
            } else if (containsAny(lowercaseQuery, ['milestone', 'stage', 'phase', 'step'])) {
                return knowledgeBase.features.milestones;
            } else if (containsAny(lowercaseQuery, ['review', 'rating', 'feedback', 'star'])) {
                return knowledgeBase.features.reviews;
            } else if (containsAny(lowercaseQuery, ['analytic', 'statistic', 'track', 'monitor'])) {
                return knowledgeBase.features.analytics;
            }
        }
        
        if (containsAny(lowercaseQuery, ['get started', 'begin', 'new', 'first time', 'recommendation', 'advise'])) {
            if (containsAny(lowercaseQuery, ['client', 'buyer', 'customer'])) {
                return knowledgeBase.getStarted.client;
            } else if (containsAny(lowercaseQuery, ['freelancer', 'seller', 'provider'])) {
                return knowledgeBase.getStarted.freelancer;
            } else if (containsAny(lowercaseQuery, ['tip', 'advice', 'suggestion', 'recommend'])) {
                return knowledgeBase.getStarted.tips;
            } else if (containsAny(lowercaseQuery, ['recommend', 'suggestion', 'best practice'])) {
                return knowledgeBase.getStarted.recommendation;
            }
        }
        
        return knowledgeBase.default;
    }
    
    function containsAny(text, keywords) {
        return keywords.some(keyword => text.includes(keyword));
    }
    
    function randomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
    
    function generateResponse(query) {
        const response = getAIResponse(query);
        
        let followUpSuggestions = [];
        const lowercaseQuery = query.toLowerCase();
        
        if (containsAny(lowercaseQuery, ['service', 'freelance', 'offer'])) {
            followUpSuggestions = [
                "Web Development Services", 
                "Design Services", 
                "Writing Services"
            ];
        } else if (containsAny(lowercaseQuery, ['payment', 'price', 'cost'])) {
            followUpSuggestions = [
                    "Payment Methods", 
                    "Service Fees", 
                    "Refund Policy"
                ];
        } else if (containsAny(lowercaseQuery, ['account', 'profile', 'sign'])) {
            followUpSuggestions = [
                "Create Account", 
                "Account Verification", 
                "Account Security"
            ];
        } else if (containsAny(lowercaseQuery, ['get started', 'begin', 'new'])) {
            followUpSuggestions = [
                "Start as Client", 
                "Start as Freelancer", 
                "Beginner Tips"
            ];
        } else if (containsAny(lowercaseQuery, ['dashboard', 'track', 'order'])) {
            followUpSuggestions = [
                "Track Orders", 
                "Submit Work", 
                "Download Deliverables"
            ];
        } else if (containsAny(lowercaseQuery, ['community', 'discord', 'connect'])) {
            followUpSuggestions = [
                "Join Discord", 
                "Community Benefits", 
                "Upcoming Events"
            ];
        } else {
            followUpSuggestions = [
                "Services Overview", 
                "How to Hire", 
                "Contact Support"
            ];
        }
        
        return {
            text: response,
            suggestions: followUpSuggestions
        };
    }
    
    if (!searchInput.getAttribute('data-ai-initialized')) {
        searchInput.setAttribute('data-ai-initialized', 'true');
        
        searchInput.addEventListener('keypress', function handleSearchInput(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const query = searchInput.value.trim();
                
                if (query !== '') {
                    resultsContainer.style.display = 'block';
                    resultsContainer.innerHTML = '<div class="loading">Processing your request...</div>';
                    
                    gearIcon.style.animation = 'spin 1s linear infinite';
                    
                    setTimeout(() => {
                        const responseObj = generateResponse(query);
                        
                        let suggestionsHTML = '';
                        if (responseObj.suggestions && responseObj.suggestions.length > 0) {
                            suggestionsHTML = `
                                <div class="ai-suggestions">
                                    <div class="suggestion-label">Quick follow-ups:</div>
                                    <div class="suggestion-buttons">
                                        ${responseObj.suggestions.map(suggestion => 
                                            `<button class="suggestion-btn">${suggestion}</button>`
                                        ).join('')}
                                    </div>
                                </div>
                            `;
                        }
                        
                        resultsContainer.innerHTML = `
                            <div class="ai-response">
                                <div class="ai-response-header">
                                    <div class="ai-avatar">AI</div>
                                    <div class="ai-title">TaskBridge Assistant</div>
                                </div>
                                <div class="ai-response-content">${responseObj.text}</div>
                                ${suggestionsHTML}
                            </div>
                        `;
                        
                        const aiResponse = resultsContainer.querySelector('.ai-response');
                        aiResponse.style.display = 'flex';
                        aiResponse.style.flexDirection = 'column';
                        aiResponse.style.gap = '0.8rem';
                        
                        const aiResponseHeader = resultsContainer.querySelector('.ai-response-header');
                        aiResponseHeader.style.display = 'flex';
                        aiResponseHeader.style.alignItems = 'center';
                        aiResponseHeader.style.gap = '0.7rem';
                        
                        const aiAvatar = resultsContainer.querySelector('.ai-avatar');
                        aiAvatar.style.width = '24px';
                        aiAvatar.style.height = '24px';
                        aiAvatar.style.borderRadius = '50%';
                        aiAvatar.style.backgroundColor = '#ffcc00';
                        aiAvatar.style.display = 'flex';
                        aiAvatar.style.alignItems = 'center';
                        aiAvatar.style.justifyContent = 'center';
                        aiAvatar.style.fontSize = '12px';
                        aiAvatar.style.fontWeight = 'bold';
                        aiAvatar.style.color = '#000000';
                        
                        const aiTitle = resultsContainer.querySelector('.ai-title');
                        aiTitle.style.fontWeight = '600';
                        aiTitle.style.color = '#ffffff';
                        
                        const aiResponseContent = resultsContainer.querySelector('.ai-response-content');
                        aiResponseContent.style.lineHeight = '1.5';
                        aiResponseContent.style.color = '#cccccc';
                        aiResponseContent.style.padding = '0.5rem 0';
                        
                        const aiSuggestions = resultsContainer.querySelector('.ai-suggestions');
                        if (aiSuggestions) {
                            aiSuggestions.style.marginTop = '1rem';
                            aiSuggestions.style.display = 'flex';
                            aiSuggestions.style.flexDirection = 'column';
                            aiSuggestions.style.gap = '0.5rem';
                            
                            const suggestionLabel = resultsContainer.querySelector('.suggestion-label');
                            suggestionLabel.style.fontSize = '0.85rem';
                            suggestionLabel.style.color = '#999999';
                            
                            const suggestionButtons = resultsContainer.querySelector('.suggestion-buttons');
                            suggestionButtons.style.display = 'flex';
                            suggestionButtons.style.flexWrap = 'wrap';
                            suggestionButtons.style.gap = '0.5rem';
                            
                            const suggestionBtns = resultsContainer.querySelectorAll('.suggestion-btn');
                            suggestionBtns.forEach(btn => {
                                btn.style.backgroundColor = '#333333';
                                btn.style.color = '#ffffff';
                                btn.style.border = 'none';
                                btn.style.borderRadius = '16px';
                                btn.style.padding = '0.4rem 0.8rem';
                                btn.style.fontSize = '0.85rem';
                                btn.style.cursor = 'pointer';
                                btn.style.transition = 'background-color 0.2s ease';
                                
                                btn.addEventListener('mouseover', function() {
                                    this.style.backgroundColor = '#444444';
                                });
                                
                                btn.addEventListener('mouseout', function() {
                                    this.style.backgroundColor = '#333333';
                                });
                                
                                btn.addEventListener('click', function() {
                                    searchInput.value = this.textContent;
                                    
                                    const event = new KeyboardEvent('keypress', {
                                        key: 'Enter',
                                        code: 'Enter',
                                        keyCode: 13,
                                        which: 13,
                                        bubbles: true
                                    });
                                    searchInput.dispatchEvent(event);
                                });
                            });
                        }
                        
                        gearIcon.style.animation = '';
                    }, 1000);
                }
            }
        });
    }
    
    if (!gearIcon.getAttribute('data-ai-settings-initialized')) {
        gearIcon.setAttribute('data-ai-settings-initialized', 'true');
        
        gearIcon.addEventListener('click', function() {
            const existingModal = document.querySelector('.ai-settings-modal');
            if (existingModal) {
                existingModal.remove();
            }
            
            const settingsModal = document.createElement('div');
            settingsModal.className = 'ai-settings-modal';
            document.body.appendChild(settingsModal);
            
            settingsModal.style.position = 'fixed';
            settingsModal.style.top = '50%';
            settingsModal.style.left = '50%';
            settingsModal.style.transform = 'translate(-50%, -50%)';
            settingsModal.style.backgroundColor = '#1f1f1f';
            settingsModal.style.borderRadius = '8px';
            settingsModal.style.padding = '1.5rem';
            settingsModal.style.width = '320px';
            settingsModal.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
            settingsModal.style.zIndex = '1000';
            settingsModal.style.border = '1px solid #3d3d3d';
            
            settingsModal.innerHTML = `
                <div class="modal-header">
                    <h3>AI Search Settings</h3>
                    <button class="close-btn">&times;</button>
                </div>
                <div class="modal-content">
                    <div class="setting-item">
                        <label>
                            <input type="checkbox" id="ai-enabled" checked>
                            <span>Enable AI Assistant</span>
                        </label>
                    </div>
                    <div class="setting-item">
                        <label>
                            <input type="checkbox" id="show-suggestions" checked>
                            <span>Show follow-up suggestions</span>
                        </label>
                    </div>
                    <div class="setting-item">
                        <label>Response tone:</label>
                        <select id="ai-tone">
                            <option value="friendly">Friendly</option>
                            <option value="professional">Professional</option>
                            <option value="concise">Concise</option>
                        </select>
                    </div>
                    <div class="setting-item">
                        <button id="clear-history">Clear Search History</button>
                    </div>
                </div>
            `;
            
            const modalHeader = settingsModal.querySelector('.modal-header');
            modalHeader.style.display = 'flex';
            modalHeader.style.justifyContent = 'space-between';
            modalHeader.style.alignItems = 'center';
            modalHeader.style.marginBottom = '1rem';
            modalHeader.style.borderBottom = '1px solid #3d3d3d';
            modalHeader.style.paddingBottom = '0.8rem';
            
            const modalTitle = settingsModal.querySelector('h3');
            modalTitle.style.margin = '0';
            modalTitle.style.color = '#ffffff';
            modalTitle.style.fontSize = '1.2rem';
            
            const closeBtn = settingsModal.querySelector('.close-btn');
            closeBtn.style.background = 'none';
            closeBtn.style.border = 'none';
            closeBtn.style.color = '#ffffff';
            closeBtn.style.fontSize = '1.5rem';
            closeBtn.style.cursor = 'pointer';
            closeBtn.style.padding = '0';
            closeBtn.style.lineHeight = '1';
            
            const settingItems = settingsModal.querySelectorAll('.setting-item');
            settingItems.forEach(item => {
                item.style.margin = '1rem 0';
                item .style.display = 'flex';
                item.style.alignItems = 'center';
                item.style.justifyContent = 'space-between';
            });
            
            const labels = settingsModal.querySelectorAll('label');
            labels.forEach(label => {
                label.style.color = '#cccccc';
                label.style.display = 'flex';
                label.style.alignItems = 'center';
                label.style.gap = '0.5rem';
                label.style.cursor = 'pointer';
            });
            
            const select = settingsModal.querySelector('select');
            select.style.backgroundColor = '#333333';
            select.style.color = '#ffffff';
            select.style.border = '1px solid #4d4d4d';
            select.style.borderRadius = '4px';
            select.style.padding = '0.4rem';
            select.style.width = '150px';
            
            const clearBtn = settingsModal.querySelector('#clear-history');
            clearBtn.style.backgroundColor = '#990000';
            clearBtn.style.color = '#ffffff';
            clearBtn.style.border = 'none';
            clearBtn.style.borderRadius = '4px';
            clearBtn.style.padding = '0.5rem 1rem';
            clearBtn.style.cursor = 'pointer';
            clearBtn.style.width = '100%';
            clearBtn.style.marginTop = '0.5rem';
            
            closeBtn.addEventListener('click', function() {
                settingsModal.remove();
            });
            
            document.addEventListener('click', function(event) {
                if (!settingsModal.contains(event.target) && event.target !== gearIcon) {
                    settingsModal.remove();
                }
            });
            
            clearBtn.addEventListener('click', function() {
                localStorage.removeItem('aiSearchHistory');
                clearBtn.textContent = 'History Cleared!';
                setTimeout(() => {
                    clearBtn.textContent = 'Clear Search History';
                }, 2000);
            });
            
            const aiEnabled = settingsModal.querySelector('#ai-enabled');
            const showSuggestions = settingsModal.querySelector('#show-suggestions');
            const aiTone = settingsModal.querySelector('#ai-tone');
            
            if (localStorage.getItem('aiEnabled') === 'false') {
                aiEnabled.checked = false;
            }
            
            if (localStorage.getItem('showSuggestions') === 'false') {
                showSuggestions.checked = false;
            }
            
            const savedTone = localStorage.getItem('aiTone');
            if (savedTone) {
                aiTone.value = savedTone;
            }
            
            aiEnabled.addEventListener('change', function() {
                localStorage.setItem('aiEnabled', aiEnabled.checked);
            });
            
            showSuggestions.addEventListener('change', function() {
                localStorage.setItem('showSuggestions', showSuggestions.checked);
            });
            
            aiTone.addEventListener('change', function() {
                localStorage.setItem('aiTone', aiTone.value);
            });
        });
    }
    
    document.addEventListener('click', function(event) {
        if (!resultsContainer.contains(event.target) && 
            !searchBar.contains(event.target) && 
            resultsContainer.style.display === 'block') {
            resultsContainer.style.display = 'none';
        }
    });
    
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && resultsContainer.style.display === 'block') {
            resultsContainer.style.display = 'none';
        }
    });
    
    function updateResponsiveness() {
        if (window.innerWidth < 600) {
            resultsContainer.style.width = '90%';
            resultsContainer.style.maxWidth = 'none';
        } else {
            resultsContainer.style.maxWidth = '600px';
            resultsContainer.style.width = '100%';
        }
    }
    
    updateResponsiveness();
    window.addEventListener('resize', updateResponsiveness);
    
    function saveToSearchHistory(query) {
        let searchHistory = JSON.parse(localStorage.getItem('aiSearchHistory') || '[]');
        
        if (!searchHistory.includes(query)) {
            if (searchHistory.length >= 10) {
                searchHistory.pop();
            }
            searchHistory.unshift(query);
            localStorage.setItem('aiSearchHistory', JSON.stringify(searchHistory));
        }
    }
    
    function applySettings() {
        const aiEnabled = localStorage.getItem('aiEnabled') !== 'false';
        const tone = localStorage.getItem('aiTone') || 'friendly';
        
        if (!aiEnabled) {
            resultsContainer.style.display = 'none';
        }
        
        if (tone === 'professional') {
            resultsContainer.style.backgroundColor = '#1a2631';
            resultsContainer.style.border = '1px solid #2a3641';
        } else if (tone === 'concise') {
            resultsContainer.style.padding = '0.7rem';
        }
    }
    
    applySettings();
}); // End of DOMContentLoaded event