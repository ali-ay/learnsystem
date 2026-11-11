import { Vector2D } from './Vector2D.js';
import { Particle } from './Particle.js';
import { Constraint } from './Constraint.js';

/**
 * AntigravityWorld: High performance Verlet Physics Simulation Runtime
 * Operates on HTML5 Canvas at 60/120 FPS
 * Agnostic of specific lessons; delegates scenario setup & custom rendering to Scene instances.
 */
export class AntigravityWorld {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    this.width = canvas.clientWidth || 600;
    this.height = canvas.clientHeight || 500;
    this.dpr = window.devicePixelRatio || 1;

    this.particles = [];
    this.constraints = [];
    
    // Physics parameters
    this.baseGravity = 0.28;
    this.gravity = new Vector2D(0, this.baseGravity);
    this.antigravityMode = false;
    this.iterations = 4; // Sub-steps for constraint solving & numerical stability

    // Active Scene instance (Strategy / Scene Pattern)
    this.currentScene = null;

    // Interactive mouse state
    this.mouse = {
      pos: new Vector2D(-1000, -1000),
      isDown: false,
      draggedParticle: null,
      repelRadius: 120,
      repelStrength: 1.8
    };

    this.isRunning = false;
    this.rafId = null;

    this.initCanvas();
    this.bindEvents();
  }

  initCanvas() {
    this.resize();
    // Use ResizeObserver for accurate container tracking
    if (window.ResizeObserver && this.canvas.parentElement) {
      this.resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          if (entry.contentRect.width > 50 && entry.contentRect.height > 50) {
            this.resize();
          }
        }
      });
      this.resizeObserver.observe(this.canvas.parentElement);
    } else {
      window.addEventListener('resize', () => this.resize());
    }
  }

  resize() {
    const rect = this.canvas.parentElement ? this.canvas.parentElement.getBoundingClientRect() : null;
    if (!rect || rect.width < 50 || rect.height < 50) {
      return; // Do not resize while hidden
    }

    this.width = rect.width;
    this.height = rect.height;
    
    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    
    // Strict scale transform
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
  }

  reinitCurrentScene() {
    if (this.currentScene) {
      this.clear();
      try {
        this.currentScene.init(this);
      } catch (e) {
        console.error('Error reinitializing scene:', e);
      }
    }
  }

  bindEvents() {
    const getPos = (e) => {
      const rect = this.canvas.getBoundingClientRect();
      return new Vector2D(e.clientX - rect.left, e.clientY - rect.top);
    };

    this.canvas.addEventListener('mousedown', (e) => {
      this.mouse.isDown = true;
      this.mouse.pos = getPos(e);

      // Check if clicking directly on a particle to drag it
      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        if (p.pos.dist(this.mouse.pos) <= p.radius + 6) {
          this.mouse.draggedParticle = p;
          break;
        }
      }

      // If clicked empty space, spawn an interactive floating token
      if (!this.mouse.draggedParticle) {
        this.spawnParticle(this.mouse.pos.x, this.mouse.pos.y, {
          radius: 14,
          label: '⚡',
          color: '#00f0ff',
          vx: (Math.random() - 0.5) * 4,
          vy: -3
        });
      }
    });

    window.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        this.mouse.pos = getPos(e);
      } else {
        this.mouse.pos.set(-1000, -1000);
      }
    });

    window.addEventListener('mouseup', () => {
      this.mouse.isDown = false;
      this.mouse.draggedParticle = null;
    });

    // Comprehensive Mobile Touch Support (iPhone, iPad, Android)
    this.canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length > 0) {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.pos.set(touch.clientX - rect.left, touch.clientY - rect.top);
        this.mouse.isDown = true;

        // Check if touching directly on a particle to drag it
        for (let i = this.particles.length - 1; i >= 0; i--) {
          const p = this.particles[i];
          if (p.pos.dist(this.mouse.pos) <= p.radius + 12) {
            this.mouse.draggedParticle = p;
            break;
          }
        }

        // If touched empty space, spawn an interactive floating token
        if (!this.mouse.draggedParticle) {
          this.spawnParticle(this.mouse.pos.x, this.mouse.pos.y, {
            radius: 14,
            label: '⚡',
            color: '#00f0ff',
            vx: (Math.random() - 0.5) * 4,
            vy: -3
          });
        }
      }
    }, { passive: false });

    this.canvas.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.pos.set(touch.clientX - rect.left, touch.clientY - rect.top);
      }
    }, { passive: false });

    const handleTouchEnd = () => {
      this.mouse.isDown = false;
      this.mouse.draggedParticle = null;
      this.mouse.pos.set(-1000, -1000);
    };

    this.canvas.addEventListener('touchend', handleTouchEnd);
    this.canvas.addEventListener('touchcancel', handleTouchEnd);
  }

  /**
   * Set active scene with complete memory cleanup and lifecycle transition
   * @param {import('./Scene.js').Scene} scene 
   */
  setScene(scene) {
    if (this.currentScene) {
      try {
        this.currentScene.dispose(this);
      } catch (err) {
        console.error('Error disposing previous scene:', err);
      }
    }

    this.clear();
    this.currentScene = scene;

    if (this.currentScene) {
      try {
        this.currentScene.init(this);
      } catch (err) {
        console.error('Error initializing scene:', err);
      }
    }
  }

  addParticle(p) {
    this.particles.push(p);
    return p;
  }

  spawnParticle(x, y, options = {}) {
    const p = new Particle(x, y, options);
    this.particles.push(p);
    return p;
  }

  addConstraint(p1, p2, options = {}) {
    const c = new Constraint(p1, p2, options);
    this.constraints.push(c);
    return c;
  }

  addSpring(p1, p2, options = {}) {
    return this.addConstraint(p1, p2, options);
  }

  clear() {
    this.particles = [];
    this.constraints = [];
    this.mouse.draggedParticle = null;
  }

  toggleAntigravity() {
    this.antigravityMode = !this.antigravityMode;
    this.gravity.y = this.antigravityMode ? -this.baseGravity * 0.9 : this.baseGravity;
    return this.antigravityMode;
  }

  setGravity(value) {
    this.baseGravity = value;
    this.gravity.y = this.antigravityMode ? -value : value;
  }

  applyForces() {
    const gravityForce = this.gravity;

    for (const p of this.particles) {
      if (p.isPinned) continue;

      // Base gravity (accounting for individual particle charge)
      if (p.antigravityCharge === 0) {
        p.applyForce(gravityForce);
      } else {
        // Individual antigravity effect
        const customG = new Vector2D(0, this.gravity.y * (1 - p.antigravityCharge * 2));
        p.applyForce(customG);
      }

      // Mouse repulsion / antigravity field
      const distToMouse = p.pos.dist(this.mouse.pos);
      if (distToMouse < this.mouse.repelRadius && distToMouse > 0) {
        const forceMag = (1 - distToMouse / this.mouse.repelRadius) * this.mouse.repelStrength;
        const repelDir = Vector2D.sub(p.pos, this.mouse.pos).normalize().mult(forceMag);
        p.applyForce(repelDir);
      }
    }

    // Handle dragged particle
    if (this.mouse.draggedParticle) {
      const p = this.mouse.draggedParticle;
      p.pos.set(this.mouse.pos.x, this.mouse.pos.y);
      p.oldPos.set(this.mouse.pos.x, this.mouse.pos.y);
    }
  }

  solveCollisions() {
    // Particle-to-particle soft repulsion
    const len = this.particles.length;
    for (let i = 0; i < len; i++) {
      const p1 = this.particles[i];
      for (let j = i + 1; j < len; j++) {
        const p2 = this.particles[j];
        const dx = p2.pos.x - p1.pos.x;
        const dy = p2.pos.y - p1.pos.y;
        const distSq = dx * dx + dy * dy;
        const minDist = p1.radius + p2.radius;

        if (distSq < minDist * minDist && distSq > 0) {
          const dist = Math.sqrt(distSq);
          const overlap = (minDist - dist) * 0.5;
          const nx = (dx / dist) * overlap;
          const ny = (dy / dist) * overlap;

          if (!p1.isPinned) {
            p1.pos.x -= nx;
            p1.pos.y -= ny;
          }
          if (!p2.isPinned) {
            p2.pos.x += nx;
            p2.pos.y += ny;
          }
        }
      }
    }
  }

  update() {
    if (this.width < 50 || this.height < 50 || !this.isRunning) return;
    this.applyForces();

    // Verlet position updates
    for (const p of this.particles) {
      p.update();
      p.constrainBounds(this.width, this.height);
    }

    // Sub-step solver iterations for stable structural constraints
    for (let iter = 0; iter < this.iterations; iter++) {
      for (const c of this.constraints) {
        c.solve();
      }
      this.solveCollisions();
    }

    // Filter out dead particles
    this.particles = this.particles.filter((p) => !p.isDead);

    // Delegate custom scene update if available
    if (this.currentScene && typeof this.currentScene.update === 'function') {
      this.currentScene.update(this, 1);
    }
  }

  render() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Subtle background grid
    this.renderGrid();

    // Render Constraints
    for (const c of this.constraints) {
      c.render(this.ctx);
    }

    // Render Particles
    for (const p of this.particles) {
      p.render(this.ctx);
    }

    // Render Active Scene Custom Overlays
    if (this.currentScene && typeof this.currentScene.render === 'function') {
      this.currentScene.render(this.ctx, this);
    }

    // Render Mouse Antigravity Field Aura
    if (this.mouse.pos.x > 0) {
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.arc(this.mouse.pos.x, this.mouse.pos.y, this.mouse.repelRadius, 0, Math.PI * 2);
      this.ctx.fillStyle = this.antigravityMode 
        ? 'rgba(235, 87, 87, 0.06)' 
        : 'rgba(94, 106, 210, 0.05)';
      this.ctx.fill();
      this.ctx.strokeStyle = this.antigravityMode 
        ? 'rgba(235, 87, 87, 0.3)' 
        : 'rgba(94, 106, 210, 0.25)';
      this.ctx.setLineDash([4, 4]);
      this.ctx.stroke();
      this.ctx.restore();
    }
  }

  /**
   * Background grid. Drawn once per size/theme into an offscreen canvas and
   * blitted each frame, instead of issuing ~hundreds of stroke calls per frame.
   */
  renderGrid() {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const key = `${this.width}x${this.height}x${this.dpr}:${isLight}`;

    if (this._gridKey !== key) {
      const off = document.createElement('canvas');
      off.width = Math.max(1, Math.ceil(this.width * this.dpr));
      off.height = Math.max(1, Math.ceil(this.height * this.dpr));
      const g = off.getContext('2d');
      g.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
      const step = 40;
      g.strokeStyle = isLight ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.025)';
      g.lineWidth = 1;
      g.beginPath();
      for (let x = 0; x < this.width; x += step) {
        g.moveTo(x, 0);
        g.lineTo(x, this.height);
      }
      for (let y = 0; y < this.height; y += step) {
        g.moveTo(0, y);
        g.lineTo(this.width, y);
      }
      g.stroke();
      this._gridCanvas = off;
      this._gridKey = key;
    }

    this.ctx.save();
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.drawImage(this._gridCanvas, 0, 0);
    this.ctx.restore();
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;

    const loop = () => {
      this.update();
      this.render();
      if (this.isRunning) {
        this.rafId = requestAnimationFrame(loop);
      }
    };

    this.rafId = requestAnimationFrame(loop);
  }

  stop() {
    this.isRunning = false;
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }
}
