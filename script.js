// 1. Search bar aur saari videos ko select karo
const searchBar = document.getElementById('searchInput');
const videos = document.querySelectorAll('.video');

// 2. Results count dikhane ke liye ek div banao
const resultCount = document.createElement('div');
resultCount.id = 'resultCount';
resultCount.style.textAlign = 'center';
resultCount.style.padding = '20px';
resultCount.style.fontSize = '18px';
resultCount.style.color = '#064386';
resultCount.style.fontWeight = 'bold';
resultCount.style.backgroundColor = '#F6F7F8';
resultCount.style.margin = '10px 0';

// Video gallery ke BAAD insert karo (important!)
const videoGallery = document.querySelector('.video-gallery');
videoGallery.insertAdjacentElement('afterend', resultCount);

// 3. Jab bhi search ho, ye function chalega
searchBar.addEventListener('keyup', function(event) {
    
    let searchQuery = event.target.value.toLowerCase();
    let visibleCount = 0;
    
    // 4. Har ek video ko check karo
    videos.forEach(function(video) {
        let title = video.getAttribute('data-title').toLowerCase();
        
        if (searchQuery === "" || title.includes(searchQuery)) {
            video.style.display = ""; 
            if (searchQuery !== "") visibleCount++;
        } else {
            video.style.display = "none";
        }
    });
    
    // 5. Results display karo
    if (searchQuery === "") {
        resultCount.innerHTML = `<p>📚 Total Videos: ${videos.length}</p>`;
    } else if (visibleCount === 0) {
        resultCount.innerHTML = `<p style="color: red; font-size: 18px;">❌ Koi video nahi mila "${searchQuery}" ke liye</p>`;
    } else {
        resultCount.innerHTML = `<p style="color: green;">✅ ${visibleCount} video(s) found for "${searchQuery}"</p>`;
    }
});

// 6. Initially total count dikhao
resultCount.innerHTML = `<p>📚 Total Videos: ${videos.length}</p>`;
// 1. Search bar aur saari videos ko select karo
const searchBar = document.getElementById('searchInput');
const videos = document.querySelectorAll('.video');

// 2. Jab bhi koi search bar me kuch type karega, ye function chalega
searchBar.addEventListener('keyup', function(event) {
    
    // User ne jo type kiya use chote aksharon (lowercase) me badal do
    let searchQuery = event.target.value.toLowerCase();

    // 3. Har ek video ko check karo
    videos.forEach(function(video) {
        
        // Video ka title nikalo (jo humne data-title me likha tha)
        let title = video.getAttribute('data-title').toLowerCase();

        // Agar user ka search kiya hua word title me hai, to video dikhao, warna chupaa do
        if (title.includes(searchQuery)) {
            video.style.display = ""; // Dikhane ke liye
        } else {
            video.style.display = "none"; // Chupaane ke liye
        }
    });
});

