document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.selectable-image');
    let selectedImages = [];

    images.forEach(image => {
        image.addEventListener('click', () => {
            if (selectedImages.includes(image)) {
                image.classList.remove('selected');
                selectedImages = selectedImages.filter(img => img !== image);
            } else {
                if (selectedImages.length < 2) {
                    image.classList.add('selected');
                    console.log("pushed")
                    selectedImages.push(image);
                    if (selectedImages.length == 2) {
                        image1 = selectedImages.pop();
                        image2 = selectedImages.pop();
                        if (image1.src === image2.src) {
                            console.log("correct")
                        }
                    }
                }
            }
        });
    });
});
