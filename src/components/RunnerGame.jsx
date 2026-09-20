import React, { useEffect, useRef, useState } from "react";

const RunnerGame = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const game = useRef({
    player: {
      lane: 1,
      x: 0,
      y: 0,
      width: 42,
      height: 55,
    },
    obstacles: [],
    coins: [],
    speed: 5,
    distance: 0,
    lastTime: 0,
    spawnTimer: 0,
    coinTimer: 0,
  });

  // =========================
  // START / RESTART GAME
  // =========================

  const startGame = () => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const width = canvas.width;
    const height = canvas.height;

    game.current = {
      player: {
        lane: 1,
        x: width / 2 - 21,
        y: height - 90,
        width: 42,
        height: 55,
      },

      obstacles: [],
      coins: [],

      speed: 5,
      distance: 0,

      lastTime: performance.now(),

      spawnTimer: 0,
      coinTimer: 0,
    };

    setScore(0);
    setGameOver(false);
    setGameStarted(true);
  };

  // =========================
  // MOUSE CONTROL
  // =========================

  const handleMouseMove = (event) => {
    if (!gameStarted || gameOver) return;

    const canvas = canvasRef.current;

    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();

    const mouseX = event.clientX - rect.left;

    const relativeX = mouseX / rect.width;

    if (relativeX < 0.33) {
      game.current.player.lane = 0;
    } else if (relativeX < 0.66) {
      game.current.player.lane = 1;
    } else {
      game.current.player.lane = 2;
    }
  };

  // =========================
  // KEYBOARD CONTROL
  // =========================

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Space starts/restarts the game
      if (event.code === "Space") {
        if (!gameStarted || gameOver) {
          event.preventDefault();
          startGame();
        }

        return;
      }

      if (!gameStarted || gameOver) return;

      // Left
      if (
        event.key === "ArrowLeft" ||
        event.key.toLowerCase() === "a"
      ) {
        event.preventDefault();

        game.current.player.lane = Math.max(
          0,
          game.current.player.lane - 1
        );
      }

      // Right
      if (
        event.key === "ArrowRight" ||
        event.key.toLowerCase() === "d"
      ) {
        event.preventDefault();

        game.current.player.lane = Math.min(
          2,
          game.current.player.lane + 1
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [gameStarted, gameOver]);

  // =========================
  // GAME LOOP
  // =========================

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const laneWidth = canvas.width / 3;

    const drawGame = (time) => {
      const state = game.current;

      const delta = Math.min(
        (time - state.lastTime) / 16.67,
        2
      );

      state.lastTime = time;

      // Distance
      state.distance += state.speed * delta;

      // Timers
      state.spawnTimer += delta;
      state.coinTimer += delta;

      // =========================
      // SPAWN OBSTACLES
      // =========================

      if (state.spawnTimer > 55) {
        const lane = Math.floor(
          Math.random() * 3
        );

        state.obstacles.push({
          lane,
          y: -70,
          width: 48,
          height: 48,
        });

        state.spawnTimer = 0;
      }

      // =========================
      // SPAWN COINS
      // =========================

      if (state.coinTimer > 35) {
        const lane = Math.floor(
          Math.random() * 3
        );

        state.coins.push({
          lane,
          y: -30,
          radius: 10,
        });

        state.coinTimer = 0;
      }

      // =========================
      // MOVE OBSTACLES
      // =========================

      state.obstacles.forEach((obstacle) => {
        obstacle.y += state.speed * delta;
      });

      // =========================
      // MOVE COINS
      // =========================

      state.coins.forEach((coin) => {
        coin.y += state.speed * delta;
      });

      // =========================
      // REMOVE OLD OBJECTS
      // =========================

      state.obstacles =
        state.obstacles.filter(
          (obstacle) =>
            obstacle.y <
            canvas.height + 100
        );

      state.coins =
        state.coins.filter(
          (coin) =>
            coin.y <
            canvas.height + 50
        );

      // =========================
      // PLAYER MOVEMENT
      // =========================

      const targetX =
        state.player.lane * laneWidth +
        laneWidth / 2 -
        state.player.width / 2;

      state.player.x +=
        (targetX - state.player.x) *
        0.18;

      // =========================
      // CLEAR CANVAS
      // =========================

      ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
      );

      // =========================
      // BACKGROUND
      // =========================

      const gradient =
        ctx.createLinearGradient(
          0,
          0,
          0,
          canvas.height
        );

      gradient.addColorStop(
        0,
        "#0f172a"
      );

      gradient.addColorStop(
        1,
        "#020617"
      );

      ctx.fillStyle = gradient;

      ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
      );

      // =========================
      // ROAD
      // =========================

      ctx.fillStyle = "#1e293b";

      ctx.fillRect(
        25,
        0,
        canvas.width - 50,
        canvas.height
      );

      // =========================
      // LANE LINES
      // =========================

      ctx.strokeStyle =
        "rgba(255,255,255,0.15)";

      ctx.lineWidth = 2;

      ctx.setLineDash([
        20,
        20,
      ]);

      ctx.beginPath();

      ctx.moveTo(
        laneWidth,
        0
      );

      ctx.lineTo(
        laneWidth,
        canvas.height
      );

      ctx.moveTo(
        laneWidth * 2,
        0
      );

      ctx.lineTo(
        laneWidth * 2,
        canvas.height
      );

      ctx.stroke();

      ctx.setLineDash([]);

      // =========================
      // DRAW OBSTACLES
      // =========================

      state.obstacles.forEach(
        (obstacle) => {
          const x =
            obstacle.lane *
              laneWidth +
            laneWidth / 2 -
            obstacle.width / 2;

          ctx.fillStyle =
            "#ef4444";

          ctx.beginPath();

          ctx.roundRect(
            x,
            obstacle.y,
            obstacle.width,
            obstacle.height,
            8
          );

          ctx.fill();

          ctx.fillStyle =
            "#fca5a5";

          ctx.fillRect(
            x + 10,
            obstacle.y + 10,
            obstacle.width - 20,
            8
          );
        }
      );

      // =========================
      // DRAW COINS
      // =========================

      state.coins.forEach(
        (coin) => {
          const x =
            coin.lane *
              laneWidth +
            laneWidth / 2;

          ctx.beginPath();

          ctx.arc(
            x,
            coin.y,
            coin.radius,
            0,
            Math.PI * 2
          );

          ctx.fillStyle =
            "#facc15";

          ctx.fill();

          ctx.strokeStyle =
            "#fde68a";

          ctx.lineWidth = 3;

          ctx.stroke();
        }
      );

      // =========================
      // DRAW PLAYER
      // =========================

      ctx.fillStyle =
        "#6366f1";

      ctx.beginPath();

      ctx.roundRect(
        state.player.x,
        state.player.y,
        state.player.width,
        state.player.height,
        10
      );

      ctx.fill();

      // =========================
      // PLAYER EYES
      // =========================

      ctx.fillStyle =
        "#ffffff";

      ctx.beginPath();

      ctx.arc(
        state.player.x + 14,
        state.player.y + 18,
        4,
        0,
        Math.PI * 2
      );

      ctx.arc(
        state.player.x + 28,
        state.player.y + 18,
        4,
        0,
        Math.PI * 2
      );

      ctx.fill();

      // =========================
      // COLLISION DETECTION
      // =========================

      state.obstacles.forEach(
        (obstacle) => {
          const obstacleX =
            obstacle.lane *
              laneWidth +
            laneWidth / 2 -
            obstacle.width / 2;

          const hit =
            state.player.x <
              obstacleX +
                obstacle.width &&
            state.player.x +
              state.player.width >
              obstacleX &&
            state.player.y <
              obstacle.y +
                obstacle.height &&
            state.player.y +
              state.player.height >
              obstacle.y;

          if (hit) {
            setGameOver(true);
          }
        }
      );

      // =========================
      // COLLECT COINS
      // =========================

      state.coins =
        state.coins.filter(
          (coin) => {
            const coinX =
              coin.lane *
                laneWidth +
              laneWidth / 2;

            const collected =
              Math.abs(
                state.player.x +
                  state.player.width /
                    2 -
                  coinX
              ) < 28 &&
              Math.abs(
                state.player.y +
                  state.player.height /
                    2 -
                  coin.y
              ) < 35;

            if (collected) {
              setScore(
                (previous) =>
                  previous + 10
              );

              return false;
            }

            return true;
          }
        );

      // =========================
      // DISTANCE SCORE
      // =========================

      setScore((previous) => {
        const distanceScore =
          Math.floor(
            state.distance / 10
          );

        if (
          distanceScore >
          previous
        ) {
          return distanceScore;
        }

        return previous;
      });

      // =========================
      // INCREASE DIFFICULTY
      // =========================

      state.speed = Math.min(
        11,
        5 +
          state.distance /
            1800
      );

      animationRef.current =
        requestAnimationFrame(
          drawGame
        );
    };

    animationRef.current =
      requestAnimationFrame(
        drawGame
      );

    return () => {
      cancelAnimationFrame(
        animationRef.current
      );
    };
  }, [gameStarted, gameOver]);

  // =========================
  // UI
  // =========================

  return (
    <div className="w-full max-w-3xl mx-auto">

      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950 shadow-2xl">

        {/* HEADER */}

        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">

          <div>
            <h3 className="text-lg font-bold text-white">
              🎮 Dhanu Runner
            </h3>

            <p className="text-xs text-slate-400">
              🖱️ Mouse or ⌨️ ← → Arrow Keys
            </p>
          </div>

          <div className="text-right">

            <p className="text-xs text-slate-400">
              SCORE
            </p>

            <p className="text-xl font-bold text-indigo-400">
              {score}
            </p>

          </div>

        </div>

        {/* GAME */}

        <div
          className="relative p-4"
          onMouseMove={
            handleMouseMove
          }
        >

          <canvas
            ref={canvasRef}
            width={600}
            height={500}
            className="w-full max-w-full rounded-2xl border border-white/10 cursor-crosshair"
          />

          {/* START / GAME OVER */}

          {!gameStarted ||
          gameOver ? (
            <div className="absolute inset-4 flex items-center justify-center rounded-2xl bg-black/60 backdrop-blur-sm">

              <div className="text-center px-6">

                {gameOver ? (
                  <>
                    <div className="text-4xl mb-3">
                      💥
                    </div>

                    <h4 className="text-2xl font-bold text-white mb-2">
                      Game Over
                    </h4>

                    <p className="text-slate-300 mb-5">
                      Final Score:{" "}
                      {score}
                    </p>
                  </>
                ) : (
                  <>
                    <div className="text-4xl mb-3">
                      🎮
                    </div>

                    <h4 className="text-2xl font-bold text-white mb-2">
                      Ready?
                    </h4>

                    <p className="text-slate-300 mb-5">
                      Use your mouse
                      or ← → arrow
                      keys to move
                    </p>
                  </>
                )}

                <button
                  onClick={
                    startGame
                  }
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold hover:scale-105 transition-transform"
                >
                  {gameOver
                    ? "Play Again"
                    : "Start Game"}
                </button>

              </div>

            </div>
          ) : null}

        </div>

      </div>

    </div>
  );
};

export default RunnerGame;