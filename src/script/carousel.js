import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

export function initCarousels() {
    const carousels = document.querySelectorAll('.carousel');

    carousels.forEach((carousel) => {
        const swiperEl = carousel.querySelector('.swiper');
        if (!swiperEl) return;

        new Swiper(swiperEl, {
            loop: true,
            spaceBetween: 8,
            slidesPerView: 'auto',
            freeMode: {
                enabled: true,
                momentum: true,
            },
            pagination: {
                el: carousel.querySelector('.swiper-pagination'),
                clickable: true,
                dynamicBullets: true,
                dynamicMainBullets: 3,
            },
            navigation: {
                nextEl: carousel.querySelector('.swiper-button-next'),
                prevEl: carousel.querySelector('.swiper-button-prev'),
            },
            breakpoints: {
                1024: {
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                    centeredSlides: false,
                    spaceBetween: 20,
                },
            },
        });
    });
}
