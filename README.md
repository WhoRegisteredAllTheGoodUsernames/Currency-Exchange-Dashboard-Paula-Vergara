# Ria Software Engineer Intern - Coding Challenge

## Setup

System requirements:
 - Operating System: macOS, Windows (or WSL) or Linux
 - Packages: Node (>= 20.9) and npm

> [!NOTE]
> This project was developed and tested on Linux, so, the installation procedure is focused on that platform. It's the standard procedure though, but note the project directory.

Installation:
 - Enter the project directory `my-app`:
    `$ cd my-app`
 - Install dependencies:
    `$ npm install`
 - Start development server:
    `$ npm run dev`

## Features
 - Currency Converter: Convert a custom amount of one currency to another.
    - All currencies reported by [Frankfurter API](https://frankfurter.dev/) are supported.
    - Uses the latest values for conversion.
    - Can interchange the 'from' and 'to' values with the press of a button, which is useful for a quick comparison between those currencies.
 - Exchange Rate Overview: Compare the exchange rates from a base currency to another 10 others, showing the variation in a range of time.
    - The exchange rates are shown in a line chart, making easy to compare to visualise the differences in scale of other currencies.
    - The 10 currencies are selected at random.

## AI Usage

AI wasn't used for generating code, but as a guidance on how issues with React's `state`, TailwindCSS's classes usage and how to implement the 'off-line' overlay. This usage was supported on documentation and other trusted resources.

## Assumptions and trade-offs

Since the development was focused on the Currency Converter and Exchange Rate Overview features, the interface looks a bit empty. Adding more features or graphics might help, since there's room for it, but wasn't the objective now.

## Future TODO

It's possible that a different look might be desired: The style is intentionally simple, clean and static, since I feels that's the easiest to use and requires a minimal amount of steps for accessing the relevant features. This can be improved adding short instructions. Also, some eye-candy on the aesthetic would be good.

