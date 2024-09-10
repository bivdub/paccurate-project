
## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

Next, create a .env file in the root directory and add
```
API_KEY={{ YOUR_API_KEY }}
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Warnings

- State will be refreshed when the site is reloaded (should have set in cookies but ran out of time to make change and test it)

- This site is not OSHA compliant. The forms do not have validation and the type checking is spotty. This would probably be the biggest UX improvement to make, but also would have been a serious time sink.

- On making order, the query param isn't properly fetching and displaying the data, so you'll need to click on the order timestamp in the left list.

## Thoughts 

If making this site for real, I'd definitely want to spend some time with stakeholders to figure out which values are needed / most likely to change and design around those use cases. I'd also want to take the time to set up the models and a proper DB or at the very least proper state management. 

I'd also probably change the Inventory and Boxes page to represent the data in a table rather than using cards. The original thought was to have a visual representation of the box on the card as well, but creating and svg visualization based on the dimensions ended up looking like a time sink I wanted to avoid with a short turn around time. Either way, this data could be displayed more elegantly. Would also consider moving the edit to it's own details page to avoid an annoyance of creating alphabetic ids for items to identify the modals. If sticking with modals I'd add an alphaId value to the model so I'm not trying to generate on the component, which prevents SSR (although that may not be important for a management console since SEO is probably not a concern).

## Where I'd go from here

The next feature that I'd have added is implementing Rules, but I'd probably want to set up a relational connection to between the items and rules so that you could either add an item from the rule edit page, or attach a rule(s) directly to the item. After that would be some sort of global settings to store default overrides / settings you'd want changed for every call. Also needs proper error handling

There are plenty of refactors to be made in the code to move stuff like Id generation to utility functions and properly utilizing TS to add type safety to everything would be the immediate thoughts, but there are probably opportunities to further split pages in to components as well.

Obviously adding form validation would be critical before launching something like this for real - I'd probaby also change the entry hints to be hover over tooltips so I don't feel as limited by space constraints that using form labels had. Spending some more time to set up some consistent styling elements aside from the daisyui defaults would probably be on the docket.

The order visualization could also use a little more razzle dazzle - I wasn't able to get the css transitions set up to animate the packing order in time, but I think if I were to use GSAP I could set those visualizations up to allow the end user to step through and replay the visualizations, as well as create a proper legend that would allow you to hover over items and highlight where they are in the diagram.
