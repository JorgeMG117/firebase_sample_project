// Firebase Hosting Guide - Interactive JavaScript

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Firebase Hosting Guide loaded successfully!');
    
    // Initialize the application
    initializeApp();
    
    // Add smooth scrolling for navigation links
    addSmoothScrolling();
    
    // Add scroll animations
    addScrollAnimations();
    
    // Add copy-to-clipboard functionality for code blocks
    addCopyToClipboard();
    
    // Add interactive elements
    addInteractiveElements();
});

// Initialize the application
function initializeApp() {
    console.log('✅ Firebase Hosting Guide initialized');
    
    // Add event listeners
    addEventListeners();
    
    // Initialize tooltips or help text
    initializeTooltips();
}

// Add event listeners
function addEventListeners() {
    // Navigation smooth scrolling
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add click handlers for interactive elements
    addClickHandlers();
}

// Add smooth scrolling for navigation
function addSmoothScrolling() {
    // Add CSS for smooth scrolling
    const style = document.createElement('style');
    style.textContent = `
        html {
            scroll-behavior: smooth;
        }
        
        /* Smooth scroll offset for fixed navbar */
        section {
            scroll-margin-top: 80px;
        }
    `;
    document.head.appendChild(style);
}

// Add scroll animations
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.step, .prereq-card, .service-card, .benefit-item, .trouble-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Add copy-to-clipboard functionality for code blocks
function addCopyToClipboard() {
    const codeBlocks = document.querySelectorAll('.code-block, .file-structure, .output-example pre');
    
    codeBlocks.forEach(block => {
        // Create copy button
        const copyButton = document.createElement('button');
        copyButton.innerHTML = '📋 Copy';
        copyButton.className = 'copy-button';
        copyButton.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            background: var(--primary-color);
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.8rem;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        // Make code block container relative
        block.style.position = 'relative';
        
        // Add hover effect to show copy button
        block.addEventListener('mouseenter', () => {
            copyButton.style.opacity = '1';
        });
        
        block.addEventListener('mouseleave', () => {
            copyButton.style.opacity = '0';
        });
        
        // Add copy functionality
        copyButton.addEventListener('click', async () => {
            const text = block.textContent;
            try {
                await navigator.clipboard.writeText(text);
                showNotification('Code copied to clipboard!', 'success');
                copyButton.innerHTML = '✅ Copied!';
                setTimeout(() => {
                    copyButton.innerHTML = '📋 Copy';
                }, 2000);
            } catch (err) {
                showNotification('Failed to copy code', 'error');
            }
        });
        
        block.appendChild(copyButton);
    });
}

// Add interactive elements
function addInteractiveElements() {
    // Add click handlers for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            const serviceName = this.querySelector('h4').textContent;
            showServiceInfo(serviceName);
        });
    });
    
    // Add click handlers for benefit items
    const benefitItems = document.querySelectorAll('.benefit-item');
    benefitItems.forEach(item => {
        item.addEventListener('click', function() {
            this.style.transform = 'scale(1.02)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });
}

// Add click handlers
function addClickHandlers() {
    // Add click handler for command rows
    const commandRows = document.querySelectorAll('.command-row');
    commandRows.forEach(row => {
        row.addEventListener('click', function() {
            const command = this.querySelector('.command').textContent;
            copyCommandToClipboard(command);
        });
    });
}

// Show service information
function showServiceInfo(serviceName) {
    const serviceInfo = {
        'Firebase Hosting': 'Fast and secure web hosting for static content with global CDN. Perfect for websites, SPAs, and static assets.',
        'Firebase Realtime Database': 'Cloud-hosted NoSQL database that syncs data in real-time across all clients. Great for collaborative apps.',
        'Firebase Authentication': 'Easy-to-use authentication system with multiple providers including Google, Facebook, Twitter, and more.',
        'Firebase Cloud Functions': 'Serverless functions that run in response to events. Perfect for backend logic and API endpoints.',
        'Firebase Analytics': 'Free app measurement and user engagement analytics. Track user behavior and app performance.',
        'Firebase Performance': 'Monitor app performance and identify bottlenecks. Get insights into loading times and user experience.'
    };
    
    const info = serviceInfo[serviceName] || 'No additional information available.';
    showNotification(`${serviceName}: ${info}`, 'info');
}

// Copy command to clipboard
async function copyCommandToClipboard(command) {
    try {
        await navigator.clipboard.writeText(command);
        showNotification(`Command copied: ${command}`, 'success');
    } catch (err) {
        showNotification('Failed to copy command', 'error');
    }
}

// Initialize tooltips
function initializeTooltips() {
    // Add tooltips to important elements
    const tooltipElements = document.querySelectorAll('.prereq-card, .service-card, .benefit-item');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            showTooltip(this, 'Click for more info');
        });
        
        element.addEventListener('mouseleave', function() {
            hideTooltip();
        });
    });
}

// Show tooltip
function showTooltip(element, text) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = text;
    tooltip.style.cssText = `
        position: absolute;
        background: var(--dark-bg);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        font-size: 0.8rem;
        z-index: 10000;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(tooltip);
    
    // Position tooltip
    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
    
    // Show tooltip
    setTimeout(() => {
        tooltip.style.opacity = '1';
    }, 100);
}

// Hide tooltip
function hideTooltip() {
    const tooltip = document.querySelector('.tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${getNotificationColor(type)};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            z-index: 10000;
            max-width: 400px;
            animation: slideIn 0.3s ease-out;
        ">
            <strong>${getNotificationIcon(type)}</strong> ${message}
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

function getNotificationColor(type) {
    const colors = {
        success: '#34a853',
        error: '#ea4335',
        warning: '#fbbc04',
        info: '#4285f4'
    };
    return colors[type] || colors.info;
}

function getNotificationIcon(type) {
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    return icons[type] || icons.info;
}

// Add CSS animations
function addAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .copy-button:hover {
            background: var(--secondary-color) !important;
        }
        
        .command-row:hover {
            cursor: pointer;
        }
        
        .service-card:hover,
        .benefit-item:hover {
            cursor: pointer;
        }
    `;
    document.head.appendChild(style);
}

// Performance monitoring
function logPerformance() {
    if (window.performance) {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        console.log(`🚀 Firebase Hosting Guide loaded in ${loadTime}ms`);
        
        // Log performance insights
        if (loadTime < 1000) {
            console.log('⚡ Excellent performance! This guide loads fast.');
        } else if (loadTime < 2000) {
            console.log('✅ Good performance for this educational guide.');
        } else {
            console.log('⚠️ Consider optimizing assets for better performance.');
        }
    }
}

// Initialize animations
addAnimations();

// Initialize performance monitoring
window.addEventListener('load', logPerformance);

// Export functions for global access
window.showNotification = showNotification;
window.showServiceInfo = showServiceInfo;