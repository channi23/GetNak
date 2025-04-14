// ai.js - Enhanced AI Search Bar Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const searchInput = document.querySelector('.search-bar input');
    const searchBar = document.querySelector('.search-bar');
    const gearIcon = document.querySelector('.gear-icon');
    
    // Create results container (initially hidden)
    const resultsContainer = document.createElement('div');
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
    
    // Enhanced AI response knowledge base
    const knowledgeBase = {
        // Basic Information
        greeting: [
            "Hello! How can I help you today?", 
            "Hi there! Looking for freelance services?", 
            "Welcome to GetNak! How can I assist you?",
            "Hey! Ready to find the perfect freelancer for your project?"
        ],
        
        // Services
        services: {
            general: "GetNak offers a wide range of freelance services including web development, graphic design, writing, marketing, and more. Would you like to browse a specific category?",
            webDevelopment: "Our web development services include frontend and backend development, full-stack solutions, e-commerce sites, and website maintenance. Prices typically start at $50/hour.",
            design: "Graphic design services on GetNak include logo design, UI/UX design, illustration, branding, and more. Most designers offer packages starting at $35.",
            writing: "Our writing services include blog posts, copywriting, technical writing, content marketing, and more. Rates typically start at $0.05 per word or $25 per hour.",
            marketing: "Marketing services on GetNak include social media management, SEO, email marketing, PPC advertising, and content strategy. Most marketers offer monthly retainers starting at $300.",
            videoProduction: "Video services include editing, animation, motion graphics, and video marketing. Prices typically start at $75/hour depending on complexity."
        },
        
        // Pricing & Payments
        pricing: {
            general: "Pricing on GetNak varies by freelancer and service type. Most freelancers offer packages starting at $25, with custom quotes available for specific projects.",
            fees: "GetNak charges a 10% service fee on all transactions. This fee covers our secure payment processing, dispute resolution, and platform maintenance.",
            tiers: "Many freelancers offer tiered pricing (Basic, Standard, Premium) with different deliverables and turnaround times for each tier.",
            negotiation: "You can negotiate with freelancers by sending a custom request with your specific budget and requirements."
        },
        
        payment: {
            methods: "GetNak offers secure payments through credit/debit cards, PayPal, and bank transfers. Funds are held in escrow until you approve the delivered work.",
            security: "All payment information is encrypted and processed through secure, PCI-compliant payment gateways.",
            escrow: "Our escrow system protects both clients and freelancers by holding payment until work is completed and approved.",
            refunds: "If you're not satisfied with the delivered work, you can request revisions or a refund within 14 days of delivery."
        },
        
        // Account Management
        account: {
            manage: "You can manage your account through the profile dropdown menu in the top right. This includes updating your profile, viewing your dashboard, and changing settings.",
            create: "To create an account, click the 'Sign up' button in the top right corner and follow the registration process.",
            verification: "Account verification requires a valid email address and phone number. Additional verification is required for freelancers.",
            delete: "To delete your account, go to Settings > Account > Delete Account. Note that this action cannot be undone."
        },
        
        // Content Management
        upload: {
            portfolio: "To upload your portfolio or samples, go to the 'Upload Files' section under 'Find Work'. You can upload images, documents, and other file types to showcase your work.",
            formats: "GetNak supports upload of PNG, JPG, PDF, DOC/DOCX, and ZIP files up to 25MB each. For larger files, we recommend using cloud storage links.",
            organization: "You can organize your uploads into different folders and categories to showcase different aspects of your work.",
            visibility: "Control who can see your uploads by adjusting privacy settings for each file or collection."
        },
        
        // Process
        process: {
            hiring: "To hire a freelancer: 1) Browse services or post a job, 2) Compare proposals/portfolios, 3) Contact and discuss details, 4) Make payment through escrow, 5) Receive and approve work.",
            freelancing: "To start freelancing: 1) Create a detailed profile, 2) Upload portfolio samples, 3) Set up your service offerings, 4) Set your rates, 5) Start bidding on projects.",
            communication: "All communication should happen through GetNak's messaging system to ensure protection under our Terms of Service.",
            delivery: "Freelancers deliver work through our secure delivery system, which timestamps and records all submissions."
        },
        
        // Support & Help
        contact: {
            support: "Need more help? You can contact our support team through the 'Support' option under 'Why Us', or email us directly at support@getnak.com.",
            hours: "Our support team is available Monday-Friday, 9am-6pm EST. Typical response time is within 24 hours.",
            emergencies: "For urgent issues, use the live chat feature available at the bottom right of every page during business hours.",
            faq: "Check our FAQ section for quick answers to common questions: getnak.com/faq"
        },
        
        // Security & Privacy
        security: {
            data: "GetNak uses industry-standard encryption to protect your personal and payment data. We never store complete credit card information on our servers.",
            privacy: "Your privacy is important to us. We only collect information necessary to provide our services and never sell your data to third parties.",
            protection: "We offer dispute resolution and buyer protection for all transactions made through our platform.",
            terms: "Review our full Terms of Service and Privacy Policy at getnak.com/terms and getnak.com/privacy."
        },
        
        // Platform Features
        features: {
            messaging: "Our built-in messaging system allows you to communicate with freelancers/clients directly through the platform.",
            contracts: "Create and manage legally binding contracts with our contract templates or custom agreements.",
            milestones: "Break larger projects into milestones with separate payments and deliverables for better project management.",
            reviews: "Leave and receive reviews after project completion to build your reputation on the platform.",
            analytics: "Track your performance, earnings, and project history through detailed analytics dashboards."
        },
        
        // Getting Started
        getStarted: {
            client: "To get started as a client: 1) Create an account, 2) Browse services or post a job, 3) Connect with freelancers, 4) Make payment, 5) Receive quality work.",
            freelancer: "To get started as a freelancer: 1) Create a detailed profile, 2) Set up your services, 3) Build your portfolio, 4) Set your rates, 5) Start applying for jobs.",
            tips: "For best results, complete your profile with a professional photo, detailed description, and showcase your best work in your portfolio.",
            recommendation: "We recommend starting with smaller projects to build your reputation before taking on larger commitments."
        },
        
        // Default Fallback
        default: "I can help you find freelance services, manage projects, or learn more about GetNak. What would you like to know?"
    };
    
    // AI response function - Enhanced with more comprehensive matching
    function getAIResponse(query) {
        // Lowercase query for easier matching
        const lowercaseQuery = query.toLowerCase();
        
        // Check for greetings
        if (containsAny(lowercaseQuery, ['hello', 'hi', 'hey', 'greetings', 'howdy', 'good day'])) {
            return randomItem(knowledgeBase.greeting);
        }
        
        // Check for services-related queries
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
        
        // Check for pricing-related queries
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
        
        // Check for account-related queries
        if (containsAny(lowercaseQuery, ['account', 'profile', 'dashboard', 'settings', 'login', 'sign up', 'register'])) {
            if (containsAny(lowercaseQuery, ['create', 'register', 'sign up', 'join'])) {
                return knowledgeBase.account.create;
            } else if (containsAny(lowercaseQuery, ['verify', 'verification', 'validate', 'confirm'])) {
                return knowledgeBase.account.verification;
            } else if (containsAny(lowercaseQuery, ['delete', 'remove', 'cancel'])) {
                return knowledgeBase.account.delete;
            } else {
                return knowledgeBase.account.manage;
            }
        }
        
        // Check for upload-related queries
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
        
        // Check for payment-related queries
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
        
        // Check for process-related queries
        if (containsAny(lowercaseQuery, ['process', 'how to', 'steps', 'procedure', 'start'])) {
            if (containsAny(lowercaseQuery, ['hire', 'find', 'get', 'client'])) {
                return knowledgeBase.process.hiring;
            } else if (containsAny(lowercaseQuery, ['freelance', 'work', 'sell', 'provider'])) {
                return knowledgeBase.process.freelancing;
            } else if (containsAny(lowercaseQuery, ['communicate', 'message', 'contact'])) {
                return knowledgeBase.process.communication;
            } else if (containsAny(lowercaseQuery, ['deliver', 'submission', 'complete'])) {
                return knowledgeBase.process.delivery;
            } else if (containsAny(lowercaseQuery, ['start', 'begin', 'new', 'first time'])) {
                if (containsAny(lowercaseQuery, ['freelancer', 'seller', 'provider'])) {
                    return knowledgeBase.getStarted.freelancer;
                } else {
                    return knowledgeBase.getStarted.client;
                }
            }
        }
        
        // Check for help and support queries
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
        
        // Check for security-related queries
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
        
        // Check for feature-related queries
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
        
        // Check for getting started queries
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
        
        // Web development specific questions
        if (containsAny(lowercaseQuery, ['website', 'web development', 'app', 'landing page'])) {
            return "Our web developers can create custom websites, landing pages, web applications, e-commerce stores, and more. You can find qualified developers starting at $50/hour. Would you like to browse web development services?";
        }
        
        // Design specific questions
        if (containsAny(lowercaseQuery, ['logo', 'design', 'brand', 'graphic'])) {
            return "Our designers offer logo creation, branding packages, UI/UX design, illustration, and print design. Most logo design packages start at $150. Would you like to see examples from our top designers?";
        }
        
        // Writing specific questions
        if (containsAny(lowercaseQuery, ['content', 'blog', 'article', 'copywriting', 'seo writing'])) {
            return "GetNak has expert writers for blog posts, SEO content, technical documentation, email copy, and more. Rates typically start at $0.05-0.15 per word depending on expertise. Would you like to browse writing services?";
        }
        
        // Default response for anything else
        return knowledgeBase.default;
    }
    
    // Helper functions
    function containsAny(text, keywords) {
        return keywords.some(keyword => text.includes(keyword));
    }
    
    function randomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
    
    // Function to generate chat-like conversations with follow-up suggestions
    function generateResponse(query) {
        const response = getAIResponse(query);
        
        // Add follow-up suggestions based on the query context
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
        } else {
            // Default suggestions
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
    
    // Handle search input
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const query = searchInput.value.trim();
            
            if (query !== '') {
                // Show loading indicator
                resultsContainer.style.display = 'block';
                resultsContainer.innerHTML = '<div class="loading">Processing your request...</div>';
                
                // Add spinning animation to the gear icon
                gearIcon.style.animation = 'spin 1s linear infinite';
                
                // Simulate AI processing delay
                setTimeout(() => {
                    const responseObj = generateResponse(query);
                    
                    // Create the follow-up suggestion buttons
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
                    
                    // Display the response with suggestions
                    resultsContainer.innerHTML = `
                        <div class="ai-response">
                            <div class="ai-response-header">
                                <div class="ai-avatar">AI</div>
                                <div class="ai-title">GetNak Assistant</div>
                            </div>
                            <div class="ai-response-content">${responseObj.text}</div>
                            ${suggestionsHTML}
                        </div>
                    `;
                    
                    // Style the response elements
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
                    
                    // Style suggestion elements if they exist
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
                            
                            // Add hover effect
                            btn.addEventListener('mouseover', function() {
                                this.style.backgroundColor = '#444444';
                            });
                            
                            btn.addEventListener('mouseout', function() {
                                this.style.backgroundColor = '#333333';
                            });
                            
                            // Add click handler for follow-up questions
                            btn.addEventListener('click', function() {
                                searchInput.value = this.textContent;
                                
                                // Trigger a new search with the suggestion
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
                    
                    // Stop the gear icon animation
                    gearIcon.style.animation = '';
                }, 1000);
            }
        }
    });
    
    // Enhanced settings menu with more options
    gearIcon.addEventListener('click', function() {
        // Create a modal for AI settings
        const settingsModal = document.createElement('div');
        settingsModal.className = 'ai-settings-modal';
        document.body.appendChild(settingsModal);
        
        // Style the modal
        settingsModal.style.position = 'fixed';
        settingsModal.style.top = '0';
        settingsModal.style.left = '0';
        settingsModal.style.width = '100%';
        settingsModal.style.height = '100%';
        settingsModal.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        settingsModal.style.display = 'flex';
        settingsModal.style.justifyContent = 'center';
        settingsModal.style.alignItems = 'center';
        settingsModal.style.zIndex = '1000';
        
        // Create modal content
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        settingsModal.appendChild(modalContent);
        
        // Style modal content
        modalContent.style.backgroundColor = '#1f1f1f';
        modalContent.style.borderRadius = '8px';
        modalContent.style.padding = '1.5rem';
        modalContent.style.width = '90%';
        modalContent.style.maxWidth = '500px';
        modalContent.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
        modalContent.style.border = '1px solid #3d3d3d';
        modalContent.style.position = 'relative';
        
        // Add close button
        const closeButton = document.createElement('button');
        closeButton.innerHTML = '&times;';
        closeButton.className = 'close-button';
        modalContent.appendChild(closeButton);
        
        // Style close button
        closeButton.style.position = 'absolute';
        closeButton.style.right = '1rem';
        closeButton.style.top = '1rem';
        closeButton.style.backgroundColor = 'transparent';
        closeButton.style.border = 'none';
        closeButton.style.fontSize = '1.5rem';
        closeButton.style.color = '#cccccc';
        closeButton.style.cursor = 'pointer';
        
        // Add settings content
        modalContent.innerHTML += `
            <h2 style="color: #ffffff; margin-top: 0; margin-bottom: 1.5rem; font-size: 1.25rem;">GetNak AI Assistant Settings</h2>
            
            <div class="settings-section">
                <h3 style="color: #cccccc; font-size: 1rem; margin-bottom: 0.75rem;">Response Type</h3>
                <div class="settings-options">
                    <label style="display: flex; align-items: center; margin-bottom: 0.5rem; color: #ffffff;">
                        <input type="radio" name="responseType" value="concise" checked style="margin-right: 0.5rem;"> 
                        Concise
                    </label>
                    <label style="display: flex; align-items: center; margin-bottom: 0.5rem; color: #ffffff;">
                        <input type="radio" name="responseType" value="detailed" style="margin-right: 0.5rem;"> 
                        Detailed
                    </label>
                </div>
            </div>
            
            <div class="settings-section" style="margin-top: 1.25rem;">
               <h3 style="color: #cccccc; font-size: 1rem; margin-bottom: 0.75rem;">Follow-up Suggestions</h3>
                <div class="settings-options">
                    <label style="display: flex; align-items: center; margin-bottom: 0.5rem; color: #ffffff;">
                        <input type="checkbox" name="showSuggestions" checked style="margin-right: 0.5rem;"> 
                        Show follow-up suggestions
                    </label>
                </div>
            </div>
            
            <div class="settings-section" style="margin-top: 1.25rem;">
                <h3 style="color: #cccccc; font-size: 1rem; margin-bottom: 0.75rem;">History</h3>
                <div class="settings-options">
                    <label style="display: flex; align-items: center; margin-bottom: 0.5rem; color: #ffffff;">
                        <input type="checkbox" name="saveHistory" checked style="margin-right: 0.5rem;"> 
                        Save search history
                    </label>
                    <button id="clearHistory" style="background-color: #333333; color: #ffffff; border: none; border-radius: 4px; padding: 0.5rem 0.75rem; cursor: pointer; margin-top: 0.5rem; font-size: 0.9rem;">Clear History</button>
                </div>
            </div>
            
            <div class="settings-section" style="margin-top: 1.25rem;">
                <h3 style="color: #cccccc; font-size: 1rem; margin-bottom: 0.75rem;">Appearance</h3>
                <div class="settings-options">
                    <label style="display: flex; align-items: center; margin-bottom: 0.5rem; color: #ffffff;">
                        <input type="checkbox" name="darkMode" checked style="margin-right: 0.5rem;"> 
                        Dark mode
                    </label>
                </div>
            </div>
            
            <div style="margin-top: 1.5rem; text-align: right;">
                <button id="saveSettings" style="background-color: #ffcc00; color: #000000; border: none; border-radius: 4px; padding: 0.5rem 1rem; cursor: pointer; font-weight: 600;">Save Settings</button>
            </div>
        `;
        
        // Close modal on close button click
        closeButton.addEventListener('click', function() {
            document.body.removeChild(settingsModal);
        });
        
        // Close modal when clicking outside the modal content
        settingsModal.addEventListener('click', function(e) {
            if (e.target === settingsModal) {
                document.body.removeChild(settingsModal);
            }
        });
        
        // Save settings button functionality
        const saveSettingsBtn = document.getElementById('saveSettings');
        saveSettingsBtn.addEventListener('click', function() {
            // Get selected response type
            const responseType = document.querySelector('input[name="responseType"]:checked').value;
            
            // Get selected AI model
            const aiModel = document.querySelector('input[name="aiModel"]:checked').value;
            
            // Get checkbox values
            const showSuggestions = document.querySelector('input[name="showSuggestions"]').checked;
            const saveHistory = document.querySelector('input[name="saveHistory"]').checked;
            const darkMode = document.querySelector('input[name="darkMode"]').checked;
            
            // Save settings to localStorage
            const settings = {
                responseType,
                aiModel,
                showSuggestions,
                saveHistory,
                darkMode
            };
            
            localStorage.setItem('getnak_ai_settings', JSON.stringify(settings));
            
            // Show success notification
            const notification = document.createElement('div');
            notification.textContent = 'Settings saved successfully!';
            notification.style.position = 'fixed';
            notification.style.bottom = '1rem';
            notification.style.left = '50%';
            notification.style.transform = 'translateX(-50%)';
            notification.style.backgroundColor = '#4caf50';
            notification.style.color = 'white';
            notification.style.padding = '0.75rem 1.5rem';
            notification.style.borderRadius = '4px';
            notification.style.zIndex = '1001';
            document.body.appendChild(notification);
            
            // Remove notification after 3 seconds
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 3000);
            
            // Close modal
            document.body.removeChild(settingsModal);
            
            // Apply settings (for demonstration, we're just logging them)
            console.log('AI Settings saved:', settings);
        });
        
        // Clear history button functionality
        const clearHistoryBtn = document.getElementById('clearHistory');
        clearHistoryBtn.addEventListener('click', function() {
            // Clear search history from localStorage
            localStorage.removeItem('getnak_search_history');
            
            // Show confirmation
            clearHistoryBtn.textContent = 'History Cleared!';
            clearHistoryBtn.style.backgroundColor = '#4caf50';
            
            // Reset button after 2 seconds
            setTimeout(() => {
                clearHistoryBtn.textContent = 'Clear History';
                clearHistoryBtn.style.backgroundColor = '#333333';
            }, 2000);
        });
    });
    
    // Add search history functionality
    function saveSearchQuery(query) {
        if (!query.trim()) return;
        
        let searchHistory = JSON.parse(localStorage.getItem('getnak_search_history') || '[]');
        
        // Add the new query to the beginning of the array
        if (!searchHistory.includes(query)) {
            searchHistory.unshift(query);
            
            // Limit to 10 most recent searches
            if (searchHistory.length > 10) {
                searchHistory = searchHistory.slice(0, 10);
            }
            
            localStorage.setItem('getnak_search_history', JSON.stringify(searchHistory));
        }
    }
    
    // Load search history when focusing on search input
    searchInput.addEventListener('focus', function() {
        const settings = JSON.parse(localStorage.getItem('getnak_ai_settings') || '{}');
        
        // Only show history if saveHistory setting is enabled (or not set yet)
        if (settings.saveHistory !== false) {
            const searchHistory = JSON.parse(localStorage.getItem('getnak_search_history') || '[]');
            
            if (searchHistory.length > 0) {
                // Create history dropdown
                let historyDropdown = document.querySelector('.search-history-dropdown');
                
                if (!historyDropdown) {
                    historyDropdown = document.createElement('div');
                    historyDropdown.className = 'search-history-dropdown';
                    searchBar.parentNode.insertBefore(historyDropdown, searchBar.nextSibling);
                    
                    // Style history dropdown
                    historyDropdown.style.backgroundColor = '#1f1f1f';
                    historyDropdown.style.borderRadius = '8px';
                    historyDropdown.style.padding = '0.5rem 0';
                    historyDropdown.style.marginTop = '0.5rem';
                    historyDropdown.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
                    historyDropdown.style.border = '1px solid #3d3d3d';
                    historyDropdown.style.maxHeight = '200px';
                    historyDropdown.style.overflowY = 'auto';
                    historyDropdown.style.zIndex = '100';
                    historyDropdown.style.width = searchBar.offsetWidth + 'px';
                }
                
                // Add history items
                historyDropdown.innerHTML = `
                    <div style="padding: 0.5rem 1rem; color: #999999; font-size: 0.85rem; font-weight: 600;">Recent Searches</div>
                `;
                
                searchHistory.forEach(item => {
                    const historyItem = document.createElement('div');
                    historyItem.className = 'history-item';
                    historyItem.textContent = item;
                    historyDropdown.appendChild(historyItem);
                    
                    // Style history item
                    historyItem.style.padding = '0.5rem 1rem';
                    historyItem.style.cursor = 'pointer';
                    historyItem.style.color = '#cccccc';
                    
                    // Add hover effect
                    historyItem.addEventListener('mouseover', function() {
                        this.style.backgroundColor = '#333333';
                    });
                    
                    historyItem.addEventListener('mouseout', function() {
                        this.style.backgroundColor = 'transparent';
                    });
                    
                    // Set search input value when clicking on history item
                    historyItem.addEventListener('click', function() {
                        searchInput.value = this.textContent;
                        historyDropdown.style.display = 'none';
                        
                        // Trigger search
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
                
                historyDropdown.style.display = 'block';
            }
        }
    });
    
    // Hide history dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target)) {
            const historyDropdown = document.querySelector('.search-history-dropdown');
            if (historyDropdown) {
                historyDropdown.style.display = 'none';
            }
        }
    });
    
    // Save search query when searching
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const query = searchInput.value.trim();
            if (query !== '') {
                saveSearchQuery(query);
            }
        }
    });
    
    // Add keyboard shortcuts for the search bar
    document.addEventListener('keydown', function(e) {
        // Alt + S to focus the search bar
        if (e.altKey && e.key === 's') {
            e.preventDefault();
            searchInput.focus();
        }
        
        // Escape to clear search and hide results
        if (e.key === 'Escape') {
            searchInput.value = '';
            resultsContainer.style.display = 'none';
            
            const historyDropdown = document.querySelector('.search-history-dropdown');
            if (historyDropdown) {
                historyDropdown.style.display = 'none';
            }
        }
    });
    
    // Apply saved settings on load
    const savedSettings = JSON.parse(localStorage.getItem('getnak_ai_settings') || '{}');
    
    // Apply dark mode if set
    if (savedSettings.darkMode === false) {
        // Apply light mode styles (this is just a placeholder - you would need to implement proper theming)
        console.log('Light mode would be applied here');
    }
    
    // Create keyboard shortcut info toggle
    const shortcutInfo = document.createElement('div');
    shortcutInfo.className = 'keyboard-shortcut-info';
    shortcutInfo.innerHTML = '?';
    shortcutInfo.title = 'Keyboard Shortcuts';
    searchBar.appendChild(shortcutInfo);
    
    // Style shortcut info button
    shortcutInfo.style.width = '24px';
    shortcutInfo.style.height = '24px';
    shortcutInfo.style.borderRadius = '50%';
    shortcutInfo.style.backgroundColor = '#333333';
    shortcutInfo.style.color = '#ffffff';
    shortcutInfo.style.display = 'flex';
    shortcutInfo.style.alignItems = 'center';
    shortcutInfo.style.justifyContent = 'center';
    shortcutInfo.style.marginLeft = '10px';
    shortcutInfo.style.fontSize = '14px';
    shortcutInfo.style.cursor = 'pointer';
    
    // Show keyboard shortcuts on click
    shortcutInfo.addEventListener('click', function() {
        const shortcutsModal = document.createElement('div');
        shortcutsModal.className = 'shortcuts-modal';
        document.body.appendChild(shortcutsModal);
        
        // Style shortcuts modal
        shortcutsModal.style.position = 'fixed';
        shortcutsModal.style.top = '0';
        shortcutsModal.style.left = '0';
        shortcutsModal.style.width = '100%';
        shortcutsModal.style.height = '100%';
        shortcutsModal.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        shortcutsModal.style.display = 'flex';
        shortcutsModal.style.justifyContent = 'center';
        shortcutsModal.style.alignItems = 'center';
        shortcutsModal.style.zIndex = '1000';
        
        // Create modal content
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        shortcutsModal.appendChild(modalContent);
        
        // Style modal content
        modalContent.style.backgroundColor = '#1f1f1f';
        modalContent.style.borderRadius = '8px';
        modalContent.style.padding = '1.5rem';
        modalContent.style.width = '90%';
        modalContent.style.maxWidth = '400px';
        modalContent.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
        modalContent.style.border = '1px solid #3d3d3d';
        
        // Add content
        modalContent.innerHTML = `
            <h2 style="color: #ffffff; margin-top: 0; margin-bottom: 1rem; font-size: 1.25rem;">Keyboard Shortcuts</h2>
            
            <div style="margin-bottom: 0.75rem;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                    <span style="color: #cccccc;">Focus search</span>
                    <span style="color: #ffffff; background-color: #333333; padding: 0.1rem 0.5rem; border-radius: 4px;">Alt + S</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                    <span style="color: #cccccc;">Clear search</span>
                    <span style="color: #ffffff; background-color: #333333; padding: 0.1rem 0.5rem; border-radius: 4px;">Esc</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                    <span style="color: #cccccc;">Submit search</span>
                    <span style="color: #ffffff; background-color: #333333; padding: 0.1rem 0.5rem; border-radius: 4px;">Enter</span>
                </div>
            </div>
            
            <div style="text-align: center; margin-top: 1.5rem;">
                <button class="close-shortcuts" style="background-color: #333333; color: #ffffff; border: none; border-radius: 4px; padding: 0.5rem 1rem; cursor: pointer;">Close</button>
            </div>
        `;
        
        // Close modal when clicking close button
        const closeShortcutsBtn = modalContent.querySelector('.close-shortcuts');
        closeShortcutsBtn.addEventListener('click', function() {
            document.body.removeChild(shortcutsModal);
        });
        
        // Close modal when clicking outside
        shortcutsModal.addEventListener('click', function(e) {
            if (e.target === shortcutsModal) {
                document.body.removeChild(shortcutsModal);
            }
        });
    });
    
    // Add CSS animation for the gear icon
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(styleElement);
    
    // Initialize user interface based on settings
    console.log('AI Search Bar initialized with settings:', savedSettings);
});