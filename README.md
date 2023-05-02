# Playwire React Ramp Component

Unofficial React component for Playwire.


## Why?

I was hired to implement Playwire within a NextJS application and quickly discovered that the official React components do not have TypeScript support, they ship a 250mb+ bundle for some reason, and they don't really work well with NextJS.

You can find the official repository here: https://github.com/intergi/pw-react-component

## Install

```
npm i playwire-react
```

## React usage

```tsx
import {Ramp, RampUnit} from "playwire-react"

{/* Only load this component once, at the top most level of your app */}

<Ramp
  publisherId="1016948"
  id="63673"
/>

{/* Place this component as needed for all in-page units */}
<RampUnit
  type="leaderboard_atf"
  className="leaderboard"
/>
```

## NextJS usage

```tsx
import {RampNext, RampUnitNext} from "playwire-react"

{/* Load this in your _app.tsx file */}
<RampNext
  publisherId="1016948"
  id="63673"
/>

{/* Place this component as needed for all in-page units */}
<RampUnitNext
  type="leaderboard_atf"
  className="leaderboard"
/>
```