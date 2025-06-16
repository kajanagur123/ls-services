// Services page specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize service card animations
    initServiceCardAnimations();
    
    // Initialize filter functionality
    initServiceFilters();
    
    // Initialize price calculator
    initPriceCalculator();
    
    // Initialize service comparison
    initServiceComparison();
});

// Service card hover animations
function initServiceCardAnimations() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Scale effect
            this.style.transform = 'translateY(-12px) scale(1.02)';
            
            // Icon animation
            const icon = this.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(10deg)';
                icon.style.background = 'linear-gradient(135deg, #3b82f6, #1d4ed8)';
                icon.style.color = 'white';
            }
            
            // Image zoom effect
            const image = this.querySelector('.service-image img');
            if (image) {
                image.style.transform = 'scale(1.1)';
            }
            
            // Button glow effect
            const button = this.querySelector('.service-btn');
            if (button) {
                button.style.boxShadow = '0 10px 25px rgba(59, 130, 246, 0.4)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            
            const icon = this.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = '';
                icon.style.background = '';
                icon.style.color = '';
            }
            
            const image = this.querySelector('.service-image img');
            if (image) {
                image.style.transform = '';
            }
            
            const button = this.querySelector('.service-btn');
            if (button) {
                button.style.boxShadow = '';
            }
        });
    });
}

