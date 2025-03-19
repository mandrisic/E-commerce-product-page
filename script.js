const plusBtn = document.querySelector('.plus');
const minusBtn = document.querySelector('.minus');
const changeAmount = document.getElementById('amount-change');

const hamburgerMenu = document.getElementById('menu');
const closeMenu = document.getElementById('close');
const nav = document.querySelector('nav');
const overlay = document.querySelector('.overlay');

const cart = document.getElementById('nav-cart');
const number = document.getElementById('number');
const cartDetails = document.getElementById('cart-details');
const cartFull = document.getElementById('cart-full');
const cartEmpty = document.getElementById('cart-empty');
const addCartBtn = document.querySelector('.add-cart-container');

const images = [
    {src: './images/image-product-1.jpg', thumb: './images/image-product-1-thumbnail.jpg'}, 
    {src: './images/image-product-2.jpg', thumb: './images/image-product-2-thumbnail.jpg'}, 
    {src: './images/image-product-3.jpg', thumb: './images/image-product-3-thumbnail.jpg'}, 
    {src: './images/image-product-4.jpg', thumb: './images/image-product-4-thumbnail.jpg'}
];

let currentIndex = 0;

let changeValue = 0;

const subtractAmount = () => {
    if(changeValue === 0){
        return;
    } else {
        changeAmount.textContent = changeValue - 1;
        changeValue -= 1;
    }
}

minusBtn.addEventListener('click', subtractAmount);

plusBtn.addEventListener('click', ()=> {
    changeAmount.textContent = changeValue + 1;
    changeValue += 1;
});

// hamburger navbar
hamburgerMenu.addEventListener('click', () => {
    nav.classList.add('active');
    overlay.classList.add('active');
});

closeMenu.addEventListener('click', () => {
    nav.classList.remove('active');
    overlay.classList.remove('active');
});

overlay.addEventListener('click', () => {
    nav.classList.remove('active');
    overlay.classList.remove('active');
    overlay.innerHTML = '';
});

// cart details show and calculate based on the amount that was added to the cart
const calculateAmount = () => {
    if(changeValue === 0){
        return;
    } else {
        return 125.00 * changeValue;
    }
}

addCartBtn.addEventListener('click', () => {
    if(calculateAmount()){
        cartDetails.classList.remove('hidden');
        // show the details and the calculation
        cartEmpty.classList.add('hidden');
        cartFull.classList.remove('hidden');
        document.querySelector('.custom-text').innerHTML = `${changeValue === 1 ? '' : ` x ${changeValue}  <strong>$${calculateAmount()}.00</strong>`}`;
        number.innerHTML = `<p>${changeValue}</p>`;
        number.style.backgroundColor = '#ff7d1a';
        number.classList.remove('hidden');
    } else {
        cartFull.classList.add('hidden');
        cartEmpty.classList.remove('hidden');
        number.innerHTML = ``;
        number.style.backgroundColor = 'transparent';
        number.classList.add('hidden');
    }
});

//nav-cart
cart.addEventListener('click', () => {
    cartDetails.classList.toggle('hidden');
    if (changeValue === 0) {
        cartFull.classList.add('hidden');
        cartEmpty.classList.remove('hidden');
    } else {
        cartEmpty.classList.add('hidden');
        cartFull.classList.remove('hidden');
    }
});

// delete product from cart function
document.getElementById('delete').addEventListener('click', ()=> {
    changeValue = 0;
    changeAmount.textContent = 0;
    cartFull.classList.add('hidden');
    cartEmpty.classList.remove('hidden');
    number.innerHTML = ``;
    number.style.backgroundColor = 'transparent';
    number.classList.add('hidden');
    cartDetails.classList.toggle('hidden');
});

// desktop gallery 
const desktopGallery = (images) => {
    return `
        <div class="thumbnails">
            ${images.map(image => `
                <div class="thumbnail">
                    <img src="${image.thumb}" alt="">
                </div>
            `).join("")}
        </div>
    `;
};

document.querySelector('.desktop-gallery').innerHTML = `<img class="product-img" src="${images[0].src}" alt="sneakers">${desktopGallery(images)}`;

// open desktop gallery
const updateActiveThumbnail = (index) => {
    const thumbnails = document.querySelectorAll('.gallery-thumb .thumbnails .thumbnail');
    if (!thumbnails.length) return;
    thumbnails.forEach(t => t.classList.remove('default'));
    thumbnails[index].classList.add('default');
};

const handleNext = () => {
    currentIndex = (currentIndex + 1) % images.length;
    document.querySelector(".product-img").src = images[currentIndex].src;
    updateActiveThumbnail(currentIndex);
}

const handlePrevious = () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    document.querySelector(".product-img").src = images[currentIndex].src;
    updateActiveThumbnail(currentIndex);
}

// mobile gallery
const mobileGallery = (images) => {
    return `<svg class="previous" aria-label="Previous" viewBox="0 0 13 18" xmlns="http://www.w3.org/2000/svg"><path d="M11 1 3 9l8 8" stroke="#1D2026" stroke-width="3" fill="none" fill-rule="evenodd"/></svg>
            <img class="product-img" src="${images[0].src}" alt="sneakers">
            <svg class="next" aria-label="Next" viewBox="0 0 13 18" xmlns="http://www.w3.org/2000/svg"><path d="m2 1 8 8-8 8" stroke="#1D2026" stroke-width="3" fill="none" fill-rule="evenodd"/></svg>`;
}

document.querySelector('.mobile-gallery').innerHTML = mobileGallery(images);
document.querySelector(".previous").addEventListener("click", handlePrevious);
document.querySelector(".next").addEventListener("click", handleNext);

const handleGallery = () => {
    overlay.classList.add('active');
    overlay.innerHTML = `<div class="gallery">
                            <svg class="close" viewBox="0 0 14 15" xmlns="http://www.w3.org/2000/svg"><path d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z" fill-rule="evenodd"/></svg>
                            <div class="gallery-product">${mobileGallery(images)}</div>
                            <div class="gallery-thumb">${desktopGallery(images)}</div>
                        </div>`;

                        document.querySelector(".close").addEventListener("click", (e) => {
                            e.stopPropagation();
                            overlay.classList.remove('active');
                        });
                    
                        document.querySelector(".previous").addEventListener("click", (e) => {
                            e.stopPropagation();
                            handlePrevious();
                        });
                    
                        document.querySelector(".next").addEventListener("click", (e) => {
                            e.stopPropagation();
                            handleNext();
                        });

                        document.querySelector('.gallery-thumb .thumbnails .thumbnail')?.classList.add('default');
                        document.querySelectorAll('.gallery-thumb .thumbnails .thumbnail').forEach((thumb, index) => {
                            thumb.addEventListener('click', (e) => {
                                e.stopPropagation();
                                currentIndex = index;
                                document.querySelector('.gallery-product .product-img').src = images[index].src;
                                updateActiveThumbnail(index);
                            });
                        });
}

document.querySelectorAll('.thumbnail').forEach(thumb => {
    thumb.addEventListener('click', handleGallery);
});