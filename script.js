// 1. Elements select karo (Strictly Sirf EK BAAR declare karna hai!)
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
    
    // User input ko lower case me badlo (taaki case-sensitive na rahe)
    let searchQuery = event.target.value.toLowerCase();
    
    // Naya variable: Dikhne wale videos count karne ke liye
    let visibleCount = 0; 
    
    // 4. Har ek video ko loop karke check karo
    videos.forEach(function(video) {
        let title = video.getAttribute('data-title').toLowerCase();
        
        // Agar title me search query hai, toh dikhao aur count badhao
        if (title.includes(searchQuery)) {
            video.style.display = ""; 
            visibleCount++; // Increment operator (visibleCount = visibleCount + 1)
        } else {
            video.style.display = "none"; // Match nahi kiya toh chhupa do
        }
    });
    
    // 5. Results Display Logic (Conditions)
    if (searchQuery === "") {
        // Agar search bar khali hai
        resultCount.innerHTML = `📚 Total Videos: ${videos.length}`;
    } else if (visibleCount === 0) {
        // Agar count 0 hai (Empty Set)
        resultCount.innerHTML = `<span style="color: red;">❌ No - result found "${searchQuery}" ke liye</span>`;
    } else {
        // Agar videos mil gaye
        resultCount.innerHTML = `<span style="color: green;">✅ ${visibleCount} video(s) found for "${searchQuery}"</span>`;
    }
});
