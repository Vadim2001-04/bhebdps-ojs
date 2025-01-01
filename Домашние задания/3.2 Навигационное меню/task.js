document.querySelectorAll('.menu__link').forEach(item => {
    item.addEventListener('click', (event) => {
        const submenu = item.nextElementSibling;

        if (submenu && submenu.classList.contains('menu_sub')) {
            event.preventDefault();

            document.querySelectorAll('.menu_sub').forEach(submenu => {
                if (submenu !== item.nextElementSibling && submenu.classList.contains('menu_active')) {
                    submenu.classList.remove('menu_active');
                }
            });

            submenu.classList.toggle('menu_active');
        }
    });
});
