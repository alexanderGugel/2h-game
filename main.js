var safe = false;

var checkConflict = function () {
  if ((player.x + 20) <= (car.x + 80) && player.x >= car.x) {
    $('.dead').show();
  }
};

var checkPolice = function () {
  if ((player.x + 20) <= (police.x + 80) && player.x >= police.x) {
    safe = true;
    $('.status').text('You are safe (for 2s).');
    setTimeout(function () {
      safe = false;
      $('.status').text('Your are not safe anymore.');
    }, 2000);
  }
};

var checkCab = function () {

};


var player = {
  x: Math.floor(window.innerWidth/2),
  moveRight: function () {
    if (this.x < window.innerWidth-20) {
      this.x += 5;
      $('.player').css('margin-left', this.x + 'px');
      checkConflict();
    }
  },
  moveLeft: function () {
    if (this.x > 0) {
      this.x -= 5;
      $('.player').css('margin-left', this.x + 'px');
      checkConflict();
    }
  }
};

var car = {
  render: function () {
    this.x = Math.floor(Math.random()*window.innerWidth);
    $('.car').animate({'margin-left': this.x + 'px'}, {
      duration: 2000,
      step: function (x) {
        car.x = x;
        if (!safe) {
          checkConflict();
        }
      }
    });
  }
};

var police = {
  render: function () {
    this.x = Math.floor(Math.random()*window.innerWidth);
    $('.police').animate({'margin-left': this.x + 'px'}, {
      duration: 2000,
      step: function (x) {
        police.x = x;
        checkPolice();
      }
    });
  }
};

var cab = {
  render: function () {
    this.x = Math.floor(Math.random()*window.innerWidth);
    $('.cab').animate({'margin-left': this.x + 'px'}, {
      duration: 2000,
      step: function (x) {
        cab.x = x;
        checkCab();
      }
    });
  }
};

$('body').keydown(function(e) {
  if (e.keyCode == 37) { // left
    player.moveLeft();
  } else if (e.keyCode == 39) { // right
    player.moveRight();
  }
});

setInterval(car.render, 2000);
setInterval(police.render, 2000);
setInterval(cab.render, 2000);
