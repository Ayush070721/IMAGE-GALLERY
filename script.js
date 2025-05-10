document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const modal = document.getElementById('myModal');
    const modalImage = document.getElementById('modalImage');
    const captionText = document.getElementById('caption');
    const closeButton = document.querySelector('.close-button');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');

    let currentImageIndex;
    // Create an array of image objects from the gallery items
    const images = Array.from(galleryItems).map(item => ({
        src: item.src, // Use the same src as thumbnail, or provide a different one for high-res
        alt: item.alt
    }));

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            modal.style.display = 'block';
            // Set the source and alt text for the modal image from our 'images' array
            modalImage.src = images[index].src;
            captionText.innerHTML = images[index].alt;
            currentImageIndex = index;
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore background scrolling
    }

    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }

    // Close modal if user clicks outside the modal content (image)
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    function showImage(index) {
        // Loop behavior for navigation
        if (index >= images.length) {
            currentImageIndex = 0; // Go to the first image
        } else if (index < 0) {
            currentImageIndex = images.length - 1; // Go to the last image
        } else {
            currentImageIndex = index;
        }
        modalImage.src = images[currentImageIndex].src;
        captionText.innerHTML = images[currentImageIndex].alt;
    }

    if (prevButton) {
        prevButton.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent click from bubbling to the window
            showImage(currentImageIndex - 1);
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent click from bubbling to the window
            showImage(currentImageIndex + 1);
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (event) => {
        if (modal.style.display === 'block') { // Only if modal is open
            if (event.key === 'ArrowLeft') {
                showImage(currentImageIndex - 1);
            } else if (event.key === 'ArrowRight') {
                showImage(currentImageIndex + 1);
            } else if (event.key === 'Escape') {
                closeModal();
            }
        }
    });
});