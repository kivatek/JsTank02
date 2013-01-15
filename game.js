enchant();

var Tank = Class.create(Sprite, {
	initialize: function(type,direction){
		Sprite.call(this, 32, 32);
		this.image = game.assets['js/images/chara3.png'];
		this.pattern = 0;
		this.direction = direction;
		this.isMoving = false;
		if (type == 0) {
			// 緑色の戦車を表すフレーム番号
			this.frame = 0;
			// キー入力の確認や戦車の移動プログラムを登録する。
			this.addEventListener('enterframe', function() {
				if (this.isMoving == false) {
					// 移動方向を表す情報をクリアする。
					this.vx = this.vy = 0;

					// キーの入力状態をチェックする。
					// 入力状態に合わせて戦車の向き情報を変更する。
					// 向き 0:下、1:左、2:右、3:上
					if (game.input.left) {
						this.direction = 1;
						this.vx = -1;
					} else if (game.input.right) {
						this.direction = 2;
						this.vx = 1;
					} else if (game.input.up) {
						this.direction = 3;
						this.vy = -1;
					} else if (game.input.down) {
						this.direction = 0;
						this.vy = 1;
					}
					if (this.vx || this.vy) {
						// 一ブロック分移動した後の座標を計算する。
						var x = this.x + this.vx * 32;
						var y = this.y + this.vy * 32;
						if (0 <= x && x < 320 && 0 <= y && y < 320) {
							// 一ブロック分移動した後の座標がステージの範囲内であれば移動処理を開始する。
							this.isMoving = true;
							// Timeline機能を使って移動処理を行う。
							this.tl
								.moveTo(x, y, 4, enchant.Easing.LINEAR)
								.and()
								.then(function() {
									// ４方向、３パターンのうちどのフレームを使うかを計算する。
									this.pattern = (this.pattern + 1) % 3;
									this.frame = this.direction * 6 + this.pattern;
								})
								.then(function() {
									this.isMoving = false;
								});
							
						}
					}
				}
			});
		} else {
			// デザートカラーの戦車を表すフレーム番号
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
