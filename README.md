# PerimeterX Monitor

A module to monitor the current version of PerimeterX (pX) on desired site(s).

## Installation
Using npm:
`npm i @jameskbecker/px-monitor`
or yarn:
`yarn add @jameskbecker/px-monitor`

## How to Use
```
const pxMonitor = require('px-monitor');
(async () => {
    const latestPx = await monitor.getLatestPx('https://www.skechers.com/en-gb/');
})();
```