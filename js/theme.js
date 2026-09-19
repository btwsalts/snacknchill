document.addEventListener('DOMContentLoaded', () => {
    // Bookmark Toggle Interaction
    const bookmarks = document.querySelectorAll('.card-bookmark');
    bookmarks.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            btn.classList.toggle('active');
            const icon = btn.querySelector('i');
            if(btn.classList.contains('active')) {
                icon.className = 'fas fa-heart';
            } else {
                icon.className = 'far fa-heart';
            }
        });
    });

    // Vibe Pill Filter Interactivity
    const vibePills = document.querySelectorAll('.vibe-pill');
    vibePills.forEach(pill => {
        pill.addEventListener('click', () => {
            vibePills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
        });
    });

    // Emoji Review Button Counter
    const emojiBtns = document.querySelectorAll('.emoji-btn');
    emojiBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const countSpan = btn.querySelector('.count');
            let count = parseFloat(countSpan.innerText.replace('k', '')) * 1000;
            count += 1;
            countSpan.innerText = (count / 1000).toFixed(1) + 'k';
            btn.style.transform = 'scale(1.15)';
            setTimeout(() => btn.style.transform = 'none', 200);
        });
    });
});
