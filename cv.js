document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Print Trigger ---
    const printBtn = document.getElementById('printBtn');
    if (printBtn) {
        printBtn.addEventListener('click', () => {
            window.print();
        });
    }

    // --- 2. Auto-update Declaration Date ---
    const decDateSpan = document.getElementById('cv-declaration-date');
    if (decDateSpan) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        decDateSpan.textContent = new Date().toLocaleDateString('en-US', options);
    }

    // --- 3. Mobile Navigation Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // --- 4. CV Theme, Layout, Color Picker & Profile Toggle ---
    const themeSelect = document.getElementById('themeSelect');
    const layoutSelect = document.getElementById('layoutSelect');
    const colorPicker = document.getElementById('colorPicker');
    const profileToggle = document.getElementById('profileToggle');
    const cvDocumentContainer = document.querySelector('.cv-document-container');

    const themeColors = {
        'theme-modern': '#471CA8',
        'theme-classic': '#111111',
        'theme-minimal': '#4f46e5',
        'theme-emerald': '#059669',
        'theme-vintage': '#991b1b',
        'theme-navy': '#1e3a8a',
        'theme-amber': '#d97706',
        'theme-teal': '#0d9488',
        'theme-crimson': '#be123c',
        'theme-charcoal': '#374151',
        'theme-cyberpunk': '#06b6d4',
        'theme-gold': '#c29b38',
        'theme-swiss': '#000000',
        'theme-oak': '#78350f',
        'theme-metro': '#2563eb'
    };

    function hexToRGBA(hex, alpha) {
        hex = hex.replace('#', '');
        if (hex.length === 3) {
            hex = hex.split('').map(char => char + char).join('');
        }
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    if (themeSelect) {
        themeSelect.addEventListener('change', (e) => {
            const selectedTheme = e.target.value;
            // Remove all existing theme classes
            document.body.classList.remove(
                'theme-modern', 'theme-classic', 'theme-minimal', 
                'theme-emerald', 'theme-vintage', 'theme-navy', 
                'theme-amber', 'theme-teal', 'theme-crimson', 
                'theme-charcoal', 'theme-cyberpunk', 'theme-gold', 
                'theme-swiss', 'theme-oak', 'theme-metro'
            );
            // Add the new selected theme class
            document.body.classList.add(selectedTheme);

            // Sync color picker with theme selection
            if (colorPicker && themeColors[selectedTheme]) {
                colorPicker.value = themeColors[selectedTheme];
                // Reset custom overrides to let stylesheet rules take over
                document.documentElement.style.removeProperty('--cv-accent');
                document.documentElement.style.removeProperty('--cv-accent-soft');
            }
        });
    }

    if (layoutSelect) {
        layoutSelect.addEventListener('change', (e) => {
            const selectedLayout = e.target.value;
            // Remove existing layout classes
            document.body.classList.remove(
                'layout-left-sidebar', 'layout-right-sidebar', 'layout-single-column'
            );
            // Add the new selected layout class
            document.body.classList.add(selectedLayout);
        });
    }

    if (colorPicker) {
        colorPicker.addEventListener('input', (e) => {
            const pickedColor = e.target.value;
            const softColor = hexToRGBA(pickedColor, 0.2);
            document.documentElement.style.setProperty('--cv-accent', pickedColor);
            document.documentElement.style.setProperty('--cv-accent-soft', softColor);
        });
    }

    if (profileToggle && cvDocumentContainer) {
        profileToggle.addEventListener('change', (e) => {
            if (e.target.checked) {
                cvDocumentContainer.classList.remove('no-profile-pic');
            } else {
                cvDocumentContainer.classList.add('no-profile-pic');
            }
        });
    }
});
