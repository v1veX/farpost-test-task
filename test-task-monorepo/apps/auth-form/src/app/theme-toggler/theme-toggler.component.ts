import { Component } from '@angular/core';

@Component({
  selector: 'app-theme-toggler',
  templateUrl: './theme-toggler.component.html',
})
export class ThemeTogglerComponent {
    darkThemePreferenceQuery = '(prefers-color-scheme: dark)'

    localStorageAccessor = 'theme';

    themes = {
        dark: 'dark',
        light: 'light',
    }

    stateClasses = {
        isDark: 'is-dark',
    }

    currentTheme = this.themes.light;  // by default theme is light

    setSystemTheme() {
        if (window.matchMedia && window.matchMedia(this.darkThemePreferenceQuery).matches) {
            this.toggleTheme();
        }
        else {
            localStorage.setItem(
                this.localStorageAccessor,
                this.currentTheme
            );
        }
    }

    toggleTheme() {
        const isCurrentLight = this.currentTheme === this.themes.light;

        const rootElement = document.documentElement;
        rootElement.classList.toggle(this.stateClasses.isDark, isCurrentLight);

        this.currentTheme = isCurrentLight
            ? this.themes.dark
            : this.themes.light;

        localStorage.setItem(
            this.localStorageAccessor,
            this.currentTheme
        );
    }

    constructor() {
        const themeStored = localStorage.getItem(this.localStorageAccessor);

        if (!themeStored) {
            this.setSystemTheme();
        }
        else if (themeStored === this.themes.dark) {
            this.toggleTheme();
        }
    }
}