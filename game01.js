enchant();

var Tank = Class.create(Sprite, {
	initialize: function(type,direction){
		Sprite.call(this, 32, 32);
		this.image = game.assets['js/images/chara3.png'];
		if (type == 0) {
			this.frame = 0;
		} else {
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

		var myTank = new Tank(0, 0);
		myTank.x = 128;
		myTank.y = 160;
		myTank.isMoving = false;
		// 向き 0:下、1:左、2:右、3:下
		myTank.direction = 0;
		myTank.animCheck = 0;
		myTank.pattern = 0;
		myTank.addEventListener('enterframe', function() {
			this.animCheck++;
			// ４方向、３パターンのうちどのフレームを使うかを計算する。
			this.frame = this.direction * 6;
			if (this.isMoving) {
				this.moveBy(this.vx, this.vy);
				if ((this.animCheck % 2) == 1) {
					this.pattern++;
					this.pattern %= 4;
				}
				if ((this.vx && this.x % 32 == 0) || (this.vy && this.y % 32 == 0)) {
					this.isMoving = false;
					this.pattern = 1;
				}
			} else {
				this.vx = this.vy = 0;

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
						this.animCheck = 0;	// アニメーションカウンタは必要に応じてリセット。
						arguments.callee.call(this);
					}
				}
				if (this.vy) {
					var x = this.x + this.vx;
					var y = this.y + this.vy;
					if (0 <=y && y < 320-32) {
						this.isMoving = true;
						this.animCheck = 0;	// アニメーションカウンタは必要に応じてリセット。
						arguments.callee.call(this);
					}
				}
			}
		});
		
		
		
		var teki = new Tank(1, 0);
		teki.x = 192;
		teki.y = 160;

		game.currentScene.addChild(teki);
		game.currentScene.addChild(myTank);

	};
	game.start();
};
