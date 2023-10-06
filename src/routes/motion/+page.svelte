<script lang="ts">
  import { animate, stagger, type AnimationOptions, type AnimationControls } from 'motion'
  import type { Action } from 'svelte/action'

  type Options = {
    options?: AnimationOptions
    action?: ({ animation }: { animation: AnimationControls }) => void
  }
  type Attributes = {
    'on:finished'?: (event: CustomEvent) => void
  }
  type TextAction = Action<HTMLElement, Options, Attributes>

  const text: TextAction = (element, { options, action }) => {
    // remove whitespace and split letters
    const letters = element.innerText.trim().split('')

    // remove any text
    element.innerHTML = ''

    // create an element for every letter
    letters.forEach((letter) => {
      element.innerHTML += `
        <span class="letter">
          ${letter}
        </span>
      `
    })

    // animate the letters
    const animation = animate(
      [...element.children],
      {
        color: 'orangered',
        y: [0, 30, -60, 0],
        rotate: 360,
      },
      { duration: 1, delay: stagger(0.1), ...options }
    )

    // invoke callback
    if (action) {
      action({ animation })
    }

    // dispatch event when animation is finished
    animation.finished.then(() => {
      element.dispatchEvent(new CustomEvent('finished'))
    })
  }

  let controls: AnimationControls
  let time = 0

  $: if (controls) {
    controls.currentTime = time
  }
</script>

<h1
  on:finished={() => console.log('finished')}
  use:text={{
    options: { duration: 2 },
    action({ animation }) {
      animation.stop()
      controls = animation
    },
  }}
>
  Svelte
</h1>

{#if controls}
  <input
    bind:value={time}
    type="range"
    min={0}
    max={controls.duration + 0.6}
    step={0.01}
  />
{/if}
