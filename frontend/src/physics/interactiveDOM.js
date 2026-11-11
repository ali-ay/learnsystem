/**
 * interactiveDOM.js
 * Specialized DOM Bridge for selective UI card levitation & 3D Antigravity physics.
 * Strictly limited to target UI cards to maintain 120 FPS performance (per Rule #3).
 */

export class InteractiveDOMBridge {
  constructor() {
    this.elements = new Set();
    this.rafId = null;
    this.isRunning = false;
  }

  /**
   * Bind an element for antigravity 3D floating & cursor tilt
   * @param {HTMLElement} el 
   * @param {Object} options 
   */
  attach(el, options = {}) {
    if (!el || this.elements.has(el)) return;

    const state = {
      el,
      maxTilt: options.maxTilt || 10, // degrees
      floatStrength: options.floatStrength || 8, // px
      damping: options.damping || 0.12,
      currX: 0,
      currY: 0,
      targetX: 0,
      targetY: 0,
      currTiltX: 0,
      currTiltY: 0,
      targetTiltX: 0,
      targetTiltY: 0,
      isHovered: false
    };

    const onMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const offsetX = (e.clientX - centerX) / (rect.width / 2);
      const offsetY = (e.clientY - centerY) / (rect.height / 2);

      // Clamp between -1 and 1
      const clampedX = Math.max(-1, Math.min(1, offsetX));
      const clampedY = Math.max(-1, Math.min(1, offsetY));

      state.targetTiltX = -clampedY * state.maxTilt;
      state.targetTiltY = clampedX * state.maxTilt;
      state.targetX = clampedX * state.floatStrength;
      state.targetY = clampedY * state.floatStrength - 4; // subtle lift
    };

    const onMouseEnter = () => {
      state.isHovered = true;
    };

    const onMouseLeave = () => {
      state.isHovered = false;
      state.targetTiltX = 0;
      state.targetTiltY = 0;
      state.targetX = 0;
      state.targetY = 0;
    };

    el.addEventListener('mouseenter', onMouseEnter);
    el.addEventListener('mousemove', onMouseMove);
    el.addEventListener('mouseleave', onMouseLeave);

    el._antigravityCleanup = () => {
      el.removeEventListener('mouseenter', onMouseEnter);
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseleave', onMouseLeave);
      el.style.transform = '';
    };

    this.elements.add(state);

    if (!this.isRunning) {
      this.start();
    }
  }

  detach(el) {
    for (const state of this.elements) {
      if (state.el === el) {
        if (el._antigravityCleanup) el._antigravityCleanup();
        this.elements.delete(state);
        break;
      }
    }
    if (this.elements.size === 0) {
      this.stop();
    }
  }

  start() {
    this.isRunning = true;
    const loop = () => {
      for (const item of this.elements) {
        // Smooth lerp (linear interpolation)
        item.currX += (item.targetX - item.currX) * item.damping;
        item.currY += (item.targetY - item.currY) * item.damping;
        item.currTiltX += (item.targetTiltX - item.currTiltX) * item.damping;
        item.currTiltY += (item.targetTiltY - item.currTiltY) * item.damping;

        // Apply GPU-accelerated transform
        item.el.style.transform = `perspective(800px) translate3d(${item.currX.toFixed(2)}px, ${item.currY.toFixed(2)}px, 0) rotateX(${item.currTiltX.toFixed(2)}deg) rotateY(${item.currTiltY.toFixed(2)}deg)`;
      }

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

export const domBridge = new InteractiveDOMBridge();
