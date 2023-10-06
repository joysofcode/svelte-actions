<script lang="ts">
  import '../app.css'
</script>

<svelte:head>
  <title>Svelte</title>
</svelte:head>

<nav>
  <a href="/">/</a>
  <a href="/actions">Actions</a>
  <a href="/tooltip">Tooltip</a>
  <a href="/modal">Modal</a>
  <a href="/motion">Motion</a>
  <a href="/forms">Forms</a>
  <a href="/examples">Examples</a>
</nav>

<main>
  <slot />
</main>

<style>
  nav {
    position: absolute;
    bottom: 28px;
    left: 28px;
    display: flex;
    gap: 0.5rem;
    color: hsl(220 10% 90%);
    z-index: 20;

    & a {
      padding: 0.5rem;
      color: inherit;
      border-radius: 4px;
      text-decoration: none;
      transition: color 0.3s ease;

      &:hover {
        color: hsl(220 10% 98%);
      }
    }
  }
</style>
