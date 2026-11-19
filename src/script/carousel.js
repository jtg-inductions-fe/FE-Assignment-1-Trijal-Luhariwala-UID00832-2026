import Swiper from 'swiper';
import { Navigation, Pagination, FreeMode } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';

export function initCarousels() {
    const carousels = document.querySelectorAll('.carousel');

    carousels.forEach((carousel) => {
        const swiperEl = carousel.querySelector('.swiper');
        if (!swiperEl) return;

        new Swiper(swiperEl, {
            modules: [Navigation, Pagination, FreeMode],
            loop: true,
            spaceBetween: 8,
            slidesPerView: 'auto',
            freeMode: {
                enabled: true,
                momentum: true,
                sticky: true,
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
