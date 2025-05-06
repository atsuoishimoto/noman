/*
const pages = {
    "cd": {
        "summary": "Changes the current directory",
    },
    "cp": {
        "summary": "Copies files and directories",
    },
    "less": {
        "summary": "Displays the contents of a file",
    },
    "ls": {
        "summary": "Lists files in a directory",
    },
    "pwd": {
        "summary": "Prints the current working directory",
    },
    // Add more commands here
};
*/
document.addEventListener('DOMContentLoaded', function () {
    // Create overlay element to prevent scrolling
    let searchOverlay = document.createElement('div');
    searchOverlay.className = 'search-overlay';
    searchOverlay.style.position = 'fixed';
    searchOverlay.style.top = '0';
    searchOverlay.style.left = '0';
    searchOverlay.style.width = '100vw';
    searchOverlay.style.height = '100vh';
    searchOverlay.style.backgroundColor = 'transparent';
    searchOverlay.style.zIndex = '9999';
    searchOverlay.style.display = 'none';
    searchOverlay.style.pointerEvents = 'all';
    // Allow the overlay to have scrollable children
    searchOverlay.style.overflow = 'visible';
    
    // Add event listeners to explicitly prevent events from propagating
    searchOverlay.addEventListener('wheel', function(e) {
        // Allow scrolling only within the search results panel
        if (!e.target.closest('.search-results-panel')) {
            e.preventDefault();
            e.stopPropagation();
        }
    }, { passive: false });
    
    searchOverlay.addEventListener('touchmove', function(e) {
        // Allow touch movements only within the search results panel
        if (!e.target.closest('.search-results-panel')) {
            e.preventDefault();
            e.stopPropagation();
        }
    }, { passive: false });
    
    document.body.appendChild(searchOverlay);

    // Function to create and setup search functionality for a search box
    function setupSearch(searchBoxId) {
        const searchBox = document.getElementById(searchBoxId);
        if (!searchBox) return;

        let searchResultsPanel = document.createElement('div');
        searchResultsPanel.className = 'search-results-panel';
        // Add the search results panel to the overlay instead of directly to the body
        searchOverlay.appendChild(searchResultsPanel);

        // Position the search results panel relative to the search box
        function positionSearchPanel() {
            const searchBoxRect = searchBox.getBoundingClientRect();
            
            // Since the overlay is fixed position, we need to use viewport-relative positioning
            // without adding window.scrollY (which was needed when appending to body)
            searchResultsPanel.style.position = 'absolute';
            searchResultsPanel.style.top = searchBoxRect.bottom + 'px';

            // For the nav searchbox, position to the right
            if (searchBoxId === 'nav-searchbox') {
                searchResultsPanel.style.right = (window.innerWidth - searchBoxRect.right) + 'px';
                searchResultsPanel.style.left = '';
            } else {
                // For other searchboxes, position to match the left edge
                searchResultsPanel.style.left = searchBoxRect.left + 'px';
                searchResultsPanel.style.right = '';
            }
            
            // Ensure the panel is visible and scrollable
            searchResultsPanel.style.maxHeight = '40vh';
            searchResultsPanel.style.overflowY = 'auto';
        }

        // Show/hide search results panel based on input
        searchBox.addEventListener('input', function () {
            const searchTerm = this.value.toLowerCase().trim();

            if (searchTerm === '') {
                searchResultsPanel.style.display = 'none';
                return;
            }

            // Show the overlay and position the panel
            searchOverlay.style.display = 'block';
            // Prevent body scrolling when overlay is shown
            document.body.style.overflow = 'hidden';
            positionSearchPanel();
            searchResultsPanel.style.display = 'block';

            // Split search term into keywords
            const keywords = searchTerm.split(' ').filter(keyword => keyword.length > 0);

            // Filter pages based on multiple keywords
            const matchingPages = Object.entries(pages).filter(([key, data]) => {
                const keyText = key.toLowerCase();
                const summaryText = data.summary.toLowerCase();
                // Include command field in search if it exists
                const commandText = data.command ? data.command.toLowerCase() : '';
                // Include aliases in search if they exist
                const aliasesText = data.alias ? data.alias.join(' ').toLowerCase() : '';

                // Check if all keywords are found in either key, command, summary, or aliases
                return keywords.every(keyword =>
                    keyText.includes(keyword) ||
                    summaryText.includes(keyword) ||
                    commandText.includes(keyword) ||
                    aliasesText.includes(keyword)
                );
            });

            // Update search results panel
            if (matchingPages.length > 0) {
                searchResultsPanel.innerHTML = matchingPages.map(([key, data]) => {
                    // Display command value if it exists, otherwise use the key
                    const displayCommand = data.command ? data.command : key;
                    // Display aliases if they exist
                    const aliasesDisplay = data.alias ? 
                        `<div class="search-result-aliases">Aliases: ${data.alias.join(', ')}</div>` : '';
                    const commandNames = data.alias ? (displayCommand + `, ${data.alias.join(', ')}`): displayCommand
                    return `
            <div class="search-result-item" data-command="${key}">
              <div class="search-result-command">${commandNames}</div>
              <div class="search-result-summary">${data.summary}</div>
            </div>
          `;
                }).join('');

                // Add click event to search result items
                document.querySelectorAll('.search-result-item').forEach(item => {
                    item.addEventListener('click', function () {
                        // 現在のurl /lang-name/page.html からlang-nameを取得
                        const currentUrl = window.location.href;
                        const langName = currentUrl.split('/')[3];
                        const command = this.getAttribute('data-command');
                        window.location.href = `/${langName}/pages/${command}.html`;
                        searchResultsPanel.style.display = 'none';
                        searchBox.value = command;
                    });
                });
            } else {
                searchResultsPanel.innerHTML = '<div class="no-results">No matching commands found</div>';
            }
        });

        // Hide search results panel when clicking outside
        document.addEventListener('click', function (event) {
            if (event.target !== searchBox && !searchResultsPanel.contains(event.target)) {
                searchResultsPanel.style.display = 'none';
                searchOverlay.style.display = 'none';
                // Restore body scrolling when overlay is hidden
                document.body.style.overflow = '';
            }
        });

        // Reposition search panel on window resize
        window.addEventListener('resize', function () {
            if (searchResultsPanel.style.display === 'block') {
                positionSearchPanel();
            }
        });

        // Handle keyboard navigation in search results
        searchBox.addEventListener('keydown', function (event) {
            // If the search term is empty, don't handle arrow keys
            if (this.value.trim() === '') return;

            // Check if we need to show the search results panel
            if ((event.key === 'ArrowDown' || event.key === 'ArrowUp') && searchResultsPanel.style.display !== 'block') {
                // Trigger the input event to show search results
                this.dispatchEvent(new Event('input'));
            }

            const items = document.querySelectorAll('.search-result-item');
            if (items.length === 0) return;

            const currentIndex = Array.from(items).findIndex(item => item.classList.contains('selected'));

            if (event.key === 'ArrowDown') {
                event.preventDefault();
                const nextIndex = currentIndex < 0 ? 0 : (currentIndex + 1) % items.length;
                items.forEach(item => item.classList.remove('selected'));
                items[nextIndex].classList.add('selected');
                items[nextIndex].scrollIntoView({ block: 'nearest' });
            } else if (event.key === 'ArrowUp') {
                event.preventDefault();
                const prevIndex = currentIndex < 0 ? items.length - 1 : (currentIndex - 1 + items.length) % items.length;
                items.forEach(item => item.classList.remove('selected'));
                items[prevIndex].classList.add('selected');
                items[prevIndex].scrollIntoView({ block: 'nearest' });
            } else if (event.key === 'Enter') {
                event.preventDefault();
                if (currentIndex >= 0) {
                    // If an item is already selected, click it
                    items[currentIndex].click();
                } else if (items.length > 0) {
                    // If no item is selected but there are results, click the first one
                    items[0].click();
                }
            } else if (event.key === 'Escape') {
                searchResultsPanel.style.display = 'none';
                searchOverlay.style.display = 'none';
                // Restore body scrolling when overlay is hidden
                document.body.style.overflow = '';
            }
        });
    }

    // Setup search for both search boxes
    setupSearch('nav-searchbox');
    setupSearch('searchbox-2');
});
