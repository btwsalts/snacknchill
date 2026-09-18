(function(){
    const searchInput = document.getElementById('search-input');
    const searchBtn   = document.getElementById('search-btn');
    const clearBtn    = document.getElementById('clear-search');
    const noResults   = document.getElementById('no-results');
    const resultCount = document.getElementById('result-count');
    const tabAll      = document.getElementById('tab-all');
    const allCount    = document.getElementById('all-count');
    const gridAll     = document.getElementById('grid-all');

    document.getElementById('footer-year').textContent = new Date().getFullYear();

    function getAllCards() {
        return Array.from(document.querySelectorAll('#section-movies .movie-card, #section-tv .movie-card, #section-anime .movie-card'));
    }

    function isMatch(title, query) {
        if (!query) return true;
        title = title.toLowerCase();
        query = query.toLowerCase().trim();
        if (title.includes(query)) return true;
        const qWords = query.split(/\s+/).filter(w => w.length > 1);
        if (qWords.length === 0) return title.includes(query);
        return qWords.every(w => title.includes(w)) || qWords.some(w => title.includes(w) && w.length > 2);
    }

    function showTabs(mode) {
        document.querySelectorAll('.tab-btn').forEach(b => {
            if (b.dataset.tab === 'all') b.style.display = mode === 'search' ? 'inline-flex' : 'none';
        });
    }

    function activateSection(id) {
        document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        const sec = document.getElementById('section-' + id);
        if (sec) sec.classList.add('active');
        const btn = document.querySelector('.tab-btn[data-tab="' + id + '"]');
        if (btn) btn.classList.add('active');
    }

    function runSearch(q) {
        q = (q || '').trim();
        clearBtn.style.display = q ? 'block' : 'none';

        if (/^\d+$/.test(q)) {
            openPlayer(q, 'TMDB #' + q, 'movie', 0);
            return;
        }

        if (!q) {
            showTabs('browse');
            activateSection('movies');
            getAllCards().forEach(c => c.classList.remove('hidden'));
            gridAll.innerHTML = '';
            noResults.style.display = 'none';
            resultCount.textContent = getAllCards().length + ' titles';
            return;
        }

        const all = getAllCards();
        const matches = [];
        all.forEach(card => {
            const title = card.dataset.title || '';
            const tmdb  = card.dataset.tmdb || '';
            if (isMatch(title, q) || tmdb === q) matches.push(card);
        });

        showTabs('search');
        activateSection('all');
        tabAll.classList.add('active');
        gridAll.innerHTML = '';

        if (matches.length === 0) {
            noResults.style.display = 'block';
            allCount.textContent = '0';
            resultCount.textContent = '0 results';
        } else {
            noResults.style.display = 'none';
            allCount.textContent = matches.length;
            resultCount.textContent = matches.length + ' result' + (matches.length > 1 ? 's' : '');
            matches.forEach(card => {
                const clone = card.cloneNode(true);
                clone.classList.remove('hidden');
                clone.addEventListener('click', function() {
                    openPlayer(this.dataset.tmdb, this.dataset.display, this.dataset.type, this.dataset.seasons);
                });
                gridAll.appendChild(clone);
            });
        }
    }

    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.dataset.tab === 'all') { activateSection('all'); return; }
            searchInput.value = '';
            clearBtn.style.display = 'none';
            showTabs('browse');
            activateSection(btn.dataset.tab);
            getAllCards().forEach(c => c.classList.remove('hidden'));
            gridAll.innerHTML = '';
            noResults.style.display = 'none';
            resultCount.textContent = getAllCards().length + ' titles';
        });
    });

    searchInput.addEventListener('input', () => runSearch(searchInput.value));
    searchBtn.addEventListener('click', () => runSearch(searchInput.value));
    clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        runSearch('');
        searchInput.focus();
    });
    searchInput.addEventListener('keydown', e => { if (e.key === 'Enter') runSearch(searchInput.value); });

    const modal = document.getElementById('player-modal');
    const modalTitle = document.getElementById('modal-movie-title');
    const playerContainer = document.getElementById('player-container');
    const episodeSidebar = document.getElementById('episode-sidebar');
    const seasonSelect = document.getElementById('season-select');
    const epList = document.getElementById('ep-list');
    const toggleEpBtn = document.getElementById('toggle-episodes');
    const closeBtn = document.getElementById('close-modal');

    let currentTmdb = null, currentType = 'movie', currentSeason = 1, currentEpisode = 1, maxSeasons = 1;

    function buildSrc(tmdb, type, season, episode) {
        if (type === 'tv') return `https://framextv.tech/embed/${tmdb}/${season}/${episode}?autoplay=1&muted=0&server=auto&controls=1`;
        return `https://framextv.tech/embed/${tmdb}?autoplay=1&muted=0&server=auto&controls=1`;
    }

    function loadIframe(src) {
        playerContainer.innerHTML = `<iframe src="${src}" allow="autoplay; fullscreen; encrypted-media; picture-in-picture" allowfullscreen frameborder="0" scrolling="no"></iframe>`;
    }

    function renderEpisodes(season) {
        currentSeason = season;
        epList.innerHTML = '';
        for (let i = 1; i <= 24; i++) {
            const btn = document.createElement('button');
            btn.className = 'ep-item' + (i === currentEpisode ? ' active' : '');
            btn.textContent = 'Episode ' + i;
            btn.addEventListener('click', () => {
                currentEpisode = i;
                document.querySelectorAll('.ep-item').forEach(e => e.classList.remove('active'));
                btn.classList.add('active');
                loadIframe(buildSrc(currentTmdb, 'tv', currentSeason, currentEpisode));
            });
            epList.appendChild(btn);
        }
    }

    function openPlayer(tmdb, title, type, seasons) {
        currentTmdb = tmdb; currentType = type; currentSeason = 1; currentEpisode = 1;
        maxSeasons = Math.max(1, parseInt(seasons, 10) || 1);
        modalTitle.textContent = title;

        if (type === 'tv') {
            episodeSidebar.classList.add('visible');
            toggleEpBtn.style.display = 'inline-block';
            toggleEpBtn.classList.add('active');
            seasonSelect.innerHTML = '';
            for (let s = 1; s <= maxSeasons; s++) {
                const opt = document.createElement('option');
                opt.value = s; opt.textContent = 'Season ' + s;
                seasonSelect.appendChild(opt);
            }
            seasonSelect.onchange = function() {
                currentEpisode = 1;
                renderEpisodes(parseInt(this.value, 10));
                loadIframe(buildSrc(currentTmdb, 'tv', currentSeason, currentEpisode));
            };
            renderEpisodes(1);
            loadIframe(buildSrc(tmdb, 'tv', 1, 1));
        } else {
            episodeSidebar.classList.remove('visible');
            toggleEpBtn.style.display = 'none';
            loadIframe(buildSrc(tmdb, 'movie', 1, 1));
        }
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    toggleEpBtn.addEventListener('click', () => {
        episodeSidebar.classList.toggle('visible');
        toggleEpBtn.classList.toggle('active');
    });

    document.querySelectorAll('.movie-card').forEach(card => {
        card.addEventListener('click', function() {
            openPlayer(this.dataset.tmdb, this.dataset.display, this.dataset.type, this.dataset.seasons);
        });
    });

    function closeModal() {
        modal.classList.remove('active');
        playerContainer.innerHTML = '';
        document.body.style.overflow = '';
    }
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
})();