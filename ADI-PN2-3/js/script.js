document.addEventListener("DOMContentLoaded", () => {
    // Reproduce el video de YouTube al cargar la página
    let youtubeIframe = document.createElement('iframe');
    youtubeIframe.width = "560";
    youtubeIframe.height = "315";
    youtubeIframe.src = "https://www.youtube.com/embed/HBPZfoB74PI?autoplay=1";
    youtubeIframe.frameBorder = "0";
    youtubeIframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    youtubeIframe.allowFullscreen = true;
    document.getElementById('youtube-video').appendChild(youtubeIframe);
    
    const links = document.querySelectorAll('.link');
    const buttons = document.querySelectorAll('.submit-button');
    const mediaElements = document.querySelectorAll('.media-element');

    const toast = document.getElementById('toast');

    function showToast(message) {
        toast.textContent = message;
        toast.className = "toast show";
        setTimeout(() => {
            toast.className = toast.className.replace("show", "");
        }, 3000);
    }

    function updateNetworkStatus() {
        if (navigator.onLine) {
            // Conexión restaurada
            links.forEach(link => link.classList.remove('disabled'));
            buttons.forEach(button => button.disabled = false);
            mediaElements.forEach(element => {
                if (element.tagName === 'AUDIO' || element.tagName === 'VIDEO') {
                    element.play();
                }
            });
            showToast("Conexión restaurada");
        } else {
            // Conexión perdida
            links.forEach(link => link.classList.add('disabled'));
            buttons.forEach(button => button.disabled = true);
            mediaElements.forEach(element => {
                if (element.tagName === 'AUDIO' || element.tagName === 'VIDEO') {
                    element.pause();
                }
            });
            showToast("Conexión perdida");
        }
    }

    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);

    updateNetworkStatus(); // Check initial status
});

