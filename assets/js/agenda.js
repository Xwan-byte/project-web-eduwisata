// File: agenda.js (Versi Hybrid Final)

document.addEventListener('DOMContentLoaded', function() {
    
    const agendaContainer = document.querySelector('.agenda-container');
    if (!agendaContainer) return;

    // Ambil semua elemen yang dibutuhkan
    const prevMonthBtn = document.getElementById('prev-month-btn');
    const nextMonthBtn = document.getElementById('next-month-btn');
    const todayBtn = document.getElementById('today-btn');
    const monthDisplayText = document.getElementById('month-display-text');
    const googleCalendarLink = document.getElementById('google-calendar-link'); // Link baru
    const viewBtns = document.querySelectorAll('.view-btn');

    let currentDate = new Date();

    const renderCalendar = () => {
        // 1. Perbarui Teks Tanggal
        const displayOptions = { year: 'numeric', month: 'long' };
        monthDisplayText.textContent = currentDate.toLocaleDateString('id-ID', displayOptions);

        // 2. Buat dan Perbarui Link Google Calendar
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}${month}${day}`;
        
        const googleCalendarUrl = `https://www.google.com/calendar/render?mode=day&dates=${formattedDate}/${formattedDate}`;
        googleCalendarLink.href = googleCalendarUrl;
    };

    // Event listener untuk tombol-tombol
    prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    todayBtn.addEventListener('click', () => {
        currentDate = new Date();
        renderCalendar();
    });

    viewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            viewBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    renderCalendar(); // Panggil saat pertama kali dimuat
});