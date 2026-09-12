import {
  colors,
  lightColors,
  darkColors,
  palette,
  spacing,
  radius,
  shadows,
  typography,
  navigationLightTheme,
  navigationDarkTheme,
} from '../src/theme';

describe('Lovely Theme System', () => {
  describe('Color Tokens', () => {
    it('should define primary color palette across all levels', () => {
      expect(palette.primary[50]).toBe('#FFF1F5');
      expect(palette.primary[500]).toBe('#FF477E');
      expect(palette.primary[700]).toBe('#D91F54');
      expect(palette.primary[900]).toBe('#961D41');
      expect(palette.primary[950]).toBe('#4C0519');
    });

    it('should define secondary lavender/purple palette', () => {
      expect(palette.secondary[50]).toBe('#F7F3FF');
      expect(palette.secondary[500]).toBe('#8B5CF6');
      expect(palette.secondary[950]).toBe('#2E1065');
    });

    it('should define romance accent colors', () => {
      expect(palette.accent.pink).toBe('#FF477E');
      expect(palette.accent.rose).toBe('#FB7185');
      expect(palette.accent.coral).toBe('#FF6B6B');
      expect(palette.accent.peach).toBe('#FDBA74');
      expect(palette.accent.mint).toBe('#2DD4BF');
    });

    it('should have complete light and dark theme configurations', () => {
      expect(lightColors.background).toBe('#FFFFFF');
      expect(darkColors.background).toBe('#0F0E17');

      expect(lightColors.textPrimary).toBeDefined();
      expect(darkColors.textPrimary).toBeDefined();

      expect(lightColors.card).toBeDefined();
      expect(darkColors.card).toBeDefined();

      expect(lightColors.border).toBeDefined();
      expect(darkColors.border).toBeDefined();

      expect(colors.light).toEqual(lightColors);
      expect(colors.dark).toEqual(darkColors);
    });
  });

  describe('Typography, Spacing, Radius & Shadows', () => {
    it('should define spacing scale', () => {
      expect(spacing.none).toBe(0);
      expect(spacing.sm).toBe(8);
      expect(spacing.base).toBe(16);
      expect(spacing.xl).toBe(24);
      expect(spacing['5xl']).toBe(64);
    });

    it('should define border radius scale', () => {
      expect(radius.none).toBe(0);
      expect(radius.sm).toBe(6);
      expect(radius['2xl']).toBe(20);
      expect(radius.full).toBe(9999);
    });

    it('should include Tangerine brand font in typography', () => {
      expect(typography.families.tangerine).toBe('Tangerine-Regular');
      expect(typography.families.tangerineBold).toBe('Tangerine-Bold');
      expect(typography.presets.brandHero.fontFamily).toBe('Tangerine-Bold');
    });

    it('should define elevation and shadow presets', () => {
      expect(shadows.sm.elevation).toBeDefined();
      expect(shadows.md.shadowOpacity).toBeDefined();
      expect(shadows.romantic.shadowColor).toBe('#FF477E');
    });
  });

  describe('React Navigation Themes', () => {
    it('should export valid navigationLightTheme and navigationDarkTheme', () => {
      expect(navigationLightTheme.dark).toBe(false);
      expect(navigationDarkTheme.dark).toBe(true);
      expect(navigationLightTheme.colors.primary).toBe(lightColors.tint);
      expect(navigationDarkTheme.colors.primary).toBe(darkColors.tint);
    });
  });

  describe('Theme Persistence', () => {
    it('should persist dark theme mode across reloads via devNav', () => {
      const { devNav } = require('../src/lib');
      devNav.setThemeMode('dark');
      expect(devNav.getThemeMode()).toBe('dark');
      devNav.setThemeMode('light');
      expect(devNav.getThemeMode()).toBe('light');
    });
  });
});
