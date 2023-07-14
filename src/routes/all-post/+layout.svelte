<script lang="ts">
  import 'iconify-icon'
</script>

<div class="container mx-auto">
  <div class="grid grid-cols-3 gap-4 pt-4 pb-8">
    <a href="/all-post/published" class="bg-gray-600 text-gray-300 text-center rounded-md py-2">
      <h1>Published</h1>
    </a>
    <a href="/all-post/drafts" class="bg-gray-600 text-gray-300 text-center rounded-md py-2">
      <h1>Drafts</h1>
    </a>
    <a href="/all-post/thrashed" class="bg-gray-600 text-gray-300 text-center rounded-md py-2">
      <h1>Thrashed</h1>
    </a>
  </div>
  <slot />
</div>