// Service filtering functionality
function initServiceFilters() {
    // Create filter buttons
    const filtersContainer = document.createElement('div');
    filtersContainer.className = 'service-filters';
    filtersContainer.innerHTML = `
        <div class="container">
            <div class="filter-buttons">
                <button class="filter-btn active" data-filter="all">All Services</button>
                <button class="filter-btn" data-filter="design">Design</button>
                <button class="filter-btn" data-filter="content">Content</button>
                <button class="filter-btn" data-filter="technical">Technical</button>
            </div>
        </div>
    `;
    
    // Insert filters before services grid
    const servicesSection = document.querySelector('.services-grid-section');
    if (servicesSection) {
        servicesSection.insertBefore(filtersContainer, servicesSection.firstChild);
    }
    
    // Add filter styles
    const filterStyles = `
        .service-filters {
            padding: 2rem 0;
            text-align: center;
        }
        
        .filter-buttons {
            display: flex;
            justify-content: center;
            gap: 1rem;
            flex-wrap: wrap;
        }
        
        .filter-btn {
            padding: 0.75rem 1.5rem;
            border: 2px solid #e5e7eb;
            background: white;
            color: #6b7280;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 500;
        }
        
        .filter-btn:hover,
        .filter-btn.active {
            border-color: #3b82f6;
            background: #3b82f6;
            color: white;
            transform: translateY(-2px);
        }
        
        @media (max-width: 768px) {
            .filter-buttons {
                gap: 0.5rem;
            }
            
            .filter-btn {
                padding: 0.5rem 1rem;
                font-size: 0.875rem;
            }
        }
    `;
    
    const filterStyleSheet = document.createElement('style');
    filterStyleSheet.textContent = filterStyles;
    document.head.appendChild(filterStyleSheet);
    
    // Add filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const serviceCards = document.querySelectorAll('.service-card');
    
    // Categorize services
    const serviceCategories = {
        'Resume Builder': 'content',
        'Logo Design': 'design',
        'Video Editing': 'content',
        'Photo Editing': 'design',
        'Content Creation': 'content',
        'Thumbnail Design': 'design',
        'Website UI/UX Design': 'technical',
        'General Online Work': 'technical'
    };
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter service cards
            serviceCards.forEach(card => {
                const serviceTitle = card.querySelector('.service-title').textContent;
                const category = serviceCategories[serviceTitle];
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(-20px)';
                    
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Price calculator functionality
function initPriceCalculator() {
    // Create price calculator modal
    const calculatorModal = document.createElement('div');
    calculatorModal.className = 'price-calculator-modal';
    calculatorModal.innerHTML = `
        <div class="calculator-content">
            <div class="calculator-header">
                <h3>Price Calculator</h3>
                <button class="close-calculator">&times;</button>
            </div>
            <div class="calculator-body">
                <div class="calculator-form">
                    <div class="form-group">
                        <label>Service Type</label>
                        <select id="serviceType">
                            <option value="resume">Resume Builder - $29</option>
                            <option value="logo">Logo Design - $99</option>
                            <option value="video">Video Editing - $49</option>
                            <option value="photo">Photo Editing - $19</option>
                            <option value="content">Content Creation - $39</option>
                            <option value="thumbnail">Thumbnail Design - $15</option>
                            <option value="website">Website Design - $199</option>
                            <option value="general">General Work - $25</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Quantity</label>
                        <input type="number" id="quantity" value="1" min="1" max="10">
                    </div>
                    <div class="form-group">
                        <label>Rush Delivery (+50%)</label>
                        <input type="checkbox" id="rushDelivery">
                    </div>
                    <div class="calculator-result">
                        <div class="total-price">
                            Total: $<span id="totalPrice">29</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(calculatorModal);
    
    // Add calculator styles
    const calculatorStyles = `
        .price-calculator-modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 1000;
            align-items: center;
            justify-content: center;
        }
        
        .calculator-content {
            background: white;
            border-radius: 16px;
            max-width: 400px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
        }
        
        .calculator-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.5rem;
            border-bottom: 1px solid #e5e7eb;
        }
        
        .calculator-header h3 {
            margin: 0;
            font-size: 1.25rem;
            font-weight: 600;
        }
        
        .close-calculator {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #6b7280;
        }
        
        .calculator-body {
            padding: 1.5rem;
        }
        
        .calculator-form .form-group {
            margin-bottom: 1rem;
        }
        
        .calculator-form label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 500;
            color: #374151;
        }
        
        .calculator-form select,
        .calculator-form input[type="number"] {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid #d1d5db;
            border-radius: 8px;
            font-size: 1rem;
        }
        
        .calculator-form input[type="checkbox"] {
            margin-right: 0.5rem;
        }
        
        .calculator-result {
            margin-top: 2rem;
            padding: 1rem;
            background: #f8fafc;
            border-radius: 8px;
            text-align: center;
        }
        
        .total-price {
            font-size: 1.5rem;
            font-weight: 700;
            color: #3b82f6;
        }
    `;
    
    const calculatorStyleSheet = document.createElement('style');
    calculatorStyleSheet.textContent = calculatorStyles;
    document.head.appendChild(calculatorStyleSheet);
    
    // Calculator functionality
    const servicePrices = {
        resume: 29,
        logo: 99,
        video: 49,
        photo: 19,
        content: 39,
        thumbnail: 15,
        website: 199,
        general: 25
    };
    
    function updatePrice() {
        const serviceType = document.getElementById('serviceType').value;
        const quantity = parseInt(document.getElementById('quantity').value);
        const rushDelivery = document.getElementById('rushDelivery').checked;
        
        let basePrice = servicePrices[serviceType] * quantity;
        if (rushDelivery) {
            basePrice *= 1.5;
        }
        
        document.getElementById('totalPrice').textContent = Math.round(basePrice);
    }
    
    // Event listeners for calculator
    document.getElementById('serviceType').addEventListener('change', updatePrice);
    document.getElementById('quantity').addEventListener('input', updatePrice);
    document.getElementById('rushDelivery').addEventListener('change', updatePrice);
    
    // Close calculator
    document.querySelector('.close-calculator').addEventListener('click', function() {
        calculatorModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Add calculator button to each service card
    serviceCards.forEach(card => {
        const button = card.querySelector('.service-btn');
        if (button) {
            const calculatorBtn = document.createElement('button');
            calculatorBtn.className = 'calculator-btn';
            calculatorBtn.innerHTML = '💰 Calculate Price';
            calculatorBtn.style.cssText = `
                width: 100%;
                margin-top: 0.5rem;
                padding: 8px 16px;
                background: #f3f4f6;
                color: #374151;
                border: 1px solid #d1d5db;
                border-radius: 6px;
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 0.875rem;
            `;
            
            calculatorBtn.addEventListener('click', function(e) {
                e.preventDefault();
                calculatorModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
                
                // Set service type based on card
                const serviceTitle = card.querySelector('.service-title').textContent;
                const serviceMap = {
                    'Resume Builder': 'resume',
                    'Logo Design': 'logo',
                    'Video Editing': 'video',
                    'Photo Editing': 'photo',
                    'Content Creation': 'content',
                    'Thumbnail Design': 'thumbnail',
                    'Website UI/UX Design': 'website',
                    'General Online Work': 'general'
                };
                
                document.getElementById('serviceType').value = serviceMap[serviceTitle];
                updatePrice();
            });
            
            button.parentNode.insertBefore(calculatorBtn, button.nextSibling);
        }
    });
}

// Service comparison functionality
function initServiceComparison() {
    const compareButtons = [];
    const selectedServices = new Set();
    
    // Add compare buttons to service cards
    serviceCards.forEach(card => {
        const compareBtn = document.createElement('button');
        compareBtn.className = 'compare-btn';
        compareBtn.innerHTML = '⚖️ Compare';
        compareBtn.style.cssText = `
            position: absolute;
            top: 1rem;
            right: 1rem;
            padding: 0.5rem;
            background: rgba(255, 255, 255, 0.9);
            border: 1px solid #d1d5db;
            border-radius: 6px;
            cursor: pointer;
            font-size: 0.75rem;
            transition: all 0.3s ease;
        `;
        
        compareBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const serviceTitle = card.querySelector('.service-title').textContent;
            
            if (selectedServices.has(serviceTitle)) {
                selectedServices.delete(serviceTitle);
                this.style.background = 'rgba(255, 255, 255, 0.9)';
                this.style.color = '#374151';
            } else if (selectedServices.size < 3) {
                selectedServices.add(serviceTitle);
                this.style.background = '#3b82f6';
                this.style.color = 'white';
            }
            
            updateCompareButton();
        });
        
        card.style.position = 'relative';
        card.appendChild(compareBtn);
        compareButtons.push(compareBtn);
    });
    
    // Create floating compare button
    const floatingCompareBtn = document.createElement('button');
    floatingCompareBtn.className = 'floating-compare-btn';
    floatingCompareBtn.innerHTML = 'Compare Services (0)';
    floatingCompareBtn.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        padding: 1rem 1.5rem;
        background: #3b82f6;
        color: white;
        border: none;
        border-radius: 50px;
        cursor: pointer;
        font-weight: 600;
        box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
        transform: translateY(100px);
        transition: all 0.3s ease;
        z-index: 100;
    `;
    
    document.body.appendChild(floatingCompareBtn);
    
    function updateCompareButton() {
        floatingCompareBtn.innerHTML = `Compare Services (${selectedServices.size})`;
        
        if (selectedServices.size > 0) {
            floatingCompareBtn.style.transform = 'translateY(0)';
        } else {
            floatingCompareBtn.style.transform = 'translateY(100px)';
        }
    }
    
    floatingCompareBtn.addEventListener('click', function() {
        if (selectedServices.size > 1) {
            showComparisonModal();
        }
    });
    
    function showComparisonModal() {
        // Create comparison modal
        const comparisonModal = document.createElement('div');
        comparisonModal.className = 'comparison-modal';
        comparisonModal.innerHTML = `
            <div class="comparison-content">
                <div class="comparison-header">
                    <h3>Service Comparison</h3>
                    <button class="close-comparison">&times;</button>
                </div>
                <div class="comparison-table">
                    <!-- Comparison content will be generated here -->
                </div>
            </div>
        `;
        
        document.body.appendChild(comparisonModal);
        
        // Show modal
        comparisonModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Close modal functionality
        comparisonModal.querySelector('.close-comparison').addEventListener('click', function() {
            document.body.removeChild(comparisonModal);
            document.body.style.overflow = 'auto';
        });
    }
}

// Add scroll-triggered animations for service cards
function initServiceScrollAnimations() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        cardObserver.observe(card);
    });
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', initServiceScrollAnimations);