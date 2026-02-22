/**
 * Modern Enhancements JavaScript
 * Handles preloader, lazy loading, scroll animations, dark mode, and more
 */

(function() {
  'use strict';

  // ===== Preloader =====
  const preloader = {
    init: function() {
      window.addEventListener('load', () => {
        const preloaderEl = document.querySelector('.preloader');
        if (preloaderEl) {
          setTimeout(() => {
            preloaderEl.classList.add('fade-out');
            setTimeout(() => {
              preloaderEl.style.display = 'none';
            }, 500);
          }, 500);
        }
      });
    }
  };

  // ===== Dark Mode Toggle =====
  const darkMode = {
    init: function() {
      const toggle = document.querySelector('.theme-toggle');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
      
      // Check for saved theme preference or default to system preference
      const currentTheme = localStorage.getItem('theme') || 
                          (prefersDark.matches ? 'dark' : 'light');
      
      document.documentElement.setAttribute('data-theme', currentTheme);
      this.updateIcon(currentTheme);
      
      if (toggle) {
        toggle.addEventListener('click', () => {
          const theme = document.documentElement.getAttribute('data-theme');
          const newTheme = theme === 'light' ? 'dark' : 'light';
          
          document.documentElement.setAttribute('data-theme', newTheme);
          localStorage.setItem('theme', newTheme);
          this.updateIcon(newTheme);
        });
      }
      
      // Listen for system theme changes
      prefersDark.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
          const newTheme = e.matches ? 'dark' : 'light';
          document.documentElement.setAttribute('data-theme', newTheme);
          this.updateIcon(newTheme);
        }
      });
    },
    
    updateIcon: function(theme) {
      const icon = document.querySelector('.theme-toggle i');
      if (icon) {
        icon.className = theme === 'light' ? 'fa-regular fa-moon' : 'fa-regular fa-sun';
      }
    }
  };

  // ===== Lazy Loading Images =====
  const lazyLoad = {
    init: function() {
      const images = document.querySelectorAll('img[data-src]');
      
      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target;
              img.src = img.dataset.src;
              img.classList.add('loaded');
              img.removeAttribute('data-src');
              observer.unobserve(img);
            }
          });
        }, {
          rootMargin: '50px'
        });
        
        images.forEach(img => imageObserver.observe(img));
      } else {
        // Fallback for browsers without IntersectionObserver
        images.forEach(img => {
          img.src = img.dataset.src;
          img.classList.add('loaded');
        });
      }
    }
  };

  // ===== Scroll Animations =====
  const scrollAnimations = {
    init: function() {
      const elements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in');
      
      if ('IntersectionObserver' in window) {
        const animationObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
            }
          });
        }, {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
        });
        
        elements.forEach(el => animationObserver.observe(el));
      } else {
        // Fallback: show all elements
        elements.forEach(el => el.classList.add('visible'));
      }
    }
  };

  // ===== Scroll to Top Button =====
  const scrollToTop = {
    init: function() {
      const button = document.querySelector('.scroll-to-top');
      
      if (button) {
        window.addEventListener('scroll', () => {
          if (window.pageYOffset > 300) {
            button.classList.add('visible');
          } else {
            button.classList.remove('visible');
          }
        });
        
        button.addEventListener('click', () => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        });
      }
    }
  };

  // ===== Enhanced Gallery with Keyboard Navigation =====
  const gallery = {
    init: function() {
      const galleryItems = document.querySelectorAll('.h_gallery_item, .modern-gallery-item');
      
      galleryItems.forEach((item, index) => {
        // Add keyboard accessibility
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'button');
        item.setAttribute('aria-label', `View gallery item ${index + 1}`);
        
        // Handle keyboard events
        item.addEventListener('keypress', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const link = item.querySelector('a.light');
            if (link) link.click();
          }
        });
      });
    }
  };

  // ===== Smooth Scroll for Anchor Links =====
  const smoothScroll = {
    init: function() {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          const href = this.getAttribute('href');
          
          // Skip if it's just "#" or empty
          if (href === '#' || href === '') return;
          
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
            
            // Update URL without jumping
            if (history.pushState) {
              history.pushState(null, null, href);
            }
          }
        });
      });
    }
  };

  // ===== Performance Monitoring =====
  const performance = {
    init: function() {
      if ('PerformanceObserver' in window) {
        // Monitor Largest Contentful Paint
        try {
          const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
          });
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (e) {
          // LCP not supported
        }
      }
    }
  };

  // ===== Navbar Enhancement =====
  const navbar = {
    init: function() {
      const navbar = document.querySelector('.header_area');
      let lastScroll = 0;
      
      if (navbar) {
        window.addEventListener('scroll', () => {
          const currentScroll = window.pageYOffset;
          
          // Add shadow on scroll
          if (currentScroll > 50) {
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
          } else {
            navbar.style.boxShadow = 'none';
          }
          
          lastScroll = currentScroll;
        });
      }
    }
  };

  // ===== Parallax Effect Enhancement =====
  const parallax = {
    init: function() {
      const parallaxElements = document.querySelectorAll('[data-parallax]');
      
      if (parallaxElements.length > 0) {
        window.addEventListener('scroll', () => {
          const scrolled = window.pageYOffset;
          
          parallaxElements.forEach(el => {
            const speed = el.dataset.parallax || 0.5;
            const yPos = -(scrolled * speed);
            el.style.transform = `translateY(${yPos}px)`;
          });
        });
      }
    }
  };

  // ===== Form Enhancement =====
  const forms = {
    init: function() {
      const forms = document.querySelectorAll('form');
      
      forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
          // Add floating label effect
          input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
          });
          
          input.addEventListener('blur', () => {
            if (!input.value) {
              input.parentElement.classList.remove('focused');
            }
          });
          
          // Check if already has value on load
          if (input.value) {
            input.parentElement.classList.add('focused');
          }
        });
      });
    }
  };

  // ===== Accessibility Enhancements =====
  const accessibility = {
    init: function() {
      // Add ARIA labels to social links
      document.querySelectorAll('.personal_social a, .header_social a').forEach(link => {
        const icon = link.querySelector('i');
        if (icon) {
          const platform = this.getPlatformName(icon.className);
          link.setAttribute('aria-label', `Visit ${platform} profile`);
        }
      });
      
      // Enhance tab navigation
      this.enhanceTabNavigation();
    },
    
    getPlatformName: function(className) {
      if (className.includes('facebook')) return 'Facebook';
      if (className.includes('twitter')) return 'Twitter';
      if (className.includes('linkedin')) return 'LinkedIn';
      if (className.includes('medium')) return 'Medium';
      if (className.includes('instagram')) return 'Instagram';
      return 'Social Media';
    },
    
    enhanceTabNavigation: function() {
      const tabs = document.querySelectorAll('[role="tab"]');
      tabs.forEach(tab => {
        tab.addEventListener('keydown', (e) => {
          if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
            e.preventDefault();
            const tabList = Array.from(tab.parentElement.parentElement.querySelectorAll('[role="tab"]'));
            const currentIndex = tabList.indexOf(tab);
            const nextIndex = e.key === 'ArrowRight' 
              ? (currentIndex + 1) % tabList.length 
              : (currentIndex - 1 + tabList.length) % tabList.length;
            
            tabList[nextIndex].click();
            tabList[nextIndex].focus();
          }
        });
      });
    }
  };

  // ===== Initialize Everything =====
  const init = function() {
    preloader.init();
    darkMode.init();
    lazyLoad.init();
    scrollAnimations.init();
    scrollToTop.init();
    gallery.init();
    smoothScroll.init();
    performance.init();
    navbar.init();
    parallax.init();
    forms.init();
    accessibility.init();
    collapsibleMedia.init();
    galleryFilter.init();
    customLightbox.init();
    customCarousel.init();
    
    console.log('✨ Modern enhancements loaded successfully!');
  };

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();


  // ===== Collapsible Media Section =====
  const collapsibleMedia = {
    init: function() {
      const toggleButton = document.querySelector('.media-expand-toggle');
      
      if (toggleButton) {
        toggleButton.addEventListener('click', function() {
          const mediaSection = document.querySelector('.media-collapsible');
          const isExpanded = this.getAttribute('aria-expanded') === 'true';
          const expandText = this.querySelector('.expand-text');
          
          if (isExpanded) {
            // Collapse
            mediaSection.setAttribute('data-collapsed', 'true');
            this.setAttribute('aria-expanded', 'false');
            expandText.textContent = 'Show More';
            
            // Smooth scroll to Media section
            const featureArea = document.querySelector('.feature_area');
            if (featureArea) {
              const offset = featureArea.getBoundingClientRect().top + window.pageYOffset - 100;
              window.scrollTo({
                top: offset,
                behavior: 'smooth'
              });
            }
          } else {
            // Expand
            mediaSection.setAttribute('data-collapsed', 'false');
            this.setAttribute('aria-expanded', 'true');
            expandText.textContent = 'Show Less';
          }
        });
      }
    }
  };


  // ===== Custom Gallery Filter (replaces Isotope) =====
  const galleryFilter = {
    init: function() {
      const filterButtons = document.querySelectorAll('.gallery_filter li');
      const galleryItems = document.querySelectorAll('.gallery_f_inner > [class*="col-"]');
      
      if (filterButtons.length === 0 || galleryItems.length === 0) return;
      
      filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
          e.preventDefault();
          
          // Update active state
          filterButtons.forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');
          
          // Get filter value
          const filterValue = button.getAttribute('data-filter');
          
          // Filter items
          galleryItems.forEach(item => {
            if (filterValue === '*') {
              // Show all
              item.style.display = '';
              setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
              }, 10);
            } else {
              // Check if item matches filter
              const filterClass = filterValue.replace('.', '');
              if (item.classList.contains(filterClass)) {
                item.style.display = '';
                setTimeout(() => {
                  item.style.opacity = '1';
                  item.style.transform = 'scale(1)';
                }, 10);
              } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                  item.style.display = 'none';
                }, 300);
              }
            }
          });
        });
      });
      
      // Add transition styles
      galleryItems.forEach(item => {
        item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      });
    }
  };

  // ===== Custom Lightbox (replaces SimpleLightbox) =====
  const customLightbox = {
    init: function() {
      // Create dialog element
      const dialog = document.createElement('dialog');
      dialog.className = 'lightbox-dialog';
      dialog.innerHTML = `
        <div class="lightbox-content">
          <button class="lightbox-close" aria-label="Close lightbox">&times;</button>
          <img src="" alt="">
        </div>
      `;
      document.body.appendChild(dialog);
      
      const img = dialog.querySelector('img');
      const closeBtn = dialog.querySelector('.lightbox-close');
      
      // Add click handlers to gallery links
      const galleryLinks = document.querySelectorAll('.g_img_item a.light');
      galleryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const imgSrc = link.getAttribute('href');
          const imgAlt = link.querySelector('img')?.getAttribute('alt') || 'Gallery image';
          
          img.src = imgSrc;
          img.alt = imgAlt;
          dialog.showModal();
        });
      });
      
      // Close handlers
      closeBtn.addEventListener('click', () => dialog.close());
      dialog.addEventListener('click', (e) => {
        if (e.target === dialog) dialog.close();
      });
      
      // Keyboard handler
      dialog.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') dialog.close();
      });
    }
  };


  // ===== Custom Carousel (replaces Owl Carousel) =====
  const customCarousel = {
    init: function() {
      const carousel = document.querySelector('.testi_slider');
      if (!carousel) return;
      
      const items = Array.from(carousel.querySelectorAll('.item'));
      if (items.length === 0) return;
      
      // Create new structure
      const wrapper = document.createElement('div');
      wrapper.className = 'custom-carousel';
      
      const track = document.createElement('div');
      track.className = 'custom-carousel-track auto-scroll';
      
      // Move items to track
      items.forEach(item => {
        const carouselItem = document.createElement('div');
        carouselItem.className = 'custom-carousel-item';
        carouselItem.appendChild(item.cloneNode(true));
        track.appendChild(carouselItem);
      });
      
      // Create navigation dots
      const nav = document.createElement('div');
      nav.className = 'custom-carousel-nav';
      
      const totalSlides = Math.ceil(items.length / this.getItemsPerSlide());
      for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('button');
        dot.className = 'custom-carousel-dot';
        if (i === 0) dot.classList.add('active');
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.addEventListener('click', () => this.goToSlide(i, track, nav));
        nav.appendChild(dot);
      }
      
      wrapper.appendChild(track);
      wrapper.appendChild(nav);
      
      // Replace old carousel
      carousel.parentNode.replaceChild(wrapper, carousel);
      
      // Auto-advance
      this.startAutoPlay(track, nav, totalSlides);
    },
    
    getItemsPerSlide: function() {
      if (window.innerWidth < 768) return 1;
      if (window.innerWidth < 992) return 2;
      return 3;
    },
    
    goToSlide: function(index, track, nav) {
      const itemsPerSlide = this.getItemsPerSlide();
      const offset = index * (100 + (30 / track.children[0].offsetWidth * 100));
      track.style.transform = `translateX(-${offset}%)`;
      
      // Update dots
      const dots = nav.querySelectorAll('.custom-carousel-dot');
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
    },
    
    startAutoPlay: function(track, nav, totalSlides) {
      let currentSlide = 0;
      
      let autoAdvance = setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        this.goToSlide(currentSlide, track, nav);
      }, 5000);
      
      // Pause on hover - clear interval to prevent glitching
      track.addEventListener('mouseenter', () => {
        clearInterval(autoAdvance);
        track.classList.remove('auto-scroll');
      });
      
      track.addEventListener('mouseleave', () => {
        track.classList.add('auto-scroll');
        // Restart auto-advance
        autoAdvance = setInterval(() => {
          currentSlide = (currentSlide + 1) % totalSlides;
          this.goToSlide(currentSlide, track, nav);
        }, 5000);
      });
    }
  };
