const filter_buttons = document.querySelectorAll(".filter-btn");
const gallery_items = document.querySelectorAll(".gallery-item");

filter_buttons.forEach((button) => {

    button.addEventListener("click", () => {

        // Remove active from all buttons
        filter_buttons.forEach((btn) => {
            btn.classList.remove("active");
        });

        // Add active to clicked button
        button.classList.add("active");

        // Get the selected filter
        const filter_value = button.dataset.filter;

        // Show or hide gallery items
        gallery_items.forEach((item) => {

            if (
                filter_value === "all" ||
                item.classList.contains(filter_value)
            ) {
                item.classList.remove("hidden");
            } else {
                item.classList.add("hidden");
            }

        });
    });

});

const swiper = new Swiper('.slider-wrapper', {

    loop: true,
    grabCursor:true,
    spaceBetween:100,

    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets:true,
    },

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    breakpoints:{
        0:{
            sliderPreView:1
        },
          620:{
            sliderPreView:1
        },
          1024:{
            sliderPreView:1
        }
    }

});
function showsidebar(){
    const sidebar=document.querySelector('.sidebar')
    sidebar.style.display='flex'
}
function hidesidebar(){
    const sidebar=document.querySelector('.sidebar')
    sidebar.style.display='none'
}