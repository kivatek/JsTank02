enchant();

var Tank = Class.create(Sprite, {
	initialize: function(type,direction){
		Sprite.call(this, 32, 32);
		this.image = game.assets['js/images/chara3.png'];
		if (type == 0) {
			// 緑色の戦車
			this.frame = 0;
			// キー入力の確認や戦車の移動プログラムを登録する。
			this.addEventListener('enterframe', function() {
				if (this.isMoving) {
					this.moveBy(this.vx, this.vy);
					// １ブロック分動いたかどうかを確認する。
					if ((this.vx && this.x % 32 == 0) || (this.vy && this.y % 32 == 0)) {
						this.isMoving = false;
						this.pattern = 1;
					} else {
						// ４方向、３パターンのうちどのフレームを使うかを計算する。
						this.pattern = (this.pattern + 1) % 3;
					}
					this.frame = this.direction * 6 + this.pattern;
				} else {
					this.vx = this.vy = 0;

					// 向き 0:下、1:左、2:右、3:上
					if (game.input.left) {
						this.direction = 1;
						this.vx = -16;
					} else if (game.input.right) {
						this.direction = 2;
						this.vx = 16;
					} else if (game.input.up) {
						this.direction = 3;
						this.vy = -16;
					} else if (game.input.down) {
						this.direction = 0;
						this.vy = 16;
					}
					if (this.vx) {
						var x = this.x + this.vx;
						var y = this.y + this.vy;
						if (0 <= x && x < 320-32) {
							this.isMoving = true;
							arguments.callee.call(this);
						}
					}
					if (this.vy) {
						var x = this.x + this.vx;
						var y = this.y + this.vy;
						if (0 <=y && y < 320-32) {
							this.isMoving = true;
							arguments.callee.call(this);
						}
					}
				}
			});
		} else {
			// デザートカラーの戦車
			this.frame = 3;
		}
	}
});

window.onload = function() {
	
	game = new Game(320, 320);
	
	game.fps = 24;
	game.touched = false;
	game.preload('js/images/chara3.png');
	
	game.onload = function() {
		game.currentScene.backgroundColor = 'rgb(208, 255, 255)';

		// 緑色の戦車（自分用）のスプライトを用意。
		var myTank = new Tank(0, 0);
		// 表示位置の指定
		myTank.x = 128;
		myTank.y = 160;
		myTank.isMoving = false;
		// 向き 0:下、1:左、2:右、3:上
		myTank.direction = 0;
		myTank.pattern = 0;
		
		// デザートカラーの戦車（敵用）のスプライトを用意。
		var teki = new Tank(1, 0);
		// 表示位置の指定
		teki.x = 192;
		teki.y = 160;

		// 用意したスプライトをシーンに関連づける。シーンはスクラッチで言えばステージのこと。
		// これで表示されるようになる。
		game.currentScene.addChild(teki);
		game.currentScene.addChild(myTank);
	};
	game.start();
};
