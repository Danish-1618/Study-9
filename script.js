if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
    .then((reg) => console.log("Service Worker Registered!", reg))
    .catch((err) => console.log("SW Registration Failed:", err));
}

const searchBar = document.getElementById('searchInput');
const videos = document.querySelectorAll('.video');
const pdfs = document.querySelectorAll('.pdf');
const videoGallery = document.querySelector('.video-gallery');
const pdfGallery = document.querySelector('.pdf-gallery');

const tabs = document.getElementById('tabs');
if (tabs) {
  const navigation = [
    ['home', 'Home', 'index.html'],
    ['videotab', 'Videos', '#videos'],
    ['shorts', 'Shorts', '#shorts'],
    ['calculator-tab', 'Omni Calc', 'omni-calculator.html'],
    ['code-area', 'Code Lab', 'code-editor.html'],
    ['ai-area', 'Ask AI', 'Neux_AI.html'],
    ['myYT-channel', 'My Channel', 'https://www.youtube.com/@Math_1.618']
  ];

  // Rebuild the nav in the requested order so Omni Calc sits between Shorts and Code Lab.
  tabs.replaceChildren();
  navigation.forEach(([id, label, href]) => {
    const item = document.createElement('div');
    item.className = 'list';
    item.id = id;
    item.dataset.title = label.toLowerCase().replace(/\s+/g, '-');

    const link = document.createElement('a');
    link.href = href;
    link.textContent = label;
    if (href.startsWith('http')) {
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }
    item.appendChild(link);
    tabs.appendChild(item);
  });

  // Horizontal scrolling keeps every navigation item reachable on phone screens.
  const navStyle = document.createElement('style');
  navStyle.textContent = `
    #tags { overflow: hidden; }
    #tags #tabs { width: 100%; justify-content: flex-start; gap: 0; overflow-x: auto; overflow-y: hidden; flex-wrap: nowrap; scrollbar-width: thin; -webkit-overflow-scrolling: touch; touch-action: pan-x; }
    #tags #tabs::-webkit-scrollbar { height: 6px; }
    #tags #tabs::-webkit-scrollbar-thumb { background: #8aaed0; border-radius: 20px; }
    #tags #tabs .list { flex: 0 0 auto; white-space: nowrap; padding: 8px 14px; }
    #tags #tabs a { color: inherit; text-decoration: none; display: block; }
    @media (max-width: 600px) { #tags #tabs { justify-content: flex-start; } #tags #tabs .list { padding: 9px 15px; } }
  `;
  document.head.appendChild(navStyle);
}

const resultCount = document.createElement('div');
resultCount.id = 'resultCount';
resultCount.style.textAlign = 'center';
resultCount.style.padding = '15px';
resultCount.style.fontSize = '18px';
resultCount.style.fontWeight = 'bold';
resultCount.style.color = '#064386';
if (videoGallery && pdfGallery) videoGallery.parentNode.insertBefore(resultCount, pdfGallery);

function updateResultCount(query, visibleCount) {
  if (query === '') resultCount.innerHTML = `📚 Total resources: ${videos.length + pdfs.length}`;
  else if (visibleCount === 0) resultCount.innerHTML = `<span style="color:red;">❌ No result found for "${query}"</span>`;
  else resultCount.innerHTML = `<span style="color:green;">✅ ${visibleCount} result(s) found for "${query}"</span>`;
}

updateResultCount('', videos.length + pdfs.length);
if (searchBar) searchBar.addEventListener('input', function(event) {
  const searchQuery = event.target.value.toLowerCase().trim();
  let visibleCount = 0;
  [...videos, ...pdfs].forEach((item) => {
    const title = (item.getAttribute('data-title') || '').toLowerCase();
    const visible = title.includes(searchQuery);
    item.style.display = visible ? '' : 'none';
    if (visible) visibleCount++;
  });
  updateResultCount(searchQuery, visibleCount);
});

function playVideo(frameDiv) {
  const iframe = frameDiv.querySelector('.my-iframe');
  if (iframe && !iframe.getAttribute('src')) iframe.setAttribute('src', iframe.getAttribute('data-src'));
  frameDiv.classList.add('hide-poster');
}
