var config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 780,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 200 }
      }
    },
    scene: {
      preload: preload,
      create: create,
      update: update
    }
  };
  
  var game = new Phaser.Game(config);
  var game_over = document.getElementById('popup').style.visibility="hidden";
  var car;
  var obstacles;
  var bullets;
  
  
  function preload ()
  {
    this.load.image('car', 'car.png');
    this.load.image('obf', 'obf.png');
    this.load.image('bullet', 'bullet.png');
  }
  
  function create ()
  {
    counter = 0;
    state = false;
    car = this.physics.add.image(660, 300, 'car');
    car.setCollideWorldBounds(true);
    obstacles = this.physics.add.group();
    bullets = this.physics.add.group();
    i = 200;
  
    this.time.addEvent({
      delay: i,
      callback: function() {
        var obstacle = obstacles.create(Phaser.Math.Between(car.x+250, 1920), Phaser.Math.Between(100, 500), 'obf');
        var obstacle = obstacles.create(Phaser.Math.Between(0, car.x-250), Phaser.Math.Between(100, 500), 'obf');
        obstacle.setVelocityX(-200);
        obstacle.setCollideWorldBounds(true);
        obstacle.setBounce(1);
        obstacle.setInteractive();
        document.getElementById("score1").textContent = "Кол-во убитых пенисов: " + counter;
      },
      loop: true
    });
  
    this.input.keyboard.on('keydown_W', function (event) {
      car.setVelocityY(-200);
    });
    this.input.keyboard.on('keydown_A', function (event) {
      car.setVelocityX(-200);
    });
    this.input.keyboard.on('keydown_SPACE', function (event) {
      car.setVelocityY(-200);
    });
    this.input.keyboard.on('keydown_D', function (event) {
      car.setVelocityX(200);
    });
    this.input.keyboard.on('keydown_S', function (event) {
      car.setVelocityY(200);
    });
    this.input.keyboard.on('keydown_ESC', function (event) {
      alert("Пауза");
    });
    
  
    
    this.input.on('pointerdown', function (pointer) {
      var bullet = bullets.create(car.x, car.y, 'bullet');
      bullet.setVelocity(pointer.x - car.x, pointer.y - car.y);
    }, this);
  
    this.physics.add.collider(bullets, obstacles, function (bullet, obstacle) {
      bullet.destroy();
      obstacle.destroy();
      counter++;
    });
  }
  
  function update ()
  {
      this.physics.world.collide(car, obstacles, function() {
        document.getElementById("score").textContent = "Кол-во убитых пенисов: " + counter;
        car.setTint(0xff0000);
        var game_over = document.getElementById('popup').style.visibility="visible";
        game.scene.pause("default");
      });
  }
  function pause()
  {
    game.scene.pause("default");
  }
  function resume()
  {
    game.scene.resume("default");
  }