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