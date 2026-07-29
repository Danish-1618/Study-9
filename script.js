// 1. Elements select karo
const searchBar = document.getElementById('searchInput');
const videos = document.querySelectorAll('.video');
const videoGallery = document.querySelector('.video-gallery');

// 2. Results count dikhane ke liye ek NAYA div banao
const resultCount = document.createElement('div');
resultCount.id = 'resultCount';
resultCount.style.textAlign = 'center';
resultCount.style.padding = '15px';
resultCount.style.fontSize = '18px';
resultCount.style.fontWeight = 'bold';
resultCount.style.color = '#064386';

// Is count wale div ko Video gallery ke theek UPAR lagao
videoGallery.parentNode.insertBefore(resultCount, videoGallery);

// Initially page load par total count dikhao
resultCount.innerHTML = `📚 Total Videos: ${videos.length}`;

// 3. Search Engine Logic (Event Listener)
searchBar.addEventListener('keyup', function(event) {
    let searchQuery = event.target.value.toLowerCase();
    let visibleCount = 0; 
    
    videos.forEach(function(video) {
        let title = video.getAttribute('data-title').toLowerCase();
        
        if (title.includes(searchQuery)) {
            video.style.display = ""; 
            visibleCount++; 
        } else {
            video.style.display = "none"; 
        }
    });
    
    if (searchQuery === "") {
        resultCount.innerHTML = `📚 Total Videos: ${videos.length}`;
    } else if (visibleCount === 0) {
        resultCount.innerHTML = `<span style="color: red;">❌ Koi video nahi mila "${searchQuery}" ke liye</span>`;
    } else {
        resultCount.innerHTML = `<span style="color: green;">✅ ${visibleCount} video(s) found for "${searchQuery}"</span>`;
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
