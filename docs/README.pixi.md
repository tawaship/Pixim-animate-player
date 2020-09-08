# pixi-animate-player

A module for playing content published by Adobe Animate with "[pixi.js](https://github.com/pixijs/pixi.js)".

[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)

---

## Core module
[pixi-animate-core](https://tawaship.github.io/pixi-animate-core/)

## Support version

- A complete set of content published with Adobe Animate version 20.02
- pixi.js 5.3.2

I have not confirmed the operation on other versions.

## How to use

```sh
git clone https://github.com/tawaship/Pixim-animate-player
```

<br>

```html
<script src="https://code.createjs.com/1.0.0/createjs.min.js"></script>
<script src="/path/to/lib/pixi.5.3.2.min.js"></script>
<script src="/path/to/dist/pixi-animate-player.min.js"></script>
<script src="[your content]"></script>
```

<br>

```javascript
var player = new PIXI.animate.Player(
	"[conposition id]", // "lib.properties.id" in Animate content.
	"[root class name]", // Root class name of Animate content.
	"[content directory path]", // Directory path of Animate content.
	{
		antialias: true
	} // Options of PIXI.Application.
);

player
	.prepareAsync({
		useSynchedTimeline: true,
		crossOrigin: false
	})
	.then(function() {
		player.play();
	});
```

## Samples

<a href="https://github.com/tawaship/Pixim-animate-player/" target="_blank">github</a>

<a href="https://tawaship.github.io/Pixim-animate-player/docs/" target="_blank">documents</a>

<a href="https://tawaship.github.io/Pixim-animate-player/samples/" target="_blank">samples</a>