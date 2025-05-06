/**
 * Language switcher functionality for noman website
 */

document.addEventListener('DOMContentLoaded', function () {
    // Available languages with their display names
    const languages = {
        'en': 'English',
        'ja': '日本語',
        // Add more languages here as needed
        // 'fr': 'Français',
        // 'es': 'Español',
        // 'zh': '中文',
    };

    // Determine current language from URL path
    function getCurrentLanguage() {
        const path = window.location.pathname;

        // Check for each supported language in the path
        for (const lang in languages) {
            if (path.startsWith(`/${lang}/`) || path.includes(`/${lang}/`)) {
                return lang;
            }
        }

        // Default to English if no language found in path
        return 'en';
    }

    // Get URL for a specific language version of the current page
    function getLanguageUrl(targetLang) {
        const currentLang = getCurrentLanguage();
        const currentPath = window.location.pathname;

        // Handle paths with subdirectories
        // This will work for both root pages (/ja/, /en/) and subdirectory pages (/ja/pages/ls.html, /en/pages/ls.html)
        let newPath;

        // Create a regex pattern to match the language segment in the path
        const langPattern = new RegExp(`\\/${currentLang}(\\/|$)`);

        if (langPattern.test(currentPath)) {
            // Replace the language segment while preserving the rest of the path
            newPath = currentPath.replace(`/${currentLang}/`, `/${targetLang}/`);
        } else {
            // If no language segment found, just prepend the target language
            newPath = `/${targetLang}/`;

            // If we're on a page that doesn't have a language prefix but should,
            // try to extract the page path and append it to the new language path
            const pathSegments = currentPath.split('/').filter(segment => segment);
            if (pathSegments.length > 0) {
                // Append the rest of the path to the new language path
                newPath = `/${targetLang}/${pathSegments.join('/')}`;
            }
        }

        return newPath;
    }

    // Create language dropdown menu
    function createLanguageDropdown() {
        const currentLang = getCurrentLanguage();
        const langSwitcher = document.getElementById('language-switcher');

        if (langSwitcher) {
            // Create dropdown container
            const dropdown = document.createElement('div');
            dropdown.className = 'lang-dropdown';

            // Create dropdown button with current language
            const dropdownBtn = document.createElement('button');
            dropdownBtn.className = 'lang-dropdown-btn';
            dropdownBtn.textContent = languages[currentLang] || 'Language';

            // Create dropdown content container
            const dropdownContent = document.createElement('div');
            dropdownContent.className = 'lang-dropdown-content';

            // Add language options
            for (const lang in languages) {
                if (lang !== currentLang) { // Don't include current language in dropdown
                    const langOption = document.createElement('a');
                    langOption.href = getLanguageUrl(lang);
                    langOption.textContent = languages[lang];
                    dropdownContent.appendChild(langOption);
                }
            }

            // Assemble dropdown
            dropdown.appendChild(dropdownBtn);
            dropdown.appendChild(dropdownContent);

            // Replace language switcher with dropdown
            langSwitcher.innerHTML = '';
            langSwitcher.appendChild(dropdown);

            // Add event listener to toggle dropdown
            dropdownBtn.addEventListener('click', function (e) {
                e.preventDefault();
                dropdownContent.classList.toggle('show');
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', function (e) {
                if (!dropdown.contains(e.target)) {
                    dropdownContent.classList.remove('show');
                }
            });
        }
    }

    // Add CSS for language dropdown
    function addDropdownStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .lang-dropdown {
                position: relative;
                display: inline-block;
            }
            
            .lang-dropdown-btn {
                background-color: transparent;
                color: white;
                border: none;
                cursor: pointer;
                padding: 0;
                font-size: inherit;
                font-family: inherit;
            }
            
            .lang-dropdown-content {
                display: none;
                position: absolute;
                background-color: #f9f9f9;
                min-width: 120px;
                box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
                z-index: 1;
                border-radius: 4px;
                right: 0;
            }
            
            .lang-dropdown-content.show {
                display: block;
            }
            
            .lang-dropdown-content a {
                color: black;
                padding: 12px 16px;
                text-decoration: none;
                display: block;
                text-align: left;
            }
            
            .lang-dropdown-content a:hover {
                background-color: #f1f1f1;
                border-radius: 4px;
            }
        `;
        document.head.appendChild(style);
    }

    // Initialize language switcher
    addDropdownStyles();
    createLanguageDropdown();
});
