"use strict";

// Uncomment the following line when testing the mobile
// version using a desktop browser, or use your browser's
// developer mode emulation
// isMobile = true;

defineGame("arcade.js Example", "Morgan McGuire", "", "H", false, true, undefined, "touch keys end drag", 60, "arcade", "Arial");

// Leave controls that you don't want undefined and they will
// disappear from the instructions. Each control has lots of options:
Control.left.gamePurpose   = "Move Left";
// Control.left.repeatFrames  = 10;
// Control.left.delayFrames   = 0;
// Control.left.touchKeyLabel    = "<";
// Control.left.touchKeyStyle    = "bold 150px Arial";

Control.right.gamePurpose  = "Move Right";
Control.down.gamePurpose   = "Move Backward";
Control.up.gamePurpose     = "Move Forward";
Control.A.gamePurpose      = "Attack";
Control.B.gamePurpose      = "Defend";
Control.X.gamePurpose      = "Next Weapon";
Control.Y.gamePurpose      = "Cast Spell";
Control.select.gamePurpose = "Map";

// TODO: Remove sample code. Sprite CC-BY 3.0 Calciumtrice http://opengameart.org/users/calciumtrice
var entity, position, frame, spriteSheet = loadImage("rogue.png");
var animation = {'idleRight' : [makeSprite(spriteSheet, 32 * 0, 0, 32, 32, false, false, 0, false), 
                                makeSprite(spriteSheet, 32 * 1, 0, 32, 32, false, false, 0, false), 
                                makeSprite(spriteSheet, 32 * 2, 0, 32, 32, false, false, 0, false), 
                                makeSprite(spriteSheet, 32 * 3, 0, 32, 32, false, false, 0, false), 
                                makeSprite(spriteSheet, 32 * 4, 0, 32, 32, false, false, 0, false), 
                                makeSprite(spriteSheet, 32 * 5, 0, 32, 32, false, false, 0, false), 
                                makeSprite(spriteSheet, 32 * 6, 0, 32, 32, false, false, 0, false), 
                                makeSprite(spriteSheet, 32 * 7, 0, 32, 32, false, false, 0, false), 
                                makeSprite(spriteSheet, 32 * 8, 0, 32, 32, false, false, 0, false), 
                                makeSprite(spriteSheet, 32 * 9, 0, 32, 32, false, false, 0, false)]};

function onInit() {
    // TODO
    // playSound(TITLE_MUSIC, true);
}


function onGameStart() {
    // TODO: Remove sample code
    position = vec2(screenWidth / 2, screenHeight / 2);
    frame = 10000;

    entity = new Entity(vec2(screenWidth / 2, screenHeight * 3 / 4), 
                        animation['idleRight'][0],
                        vec2(256, 256), 0, false);
    entity.animationFrame = 0;
}


function onUIModeChange(oldMode, newMode) {
    if (newMode === UIMode.TITLE) {
        // Entering title mode
        // stopSound(GAME_MUSIC);
        // playSound(TITLE_MUSIC, true);
    } else if (oldMode === UIMode.TITLE) {
        // Leaving title mode
        // stopSound(TITLE_MUSIC);
        // playSound(GAME_MUSIC, true);
    }
}


function onControlRepeat(control) {
    onControlStart(control);
}


function onControlStart(control) {
    switch (control) {
    case Control.A:
        // TODO
        break;

    case Control.B:
        // TODO
        break;

    case Control.X:
        // TODO
        break;

    case Control.Y:
        // TODO
        break;

    case Control.left:
        // TODO
        break;

    case Control.right:
        // TODO
        break;

    case Control.down:
        // TODO
        break;

    case Control.up:
        // TODO
        break;

    case Control.select:
        // TODO
        break;
    }
}


function onSimulation() {
    // TODO: Remove sample code
    ++frame;
    position = add(position, mul(direction(Control.currentDirection()), 10));
    position.x = clamp(position.x, 0, screenWidth);
    position.y = clamp(position.y, 0, screenHeight);

    if (position.y < 200) {
        setUIMode(UIMode.GAME_OVER, (frame / 10) % 10000);
    }

    entity.animationFrame = (entity.animationFrame + 1) % 80;
    entity.sprite = animation['idleRight'][floor(entity.animationFrame / 8)];
}


// A default implementation is provided
// function onInstructionsDraw() {}

function onTitleDraw() {
    fillRectangle(0, 0, screenWidth, screenHeight, makeColor(0.2, 0.2, 0.2));
    fillText(_ch_gameName, screenWidth / 2, screenHeight / 3, makeColor(1, 1, 0), "100px " + defaultFont, "center", "middle");
    drawHighScores(800, 410, makeColor(1, 1, 1));
}


function onGameDraw() {
    // TODO: Remove sample code
    fillRectangle(0, 0, screenWidth, screenHeight, makeColor(0, 0, 0));

    fillRectangle(0, 0, screenWidth, 100, makeColor(1, 0, 0));

    fillRectangle(position.x - 100, position.y - 100, 200, 200, Control.A.isActive ? makeColor(1, 0, 0) : makeColor(0, 1, 0));
    fillText(numberWithCommas(floor(frame / 10) % 10000), position.x, position.y, makeColor(0, 0, 0), "50px Times", "center", "middle");

    entity.draw();

    if (uiMode() === UIMode.GAME_OVER) {

        fillText("GAME OVER", screenWidth / 2, screenHeight / 2, makeColor(1, 1, 1), "100px " + defaultFont, "center", "middle");
        
    } else if (isMobile) {
        // Draw the touch keys
        //_ch_ctx.globalAlpha = 0.5;
        drawArcadeTouchKeys();
        _ch_ctx.globalAlpha = 1.0;
    }
}
