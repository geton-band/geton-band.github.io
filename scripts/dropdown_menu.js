"use strict";
(function dropdownMenu() {

    const menuToggleButton = document.getElementById("toggle-dropdown-menu-btn");
    const menu = document.getElementById("dropdown-menu");
    const clickParticlesCheckbox = document.getElementById("click-particles-enabled");
    const mouseDragParticlesCheckbox = document.getElementById("mousedrag-particles-enabled");
    let menuOpen = false;

    function toggleMenuOpen(event) {
        event && event.preventDefault();
        menuOpen = !menuOpen;
        if (menuOpen) {
            menuToggleButton.src = "./assets/img/arrow_drop_up_white_24dp.svg";
            menu.style.display = "flex";
        } else {
            menuToggleButton.src = "./assets/img/arrow_drop_down_white_24dp.svg";
            menu.style.display = "none";
        }
    }

    function setBooleanToLocalStorage(name, value) {
        localStorage.setItem(name, JSON.stringify(value));
        window.dispatchEvent(new Event(GetonConstants.events.particleSettingsChanged));
    }

    function setClickParticles(event) {
        setBooleanToLocalStorage(GetonConstants.clickParticleSettings.storageName, event.currentTarget.checked);
    }

    function setMouseDragParticles(event) {
        setBooleanToLocalStorage(GetonConstants.mouseDragParticleSettings.storageName, event.currentTarget.checked);
    }

    (function syncCheckboxesWithLocalStorage() {
        const storedClickParticlesEnabled = localStorage.getItem(GetonConstants.clickParticleSettings.storageName);
        const clickParticlesEnabled = storedClickParticlesEnabled != null
            ? JSON.parse(storedClickParticlesEnabled)
            : GetonConstants.clickParticleSettings.default;
        clickParticlesCheckbox.checked = clickParticlesEnabled;

        const storedMouseDragParticlesEnabled = localStorage.getItem(GetonConstants.mouseDragParticleSettings.storageName);
        const mouseDragParticlesEnabled = storedMouseDragParticlesEnabled != null
            ? JSON.parse(storedMouseDragParticlesEnabled)
            : GetonConstants.mouseDragParticleSettings.default;
        mouseDragParticlesCheckbox.checked = mouseDragParticlesEnabled;
    })();

    menuToggleButton.onclick = toggleMenuOpen;
    clickParticlesCheckbox.addEventListener("change", setClickParticles);
    mouseDragParticlesCheckbox.addEventListener("change", setMouseDragParticles);
})();