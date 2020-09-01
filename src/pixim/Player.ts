import { prepareAnimateAsync, TAnimateLibrary, TPlayerOption, TTickerData } from '@tawaship/pixi-animate-core';
import { initStage } from '../common/core';
import * as _Pixim from '@tawaship/pixim.js';

/**
 * @ignore
 */
declare const window: any;

namespace Pixim {
	export namespace animate {
		/**
		 * @see https://tawaship.github.io/Pixim.js/classes/pixim.application.html
		 */
		export class Player extends _Pixim.Application {
			private _id: string;
			private _rootClass: any;
			private _basepath: string;
			private _stage: any;
			
			/**
			 * @param id "lib.properties.id" in Animate content.
			 * @param rootName Root class name of Animate content.
			 * @param basepath Directory path of Animate content.
			 * @param pixiOptions Options of PIXI.Application.
			 * @param piximOptions Options of Pixim.Application.
			 */
			constructor(id: string, rootName: string, basepath: string, pixiOptions: Object = {}, piximOptions: _Pixim.TApplicationOption = {}) {
				const comp = window.AdobeAn.getComposition(id);
				if (!comp) {
					throw new Error('no composition');
				}
				
				const lib: TAnimateLibrary = comp.getLibrary();
				const root = lib[rootName];
				if (!root) {
					throw new Error('no root class');
				}
				
				const prop = lib.properties;
				
				super(Object.assign(pixiOptions, {
					width: prop.width,
					height: prop.height,
					backgroundColor: parseInt(prop.color.slice(1), 16)
				}), piximOptions);
				
				this.app.render();
				
				this._id = id;
				this._rootClass = root;
				this._basepath = basepath;
				
				window.createjs.Ticker.framerate = prop.fps;
				
				this._handleTick = this._handleTick.bind(this);
			}
			
			/**
			 * Prepare createjs content published with Adobe Animate.
			 * @async
			 */
			prepareAsync(options: TPlayerOption = {}) {
				return prepareAnimateAsync(this._id, this._basepath, options)
					.then((lib: TAnimateLibrary) => {
						const exportRoot = new this._rootClass();
						
						this._stage = new lib.Stage();
						initStage(this._stage, options);
						
						Object.defineProperties(window, {
							exportRoot: {
								value: exportRoot
							},
							
							stage: {
								value: this._stage
							}
						});
						
						window.AdobeAn.compositionLoaded(lib.properties.id);
						
						const Content = _Pixim.Content.create();
						
						Content.defineLibraries({
							root: class Root extends _Pixim.Container {
								constructor($: any) {
									super();
									
									this.addChild($.vars.root);
								}
							}
						});
						
						const content = new Content();
						content.addVars({
							root: exportRoot.pixi
						});
						
						this._stage.addChild(exportRoot);
						
						return this.attachAsync(content)
							.then(() => {
								return lib;
							});
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
			
			private _handleTick(e: TTickerData) {
				this._stage.updateForPixi(e);
				this.app.render();
			}
		}
	}
}

/**
 * @ignore
 */
export import Player = Pixim.animate.Player;