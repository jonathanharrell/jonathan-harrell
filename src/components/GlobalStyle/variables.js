import { css } from 'styled-components'

export const lightValues = css`
  --text: ${({ theme }) => theme.colors.blueDarkest};
  --textLight: hsl(210, 15%, 40%);
  --textLighter: hsl(210, 15%, 60%);
  --textInverse: hsl(0, 0%, 100%);
  --textCode: hsl(210, 15%, 40%);
  --textAlertInfo: hsl(210, 15%, 60%);
  --textAlertDanger: hsl(5, 66%, 56%);
  --backgroundPrimary: ${({ theme }) => theme.colors.white};
  --backgroundSecondary: hsl(210, 15%, 97.5%);
  --backgroundTertiary: hsl(210, 15%, 92.5%);
  --backgroundInverse: ${({ theme }) => theme.colors.blueDarkest};
  --backgroundElevatedPrimary: '';
  --backgroundElevatedSecondary: ${({ theme }) => theme.colors.white};
  --backgroundElevatedInverse: ${({ theme }) => theme.colors.blueDarker};
  --backgroundBody: ${({ theme }) => theme.colors.blueDarkest};
  --backgroundSubscribeBanner: hsl(210, 67%, 9%);
  --backgroundCode: hsl(210, 15%, 97%);
  --backgroundInlineCode: hsl(210, 15%, 97%);
  --backgroundAlertInfo: hsl(210, 15%, 60%, 15%);
  --backgroundAlertDanger: hsl(5, 66%, 56%, 15%);
  --backgroundMark: hsl(210, 15%, 92.5%);
  --border: hsl(210, 15%, 90%);
  --buttonBorderPrimary: ${({ theme }) => theme.colors.blueDarkest};
  --buttonBackgroundPrimary: ${({ theme }) => theme.colors.blueDarkest};
  --buttonTextPrimary: ${({ theme }) => theme.colors.white};
  --buttonBorderSecondary: hsl(210, 15%, 90%);
  --buttonBackgroundSecondary: transparent;
  --buttonTextSecondary: ${({ theme }) => theme.colors.blueDarkest};
  --primary: ${({ theme }) => theme.colors.blueDarkest};
  --accent: ${({ theme }) => theme.colors.red};
  --selection: hsla(210, 25%, 50%, 0.15);
  --elevationLow: 0 0 0 1px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.12);
  --elevationMedium: 0 0 0 1px rgba(0, 0, 0, 0.05),
    0 5px 10px rgba(0, 0, 0, 0.15);
  --elevationHigh: 0 0 0 1px rgba(0, 0, 0, 0.05), 0 10px 20px rgba(0, 0, 0, 0.2);
  --gradientGray: linear-gradient(
    169deg,
    hsl(0, 0%, 100%) 5%,
    hsl(0, 0%, 95%) 100%
  );
  --illustrationHeroShapeBackground: hsl(240, 12%, 60%);
  --illustrationLineShade1: hsl(240, 14%, 89%);
  --illustrationLineShade2: hsl(240, 14%, 85%);
  --illustrationLineShade3: hsl(240, 14%, 80%);
`

export const darkValues = css`
  --text: ${({ theme }) => theme.colors.white};
  --textLight: hsl(0, 0%, 45%);
  --textLighter: hsl(0, 0%, 60%);
  --textInverse: ${({ theme }) => theme.colors.white};
  --textCode: ${({ theme }) => theme.colors.white};
  --textAlertInfo: hsl(0, 0%, 60%);
  --textAlertDanger: hsl(5, 66%, 56%);
  --backgroundPrimary: hsl(0, 0%, 8%);
  --backgroundSecondary: hsl(0, 0%, 10%);
  --backgroundTertiary: hsl(0, 0%, 12%);
  --backgroundInverse: hsl(0, 0%, 6%);
  --backgroundElevatedPrimary: '';
  --backgroundElevatedSecondary: hsl(0, 0%, 12%);
  --backgroundElevatedInverse: hsl(0, 0%, 10%);
  --backgroundBody: hsl(0, 0%, 3%);
  --backgroundSubscribeBanner: hsl(0, 0%, 4%);
  --backgroundCode: hsl(0, 0%, 5%);
  --backgroundInlineCode: hsl(0, 0%, 12%);
  --backgroundAlertInfo: hsl(0, 0%, 40%, 15%);
  --backgroundAlertDanger: hsl(5, 66%, 56%, 15%);
  --backgroundMark: hsl(0, 0%, 15%);
  --border: hsl(0, 0%, 12%);
  --buttonBorderPrimary: ${({ theme }) => theme.colors.white};
  --buttonBackgroundPrimary: transparent;
  --buttonTextPrimary: ${({ theme }) => theme.colors.white};
  --buttonBorderSecondary: hsl(210, 15%, 95%);
  --buttonBackgroundSecondary: transparent;
  --buttonTextSecondary: ${({ theme }) => theme.colors.white};
  --primary: ${({ theme }) => theme.colors.blueDarkest};
  --accent: ${({ theme }) => theme.colors.red};
  --selection: hsla(0, 0%, 100%, 0.15);
  --elevationLow: 0 0 0 0.1em var(--selection);
  --elevationMedium: 0 0 0 0.2em var(--selection);
  --elevationHigh: 0 0 0 0.3em var(--selection);
  --gradientGray: linear-gradient(169deg, transparent 5%, hsl(0, 0%, 50%) 100%);
  --illustrationHeroShapeBackground: hsl(0, 0%, 60%);
  --illustrationLineShade1: hsl(240, 3%, 12%);
  --illustrationLineShade2: hsl(240, 5%, 15%);
  --illustrationLineShade3: hsl(240, 7%, 19%);
`
