---
title: "Focusable Cards"
description: "Building focusable card components with accessibility and extensibility in mind"
publishDate: "22 June 2024"
tags: ["react", "accessibility", "intermediate", "tailwindcss"]
draft: true
---

When designing content pages or PLPs, there's often a requirement for a "card" component that links to a page or product. Additionally, there's often a requirement that this entire card is clickable. Unlike regular buttons and text links, cards often contain images, a title, additional content, and even contain a button within.This is where things start getting interesting.

If care is not taken with these component, accessibility can often suffer, especially when it comes to how these components are announced via screen readers, or introducing redundant tab stops.

In short, wrapping a card component in an `<a>` tag is not enough.

Luckily, there are already many fantastic articles that cover how to build cards with accessibility in mind.

This article however, will cover how to build a re-usable card component in React using different techniques such as render props and context. Specially, we will use the "The pseudo-content trick" cover in [this Inclusive Components article](https://inclusive-components.design/cards/).

### A11y Recap

As a quick summary of the article above, here are some guidelines to building a card component:

- Use list markup to group your cards to take advantage of how they're announced via screen readers.
- Do not wrap cards with an `a` or `button`.
- The advantage of using headlines as links over having "read more" calls-to-action is that each link has a unique and descriptive label, which is useful when users are searching through aggregated lists of links.
- Make sure your cards don't break when lines of content wrap or images don't meet specific aspect ratio requirements.
- Avoid too much functionality and reduce tab stops. Cards shouldn't be miniature web pages.
- Remember that headings should begin sections. Most everything that belongs to the section should follow the heading in the source.

## Implementation

Using a render props pattern, rather than props being a JSX element or JS primitive, we pass a function that can destructure the necessary element classes in order to apply them to the component. This gives us the flexibility to either pass a `a` link into the header that we would like to use as the main link, or a `button` into the footer. Depending on which component applies the link classes will affect what the card's hit area references.

Although this is the simplest way to create such a component, it is not the cleanest API.

### Render props

```jsx
interface PreviewCardProps {
  /** The feature section of the card for an Image or Feature Icon. */
  featureSection: React.ReactElement;
  /** Text or render prop. Pass link as render prop when not supplying a button if you want the card to be clickable. */
  headline:
    | string
    | (({ linkClasses }: { linkClasses: string }) => React.ReactNode);
  /** The preview text of the card. */
  previewText: string;
  /** Single button or button group as a render prop. If passing a single button, the render prop can use the classes. */
  footerSection?: ({ linkClasses }: { linkClasses: string }) => React.ReactNode;
}

// All these classes are so the card can be clicked and gets a focus ring rather than the button itself getting the focus ring.
//  This also makes it look like you can tab to the card and click it.
// Based on the 'pseudo-content trick' from: https://inclusive-components.design/cards/
const linkClasses =
  "focus-visible:outline-none before:focus-visible:ring-2 before:focus-visible:ring-blue-600 before:focus-visible:ring-offset-0 before:focus-visible:rounded-shape-button-input outline-none w-full before:content-[''] before:absolute before:inset-0 before:z-[1]";

/**
 * A component that displays a preview card. Accepts multiple render props for links.
 */
export function PreviewCard({
  featureSection,
  headline,
  previewText,
  footerSection,
}: PreviewCardProps) {
  return (
    <li className="relative flex flex-col rounded-shape-section p-space-400 bg-colour-background-primary max-w-3xl w-full border border-colour-border">
      <div className="mb-space-text-button">{featureSection}</div>
      <div className="flex flex-col grow">
        <h3 className="headline-s md:headline-l text-colour-title-light mb-space-heading-body">
          {typeof headline === 'string' ? headline : headline({ linkClasses })}
        </h3>
        <p className="body-s text-colour-body-light line-clamp-3">
          {previewText}
        </p>
        {footerSection && (
          <div className="pt-space-text-button mt-auto w-full md:w-max">
            {footerSection({ linkClasses })}
          </div>
        )}
      </div>
    </li>
  );
}
```

### Compound component

An alternative would be to create a compound component that shares props between different components through its context, and apply's it to it's children using `cloneElement`. In order to do this, we will make use of the `Slot` element available in [Radix UI](https://www.radix-ui.com/primitives/docs/utilities/slot).

## Sources

- [Cards - (inclusive-components.design)](https://inclusive-components.design/cards/)
- [Render Props - (react.dev)](https://react.dev/reference/react/cloneElement#passing-data-with-a-render-prop)

## Notes to self
