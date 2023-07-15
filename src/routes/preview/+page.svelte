 <script>
	export let data;
  let posts = data;
  let page = 1;

  const increment = () => {
    page++
  }
  const decrement = () => {
    page > 1 ? page-- : page;
  }

  const getData = async () => {
    const newData = await fetch(`http://127.0.0.1:1234/article/5/${page}/published`);
    const test = await newData.json();
    posts.data=test;
  }
</script>

<div class="container mx-auto">
  {#if posts.data.length < 1}
    <h1 class="text-center text-4xl mt-10 mb-4 font-bold">No data to display</h1>
  {:else}
    {#each posts.data as post (post.id)}
      <div class="block md:max-w-xl max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-lg hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mx-auto my-4">
        <h4 class="text-2xl font-bold tracking-tight text-white">{post.title}</h4>
        <h6 class="text-lg text-gray-400 font-medium mb-4">{post.category}</h6>
        <p class="font-normal text-gray-700 dark:text-gray-200 break-all">{post.content}</p>
      </div>
    {/each}
  {/if}
  <div class="flex justify-center mt-8 gap-2">
    <button on:click={decrement} on:click={getData} class="pt-2 px-2"><iconify-icon class="text-3xl" icon="ooui:previous-ltr"></iconify-icon></button>
    <h1 class="pt-1 font-medium text-2xl">{page}</h1>
    <button on:click={increment} on:click={getData} class="pt-2 px-2"><iconify-icon class="text-3xl" icon="ooui:next-ltr"></iconify-icon></button>
  </div>
</div>
