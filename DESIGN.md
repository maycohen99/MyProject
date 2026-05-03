---
name: Urban Warm
colors:
  surface: '#f9f9ff'
  surface-dim: '#d3daea'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e7eefe'
  surface-container-high: '#e2e8f8'
  surface-container-highest: '#dce2f3'
  on-surface: '#151c27'
  on-surface-variant: '#46464d'
  inverse-surface: '#2a313d'
  inverse-on-surface: '#ebf1ff'
  outline: '#76767e'
  outline-variant: '#c6c6cd'
  surface-tint: '#575d76'
  primary: '#181e34'
  on-primary: '#ffffff'
  primary-container: '#2d334a'
  on-primary-container: '#969bb7'
  inverse-primary: '#c0c5e2'
  secondary: '#5e5e5b'
  on-secondary: '#ffffff'
  secondary-container: '#e1dfdb'
  on-secondary-container: '#63635f'
  tertiary: '#381500'
  on-tertiary: '#ffffff'
  tertiary-container: '#592500'
  on-tertiary-container: '#ee7f36'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce1ff'
  primary-fixed-dim: '#c0c5e2'
  on-primary-fixed: '#141a30'
  on-primary-fixed-variant: '#40465e'
  secondary-fixed: '#e4e2dd'
  secondary-fixed-dim: '#c8c6c2'
  on-secondary-fixed: '#1b1c19'
  on-secondary-fixed-variant: '#474744'
  tertiary-fixed: '#ffdbc9'
  tertiary-fixed-dim: '#ffb68d'
  on-tertiary-fixed: '#331200'
  on-tertiary-fixed-variant: '#763300'
  background: '#f9f9ff'
  on-background: '#151c27'
  surface-variant: '#dce2f3'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-h1:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-h2:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  headline-h3:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '500'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.01em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  container-max: 1200px
  gutter: 20px
---

## Brand & Style

The brand personality is that of a "Sophisticated Navigator." It aims to transform the complex, often stressful experience of analyzing an Israeli paystub into a moment of clarity and empowerment. The design system targets Israeli professionals who value efficiency but appreciate a human, approachable touch in their financial tools.

The visual style is **Minimalist Modern** with an **Urban Warm** twist. It rejects the cold, sterile whites of traditional banking for a palette that feels architectural yet organic. By utilizing generous whitespace, premium typography, and a "warm" canvas, this design system establishes a professional fintech aesthetic that feels grounded and trustworthy. Every interaction is designed to reduce cognitive load and provide a calm, guided user journey through financial data.

## Colors

This design system uses a palette rooted in deep architectural tones and soft organic neutrals. The primary **Navy (#2D334A)** provides a foundation of authority and reliability, used for primary navigation and text. The **Warm Cream (#F9F7F2)** serves as the global background, significantly reducing eye strain compared to pure white and providing an "Urban Warm" atmosphere.

The **Coral (#FF8C42)** is the primary call-to-action color, reserved for high-priority interactions like "Upload Paystub" or "Calculate Net." Neutral tones are derived from the primary navy but desaturated to create a hierarchy of information without introducing new, clashing hues. Success and Error states use highly legible, high-contrast tones to ensure immediate clarity for critical financial feedback.

## Typography

The typography strategy balances approachability with technical precision. **Plus Jakarta Sans** is used for headings to provide a friendly, optimistic, and modern Israeli aesthetic. Its rounded terminals soften the serious nature of financial analysis. 

**Inter** is the workhorse for all functional data. It is chosen for its exceptional legibility at small sizes and its neutral, systematic feel. A minimum body size of 16px is strictly enforced to ensure accessibility for all users. For financial figures and line items, use a medium weight in Inter to ensure numbers are easily distinguishable from descriptive text.

## Layout & Spacing

The design system utilizes a **Fixed Grid** model for desktop experiences to mimic the structured nature of a physical paystub, transitioning to a fluid model for mobile. On desktop, content is centered within a 1200px max-width container using a 12-column grid.

The spacing rhythm is built on a 4px base unit. Consistent use of "lg" (24px) padding within cards and "xl" (40px) vertical spacing between sections ensures the UI feels breathable and uncluttered. Layouts should prioritize vertical scanning, as users typically read paystubs from top to bottom. Use larger margins to separate the "Summary" view from the "Detailed Analysis" view to prevent information overload.

## Elevation & Depth

Visual hierarchy in this design system is achieved through **Tonal Layers** and **Ambient Shadows**. Instead of heavy borders, depth is created by placing white or slightly elevated surfaces against the Warm Cream background.

Shadows are exceptionally soft and diffused, using the Primary Navy color at very low opacity (3-5%) to avoid a "muddy" look. These "Urban Shadows" should feel like natural sunlight, with a larger blur radius (12px-20px) and minimal offset. This approach ensures that cards appear to float gently above the surface, guiding the user's focus to the data without creating visual noise. High-priority interactive elements like the primary CTA may use a slightly deeper shadow on hover to provide tactile feedback.

## Shapes

The shape language is defined by a **Rounded (Level 2)** approach. Standard components like buttons and input fields utilize a 12px border radius, while larger containers and cards utilize a 14px radius. 

This specific curvature is intentional: it is soft enough to feel inviting and modern, but structured enough to maintain a professional "fintech" posture. Avoid pill-shaped buttons except for small, decorative chips or tags (e.g., "New" or "Tax Deductible"). The consistent application of these radii across all interactive elements creates a cohesive, high-end feel that communicates the software's precision and user-centric focus.

## Components

**Buttons:** 
Primary buttons use the Coral background with white text and a 12px radius. Secondary buttons should use the Navy color as an outline or a subtle ghost style to maintain hierarchy. Buttons must have a minimum height of 48px to ensure ease of use.

**Cards:** 
The central container for paystub data. Cards are white (#FFFFFF) with a 14px radius and a soft ambient shadow. They should include a subtle 1px border in a very light neutral tone to define edges against the Warm Cream background.

**Input Fields:** 
Inputs feature a 12px radius and use Inter 16px. The focus state is indicated by a 2px border in Navy. Error states use a 2px border in Error Red with a small descriptive label below.

**Chips & Status Indicators:** 
Used for categorizing paystub line items (e.g., "Pension," "Tax," "Net"). These use a lighter tint of the status colors (Success/Error) with high-contrast text to ensure they are glanceable.

**Paystub Breakdown List:** 
A specialized list component using Inter for high-density data. It should feature subtle horizontal dividers and alternating row highlights to help users track information across columns.

**Explanation Tooltips:** 
Given the complexity of Israeli labor law, informative tooltips are essential. These should use a Navy background with White Inter 14px text, appearing on hover or tap of "info" icons next to complex terms.