/* ==========================================================================
   M.E.S. Private ITI Mundur — Application Logic
   ========================================================================== */

function initApp() {
  // Initialize Lucide icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // ──────────────────────────────────────────────
  // 1. Mobile Drawer Toggle
  // ──────────────────────────────────────────────
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const drawer = document.querySelector('.mobile-drawer');
  const drawerClose = document.querySelector('.mobile-drawer-close');
  const overlay = document.querySelector('.drawer-overlay');

  function openDrawer() {
    if (drawer) drawer.classList.add('open');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (drawer) drawer.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (menuBtn) menuBtn.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);

  // ──────────────────────────────────────────────
  // 2. Sticky Header Shadow on Scroll
  // ──────────────────────────────────────────────
  const header = document.getElementById('main-header');
  const backToTop = document.getElementById('back-to-top');

  window.addEventListener('scroll', function() {
    const scrollY = window.scrollY;

    // Header shadow
    if (header) {
      header.classList.toggle('scrolled', scrollY > 20);
    }

    // Back to top visibility
    if (backToTop) {
      backToTop.classList.toggle('visible', scrollY > 400);
    }
  });

  // Back to top click
  if (backToTop) {
    backToTop.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ──────────────────────────────────────────────
  // 3. Active Navigation Highlighting
  // ──────────────────────────────────────────────
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link:not(.nav-dropdown-toggle):not(.nav-cta)');
  const mobileLinks = document.querySelectorAll('.mobile-drawer-links a:not(.mobile-drawer-cta)');

  navLinks.forEach(function(link) {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href && (href === currentPath || (currentPath === '' && href === 'index.html'))) {
      link.classList.add('active');
    }
  });

  mobileLinks.forEach(function(link) {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href && (href === currentPath || (currentPath === '' && href === 'index.html'))) {
      link.classList.add('active');
    }
  });

  // Highlight parent dropdown if child page is active
  const dropdownPages = {
    'trades.html': 'Academics',
    'admissions.html': 'Academics',
    'placements.html': 'Academics',
    'gallery.html': 'Campus Life',
    'blog.html': 'Campus Life'
  };

  if (dropdownPages[currentPath]) {
    const dropdownToggles = document.querySelectorAll('.nav-dropdown-toggle');
    dropdownToggles.forEach(function(toggle) {
      if (toggle.textContent.trim().replace(/\s+/g, ' ').includes(dropdownPages[currentPath])) {
        toggle.classList.add('active');
      }
    });
  }

  // ──────────────────────────────────────────────
  // 4. Hero Slider
  // ──────────────────────────────────────────────
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.slider-dot');
  const prevBtn = document.querySelector('.slider-arrow-prev');
  const nextBtn = document.querySelector('.slider-arrow-next');
  let currentSlide = 0;
  let slideInterval;

  function goToSlide(index) {
    if (slides.length === 0) return;
    slides.forEach(function(s) { s.classList.remove('active'); });
    dots.forEach(function(d) { d.classList.remove('active'); });
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) dots[currentSlide].classList.add('active');
  }

  function nextSlide() { goToSlide(currentSlide + 1); }
  function prevSlide() { goToSlide(currentSlide - 1); }

  function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 5000);
  }

  function resetAutoSlide() {
    clearInterval(slideInterval);
    startAutoSlide();
  }

  if (slides.length > 0) {
    if (nextBtn) nextBtn.addEventListener('click', function() { nextSlide(); resetAutoSlide(); });
    if (prevBtn) prevBtn.addEventListener('click', function() { prevSlide(); resetAutoSlide(); });
    dots.forEach(function(dot) {
      dot.addEventListener('click', function() {
        goToSlide(parseInt(this.dataset.index));
        resetAutoSlide();
      });
    });
    startAutoSlide();
  }

  // ──────────────────────────────────────────────
  // 5. Scroll Animations (Intersection Observer)
  // ──────────────────────────────────────────────
  const animElements = document.querySelectorAll('.animate-on-scroll');

  if ('IntersectionObserver' in window && animElements.length > 0) {
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    animElements.forEach(function(el) { observer.observe(el); });
  } else {
    // Fallback: show all immediately
    animElements.forEach(function(el) { el.classList.add('visible'); });
  }

  // ──────────────────────────────────────────────
  // 6. Animated Counters
  // ──────────────────────────────────────────────
  const statItems = document.querySelectorAll('.stat-item h3[data-count]');

  function animateCounter(el) {
    const target = parseFloat(el.dataset.count);
    const isDecimal = target % 1 !== 0;
    const suffix = el.textContent.replace(/[0-9.]/g, '');
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;

      if (isDecimal) {
        el.textContent = current.toFixed(1) + suffix;
      } else {
        el.textContent = Math.floor(current) + suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  if ('IntersectionObserver' in window && statItems.length > 0) {
    const counterObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    statItems.forEach(function(el) { counterObserver.observe(el); });
  }

  // ──────────────────────────────────────────────
  // 7. Statutory Modals
  // ──────────────────────────────────────────────
  const modalOverlay = document.getElementById('statutory-modal-overlay');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body-content');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  const modalData = {
    'anti-ragging': {
      title: 'Anti-Ragging Committee',
      body: '<p>As mandated by the UGC/AICTE/DGT regulations, M.E.S. ITI Mundur maintains a strict zero-tolerance Anti-Ragging Committee.</p><h4 style="margin:1rem 0 0.5rem;">Committee Members</h4><ul style="padding-left:1.25rem;list-style:disc;"><li>Chairperson: Principal K. A. Latheef</li><li>Member: Senior Instructor (Electrical)</li><li>Member: Senior Instructor (Civil)</li><li>Student Representative (elected annually)</li><li>Parent Representative</li></ul><h4 style="margin:1rem 0 0.5rem;">Contact</h4><p>Helpline: +91 491 2832248<br>Email: mesitimundur@gmail.com</p>'
    },
    'grievance': {
      title: 'Grievance Redressal Cell',
      body: '<p>The Grievance Redressal Cell ensures timely resolution of student, faculty, and staff grievances through a transparent mechanism.</p><h4 style="margin:1rem 0 0.5rem;">How to Submit</h4><ol style="padding-left:1.25rem;"><li>Written complaint to the cell convenor</li><li>Online submission via email</li><li>In-person meeting (by appointment)</li></ol><p style="margin-top:1rem;">All grievances are acknowledged within 48 hours and resolved within 15 working days.</p>'
    },
    'women-cell': {
      title: 'Women Development Cell / ICC',
      body: '<p>The Women Development Cell and Internal Complaints Committee (ICC) ensures a safe and empowering environment for all female students and staff.</p><h4 style="margin:1rem 0 0.5rem;">Key Functions</h4><ul style="padding-left:1.25rem;list-style:disc;"><li>Prevention of sexual harassment</li><li>Gender sensitization workshops</li><li>Career counseling for women</li><li>Legal awareness programs</li></ul>'
    },
    'minority-cell': {
      title: 'SC/ST & Minority Cell',
      body: '<p>The SC/ST and Minority Cell ensures equal opportunities and welfare for students from Scheduled Castes, Scheduled Tribes, and minority communities.</p><h4 style="margin:1rem 0 0.5rem;">Support Services</h4><ul style="padding-left:1.25rem;list-style:disc;"><li>Scholarship guidance and application support</li><li>Fee concession coordination</li><li>Mentorship programs</li><li>Career guidance and placement priority</li></ul>'
    },
    'disclosures': {
      title: 'Mandatory Disclosures',
      body: '<h4 style="margin:0 0 0.75rem;">Institution Information</h4><table style="width:100%;border-collapse:collapse;font-size:0.9rem;"><tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:0.5rem 0;font-weight:600;">Institution Name</td><td style="padding:0.5rem 0;">Dr. P.K. Abdul Ghafoor Memorial M.E.S. Private ITI</td></tr><tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:0.5rem 0;font-weight:600;">NCVT Code</td><td style="padding:0.5rem 0;">PR32000213</td></tr><tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:0.5rem 0;font-weight:600;">Location</td><td style="padding:0.5rem 0;">Mundur, Palakkad, Kerala 678592</td></tr><tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:0.5rem 0;font-weight:600;">Governing Body</td><td style="padding:0.5rem 0;">Muslim Educational Society (MES)</td></tr><tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:0.5rem 0;font-weight:600;">Affiliation</td><td style="padding:0.5rem 0;">DGT / NCVT, Govt. of India</td></tr><tr><td style="padding:0.5rem 0;font-weight:600;">Trades Offered</td><td style="padding:0.5rem 0;">Electrician, Draughtsman Civil, Electronic Mechanic, Wireman, Plumber</td></tr></table>'
    }
  };

  // Modal triggers
  document.querySelectorAll('.modal-trigger').forEach(function(trigger) {
    trigger.addEventListener('click', function(e) {
      e.preventDefault();
      const key = this.dataset.modal;
      if (modalData[key] && modalOverlay && modalTitle && modalBody) {
        modalTitle.textContent = modalData[key].title;
        modalBody.innerHTML = modalData[key].body;
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Close modal
  function closeModal() {
    if (modalOverlay) modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', function(e) {
      if (e.target === this) closeModal();
    });
  }

  // Success modal
  const successOverlay = document.getElementById('submission-success-overlay');
  const successCloseBtn = document.getElementById('success-close-btn');

  if (successCloseBtn) {
    successCloseBtn.addEventListener('click', function() {
      if (successOverlay) successOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // ──────────────────────────────────────────────
  // 8. Multi-Step Admission Form
  // ──────────────────────────────────────────────
  const admissionForm = document.getElementById('admission-form');

  if (admissionForm) {
    const panels = admissionForm.querySelectorAll('.form-step-panel');
    const stepItems = admissionForm.querySelectorAll('.form-step-item');
    const progressLine = admissionForm.querySelector('.form-step-line-progress');
    const prevBtns = admissionForm.querySelectorAll('[data-action="prev"]');
    const nextBtns = admissionForm.querySelectorAll('[data-action="next"]');
    const submitBtn = admissionForm.querySelector('[data-action="submit"]');
    let step = 0;

    function showStep(index) {
      panels.forEach(function(p) { p.classList.remove('active'); });
      stepItems.forEach(function(s, i) {
        s.classList.remove('active', 'completed');
        if (i < index) s.classList.add('completed');
        if (i === index) s.classList.add('active');
      });
      if (panels[index]) panels[index].classList.add('active');

      // Progress line
      if (progressLine && stepItems.length > 1) {
        const pct = (index / (stepItems.length - 1)) * 100;
        progressLine.style.width = pct + '%';
      }

      step = index;
    }

    function validateStep(index) {
      const panel = panels[index];
      if (!panel) return true;
      const required = panel.querySelectorAll('.form-control[required]');
      let valid = true;

      required.forEach(function(input) {
        const group = input.closest('.form-group');
        if (!input.value.trim()) {
          valid = false;
          if (group) {
            group.classList.add('error', 'shake');
            setTimeout(function() { group.classList.remove('shake'); }, 400);
          }
        } else {
          if (group) group.classList.remove('error');
        }
      });

      return valid;
    }

    nextBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        if (validateStep(step)) {
          showStep(step + 1);
        }
      });
    });

    prevBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        showStep(step - 1);
      });
    });

    if (submitBtn) {
      submitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        if (validateStep(step)) {
          // Show success modal
          if (successOverlay) {
            var successText = document.getElementById('success-card-text');
            if (successText) successText.textContent = 'Thank you for submitting your admission enquiry. Our academic counselor will review your application and contact you within 2 business days.';
            successOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
          }
          admissionForm.reset();
          showStep(0);
        }
      });
    }

    // Remove error on input
    admissionForm.querySelectorAll('.form-control').forEach(function(input) {
      input.addEventListener('input', function() {
        var group = this.closest('.form-group');
        if (group) group.classList.remove('error');
      });
    });
  }

  // ──────────────────────────────────────────────
  // 9. Contact Form
  // ──────────────────────────────────────────────
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var fields = this.querySelectorAll('.form-control[required]');
      var valid = true;

      fields.forEach(function(f) {
        var g = f.closest('.form-group');
        if (!f.value.trim()) {
          valid = false;
          if (g) { g.classList.add('error', 'shake'); setTimeout(function() { g.classList.remove('shake'); }, 400); }
        } else {
          if (g) g.classList.remove('error');
        }
      });

      if (valid && successOverlay) {
        var successText = document.getElementById('success-card-text');
        if (successText) successText.textContent = 'Thank you for reaching out! We have received your message and will respond within 24 hours.';
        successOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.reset();
      }
    });
  }

  // Alumni Form Handler
  const alumniForm = document.getElementById('alumni-form');
  if (alumniForm) {
    alumniForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var fields = this.querySelectorAll('.form-control[required]');
      var valid = true;

      fields.forEach(function(f) {
        var g = f.closest('.form-group');
        if (!f.value.trim()) {
          valid = false;
          if (g) { g.classList.add('error', 'shake'); setTimeout(function() { g.classList.remove('shake'); }, 400); }
        } else {
          if (g) g.classList.remove('error');
        }
      });

      if (valid && successOverlay) {
        var successText = document.getElementById('success-card-text');
        if (successText) successText.textContent = 'Thank you for registering in our Alumni Network! We will verify your credentials and update your profile shortly.';
        successOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.reset();
      }
    });
  }

  // ──────────────────────────────────────────────
  // 10. Blog Search & Filter
  // ──────────────────────────────────────────────
  const blogSearch = document.getElementById('blog-search');
  const blogFilterBtns = document.querySelectorAll('.blog-filter-btn');
  const blogCards = document.querySelectorAll('.blog-card');

  if (blogSearch) {
    blogSearch.addEventListener('input', function() {
      const query = this.value.toLowerCase();
      blogCards.forEach(function(card) {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(query) ? '' : 'none';
      });
    });
  }

  blogFilterBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      blogFilterBtns.forEach(function(b) { b.classList.remove('active'); });
      this.classList.add('active');
      const filter = this.dataset.filter;

      blogCards.forEach(function(card) {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Blog read more modal
  document.querySelectorAll('.blog-read-more').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      var slug = this.dataset.slug;
      var blogContent = getBlogContent(slug);
      if (blogContent && modalOverlay && modalTitle && modalBody) {
        modalTitle.textContent = blogContent.title;
        modalBody.innerHTML = blogContent.body;
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function getBlogContent(slug) {
    var posts = {
      'aitt-exams': {
        title: 'AITT Examination Results — Outstanding Performance',
        body: '<p>We are proud to announce outstanding results in the All India Trade Test (AITT) examinations conducted by NCVT. Our students achieved a remarkable 96% pass rate across all trades.</p><h4 style="margin:1rem 0 0.5rem;">Highlights</h4><ul style="padding-left:1.25rem;list-style:disc;"><li>Electrician trade: 98% pass rate</li><li>Draughtsman Civil: 95% pass rate</li><li>Electronic Mechanic: 94% pass rate</li><li>3 students scored distinction marks</li></ul><p style="margin-top:1rem;">The results reflect our commitment to quality education and practical training methodology.</p>'
      },
      'placements-success': {
        title: 'Record Placement Drive — 92% Students Placed',
        body: '<p>The annual placement drive at M.E.S. ITI Mundur concluded with an exceptional 92% placement rate. Major recruiters including KSEB, Indian Railways, L&T Construction, and Keltron participated.</p><h4 style="margin:1rem 0 0.5rem;">Key Statistics</h4><ul style="padding-left:1.25rem;list-style:disc;"><li>Total students placed: 87 out of 95</li><li>Highest package: ₹4.8 LPA (KSEB)</li><li>Average starting salary: ₹2.4 LPA</li><li>6 companies participated</li></ul>'
      },
      'electronics-lab': {
        title: 'New State-of-the-Art Electronics Lab Inaugurated',
        body: '<p>A brand new electronics laboratory has been inaugurated at M.E.S. ITI Mundur, equipped with modern oscilloscopes, function generators, PCB fabrication tools, and microprocessor development kits.</p><p style="margin-top:1rem;">The lab investment of ₹15 lakhs will benefit Electronic Mechanic trade students with hands-on exposure to industry-standard equipment.</p>'
      },
      'sports-meet': {
        title: 'Annual Sports Meet 2026 — Record Participation',
        body: '<p>The Annual Sports Meet 2026 witnessed record participation from all five trade departments. Events included athletics, cricket, volleyball, and indoor games.</p><h4 style="margin:1rem 0 0.5rem;">Winners</h4><ul style="padding-left:1.25rem;list-style:disc;"><li>Overall Champions: Electrician Department</li><li>Best Athlete: Mohammed Faisal (Wireman)</li><li>Best Team Sport: Civil Department Cricket Team</li></ul>'
      },
      'surveying-camp': {
        title: 'Civil Surveying & Land Plotting Training Camp',
        body: '<p>A 5-day intensive training camp on Civil Surveying and Land Plotting was conducted at the Kanjikode industrial belt, Palakkad. Draughtsman Civil trainees gained practical experience with Total Station and Auto-level equipment.</p><p style="margin-top:1rem;">Students performed real-world site surveys, topographic mapping, and digital plotting exercises under expert guidance.</p>'
      },
      'ncvt-inspection': {
        title: 'NCVT Inspection — All Standards Met',
        body: '<p>The National Council for Vocational Training (NCVT) inspection team visited M.E.S. ITI Mundur and certified compliance with all required infrastructure, faculty, and curriculum standards.</p><p style="margin-top:1rem;">The inspection covered workshop facilities, safety equipment, instructor qualifications, student-teacher ratio, and administrative processes. All parameters received satisfactory ratings.</p>'
      }
    };
    return posts[slug] || null;
  }

  // ──────────────────────────────────────────────
  // 11. Gallery Filter & Lightbox (Campus Gallery page)
  // ──────────────────────────────────────────────
  const galleryFilterBtns = document.querySelectorAll('.gallery-filters .filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  // Lightbox element references
  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-caption-title');
  const lightboxDesc = document.getElementById('lightbox-caption-desc');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');
  const lightboxLoader = lightbox ? lightbox.querySelector('.lightbox-loader') : null;

  let activeImagePool = []; // Elements currently matching active filter
  let currentActiveIndex = 0;

  // Re-build active image array based on current visibility
  function updateLightboxImagePool() {
    activeImagePool = Array.from(galleryItems).filter(function(item) {
      return item.style.display !== 'none';
    });
  }

  // Update image in lightbox
  function showImage(index) {
    if (activeImagePool.length === 0) return;

    // Boundary wrap around
    if (index < 0) {
      index = activeImagePool.length - 1;
    } else if (index >= activeImagePool.length) {
      index = 0;
    }

    currentActiveIndex = index;
    const item = activeImagePool[currentActiveIndex];
    if (!item) return;

    const src = item.dataset.src;
    const title = item.dataset.title;
    const desc = item.dataset.desc;

    // Show loading spinner, hide image opacity
    if (lightboxLoader) lightboxLoader.classList.add('active');
    if (lightboxImg) {
      lightboxImg.classList.remove('loaded');
      lightboxImg.src = src;
      lightboxImg.alt = title;
    }

    if (lightboxTitle) lightboxTitle.textContent = title;
    if (lightboxDesc) lightboxDesc.textContent = desc;
    if (lightboxCounter) {
      lightboxCounter.textContent = (currentActiveIndex + 1) + ' of ' + activeImagePool.length;
    }
  }

  // Remove loader spinner when image finishes loading
  if (lightboxImg) {
    lightboxImg.onload = function() {
      if (lightboxLoader) lightboxLoader.classList.remove('active');
      lightboxImg.classList.add('loaded');
    };
  }

  // Open lightbox at specific visible image index
  function openLightbox(index) {
    updateLightboxImagePool();
    showImage(index);
    if (lightbox) {
      lightbox.classList.add('active');
      lightbox.setAttribute('aria-hidden', 'false');
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
    }
    document.body.style.overflow = 'hidden';
  }

  // Close lightbox
  function closeLightbox() {
    if (lightbox) {
      lightbox.classList.remove('active');
      lightbox.setAttribute('aria-hidden', 'true');
    }
    document.body.style.overflow = '';
  }

  // Add click listeners to items
  galleryItems.forEach(function(item) {
    item.addEventListener('click', function() {
      updateLightboxImagePool();
      const idx = activeImagePool.indexOf(this);
      if (idx !== -1) {
        openLightbox(idx);
      }
    });
  });

  // Prev / Next arrow buttons
  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', function(e) {
      e.stopPropagation();
      showImage(currentActiveIndex - 1);
    });
  }
  if (lightboxNext) {
    lightboxNext.addEventListener('click', function(e) {
      e.stopPropagation();
      showImage(currentActiveIndex + 1);
    });
  }

  // Close buttons & Backdrop clicks
  if (lightboxClose) {
    lightboxClose.addEventListener('click', function(e) {
      e.stopPropagation();
      closeLightbox();
    });
  }
  if (lightbox) {
    lightbox.addEventListener('click', function(e) {
      // Close only if click is directly on backdrop wrappers, not on the children
      if (e.target === lightbox || 
          e.target.classList.contains('lightbox-content-wrapper') || 
          e.target.classList.contains('lightbox-image-container')) {
        closeLightbox();
      }
    });
  }

  // Touch swipe support for mobile devices
  let swipeStartX = 0;
  let swipeEndX = 0;
  if (lightbox) {
    lightbox.addEventListener('touchstart', function(e) {
      swipeStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', function(e) {
      swipeEndX = e.changedTouches[0].screenX;
      const threshold = 55;
      if (swipeEndX < swipeStartX - threshold) {
        showImage(currentActiveIndex + 1); // Swiped Left -> Next
      } else if (swipeEndX > swipeStartX + threshold) {
        showImage(currentActiveIndex - 1); // Swiped Right -> Prev
      }
    }, { passive: true });
  }

  // Animated sorting filtering
  galleryFilterBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      galleryFilterBtns.forEach(function(b) { b.classList.remove('active'); });
      this.classList.add('active');
      const filter = this.dataset.filter;

      galleryItems.forEach(function(item) {
        item.classList.remove('filtering-in');

        if (filter === 'all' || item.dataset.category === filter) {
          // If hidden, restore display and animate in
          if (item.style.display === 'none') {
            item.style.display = '';
            void item.offsetWidth; // Reflow trigger
          }
          item.classList.remove('filtering-out');
          item.classList.add('filtering-in');
        } else {
          // Animate out
          item.classList.add('filtering-out');
          // Hide display once animation finishes
          setTimeout(function() {
            if (item.classList.contains('filtering-out')) {
              item.style.display = 'none';
            }
          }, 350);
        }
      });
      
      // Update image pool for lightbox sequence
      setTimeout(updateLightboxImagePool, 360);
    });
  });

  // Initialize image pool
  updateLightboxImagePool();

  // ──────────────────────────────────────────────
  // 12. Keyboard Navigation controls (ESC, Arrows)
  // ──────────────────────────────────────────────
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeDrawer();
      closeModal();
      closeLightbox();
      closeNotifications();
      if (successOverlay && successOverlay.classList.contains('active')) {
        successOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    } else if (lightbox && lightbox.classList.contains('active')) {
      if (e.key === 'ArrowLeft') {
        showImage(currentActiveIndex - 1);
      } else if (e.key === 'ArrowRight') {
        showImage(currentActiveIndex + 1);
      }
    }
  });

  // ──────────────────────────────────────────────
  // 13. Floating Notifications Drawer Controls
  // ──────────────────────────────────────────────
  const notifTab = document.getElementById('notifications-tab');
  const notifDrawer = document.getElementById('notifications-drawer');
  const notifClose = document.getElementById('notifications-drawer-close');
  const notifOverlay = document.getElementById('notifications-overlay');

  function openNotifications() {
    if (notifDrawer) notifDrawer.classList.add('open');
    if (notifOverlay) notifOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeNotifications() {
    if (notifDrawer) notifDrawer.classList.remove('open');
    if (notifOverlay) notifOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (notifTab) notifTab.addEventListener('click', openNotifications);
  if (notifClose) notifClose.addEventListener('click', closeNotifications);
  if (notifOverlay) notifOverlay.addEventListener('click', closeNotifications);

  // Mobile dropdown toggle helper for top-bar statutory dropdown
  const topBarDropdown = document.querySelector('.top-bar .dropdown');
  const topBarDropdownToggle = document.querySelector('.top-bar .dropdown-toggle');
  if (topBarDropdownToggle && topBarDropdown) {
    topBarDropdownToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      topBarDropdown.classList.toggle('open');
    });

    document.addEventListener('click', function(e) {
      if (!topBarDropdown.contains(e.target)) {
        topBarDropdown.classList.remove('open');
      }
    });
  }

  // ──────────────────────────────────────────────
  // 14. Trades Page Hash Navigation
  // ──────────────────────────────────────────────
  if (currentPath === 'trades.html' || currentPath.endsWith('/trades.html')) {
    function handleTradeHash() {
      var hash = window.location.hash.replace('#', '');
      if (hash) {
        var target = document.getElementById(hash);
        if (target) {
          setTimeout(function() {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 300);
        }
      }
    }
    handleTradeHash();
    window.addEventListener('hashchange', handleTradeHash);
  }
}

// ──────────────────────────────────────────────
// Initialize
// ──────────────────────────────────────────────
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
