# [MarketLaunch](https://www.marketlaunch.app/)

An expertly engineered Next.js frontend that gives you everything you need to build a [Swell powered](https://swell.is?utm_source=marketlaunch-github) marketplace app in days rather than months, saving you time and money.

Built by [Morrow](https://www.themorrow.digital/), React Native and Expo Specialists for Pioneering Businesses.

## About MarketLaunch
MarketLaunch is a development kit designed to help speed up the development of new marketplace applications. Right now MarketLaunch is tied into Swell’s API as we found through extensive research Swell offered the best headless CMS for building marketplace applications. 

With the current version of MarketLuanch we’ve focused on building out the core back-office features every marketplace application will need. This inlucdes;
- Vendor sign up
- Vendor order dashboard
- Vendor order management  (including order fulfilment)
- Vendor product management (including multi variant skus per product)
- Vendor payment setup (via Stripe Connect)
- Vendor account management/settings
- Buyer sign up
- Buyer order management (including order canelation)
- Buyer account management/settings

Right now MarketLaunch doesn’t have anything for storefront development out the box. The reason for this was because we found that while developers loved building beautiful storefronts, they didn’t want to spend time on the “boring” back office tools like the vendor dashboard. So with MarketLaunch you get all the “boring” parts taken care of and you can focus on building the best shopping experience for your users. 

### Future Developments
We’re looking to add more functionality to MarketLaunch over time to make marketplace development even easier. This includes;
- Adding support for Expo so you can easily spin out native mobile app versions of your vendor and buyer dashoards
- Creating a simple storefront to give you the foundations to build out your shopping expeirence and help speed up the development of your marketplaces storefront 
- Looking into adding in support for eCommerce platforms 

### Tech Stack
MarketLaunch is built using:
- Next.js
- React Native for Web
- Tamagui

## Deployment

A public deployment is available on [Vercel](https://market-launch.vercel.app/), with configuration setup for automatic deployment on commit.

### Deploying locally

#### Prerequisites

- You already have a [Swell account setup](https://swell.store/signup?utm_source=marketlaunch-github)
- A working nodeJS 20.x development enviroment
- A filled-out `.env` file, an example can be found at `.env.local.example`
- - This includes a Swell store that has been initialised with the correct models

1. Run `corepack enable` to make `yarn` avaliable
2. Run `yarn install` to fetch and install all dependencies.
3. Run `yarn marketlaunch:setup` and follow the instructions to setup Swell.
4. Run `yarn dev` to start the nextJS development mode.
