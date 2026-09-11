/* =========================================
   MS MEER PORTFOLIO WEBSITE
   script.js
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       MOBILE MENU
       ========================================= */

    const menuBtn = document.getElementById("menuBtn");
    const closeBtn = document.getElementById("closeBtn");
    const navMenu = document.getElementById("navMenu");
    const menuOverlay = document.getElementById("menuOverlay");

    // Open mobile menu
    function openMenu() {
        if (navMenu) {
            navMenu.classList.add("active");
        }

        if (menuOverlay) {
            menuOverlay.classList.add("active");
        }

        document.body.classList.add("menu-open");

        if (menuBtn) {
            menuBtn.setAttribute("aria-expanded", "true");
        }
    }

    // Close mobile menu
    function closeMenu() {
        if (navMenu) {
            navMenu.classList.remove("active");
        }

        if (menuOverlay) {
            menuOverlay.classList.remove("active");
        }

        document.body.classList.remove("menu-open");

        if (menuBtn) {
            menuBtn.setAttribute("aria-expanded", "false");
        }
    }

    // Menu button
    if (menuBtn) {
        menuBtn.addEventListener("click", openMenu);

        menuBtn.setAttribute("aria-label", "Open menu");
        menuBtn.setAttribute("aria-expanded", "false");
    }

    // Close button
    if (closeBtn) {
        closeBtn.addEventListener("click", closeMenu);

        closeBtn.setAttribute("aria-label", "Close menu");
    }

    // Close menu by clicking overlay
    if (menuOverlay) {
        menuOverlay.addEventListener("click", closeMenu);
    }

    // Close menu after clicking any navigation link
    if (navMenu) {

        const navLinks = navMenu.querySelectorAll("a");

        navLinks.forEach(function (link) {

            link.addEventListener("click", function () {
                closeMenu();
            });

        });
    }

    // Close menu with Escape key
    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            closeMenu();
        }

    });


    /* =========================================
       PORTFOLIO NAVIGATION
       ========================================= */

    const portfolioLinks =
        document.querySelectorAll('a[href="#portfolio"]');

    portfolioLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const portfolio =
                document.getElementById("portfolio");

            if (portfolio) {

                event.preventDefault();

                portfolio.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /* =========================================
       SMOOTH SCROLL FOR WEBSITE MENU
       ========================================= */

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetID =
                this.getAttribute("href");

            if (
                !targetID ||
                targetID === "#" ||
                targetID === "#portfolio"
            ) {
                return;
            }

            const target =
                document.querySelector(targetID);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /* =========================================
       REVIEWS / STAR RATINGS
       ========================================= */

    const ratings =
        document.querySelectorAll(
            ".review-rating, [data-rating]"
        );

    ratings.forEach(function (rating) {

        let value =
            Number(rating.dataset.rating || 5);

        // Keep rating between 0 and 5
        value = Math.max(0, Math.min(5, value));

        const fullStars =
            Math.floor(value);

        const emptyStars =
            5 - fullStars;

        rating.innerHTML =
            '<span class="stars">' +
            "★".repeat(fullStars) +
            "☆".repeat(emptyStars) +
            "</span>";

        rating.setAttribute(
            "aria-label",
            value + " out of 5 stars"
        );

    });


    /* =========================================
       INTERACTIVE REVIEW FORM
       ========================================= */

    const reviewForm =
        document.getElementById("reviewForm");

    if (reviewForm) {

        reviewForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const nameInput =
                    document.getElementById("reviewName");

                const textInput =
                    document.getElementById("reviewText");

                const ratingInput =
                    document.getElementById("reviewRating");

                const reviewList =
                    document.getElementById("reviewList");

                if (
                    !nameInput ||
                    !textInput ||
                    !ratingInput ||
                    !reviewList
                ) {
                    return;
                }

                const name =
                    nameInput.value.trim();

                const review =
                    textInput.value.trim();

                let rating =
                    Number(ratingInput.value);

                rating =
                    Math.max(
                        1,
                        Math.min(5, rating)
                    );

                // Check review fields
                if (!name || !review) {

                    alert(
                        "Please enter your name and review."
                    );

                    return;
                }

                // Create review card
                const card =
                    document.createElement("article");

                card.className =
                    "review-card";

                // Create stars
                const stars =
                    "★".repeat(rating) +
                    "☆".repeat(5 - rating);

                const nameHeading =
                    document.createElement("h3");

                nameHeading.textContent = name;

                const ratingDiv =
                    document.createElement("div");
                ratingDiv.className = "rating";
                ratingDiv.innerHTML = stars;