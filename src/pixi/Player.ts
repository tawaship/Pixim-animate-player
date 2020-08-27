import * as Core from '../common/core';
import * as _PIXI from 'pixi.js';

/**
 * @ignore
 */
declare const window: any;

namespace PIXI {
	export namespace animate {
		export type TPlayerOption = {
			useSynchedTimeline?: boolean
		};
		
		/**
		 * @see https://tawaship.github.io/Pixim.js/classes/pixim.application.html
		 */
		export class Player {
			private _app: _PIXI.Application;
			private _id: string;
			private _rootClass: any;
			private _basepath: string;
			private _stage: any;
			
			/**
			 * @param id "lib.properties.id" in Animate content.
			 * @param rootName Root class name of Animate content.
			 * @param basepath Directory path of Animate content.
			 * @param pixiOptions Options of PIXI.Application.
			 */
			constructor(id: string, rootName: string, basepath: string, pixiOptions: Object = {}) {
				const comp = window.AdobeAn.getComposition(id);
				if (!comp) {
					throw new Error('no composition');
				}
				
				const lib: Core.TAnimateLibrary = comp.getLibrary();
				const root = lib[rootName];
				if (!root) {
					throw new Error('no root class');
				}
				
				const prop = lib.properties;
				
				this._app = new _PIXI.Application(Object.assign(pixiOptions, {
					width: prop.width,
					height: prop.height,
					backgroundColor: parseInt(prop.color.slice(1), 16)
				}));
				
				document.body.appendChild(this._app.view);
				this._app.stop();
				
				this._id = id;
				this._rootClass = root;
				this._basepath = basepath;
				
				window.createjs.Ticker.framerate = prop.fps;
				
				this._handleTick = this._handleTick.bind(this);
			}
			
			/**
			 * Prepare createjs content published with Adobe Animate.
			 */
			prepareAsync(options: TPlayerOption = {}) {
				return Core.prepareAnimateAsync(this._id, this._basepath)
					.then((lib: Core.TAnimateLibrary) => {
						const exportRoot = new this._rootClass();
						
						this._stage = new lib.Stage();
						Core.initStage(this._stage, options);
						
						Object.defineProperties(window, {
							exportRoot: {
								value: exportRoot
							},
							
							stage: {
								value: this._stage
							}
						});
						
						window.AdobeAn.compositionLoaded(lib.properties.id);
						
						this._app.render();
						
						this._stage.addChild(exportRoot);
						
						this._app.stage.addChild(exportRoot.getPixi());
					});
			}
			
			play() {
				window.createjs.Ticker.addEventListener('tick', this._handleTick);
				
				return this;
			}
			
			stop() {
				window.createjs.Ticker.removeEventListener('tick', this._handleTick);
				
				return this;
			}
			
			private _handleTick() {
				this._stage._tickFunction();
				this.app.render();
			}
			
			get app(): _PIXI.Application {
				return this._app;
			}
		}
	}
}

/**
 * @ignore
 */
export import TPlayerOption = PIXI.animate.TPlayerOption;

/**
 * @ignore
 */
export import Player = PIXI.animate.Player;