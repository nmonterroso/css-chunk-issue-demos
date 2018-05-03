# CSS Chunk Issue Demo

A quick project to demonstrate the following issues:
1. Common includes in multiple CSS chunks will override style overrides
2. Combining styles does not work as documented

## installation
```
$> yarn install
```

## style override demo
This issue happens when a stylesheet is loaded by multiple chunks where a chunk loaded earlier in the app lifecycle can have its styles overridden in an unexpected, inconsistent manner - depending on the order in which they were loaded.

To run this demo:
```
$> yarn override-demo
```
Then open up http://localhost:3000 in a browser.

The intention is to have `span 1` be blue, and for `span 2` to be red since `ComponentA.css`'s `div > span` rule is placed _after_ the `div span` rule. Even though they are the same specificity `div > span` should be applied because it's placed after `div span`.

If `Load Component A` is pressed _before_ `Load Component B`, however, the `div span` rule from `common.css` override the `div > span` rule. If the B button is pressed before the A button, however, things end up displayed as intended because the style overriding is in an order that allows the rules to be applied as intended.


## style combine demo
```
$> yarn combine-demo
```
Then open up http://localhost:3001 in a browser

The app won't load up. The only difference between this demo and the style override demo above is that configuration from the [docs](https://github.com/webpack-contrib/mini-css-extract-plugin/blob/d7d0afcda834d9563ed18b581130ead05789aea0/README.md#extracting-all-css-in-a-single-file) to combine the styles into a single css file to prevent the problem from the override demo above.

I was able to get the app to load up properly if I added `styles.js` to my app, but couldn't find anything about that in the MiniCssExtractorPlugin docs.

I also noticed that if I remove `app.css` from being imported in `App.js` I do not need to manually load `styles.js` and `styles.css` into the app, they'll get automatically added when a chunk is loaded. However, this means I can't have any styles for the entry chunk.
