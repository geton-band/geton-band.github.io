"use strict";
(function particle_spawner() {
  const particleDimension = 64;
  const particleDimensionHalf = particleDimension / 2;
  const pentagramParticleImage = new Image(particleDimension, particleDimension);
  pentagramParticleImage.src = "./assets/img/pentagram_particle.webp"

  const particleUpdateIntervalMs = 33;
  const particleLifetimeMs = 600;
  const particleSpeed = 4;
  const gravity = 0.1;
  const pointerMoveParticleDelayMs = 200;
  const numClickParticles = 4;
  var lastPointerMove;
  var lastPointerMoveParticleSpawned;

  function spawnParticle(location, direction, applyGravity) {
    const element = document.createElement("img");
    element.src = pentagramParticleImage.src;
    element.style.pointerEvents = "none";
    element.style.position = "absolute";
    element.style.height = particleDimension + "px";
    element.style.width = particleDimension + "px";
    element.style.left = location.x + "px";
    element.style.top = location.y + "px";    
    document.body.appendChild(element);

    setTimeout(() => {
      moveParticle(
        element,
        location,
        direction,
        applyGravity,
        particleLifetimeMs
      );
    }, particleUpdateIntervalMs);
  }

  function moveParticle(element, location, direction, applyGravity, lifeLeft) {
    const newLocation = {
      x: location.x + direction.x,
      y: location.y + direction.y
    };
    
    const outOfBounds = isOutOfBounds(newLocation);
    const updatedLifeLeft = lifeLeft - particleUpdateIntervalMs;

    if (!outOfBounds && updatedLifeLeft > 0) {
      element.style.left = newLocation.x + "px";
      element.style.top = newLocation.y + "px";
      element.style.opacity = `${updatedLifeLeft / particleLifetimeMs}`;

      setTimeout(() => {
        moveParticle(
          element,
          newLocation,
          {
            x: direction.x,
            y: direction.y + (applyGravity ? gravity : 0)
          },
          applyGravity,
          updatedLifeLeft,
        );
      }, particleUpdateIntervalMs);
    } else {
      document.body.removeChild(element);
    }
  }

  function isOutOfBounds(location) {
    return location.x <= 0 ||
      (location.x + particleDimension) >= window.innerWidth ||
      location.y <= 0 ||
      (location.y + particleDimension) >= window.innerHeight;
  }

  function handleMouseDrag(event) {
    const now = new Date().getTime();
    if (lastPointerMove &&
        (!lastPointerMoveParticleSpawned ||
      (now - lastPointerMoveParticleSpawned) >= pointerMoveParticleDelayMs)) {
        const prevX = lastPointerMove.pageX || lastPointerMove.clientX;
        const prevY = lastPointerMove.pageY || lastPointerMove.clientY;
        const curX = event.pageX || event.clientX;
        const curY = event.pageY || event.clientY;

        const location = {
          x: curX - particleDimensionHalf,
          y: curY - particleDimensionHalf
        };

        if (!isOutOfBounds(location)) {
          let direction = {
            x: (prevX - curX),
            y: (prevY - curY)
          }
          let directionLength = Math.sqrt(direction.x * direction.x + direction.y * direction.y);
          direction.x = (direction.x / directionLength) * particleSpeed;
          direction.y = (direction.y / directionLength) * particleSpeed;
  
          spawnParticle(location, direction, false);
          lastPointerMoveParticleSpawned = now;
        }
    }

    lastPointerMove = event;
  }

  function handleClicks(event) {
    const location = {
      x: (event.pageX || event.clientX || event.touches[0].clientX) - particleDimensionHalf,
      y: (event.pageY || event.clientY || event.touches[0].clientY) - particleDimensionHalf
    };

    for (var i = 0; i < numClickParticles; ++i) {
      let direction = {
        x: -1 + Math.random() * 2,
        y: -1 + Math.random() * 2
      };
      let directionLength = Math.sqrt(direction.x * direction.x + direction.y * direction.y);
      direction.x = (direction.x / directionLength) * particleSpeed;
      direction.y = (direction.y / directionLength) * particleSpeed;
      spawnParticle(location, direction, true);
    }
  }

  if ('ontouchstart' in document.documentElement) {
    window.addEventListener("touchstart", handleClicks, false);
  } else {
    window.addEventListener("click", handleClicks, false);
    window.addEventListener("pointermove", handleMouseDrag, false);
  }
})();