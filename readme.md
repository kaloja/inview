# Inview

Inview is a very simple and high-performance way to detecting elements in viewport with vanilla JavaScript.

***

## Options
Inview has a number of options you can customize. Below are the defaults:

```javascript
inview({
  threshold: 0.25,
  offsetTop: 0,
  offsetRight: 0,
  offsetBottom: 0,
  offsetLeft: 0
});
```

***

## Information

Inview is a redesign of emergence.js, by [Christian Miller](https://xtianmiller.github.io/emergence.js/), to better fit my own needs. It's simplified and does only one thing now - returning true or false depending on whether the element is in viewport or not. To detect if an element is in viewport on scroll you have to use Inview in combination with a render function.
