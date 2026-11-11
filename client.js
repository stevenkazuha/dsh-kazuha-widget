/**
 * Kazuha client half: the "washi + maple" alias-token layer and the pet loader.
 *
 * The token layer stacks over whichever built-in theme is active (light or dark), so
 * the whole app takes Kazuha's palette without changing the user's theme preference;
 * disabling the plugin restores the original colors.
 */

window.__ModuleLoader__.load({
  id: '@local/kazuha-widget',
  factory() {
    const SRC = '/dsh-kazuha/pet.js';
    const ID = 'dsh-kazuha-pet-script';

    const TOKENS = {
      '--dsw-alias-bg-base': { light: '#faf4ea', dark: '#14100f' },
      '--dsw-alias-bg-layer-1': { light: '#fffcf5', dark: '#1c1716' },
      '--dsw-alias-bg-layer-2': { light: '#f2e6d3', dark: '#241d1b' },
      '--dsw-alias-bg-overlay': { light: '#fffdf8', dark: '#221b19' },
      '--dsw-alias-border-l1': { light: '#e8d9c2', dark: '#342a27' },
      '--dsw-alias-border-l2': { light: '#d6bf9f', dark: '#4a3a35' },
      '--dsw-alias-brand-primary': { light: '#b8302a', dark: '#d9482f' },
      '--dsw-alias-label-primary': { light: '#33232c', dark: '#f3e6d6' },
      '--dsw-alias-label-secondary': { light: '#7b6355', dark: '#b8a292' },
      '--dsw-alias-state-error-primary': { light: '#b8302a', dark: '#e0563a' },
      '--dsw-alias-state-warn-primary': { light: '#b8792a', dark: '#d9a25c' },
      '--dsw-alias-state-success-primary': { light: '#4e7f5f', dark: '#7fb894' },
      '--dsw-alias-state-idle-primary': { light: '#a3928a', dark: '#8a7a72' },
      '--dsw-specific-sidebar-fill': { light: '#f3e8d6', dark: '#171211' },
    };

    return {
      inject: ['theme'],
      apply(ctx) {
        ctx.effect(() => ctx.theme.overrideTokens('@local/kazuha-widget', TOKENS));

        ctx.effect(() => {
          try {
            if (!document.getElementById(ID)) {
              const tag = document.createElement('script');
              tag.id = ID;
              tag.src = SRC;
              tag.onerror = function () {};
              (document.body || document.documentElement).appendChild(tag);
            }
          } catch (error) {
            /* the Host injection row may still load it */
          }
          return () => {
            try { if (window.__dshKazuhaPet && window.__dshKazuhaPet.remove) window.__dshKazuhaPet.remove(); } catch (error) {}
            try { const el = document.getElementById(ID); if (el) el.remove(); } catch (error) {}
          };
        });
      },
    };
  },
});
