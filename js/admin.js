// Admin Portal Interactivity and Tab Switching (UI Mockup)

document.addEventListener('DOMContentLoaded', function() {
  // Mock Data Sets
  let enquiries = [
    { id: 1, name: "Arjun K. P.", phone: "+91 98765 43210", trade: "Electrician", date: "2026-06-08", status: "pending" },
    { id: 2, name: "Sneha Jose", phone: "+91 94471 23456", trade: "Draughtsman Civil", date: "2026-06-07", status: "contacted" },
    { id: 3, name: "Rahul V.", phone: "+91 81299 87654", trade: "Wireman", date: "2026-06-05", status: "closed" },
    { id: 4, name: "Amina S.", phone: "+91 90611 23789", trade: "Electronic Mechanic", date: "2026-06-03", status: "contacted" },
    { id: 5, name: "Manuel Thomas", phone: "+91 98460 11223", trade: "Plumber", date: "2026-06-01", status: "pending" },
    { id: 6, name: "Kiran Dev", phone: "+91 95678 88990", trade: "Electrician", date: "2026-05-28", status: "contacted" },
    { id: 7, name: "Sreejith M. U.", phone: "+91 85940 33445", trade: "Wireman", date: "2026-05-25", status: "closed" }
  ];

  let alumni = [
    { id: 1, name: "Sajid Khan", batch: "2021-2023", trade: "Electrician", company: "KSEB Kerala", designation: "Sub-Station Tech", status: "approved" },
    { id: 2, name: "Meera Nambiar", batch: "2022-2024", trade: "Draughtsman Civil", company: "L&T Construction", designation: "Junior CAD Designer", status: "approved" },
    { id: 3, name: "Akhil K.", batch: "2023-2025", trade: "Electronic Mechanic", company: "Keltron India", designation: "Assembly Inspector", status: "approved" },
    { id: 4, name: "Deepak Raj", batch: "2023-2024", trade: "Plumber", company: "Self-Employed", designation: "Plumbing Contractor", status: "pending" },
    { id: 5, name: "Vipin Das", batch: "2020-2022", trade: "Wireman", company: "KSEB Subcontractor", designation: "Lineman", status: "pending" }
  ];

  let notices = [
    { id: 1, title: "Admissions Open for 2026-27", category: "Admission", link: "admissions.html" },
    { id: 2, title: "AITT Practical Exam Schedule", category: "Exam", link: "blog.html" },
    { id: 3, title: "Upcoming KSEB & L&T Campus Recruitment", category: "Placement", link: "placements.html" }
  ];

  let messages = [
    { id: 1, name: "George Kutty", email: "george@gmail.com", subject: "Fee structure query", body: "Please send details about electrician fee structure and installment options.", date: "2026-06-08" },
    { id: 2, name: "Sandhya Haridas", email: "sandhya@yahoo.com", subject: "Syllabus details", body: "Is CAD software package included in Draughtsman civil practicals? Please confirm.", date: "2026-06-06" },
    { id: 3, name: "Nitin P.", email: "nitinp99@gmail.com", subject: "Placement cell contact", body: "I am an employer interested in hosting a campus placement drive for Wireman graduates. Please call me.", date: "2026-06-04" },
    { id: 4, name: "Father of trainee", email: "abdul62@gmail.com", subject: "Hostel facility", body: "Do you have any tied-up hostel facility or rooms nearby for outer-district students?", date: "2026-06-02" }
  ];

  // ──────────────────────────────────────────────
  // 1. Simulated Login & Logout
  // ──────────────────────────────────────────────
  const loginForm = document.getElementById('admin-login-form');
  const loginWrapper = document.getElementById('admin-login-wrapper');
  const dashboardContainer = document.getElementById('admin-dashboard-container');

  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const usernameInput = document.getElementById('admin-username').value.trim();
      const passwordInput = document.getElementById('admin-password').value.trim();

      // Simple mock authentication check
      if (usernameInput === 'admin' && passwordInput === 'password') {
        // Successful login transition
        loginWrapper.style.display = 'none';
        dashboardContainer.style.display = 'flex';
        initDashboard();
      } else {
        // Shake animation on invalid attempt
        const card = document.querySelector('.admin-login-card');
        card.classList.add('shake');
        setTimeout(() => card.classList.remove('shake'), 400);
        alert('Invalid admin credentials. (Hint: use admin / password)');
      }
    });
  }

  const logoutBtn = document.getElementById('admin-logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function(e) {
      e.preventDefault();
      if (confirm('Are you sure you want to sign out?')) {
        dashboardContainer.style.display = 'none';
        loginWrapper.style.display = 'flex';
        // Reset password fields
        document.getElementById('admin-password').value = '';
      }
    });
  }

  // ──────────────────────────────────────────────
  // 2. Tab Navigation Routing
  // ──────────────────────────────────────────────
  const menuItems = document.querySelectorAll('.admin-menu-item');
  const tabPanes = document.querySelectorAll('.admin-tab-pane');
  const currentTabTitle = document.getElementById('admin-current-tab-title');

  menuItems.forEach(item => {
    item.addEventListener('click', function() {
      // Deactivate all sidebar items and panes
      menuItems.forEach(mi => mi.classList.remove('active'));
      tabPanes.forEach(tp => tp.classList.remove('active'));

      // Activate selected item
      this.classList.add('active');
      const tabId = this.dataset.tab;
      const targetPane = document.getElementById(`pane-${tabId}`);
      if (targetPane) {
        targetPane.classList.add('active');
      }

      // Update title bar
      if (currentTabTitle) {
        currentTabTitle.textContent = this.querySelector('span').textContent;
      }

      // Close mobile drawer overlay if open
      closeMobileSidebar();
    });
  });

  // ──────────────────────────────────────────────
  // 3. Mobile Sidebar Drawer Controls
  // ──────────────────────────────────────────────
  const mobileMenuBtn = document.getElementById('admin-mobile-menu-btn');
  const sidebar = document.getElementById('admin-sidebar');
  const overlay = document.getElementById('admin-sidebar-overlay');

  if (mobileMenuBtn && sidebar && overlay) {
    mobileMenuBtn.addEventListener('click', function() {
      sidebar.classList.add('open');
      overlay.classList.add('active');
    });

    overlay.addEventListener('click', closeMobileSidebar);
  }

  function closeMobileSidebar() {
    if (sidebar) sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
  }

  // Initialize all lucide icons in the dynamically loaded admin layout
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // ──────────────────────────────────────────────
  // 4. Core Dashboard Initializer & Renderers
  // ──────────────────────────────────────────────
  function initDashboard() {
    updateStatsCounters();
    renderOverviewRecent();
    renderAdmissions();
    renderAlumni();
    renderAnnouncements();
    renderContactMessages();
  }

  function updateStatsCounters() {
    document.getElementById('stat-enquiries').textContent = enquiries.length;
    document.getElementById('stat-alumni').textContent = alumni.filter(a => a.status === 'pending').length;
    document.getElementById('stat-notices').textContent = notices.length;
    document.getElementById('stat-mail').textContent = messages.length;
  }

  // OVERVIEW TAB: Recent Enquiries List
  function renderOverviewRecent() {
    const tbody = document.getElementById('recent-admissions-tbody');
    if (!tbody) return;

    tbody.innerHTML = '';
    // Show top 3 recent items
    const recent = enquiries.slice(0, 3);
    
    recent.forEach(item => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${item.name}</strong></td>
        <td>${item.trade}</td>
        <td>${item.date}</td>
        <td><span class="admin-badge badge-${item.status}">${item.status}</span></td>
      `;
      tbody.appendChild(tr);
    });
  }

  // ADMISSIONS TAB
  const admissionsSearch = document.getElementById('admissions-search');
  const admissionsFilter = document.getElementById('admissions-trade-filter');

  if (admissionsSearch) admissionsSearch.addEventListener('input', renderAdmissions);
  if (admissionsFilter) admissionsFilter.addEventListener('change', renderAdmissions);

  function renderAdmissions() {
    const tbody = document.getElementById('admissions-table-body');
    if (!tbody) return;

    const query = admissionsSearch ? admissionsSearch.value.toLowerCase() : '';
    const filter = admissionsFilter ? admissionsFilter.value : 'all';

    tbody.innerHTML = '';

    const filtered = enquiries.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(query) || item.phone.includes(query);
      const matchesFilter = filter === 'all' || item.trade.toLowerCase().includes(filter.toLowerCase());
      return matchesSearch && matchesFilter;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" class="text-center" style="padding: 2rem; color: var(--color-text-light);">No enquiries match your search filter criteria.</td></tr>`;
      return;
    }

    filtered.forEach(item => {
      const tr = document.createElement('tr');
      tr.id = `admissions-row-${item.id}`;
      tr.innerHTML = `
        <td><strong>${item.name}</strong></td>
        <td>${item.phone}</td>
        <td>${item.trade}</td>
        <td>${item.date}</td>
        <td><span class="admin-badge badge-${item.status}" style="cursor:pointer;" title="Click to toggle status">${item.status}</span></td>
        <td class="admin-actions-cell">
          <button class="admin-btn-icon btn-status" title="Toggle Status" data-id="${item.id}"><i data-lucide="refresh-cw"></i></button>
          <button class="admin-btn-icon btn-delete" title="Delete Row" data-id="${item.id}"><i data-lucide="trash-2"></i></button>
        </td>
      `;
      tbody.appendChild(tr);

      // Status Badge quick toggle
      const badge = tr.querySelector(`.badge-${item.status}`);
      badge.addEventListener('click', () => toggleAdmissionsStatus(item.id));

      // Refresh button click
      const refreshBtn = tr.querySelector('.btn-status');
      refreshBtn.addEventListener('click', () => toggleAdmissionsStatus(item.id));

      // Delete button click
      const deleteBtn = tr.querySelector('.btn-delete');
      deleteBtn.addEventListener('click', () => deleteAdmissionsRow(item.id));
    });

    if (window.lucide) window.lucide.createIcons();
  }

  function toggleAdmissionsStatus(id) {
    const item = enquiries.find(e => e.id === id);
    if (!item) return;

    // Cycle through: pending -> contacted -> closed -> pending
    if (item.status === 'pending') {
      item.status = 'contacted';
    } else if (item.status === 'contacted') {
      item.status = 'closed';
    } else {
      item.status = 'pending';
    }

    renderAdmissions();
    renderOverviewRecent();
    updateStatsCounters();
  }

  function deleteAdmissionsRow(id) {
    if (confirm('Are you sure you want to delete this enquiry?')) {
      const row = document.getElementById(`admissions-row-${id}`);
      if (row) {
        row.style.transition = 'all 0.4s ease';
        row.style.opacity = '0';
        row.style.transform = 'translateX(50px)';
        setTimeout(() => {
          enquiries = enquiries.filter(e => e.id !== id);
          renderAdmissions();
          renderOverviewRecent();
          updateStatsCounters();
        }, 400);
      }
    }
  }

  // ALUMNI TAB
  const alumniSearch = document.getElementById('alumni-search');
  const alumniFilter = document.getElementById('alumni-trade-filter');

  if (alumniSearch) alumniSearch.addEventListener('input', renderAlumni);
  if (alumniFilter) alumniFilter.addEventListener('change', renderAlumni);

  function renderAlumni() {
    const tbody = document.getElementById('alumni-table-body');
    if (!tbody) return;

    const query = alumniSearch ? alumniSearch.value.toLowerCase() : '';
    const filter = alumniFilter ? alumniFilter.value : 'all';

    tbody.innerHTML = '';

    const filtered = alumni.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(query) || item.company.toLowerCase().includes(query);
      const matchesFilter = filter === 'all' || item.trade.toLowerCase().includes(filter.toLowerCase());
      return matchesSearch && matchesFilter;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" class="text-center" style="padding: 2rem; color: var(--color-text-light);">No alumni profiles found matching criteria.</td></tr>`;
      return;
    }

    filtered.forEach(item => {
      const tr = document.createElement('tr');
      tr.id = `alumni-row-${item.id}`;
      tr.innerHTML = `
        <td><strong>${item.name}</strong></td>
        <td>${item.batch}</td>
        <td>${item.trade}</td>
        <td>${item.company}</td>
        <td>${item.designation}</td>
        <td><span class="admin-badge badge-${item.status}">${item.status}</span></td>
        <td class="admin-actions-cell">
          ${item.status === 'pending' ? `<button class="admin-btn-icon btn-approve" title="Approve & Publish" data-id="${item.id}" style="border-color:#2ecc71; color:#2ecc71;"><i data-lucide="check"></i></button>` : ''}
          <button class="admin-btn-icon btn-delete" title="Delete Row" data-id="${item.id}"><i data-lucide="trash-2"></i></button>
        </td>
      `;
      tbody.appendChild(tr);

      // Approve Alumni trigger
      if (item.status === 'pending') {
        const approveBtn = tr.querySelector('.btn-approve');
        approveBtn.addEventListener('click', () => approveAlumni(item.id));
      }

      // Delete Alumni trigger
      const deleteBtn = tr.querySelector('.btn-delete');
      deleteBtn.addEventListener('click', () => deleteAlumniRow(item.id));
    });

    if (window.lucide) window.lucide.createIcons();
  }

  function approveAlumni(id) {
    const item = alumni.find(a => a.id === id);
    if (item) {
      item.status = 'approved';
      alert(`Alumni profile for ${item.name} has been approved and published to success stories!`);
      renderAlumni();
      updateStatsCounters();
    }
  }

  function deleteAlumniRow(id) {
    if (confirm('Are you sure you want to remove this alumni registration?')) {
      const row = document.getElementById(`alumni-row-${id}`);
      if (row) {
        row.style.transition = 'all 0.4s ease';
        row.style.opacity = '0';
        row.style.transform = 'translateX(50px)';
        setTimeout(() => {
          alumni = alumni.filter(a => a.id !== id);
          renderAlumni();
          updateStatsCounters();
        }, 400);
      }
    }
  }

  // ANNOUNCEMENTS TAB
  const postNoticeForm = document.getElementById('announcement-form');

  if (postNoticeForm) {
    postNoticeForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const title = document.getElementById('notice-title').value.trim();
      const categorySelect = document.getElementById('notice-category');
      const category = categorySelect.options[categorySelect.selectedIndex].text;
      const link = document.getElementById('notice-link').value;
      const desc = document.getElementById('notice-desc').value.trim();

      if (!title || !desc) {
        alert('Please fill out all required fields.');
        return;
      }

      // Add notice locally
      const newId = notices.length > 0 ? Math.max(...notices.map(n => n.id)) + 1 : 1;
      notices.push({
        id: newId,
        title: title,
        category: category,
        link: link
      });

      alert('Announcement successfully posted! Live ticker and drawer notifications updated locally.');
      this.reset();
      renderAnnouncements();
      updateStatsCounters();
    });
  }

  function renderAnnouncements() {
    const tbody = document.getElementById('announcements-table-body');
    if (!tbody) return;

    tbody.innerHTML = '';

    if (notices.length === 0) {
      tbody.innerHTML = `<tr><td colspan="4" class="text-center" style="padding: 2rem; color: var(--color-text-light);">No active announcements found.</td></tr>`;
      return;
    }

    notices.forEach(item => {
      const tr = document.createElement('tr');
      tr.id = `notice-row-${item.id}`;
      tr.innerHTML = `
        <td><strong>${item.title}</strong></td>
        <td><span class="admin-badge badge-contacted">${item.category}</span></td>
        <td><code>pages/${item.link}</code></td>
        <td class="admin-actions-cell">
          <button class="admin-btn-icon btn-delete" title="Delete Announcement" data-id="${item.id}"><i data-lucide="trash-2"></i></button>
        </td>
      `;
      tbody.appendChild(tr);

      const deleteBtn = tr.querySelector('.btn-delete');
      deleteBtn.addEventListener('click', () => deleteNoticeRow(item.id));
    });

    if (window.lucide) window.lucide.createIcons();
  }

  function deleteNoticeRow(id) {
    if (confirm('Are you sure you want to delete this announcement?')) {
      const row = document.getElementById(`notice-row-${id}`);
      if (row) {
        row.style.transition = 'all 0.4s ease';
        row.style.opacity = '0';
        row.style.transform = 'translateX(50px)';
        setTimeout(() => {
          notices = notices.filter(n => n.id !== id);
          renderAnnouncements();
          updateStatsCounters();
        }, 400);
      }
    }
  }

  // CONTACT MESSAGES TAB
  const contactSearch = document.getElementById('contact-search');
  if (contactSearch) contactSearch.addEventListener('input', renderContactMessages);

  function renderContactMessages() {
    const tbody = document.getElementById('contact-table-body');
    if (!tbody) return;

    const query = contactSearch ? contactSearch.value.toLowerCase() : '';

    tbody.innerHTML = '';

    const filtered = messages.filter(item => {
      return item.name.toLowerCase().includes(query) || 
             item.email.toLowerCase().includes(query) || 
             item.subject.toLowerCase().includes(query) ||
             item.body.toLowerCase().includes(query);
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" class="text-center" style="padding: 2rem; color: var(--color-text-light);">No messages found matching search query.</td></tr>`;
      return;
    }

    filtered.forEach(item => {
      const tr = document.createElement('tr');
      tr.id = `message-row-${item.id}`;
      tr.innerHTML = `
        <td><strong>${item.name}</strong></td>
        <td><a href="mailto:${item.email}" style="color:var(--color-primary); font-weight:600;">${item.email}</a></td>
        <td><em>${item.subject}</em></td>
        <td style="max-width: 280px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${item.body}">${item.body}</td>
        <td>${item.date}</td>
        <td class="admin-actions-cell">
          <button class="admin-btn-icon btn-view-mail" title="Read Message" style="border-color:var(--color-primary); color:var(--color-primary);"><i data-lucide="eye"></i></button>
          <button class="admin-btn-icon btn-delete" title="Delete Message" data-id="${item.id}"><i data-lucide="trash-2"></i></button>
        </td>
      `;
      tbody.appendChild(tr);

      // Read Mail Modal Mockup trigger
      const viewBtn = tr.querySelector('.btn-view-mail');
      viewBtn.addEventListener('click', () => {
        alert(`FROM: ${item.name} (${item.email})\nSUBJECT: ${item.subject}\nDATE: ${item.date}\n\nMESSAGE:\n${item.body}`);
      });

      // Delete message trigger
      const deleteBtn = tr.querySelector('.btn-delete');
      deleteBtn.addEventListener('click', () => deleteMessageRow(item.id));
    });

    if (window.lucide) window.lucide.createIcons();
  }

  function deleteMessageRow(id) {
    if (confirm('Are you sure you want to permanently delete this message?')) {
      const row = document.getElementById(`message-row-${id}`);
      if (row) {
        row.style.transition = 'all 0.4s ease';
        row.style.opacity = '0';
        row.style.transform = 'translateX(50px)';
        setTimeout(() => {
          messages = messages.filter(m => m.id !== id);
          renderContactMessages();
          updateStatsCounters();
        }, 400);
      }
    }
  }

  // Auto sign in when developing/testing (Uncomment if needed, but manual login is standard for demo)
  // For easy testing, username/password form inputs are pre-filled as 'admin' and 'password'.
});
