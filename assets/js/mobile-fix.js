/* ============================================
   MOBILE INTERACTION FIX
   Save as: assets/js/mobile-fix.js
   ============================================ */

(function() {
  'use strict';
  
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileFixes);
  } else {
    initMobileFixes();
  }
  
  function initMobileFixes() {
    console.log('Initializing mobile fixes...');
    
    // Fix 1: Hamburger Menu Toggle
    fixHamburgerMenu();
    
    // Fix 2: Author Profile Links
    fixAuthorLinks();
    
    // Fix 3: Follow Button
    fixFollowButton();
    
    // Fix 4: General touch event fixes
    fixTouchEvents();
    
    console.log('Mobile fixes applied!');
  }
  
  function fixHamburgerMenu() {
    // Find all possible hamburger menu selectors
    const menuToggles = document.querySelectorAll(
      '.greedy-nav__toggle, .greedy-nav__toggle-menu, .navicon-button, [class*="menu-toggle"]'
    );
    
    menuToggles.forEach(function(toggle) {
      console.log('Found menu toggle:', toggle);
      
      // Remove any existing listeners to avoid duplicates
      const newToggle = toggle.cloneNode(true);
      toggle.parentNode.replaceChild(newToggle, toggle);
      
      // Add both click and touch events
      newToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleMenu(newToggle);
      }, { passive: false });
      
      newToggle.addEventListener('touchstart', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleMenu(newToggle);
      }, { passive: false });
    });
  }
  
  function toggleMenu(toggle) {
    console.log('Menu toggle clicked!');
    
    // Find the hidden links
    const hiddenLinks = document.querySelector('.hidden-links, .greedy-nav .hidden-links');
    const nav = document.querySelector('.greedy-nav');
    
    if (hiddenLinks) {
      hiddenLinks.classList.toggle('hidden');
      hiddenLinks.classList.toggle('js-hidden');
      
      // Update ARIA attributes
      const isExpanded = !hiddenLinks.classList.contains('hidden');
      toggle.setAttribute('aria-expanded', isExpanded);
      
      console.log('Menu toggled. Visible:', isExpanded);
    }
    
    // Alternative: toggle a class on the nav itself
    if (nav) {
      nav.classList.toggle('nav-open');
    }
  }
  
  function fixAuthorLinks() {
    const authorLinks = document.querySelectorAll('.author__urls a, .author__urls-wrapper a');
    
    authorLinks.forEach(function(link) {
      // Ensure links are clickable
      link.style.pointerEvents = 'auto';
      link.style.cursor = 'pointer';
      
      // Add touch event for better mobile response
      link.addEventListener('touchstart', function(e) {
        e.stopPropagation();
        // Add visual feedback
        this.style.opacity = '0.7';
      }, { passive: true });
      
      link.addEventListener('touchend', function(e) {
        this.style.opacity = '1';
      }, { passive: true });
    });
    
    console.log('Fixed', authorLinks.length, 'author links');
  }
  
  function fixFollowButton() {
    const followButtons = document.querySelectorAll(
      '.btn, .btn--inverse, a[href*="github"]'
    );
    
    followButtons.forEach(function(btn) {
      // Ensure button is clickable
      btn.style.pointerEvents = 'auto';
      btn.style.cursor = 'pointer';
      
      // Clone to remove any problematic event listeners
      const newBtn = btn.cloneNode(true);
      
      // Preserve the href
      if (btn.href) {
        newBtn.href = btn.href;
      }
      
      // Add reliable click handler
      newBtn.addEventListener('touchstart', function(e) {
        e.stopPropagation();
        this.style.opacity = '0.8';
      }, { passive: true });
      
      newBtn.addEventListener('touchend', function(e) {
        e.stopPropagation();
        this.style.opacity = '1';
      }, { passive: true });
      
      newBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        // Let the default link behavior work
        if (this.href) {
          window.location.href = this.href;
        }
      }, { passive: false });
      
      // Replace old button with new one
      if (btn.parentNode) {
        btn.parentNode.replaceChild(newBtn, btn);
      }
    });
    
    console.log('Fixed', followButtons.length, 'follow buttons');
  }
  
  function fixTouchEvents() {
    // Prevent double-tap zoom on buttons and links
    let lastTouchEnd = 0;
    
    document.addEventListener('touchend', function(e) {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) {
        e.preventDefault();
      }
      lastTouchEnd = now;
    }, { passive: false });
    
    // Fix for iOS Safari
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      document.addEventListener('touchstart', function() {}, { passive: true });
    }
  }
  
  // Additional fix: Check if menu is hidden by CSS
  function checkMenuVisibility() {
    const toggle = document.querySelector('.greedy-nav__toggle');
    if (toggle) {
      const style = window.getComputedStyle(toggle);
      console.log('Menu toggle display:', style.display);
      console.log('Menu toggle visibility:', style.visibility);
      console.log('Menu toggle pointer-events:', style.pointerEvents);
    }
  }
  
  // Run visibility check after a short delay
  setTimeout(checkMenuVisibility, 1000);
  
})();
```

### 4. 保存文件
- 滚动到页面底部
- 在 "Commit new file" 输入：`Add mobile fix JavaScript`
- 点击 **"Commit new file"** 按钮

## 📍 完整路径：
```
你的仓库/
└── assets/
    └── js/
        └── mobile-fix.js  ← 在这里创建
