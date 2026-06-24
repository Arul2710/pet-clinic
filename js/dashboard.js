(function() {
  // Check authentication
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  if (!isLoggedIn) {
    window.location.href = 'login.html';
    return;
  }

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // Mock data
  const pets = [
    { name: 'Max', type: 'Dog', breed: 'Labrador Retriever', age: '3 years', weight: '32 kg', gender: 'Male', status: 'Up to Date', nextAppt: 'Jun 25, 2026', image: 'assets/images/photo-1553882809-a4f57e595701.jpg' },
    { name: 'Luna', type: 'Cat', breed: 'Persian', age: '2 years', weight: '4.5 kg', gender: 'Female', status: 'Booster Due', nextAppt: 'Jul 10, 2026', image: 'assets/images/photo-1574158622682-e40e69881006.jpg' }
  ];

  const vaccinations = [
    { vaccine: 'Rabies', dateGiven: 'Jun 10, 2025', nextDue: 'Jun 10, 2026', status: 'Up to Date' },
    { vaccine: 'DHPP', dateGiven: 'Jun 10, 2025', nextDue: 'Jun 10, 2026', status: 'Up to Date' },
    { vaccine: 'FVRCP', dateGiven: 'Mar 5, 2025', nextDue: 'Mar 5, 2026', status: 'Up to Date' },
    { vaccine: 'Bordetella', dateGiven: 'Jan 20, 2025', nextDue: 'Jan 20, 2026', status: 'Expired' },
    { vaccine: 'Leptospirosis', dateGiven: 'Apr 15, 2025', nextDue: 'Apr 15, 2026', status: 'Upcoming' }
  ];

  const appointments = [
    { pet: 'Max', type: 'Vaccination Booster', date: 'Jun 25, 2026', time: '10:00 AM', doctor: 'Dr. Wilson' },
    { pet: 'Luna', type: 'Annual Checkup', date: 'Jul 10, 2026', time: '2:30 PM', doctor: 'Dr. Chen' },
    { pet: 'Max', type: 'Dental Cleaning', date: 'Aug 5, 2026', time: '11:00 AM', doctor: 'Dr. Mitchell' }
  ];

  const microchips = [
    { pet: 'Max', chipId: '985 112 000 123 456', date: 'Jan 15, 2025', company: 'HomeAgain', status: 'Registered' },
    { pet: 'Luna', chipId: '985 112 000 789 012', date: 'Mar 20, 2025', company: 'Avid', status: 'Registered' }
  ];

  const healthReports = [
    { title: 'Annual Physical', date: 'May 15, 2026', summary: 'All vitals normal. Healthy weight and heart rate.', type: 'checkup' },
    { title: 'Blood Work Results', date: 'May 15, 2026', summary: 'Complete blood count within normal range. No abnormalities detected.', type: 'lab' },
    { title: 'Dental Assessment', date: 'Apr 20, 2026', summary: 'Mild tartar buildup. Recommended professional cleaning.', type: 'dental' },
    { title: 'Allergy Panel', date: 'Mar 10, 2026', summary: 'Mild sensitivity to pollen. Seasonal management advised.', type: 'allergy' }
  ];

  // Render Welcome
  const welcomeEl = document.getElementById('welcomeMessage');
  if (welcomeEl) {
    const name = user.name || 'Pet Parent';
    welcomeEl.textContent = `Welcome back, ${name}!`;
  }

  // Render Pets
  const petsContainer = document.getElementById('petsContainer');
  if (petsContainer) {
    petsContainer.innerHTML = pets.map(pet => `
      <div class="glass-card rounded-xl p-5 card-hover" data-aos="fade-up">
        <div class="flex items-center gap-4">
          <img src="${pet.image}" alt="${pet.name}" class="w-14 h-14 rounded-full object-cover border-2 border-blue-200 dark:border-blue-800">
          <div class="flex-1 min-w-0">
            <h3 class="font-bold text-gray-900 dark:text-white">${pet.name}</h3>
            <p class="text-xs text-gray-500 dark:text-gray-400">${pet.breed}</p>
          </div>
          <span class="px-2.5 py-1 text-xs font-semibold rounded-full ${pet.status === 'Up to Date' ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300' : 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300'}">${pet.status}</span>
        </div>
        <div class="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 text-sm">
          <div><span class="text-gray-500 dark:text-gray-400">Type:</span> <span class="font-medium text-gray-900 dark:text-white">${pet.type}</span></div>
          <div><span class="text-gray-500 dark:text-gray-400">Age:</span> <span class="font-medium text-gray-900 dark:text-white">${pet.age}</span></div>
          <div><span class="text-gray-500 dark:text-gray-400">Weight:</span> <span class="font-medium text-gray-900 dark:text-white">${pet.weight}</span></div>
          <div><span class="text-gray-500 dark:text-gray-400">Gender:</span> <span class="font-medium text-gray-900 dark:text-white">${pet.gender}</span></div>
        </div>
        <div class="mt-3 flex items-center justify-between text-xs">
          <span class="text-gray-500">Next Appt: <strong class="text-gray-900 dark:text-white">${pet.nextAppt}</strong></span>
          <button class="text-blue-600 dark:text-blue-400 hover:underline">View Profile</button>
        </div>
      </div>
    `).join('');
  }

  // Render Vaccination Table
  const tableBody = document.getElementById('vaccinationTableBody');
  if (tableBody) {
    const statusColors = {
      'Up to Date': 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300',
      'Expired': 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300',
      'Upcoming': 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300'
    };
    tableBody.innerHTML = vaccinations.map(v => `
      <tr class="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
        <td class="px-4 py-3 font-medium text-gray-900 dark:text-white">${v.vaccine}</td>
        <td class="px-4 py-3 text-gray-600 dark:text-gray-400">${v.dateGiven}</td>
        <td class="px-4 py-3 text-gray-600 dark:text-gray-400">${v.nextDue}</td>
        <td class="px-4 py-3"><span class="px-2.5 py-1 text-xs font-semibold rounded-full ${statusColors[v.status] || 'bg-gray-100 text-gray-600'}">${v.status}</span></td>
      </tr>
    `).join('');
  }

  // Render Appointments
  const apptsContainer = document.getElementById('appointmentsContainer');
  if (apptsContainer) {
    const typeColors = {
      'Vaccination Booster': 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300',
      'Annual Checkup': 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300',
      'Dental Cleaning': 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300'
    };
    apptsContainer.innerHTML = appointments.map(a => `
      <div class="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
        <div class="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center shrink-0">
          <svg class="w-5 h-5 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
        </div>
        <div class="flex-1 min-w-0">
          <p class="font-semibold text-sm text-gray-900 dark:text-white">${a.pet} - ${a.type}</p>
          <p class="text-xs text-gray-500">${a.date} at ${a.time}</p>
          <p class="text-xs text-gray-400">${a.doctor}</p>
        </div>
        <span class="px-2 py-0.5 text-xs font-medium rounded-full ${typeColors[a.type] || 'bg-gray-100 text-gray-600'}">${a.type.split(' ')[0]}</span>
      </div>
    `).join('');
  }

  // Render Microchip Records
  const microchipContainer = document.getElementById('microchipContainer');
  if (microchipContainer) {
    microchipContainer.innerHTML = microchips.map(m => `
      <div class="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 mb-3 last:mb-0">
        <div class="flex items-center justify-between mb-1">
          <span class="font-semibold text-sm text-gray-900 dark:text-white">${m.pet}</span>
          <span class="px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300">${m.status}</span>
        </div>
        <p class="text-xs text-gray-500 font-mono">ID: ${m.chipId}</p>
        <p class="text-xs text-gray-400">Provider: ${m.company} | ${m.date}</p>
      </div>
    `).join('');
  }

  // Render Health Reports
  const healthContainer = document.getElementById('healthReportsContainer');
  if (healthContainer) {
    const typeIcons = {
      checkup: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      lab: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
      dental: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
      allergy: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
    };
    const typeColors = {
      checkup: 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300',
      lab: 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300',
      dental: 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300',
      allergy: 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300'
    };
    healthContainer.innerHTML = healthReports.map(r => `
      <div class="glass-card rounded-xl p-4 card-hover">
        <div class="flex items-center gap-3 mb-2">
          <div class="w-9 h-9 rounded-lg ${typeColors[r.type] || 'bg-gray-100'} flex items-center justify-center">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${typeIcons[r.type] || typeIcons.checkup}"/></svg>
          </div>
          <div>
            <h4 class="font-semibold text-sm text-gray-900 dark:text-white">${r.title}</h4>
            <p class="text-xs text-gray-500">${r.date}</p>
          </div>
        </div>
        <p class="text-xs text-gray-600 dark:text-gray-400">${r.summary}</p>
        <button class="mt-2 text-xs text-blue-600 dark:text-blue-400 hover:underline">View Full Report</button>
      </div>
    `).join('');
  }

  // Render Profile
  const profileContainer = document.getElementById('profileContainer');
  if (profileContainer) {
    profileContainer.innerHTML = `
      <div class="flex items-center gap-3 pb-3 border-b border-gray-100 dark:border-gray-700">
        <div class="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white font-bold text-lg">
          ${(user.name || 'U').charAt(0).toUpperCase()}
        </div>
        <div>
          <p class="font-semibold text-gray-900 dark:text-white">${user.name || 'User'}</p>
          <p class="text-xs text-gray-500">${user.email || ''}</p>
        </div>
      </div>
      <div class="space-y-2 text-sm">
        <div class="flex justify-between"><span class="text-gray-500">Phone:</span><span class="font-medium text-gray-900 dark:text-white">${user.phone || 'Not set'}</span></div>
        <div class="flex justify-between"><span class="text-gray-500">Pet Name:</span><span class="font-medium text-gray-900 dark:text-white">${user.petName || 'Not set'}</span></div>
        <div class="flex justify-between"><span class="text-gray-500">Pet Type:</span><span class="font-medium text-gray-900 dark:text-white">${user.petType || 'Not set'}</span></div>
        <div class="flex justify-between"><span class="text-gray-500">Member Since:</span><span class="font-medium text-gray-900 dark:text-white">${new Date().getFullYear()}</span></div>
      </div>
      <button id="logoutDashboardBtn" class="w-full mt-4 px-4 py-2.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl text-sm font-semibold hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-all flex items-center justify-center gap-2">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
        Logout
      </button>
    `;

    const logoutBtn = document.getElementById('logoutDashboardBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function() {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('user');
        window.location.href = 'index.html';
      });
    }
  }

  // Redirect to login if page sections not found
  if (!welcomeEl && !petsContainer && !tableBody) {
    window.location.href = 'login.html';
  }
})();

