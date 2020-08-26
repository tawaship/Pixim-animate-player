# pixi-createjs-player

"pixi-createjs-player" is a plugin for playing content published by Adobe Animate with "[pixi.js](https://github.com/pixijs/pixi.js)".

[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)

---

## Support version

- A complete set of content published with Adobe Animate version 20.02
- pixi.js 5.3.2

I have not confirmed the operation on other versions.

## How to use

```sh
git clone https://github.com/tawaship/Pixim-createjs-player
```

<br>

```html
<script src="https://code.createjs.com/1.0.0/createjs.min.js"></script>
<script src="/path/to/lib/pixi.5.3.2.min.js"></script>
<script src="/path/to/dist/pixi-createjs-player.min.js"></script>
```

<br>

```javascript
var player = new PIXI.createjs.Player(
	"2FA8E0C7230941478CE2CA3DB82DBEDF", // "lib.properties.id" in Animate content.
	"game", // Root class name of Animate content.
	"game/", // Directory path of Animate content.
	{
		antialias: true
	} // Options of PIXI.Application.
);

player
	.prepareAsync({
		useSynchedTimeline: true
	})
	.then(function() {
		player.play();
	});
```

## Samples

[github](../..//samples/)