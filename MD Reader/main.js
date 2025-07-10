document.addEventListener('DOMContentLoaded', () => {
    // --- RIFERIMENTI DOM ---
    const body = document.body;
    const fileListEl = document.getElementById('file-list');
    const contentArea = document.getElementById('content-area');
    const tocSelector = document.getElementById('toc-selector');
    const tocList = document.getElementById('toc-list');
    const fileInput = document.getElementById('file-input');
    const clearSessionBtn = document.getElementById('clear-session');
    const themeToggle = document.getElementById('theme-toggle');
    const dropZone = document.getElementById('drop-zone');
    const searchInput = document.getElementById('search-input');
    const searchCount = document.getElementById('search-count');
    const searchPrev = document.getElementById('search-prev');
    const searchNext = document.getElementById('search-next');
    const exportBtn = document.getElementById('export-html');
    const printBtn = document.getElementById('print-page');
    const sidebarToggleBtn = document.getElementById('sidebar-toggle');
    const mainContent = document.getElementById('main-content');

    // --- STATO APPLICAZIONE ---
    let fileData = []; // Unica fonte di verità: { id, name, content, originalRenderedHTML }
    let searchResults = [];
    let currentMatchIndex = -1;

    // --- FUNZIONE MASTER DI REDRAW ---
    function redrawUI() {
        const selectedFileId = tocSelector.options[tocSelector.selectedIndex]?.dataset.fileId;

        // 1. Ricrea/Aggiorna i container DOM e li aggiunge a contentArea
        contentArea.innerHTML = ''; // Pulisce l'area dei contenuti
        fileListEl.innerHTML = ''; // Pulisce la lista dei file nella sidebar
        tocSelector.innerHTML = ''; // Pulisce il selettore ToC
        tocList.innerHTML = ''; // Pulisce la ToC

        fileData.forEach((data, index) => {
            // Ricrea il container DOM per ogni fileData entry
            const container = document.createElement('div');
            container.className = 'file-container';
            container.id = data.id;

            const headerMain = document.createElement('div');
            headerMain.className = 'file-header-main';
            headerMain.innerHTML = `<span class="toggle-icon">&#9660;</span><h2>${data.name}</h2>`;
            headerMain.addEventListener('click', () => container.classList.toggle('collapsed'));

            const closeBtn = document.createElement('button');
            closeBtn.className = 'close-file-btn';
            closeBtn.innerHTML = '&times;';
            closeBtn.title = 'Rimuovi file';
            closeBtn.addEventListener('click', e => { e.stopPropagation(); removeFile(data.id); });

            const fileHeader = document.createElement('div');
            fileHeader.className = 'file-header';
            fileHeader.append(headerMain, closeBtn);

            const renderedContent = document.createElement('div');
            renderedContent.className = 'rendered-content';
            renderedContent.innerHTML = data.originalRenderedHTML; // Usa l'HTML originale memorizzato
            enhanceCodeBlocks(renderedContent);

            container.append(fileHeader, renderedContent);
            contentArea.appendChild(container); // Aggiunge il container all'area principale

            // Aggiorna la lista dei file nella sidebar
            const li = document.createElement('li');
            li.dataset.fileId = data.id;
            li.textContent = data.name;
            li.draggable = true;
            fileListEl.appendChild(li);

            // Aggiorna il selettore ToC
            const option = document.createElement('option');
            option.value = index;
            option.textContent = data.name;
            option.dataset.fileId = data.id;
            tocSelector.appendChild(option);
        });

        // 2. ToC
        if (fileData.length > 0) {
            const newIndex = fileData.findIndex(f => f.id === selectedFileId);
            tocSelector.value = newIndex !== -1 ? newIndex : 0;
            generateToc(parseInt(tocSelector.value, 10));
        } else {
            tocList.innerHTML = '';
        }

        saveFilesToStorage();
        handleSearch(); // Mantiene l'evidenziazione della ricerca
    }

    function generateToc(fileIndex) {
        tocList.innerHTML = '';
        if (fileIndex < 0 || fileIndex >= fileData.length) return;
        const data = fileData[fileIndex];
        if (!data) return;

        // Dobbiamo ottenere i headers dal container DOM che è stato ricreato in redrawUI
        const currentFileContainer = document.getElementById(data.id);
        if (!currentFileContainer) return; // Dovrebbe esistere a questo punto

        const headers = currentFileContainer.querySelectorAll('h1, h2, h3, h4');
        headers.forEach((header, i) => {
            const id = `header-${data.id}-${i}`;
            header.id = id;
            const a = document.createElement('a');
            a.href = `#${id}`;
            a.textContent = header.textContent;
            a.addEventListener('click', e => {
                e.preventDefault();
                header.scrollIntoView({ behavior: 'smooth', block: 'center' });
            });
            const li = document.createElement('li');
            li.appendChild(a);
            tocList.appendChild(li);
        });
    }

    // --- GESTIONE DATI ---
    function handleFiles(files) {
        resetState(false); // Non chiamare redrawUI qui, sarà chiamata alla fine
        const fileArray = Array.from(files).sort((a, b) => a.name.localeCompare(b.name));
        if (fileArray.length === 0) return;
        let processedCount = 0;
        fileArray.forEach(file => {
            if (file.name.endsWith('.md') || file.name.endsWith('.markdown')) {
                const reader = new FileReader();
                reader.onload = e => {
                    addFileToData(file.name, e.target.result);
                    processedCount++;
                    if (processedCount === fileArray.length) {
                        redrawUI();
                    }
                };
                reader.readAsText(file);
            }
        });
    }

    function addFileToData(name, content, id = `file-${Date.now()}-${Math.random()}`, originalRenderedHTML = null) {
        // Se originalRenderedHTML non è fornito (nuovo file), lo genera
        if (originalRenderedHTML === null) {
            originalRenderedHTML = marked.parse(content);
        }
        // Aggiunge solo i dati serializzabili a fileData
        fileData.push({ id, name, content, originalRenderedHTML });
    }

    function removeFile(fileId) {
        fileData = fileData.filter(f => f.id !== fileId);
        redrawUI();
    }

    function resetState(shouldRedraw = true) {
        fileData = [];
        searchResults = [];
        currentMatchIndex = -1;
        searchInput.value = '';
        searchCount.textContent = '';
        if (shouldRedraw) {
            redrawUI(); // Chiamata a redrawUI per pulire l'interfaccia
        }
    }

    // --- GESTIONE RIORDINO ---
    fileListEl.addEventListener('dragstart', e => e.target.classList.add('dragging'));
    fileListEl.addEventListener('dragend', e => e.target.classList.remove('dragging'));
    fileListEl.addEventListener('dragover', e => {
        e.preventDefault();
        const afterElement = getDragAfterElement(fileListEl, e.clientY);
        const dragging = document.querySelector('.dragging');
        if (dragging) {
            if (afterElement == null) fileListEl.appendChild(dragging);
            else fileListEl.insertBefore(dragging, afterElement);
        }
    });
    fileListEl.addEventListener('drop', () => {
        const newOrderedIds = [...fileListEl.querySelectorAll('li')].map(li => li.dataset.fileId);
        fileData.sort((a, b) => newOrderedIds.indexOf(a.id) - newOrderedIds.indexOf(b.id));
        redrawUI();
    });
    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('li:not(.dragging)')];
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) return { offset: offset, element: child };
            else return closest;
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

    // --- FUNZIONALITÀ VARIE ---
    function enhanceCodeBlocks(container) { container.querySelectorAll('pre').forEach(pre => { const code = pre.querySelector('code'); if (code) hljs.highlightElement(code); const copyButton = document.createElement('button'); copyButton.className = 'copy-btn'; copyButton.textContent = 'Copia'; pre.appendChild(copyButton); copyButton.addEventListener('click', () => { navigator.clipboard.writeText(code ? code.innerText : pre.innerText).then(() => { copyButton.textContent = 'Copiato!'; setTimeout(() => { copyButton.textContent = 'Copia'; }, 2000); }); }); }); }
    function applyTheme(theme) { body.className = theme; themeToggle.checked = theme === 'light-mode'; document.getElementById('hljs-theme-dark').disabled = theme === 'light-mode'; document.getElementById('hljs-theme-light').disabled = theme === 'dark-mode'; localStorage.setItem('theme', theme); }
    
    function handleSearch() {
        const query = searchInput.value.trim();
        searchResults = [];
        currentMatchIndex = -1;

        // Ripristina il contenuto originale renderizzato per tutti i file prima di una nuova ricerca
        fileData.forEach(data => {
            const contentDiv = document.getElementById(data.id).querySelector('.rendered-content');
            contentDiv.innerHTML = data.originalRenderedHTML; // Usa l'HTML originale
            enhanceCodeBlocks(contentDiv); // Riapplica l'highlighting del codice
        });

        if (query.length < 2) {
            searchCount.textContent = '';
            return;
        }

        const regex = new RegExp(`(${query})`, 'gi');

        fileData.forEach(data => {
            const contentDiv = document.getElementById(data.id).querySelector('.rendered-content');
            let hasMatchInFile = false;

            // Utilizza un TreeWalker per attraversare i nodi di testo
            const walker = document.createTreeWalker(
                contentDiv,
                NodeFilter.SHOW_TEXT,
                {
                    acceptNode: function(node) {
                        // Rifiuta nodi di testo all'interno di PRE, CODE, SCRIPT, STYLE, e MARK già esistenti
                        if (node.parentNode.closest('pre, code, script, style, mark')) {
                            return NodeFilter.FILTER_REJECT;
                        }
                        return NodeFilter.FILTER_ACCEPT;
                    }
                },
                false
            );

            const nodesToReplace = [];
            let node;
            while ((node = walker.nextNode())) {
                if (node.nodeValue.match(regex)) {
                    hasMatchInFile = true;
                    nodesToReplace.push({ node: node, replacementHTML: node.nodeValue.replace(regex, `<mark class="search-highlight">$1</mark>`) });
                }
            }

            // Esegui le sostituzioni dopo aver completato la traversata
            nodesToReplace.forEach(({ node, replacementHTML }) => {
                const tempSpan = document.createElement('span'); // Usa span per non alterare il layout
                tempSpan.innerHTML = replacementHTML;
                while (tempSpan.firstChild) {
                    node.parentNode.insertBefore(tempSpan.firstChild, node);
                }
                node.parentNode.removeChild(node);
            });

            if (hasMatchInFile) {
                data.container.classList.remove('collapsed');
            }
        });

        searchResults = contentArea.querySelectorAll('mark.search-highlight');
        updateSearchCount();
        if (searchResults.length > 0) {
            currentMatchIndex = 0;
            navigateToCurrentMatch();
        }
    }

    function navigateToCurrentMatch() { searchResults.forEach((mark, index) => mark.classList.toggle('current-match', index === currentMatchIndex)); const currentMark = searchResults[currentMatchIndex]; if (currentMark) currentMark.scrollIntoView({ behavior: 'smooth', block: 'center' }); updateSearchCount(); }
    function updateSearchCount() { if (searchResults.length > 0) searchCount.textContent = `${currentMatchIndex + 1} di ${searchResults.length}`; else if (searchInput.value.length > 1) searchCount.textContent = '0 trovate'; else searchCount.textContent = ''; }
    
    // Rifattorizzata per restituire la stringa HTML
    function getExportHtmlContent() {
        if (fileData.length === 0) {
            return null;
        }

        const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
        const hljsThemeUrl = currentTheme === 'dark' 
            ? 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css' 
            : 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css';

        // Clona il contenuto per non modificare la pagina attuale
        const tempContentArea = document.createElement('div');
        fileData.forEach(data => {
            const clonedContainer = document.createElement('div');
            clonedContainer.className = 'file-container';
            clonedContainer.innerHTML = `
                <div class="file-header">
                    <div class="file-header-main">
                        <h2>${data.name}</h2>
                    </div>
                </div>
                <div class="rendered-content">${data.originalRenderedHTML}</div>
            `;
            // Assicura che i file collassati siano espansi nell'export
            clonedContainer.classList.remove('collapsed');
            tempContentArea.appendChild(clonedContainer);
        });

        const exportContent = tempContentArea.innerHTML;

        // Stili CSS per l'esportazione/stampa
        const exportStyles = `
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; max-width: 800px; margin: 40px auto; padding: 20px; color: ${currentTheme === 'dark' ? '#c9d1d9' : '#24292e'}; background-color: ${currentTheme === 'dark' ? '#0d1117' : '#f9f9f9'}; }
            .file-container { border: 1px solid ${currentTheme === 'dark' ? '#30363d' : '#e1e4e8'}; border-radius: 6px; margin-bottom: 30px; background-color: ${currentTheme === 'dark' ? '#161b22' : '#ffffff'}; }
            .file-header { padding: 15px 20px; border-bottom: 1px solid ${currentTheme === 'dark' ? '#30363d' : '#e1e4e8'}; background-color: ${currentTheme === 'dark' ? '#1a1f27' : '#f6f8fa'}; }
            .file-header h2 { margin: 0; font-size: 1.5em; color: ${currentTheme === 'dark' ? '#58a6ff' : '#0366d6'}; }
            .rendered-content { padding: 20px; }
            pre { background-color: ${currentTheme === 'dark' ? '#161b22' : '#f6f8fa'}; border-radius: 3px; padding: 16px; overflow: auto; }
            table { border-collapse: collapse; width: 100%; } th, td { border: 1px solid ${currentTheme === 'dark' ? '#30363d' : '#e1e4e8'}; padding: 8px; } th { font-weight: 600; background-color: ${currentTheme === 'dark' ? '#1a1f27' : '#f6f8fa'}; }
            blockquote { border-left: .25em solid ${currentTheme === 'dark' ? '#30363d' : '#dfe2e5'}; padding: 0 1em; color: ${currentTheme === 'dark' ? '#8b949e' : '#6a737d'}; }
            code:not(pre code) { background-color: ${currentTheme === 'dark' ? '#282c34' : '#f0f0f0'}; padding: .2em .4em; border-radius: 3px; }
            h1, h2, h3, h4, h5, h6 { border-bottom: 1px solid ${currentTheme === 'dark' ? '#30363d' : '#eaecef'}; padding-bottom: .3em; }
            a { color: ${currentTheme === 'dark' ? '#58a6ff' : '#0366d6'}; }
            hr { border-color: ${currentTheme === 'dark' ? '#30363d' : '#eaecef'}; }
            
            /* Stili specifici per la stampa */
            @media print {
                body { margin: 0; border: none; }
                .file-container { border: none; box-shadow: none; page-break-before: always; }
                .file-container:first-child { page-break-before: auto; }
                .file-header { background-color: transparent; padding-left: 0; border-bottom: none; }
                .file-header h2 { color: #000 !important; }
                a { color: #000 !important; text-decoration: underline; }
                pre { border: 1px solid #ccc; background-color: #f8f8f8 !important; }
            }
        `;

        return `
            <!DOCTYPE html>
            <html lang="it">
            <head>
                <meta charset="UTF-8">
                <title>Esportazione Markdown</title>
                <link rel="stylesheet" href="${hljsThemeUrl}">
                <style>${exportStyles}</style>
            </head>
            <body>
                ${exportContent}
            </body>
            </html>
        `;
    }

    function downloadHtml() {
        const htmlContent = getExportHtmlContent();
        if (!htmlContent) {
            alert('Nessun file da esportare.');
            return;
        }
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'esportazione-markdown.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    function printCurrentView() {
        const htmlContent = getExportHtmlContent();
        if (!htmlContent) {
            alert('Nessun file da stampare.');
            return;
        }

        const printIframe = document.createElement('iframe');
        printIframe.style.display = 'none';
        document.body.appendChild(printIframe);

        printIframe.contentDocument.open();
        printIframe.contentDocument.write(htmlContent);
        printIframe.contentDocument.close();

        printIframe.onload = () => {
            printIframe.contentWindow.focus();
            printIframe.contentWindow.print();
            document.body.removeChild(printIframe);
        };
    }

    // --- LOCAL STORAGE ---
    function saveFilesToStorage() { 
        console.log('saveFilesToStorage: Inizio');
        const filesToSave = fileData.map(data => ({ id: data.id, name: data.name, content: data.content, originalRenderedHTML: data.originalRenderedHTML })); 
        localStorage.setItem('markdown_files', JSON.stringify(filesToSave)); 
        console.log('saveFilesToStorage: Dati salvati', filesToSave);
    }
    function loadFilesFromStorage() { 
        console.log('loadFilesFromStorage: Inizio');
        const storedFiles = localStorage.getItem('markdown_files'); 
        if (storedFiles) { 
            console.log('loadFilesFromStorage: Dati trovati', storedFiles);
            const files = JSON.parse(storedFiles); 
            if (files.length > 0) { 
                console.log('loadFilesFromStorage: File deserializzati', files);
                fileData = []; // Svuota fileData direttamente
                files.forEach(file => {
                    // addFileToData ora aggiunge solo i dati serializzabili
                    // e non crea il container DOM. Il container verrà creato in redrawUI.
                    const id = file.id || `file-${Date.now()}-${Math.random()}`; // Assicura un ID
                    fileData.push({ id: id, name: file.name, content: file.content, originalRenderedHTML: file.originalRenderedHTML });
                });
                redrawUI(); // Chiamata a redrawUI dopo che tutti i dati sono stati aggiunti
                console.log('loadFilesFromStorage: Dati caricati e UI ridisegnata');
            } else {
                console.log('loadFilesFromStorage: Nessun file nel localStorage');
            }
        } else {
            console.log('loadFilesFromStorage: Nessun dato trovato in localStorage');
        }
    }

    // --- INIZIALIZZAZIONE LISTENER ---
    fileInput.addEventListener('change', e => handleFiles(e.target.files));
    clearSessionBtn.addEventListener('click', () => { 
        console.log('Pulisci Sessione: Click');
        localStorage.removeItem('markdown_files'); 
        resetState(); 
        console.log('Pulisci Sessione: Completato');
    });
    tocSelector.addEventListener('change', () => generateToc(parseInt(tocSelector.value, 10)));
    themeToggle.addEventListener('change', () => applyTheme(themeToggle.checked ? 'light-mode' : 'dark-mode'));
    
    // CORREZIONE: Listener Drag&Drop globali per prevenire il comportamento del browser
    document.addEventListener('dragover', e => { e.preventDefault(); });
    document.addEventListener('drop', e => { e.preventDefault(); });

    // Listener per mostrare/nascondere la dropZone
    document.body.addEventListener('dragenter', e => {
        e.preventDefault();
        dropZone.classList.add('visible');
    });
    document.body.addEventListener('dragleave', e => {
        e.preventDefault();
        // Controlla se il dragleave è effettivo o solo un passaggio su un figlio
        if (!e.relatedTarget || !e.relatedTarget.closest('html')) {
            dropZone.classList.remove('visible');
        }
    });

    // Listener specifico per la dropZone per gestire il drop dei file
    dropZone.addEventListener('drop', e => {
        e.preventDefault();
        e.stopPropagation(); // Ferma la propagazione per evitare conflitti
        dropZone.classList.remove('visible');
        handleFiles(e.dataTransfer.files);
    });

    searchInput.addEventListener('input', handleSearch);
    searchPrev.addEventListener('click', () => { if (searchResults.length > 0) { currentMatchIndex = (currentMatchIndex - 1 + searchResults.length) % searchResults.length; navigateToCurrentMatch(); } });
    searchNext.addEventListener('click', () => { if (searchResults.length > 0) { currentMatchIndex = (currentMatchIndex + 1) % searchResults.length; navigateToCurrentMatch(); } });
    printBtn.addEventListener('click', printCurrentView);
    exportBtn.addEventListener('click', downloadHtml);

    // NUOVO: Gestione sidebar collassabile
    sidebarToggleBtn.addEventListener('click', () => {
        const isCollapsed = body.classList.toggle('sidebar-collapsed');
        localStorage.setItem('sidebar_collapsed', isCollapsed);
    });

    // --- AVVIO ---
    function initialize() {
        applyTheme(localStorage.getItem('theme') || 'dark-mode');
        if (localStorage.getItem('sidebar_collapsed') === 'true') {
            body.classList.add('sidebar-collapsed');
        }
        loadFilesFromStorage();
    }

    initialize();
});
