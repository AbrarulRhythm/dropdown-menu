(() => {
    const menuBtn = document.querySelector(".menu-btn");
    const cancleBtn = document.querySelector(".cancle-btn");
    const navMenu = document.querySelector(".nav-menu");
    const menuOverlay = document.querySelector(".meny-overlay");
    const header = document.querySelector(".header");
    const mediaSize = 991;

    menuBtn.addEventListener("click", toggleNav);
    cancleBtn.addEventListener("click", toggleNav);
    // close the navMenu by clicking outside
    menuOverlay.addEventListener("click", toggleNav);

    function toggleNav() {
        navMenu.classList.toggle("open");
        menuOverlay.classList.toggle("active")
        menuBtn.classList.toggle("hide");
        cancleBtn.classList.toggle("show");
        document.body.classList.toggle("hidden-scrolling")
    }

    navMenu.addEventListener("click", (event) => {
        if (event.target.hasAttribute("data-toggle") && window.innerWidth <= mediaSize) {
            // prevent Default anchor click behavior
            event.preventDefault();
            const menuItemHasChildren = event.target.parentElement;
            // if menuItemHasChildren is already expanded, collapse it
            if (menuItemHasChildren.classList.contains("active")) {
                collapseSubMenu();
            } else {
                // collapse existing expanded menuItemHasChildren
                if (navMenu.querySelector(".menu-items-has-childern.active")) {
                    collapseSubMenu();
                }
                // expanded new menuItemHasChildren
                menuItemHasChildren.classList.add("active");
                const subMenu = menuItemHasChildren.querySelector(".sub-menu");
                subMenu.style.maxHeight = subMenu.scrollHeight + "px";
            }
        }
    });
    function collapseSubMenu() {
        navMenu.querySelector(".menu-items-has-childern.active .sub-menu")
            .removeAttribute("style");
        navMenu.querySelector(".menu-items-has-childern.active")
            .classList.remove("active");
    }

    function resizeFix() {
        // if navMenu is open, close it
        if (navMenu.classList.contains("open")) {
            toggleNav();
        }
        // if menuItemHasChildren is expanded , collapse it
        if (navMenu.querySelector(".menu-items-has-childern.active")) {
            collapseSubMenu();
        }
    }

    window.addEventListener("resize", function () {
        if (this.innerWidth > mediaSize) {
            resizeFix();
        }
    });

    window.onscroll = () => {
        this.scrollY > 20 ? header.classList.add("sticky") : header.classList.remove("sticky");
    }

})();