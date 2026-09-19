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

// Keep the homepage navigation usable on narrow screens and make every item a real link.
const tabs = document.getElementById('tabs');
if (tabs) {
  const navLinks = {
    home: 'index.html',
    videotab: '#videos',
    shorts: '#shorts',
    'code-area': 'code-editor.html',
    'ai-area': 'Neux_AI.html',
    'myYT-channel': 'https://www.youtube.com/@Math_1.618'
  };
  Object.entries(navLinks).forEach(([id, href]) => {
    const item = document.getElementById(id);
    if (!item || item.querySelector('a')) return;
    const link = document.createElement('a');
    link.href = href;
    link.textContent = item.textContent.trim();
    if (href.startsWith('http')) {
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }
    item.textContent = '';
    item.appendChild(link);
  });

  // Add the calculator to the homepage without disturbing existing cards.
  if (!document.getElementById('omni-calculator-card') && pdfGallery) {
    const card = document.createElement('div');
    card.id = 'omni-calculator-card';
    card.className = 'pdf calculator-card';
    card.dataset.title = 'omni calculator scientific calculator graph latex math';
    card.innerHTML = '<h3 class="vid-title">OmniCalc | Scientific Calculator & Graphs</h3>' +
      '<p>Calculate, graph functions, and render LaTeX beautifully.</p>' +
      '<a class="calculator-link" href="omni-calculator.html">Open OmniCalc →</a>';
    pdfGallery.appendChild(card);
  }
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
