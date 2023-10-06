<script lang="ts">
  let show = false
  let content = ''

  function greet(element: HTMLElement, content: string) {
    // logs when element is created
    console.log('hi')

    // do whatever you want
    element.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: 300,
      fill: 'forwards',
    })

    // custom event
    const greetEvent = new CustomEvent('greet', { detail: 'hi' })
    element.dispatchEvent(greetEvent)

    return {
      update(content: string) {
        // the value of content has changed
        console.log({ content })
      },
      destroy() {
        // logs when element is removed
        console.log('bye')
      },
    }
  }

  function handleGreet(event: CustomEvent) {
    console.log(event.detail) // "hi"
  }
</script>

<label>
  <input bind:checked={show} type="checkbox" />
  Toggle
</label>

<br />

{#if show}
  <!-- bind input value to `content` -->
  <input bind:value={content} />

  <!-- run `update` when `content` updates  -->
  <div on:greet={handleGreet} use:greet={content}>Action</div>
{/if}
