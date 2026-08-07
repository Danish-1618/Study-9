// PWA Service Worker Registration
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
    .then(() => console.log("Service Worker Registered Successfully"))
    .catch((err) => console.log("SW Registration Failed:", err));
}

// 1. Elements select karo
const searchBar = document.getElementById('searchInput');
const videos = document.querySelectorAll('.video');
const pdfs = document.querySelectorAll('.pdf'); // <-- PDF elements select kiye
const videoGallery = document.querySelector('.video-gallery');
const pdfGallery = document.querySelector('.pdf-gallery');

// 2. Results count dikhane ke liye ek NAYA div banao
const resultCount = document.createElement('div');
resultCount.id = 'resultCount';
resultCount.style.textAlign = 'center';
resultCount.style.padding = '15px';
resultCount.style.fontSize = '18px';
resultCount.style.fontWeight = 'bold';
resultCount.style.color = '#064386';

// Is count wale div ko Video gallery ke theek UPAR lagao
videoGallery.parentNode.insertBefore(resultCount, pdfGallery);

// Initially page load par total count dikhao
resultCount.innerHTML = `📚 Total Videos: ${videos.length}`;

// 3. Search Engine Logic (Event Listener)
searchBar.addEventListener('keyup', function(event) {
    let searchQuery = event.target.value.toLowerCase();
    let visibleCount = 0; 
    
    // --- VIDEO SEARCH LOGIC ---
    videos.forEach(function(video) {
        let title = video.getAttribute('data-title').toLowerCase();
        
        if (title.includes(searchQuery)) {
            video.style.display = ""; 
            visibleCount++; 
        } else {
            video.style.display = "none"; 
        }
    });

    // --- PDF SEARCH LOGIC (ADDED) ---
    pdfs.forEach(function(pdf) {
        let title = pdf.getAttribute('data-title').toLowerCase();
        
        if (title.includes(searchQuery)) {
            pdf.style.display = ""; 
            visibleCount++; 
        } else {
            pdf.style.display = "none"; 
        }
    });
    
    // Counter messages bina kisi badlav ke pehle jaisa hi hai
    if (searchQuery === "") {
        resultCount.innerHTML = `📚 Total Videos: ${videos.length}`;
    } else if (visibleCount === 0) {
        resultCount.innerHTML = `<span style="color: red;">❌ Not found result for "${searchQuery}"</span>`;
    } else {
        resultCount.innerHTML = `<span style="color: green;">✅ ${visibleCount} result(s) found for "${searchQuery}"</span>`;
    }
});

// ========================================= 
// VIDEO PLAY FUNCTION (AUTO-PLAY FIXED)
// ========================================= 
function playVideo(frameDiv) {
    let iframe = frameDiv.querySelector('.my-iframe');
    
    if (iframe && !iframe.getAttribute('src')) {
        let videoUrl = iframe.getAttribute('data-src');
        iframe.setAttribute('src', videoUrl);
    }
    
    // Poster aur play button ko hide kar dega taaki video dikhe
    frameDiv.classList.add('hide-poster');
}
