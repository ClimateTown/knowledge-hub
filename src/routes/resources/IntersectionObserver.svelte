<script>
    import { onMount } from 'svelte';
  
    // Flag indicating whether the intersection should be observed only once
    export let once = false;
  
    // Margins for the intersection observer
    export let top = 0;
    export let bottom = 0;
    export let left = 0;
    export let right = 0;
  
    let intersecting = false;
    /**
     * @type {Element}
     */
    let container;
  
    onMount(() => {
      // Check if IntersectionObserver is supported by the browser
      if (typeof IntersectionObserver !== 'undefined') {
        const rootMargin = `${bottom}px ${left}px ${top}px ${right}px`;
  
        // Create the IntersectionObserver instance
        const observer = new IntersectionObserver(entries => {
          intersecting = entries[0].isIntersecting;
          if (intersecting && once) {
            observer.unobserve(container);
          }
        }, {
          rootMargin
        });
  
        // Start observing the container element
        observer.observe(container);
        
        // Clean up the observer when the component is unmounted
        return () => observer.unobserve(container);
      }
  
      // Fallback for browsers that do not support IntersectionObserver
      function handler() {
        const bcr = container.getBoundingClientRect();
        intersecting = (
          (bcr.bottom + bottom) > 0 &&
          (bcr.right + right) > 0 &&
          (bcr.top - top) < window.innerHeight &&
          (bcr.left - left) < window.innerWidth
        );
  
        if (intersecting && once) {
          window.removeEventListener('scroll', handler);
        }
      }
  
      // Add scroll event listener to simulate intersection behavior
      window.addEventListener('scroll', handler);
  
      // Clean up the event listener when the component is unmounted
      return () => window.removeEventListener('scroll', handler);
    });
  </script>
  
  <style>
    div {
      width: 100%;
      height: 100%;
    }
  </style>
  
  <div bind:this={container}>
    <!-- Slot content that will be shown when intersecting is true -->
    <slot {intersecting}></slot>
  </div>
  