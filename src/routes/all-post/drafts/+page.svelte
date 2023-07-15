 <script>
	export let data;
  const posts = data;

  const updateData = async (data = {}) => {
  data.status = "thrash"
  let url = `http://localhost:1234/article/${data.id}`
  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), 
  });
  // console.log(response.status)
  if(response.status == 200 ) {
    posts.data = posts.data.filter(x => x.id != data.id)
  }
  return response;
}
</script>

<!-- <svelte:head>
  <title>Drafted Post</title>
</svelte:head> -->

 <table class="table-auto mx-auto">
  <thead>
    <tr class="bg-gray-400">
      <th class="pl-2 py-2 text-gray-100 rounded-l-md">Title</th>
      <th class="px-2 py-2 text-gray-100">Category</th>
      <th class="pr-2 py-2 text-gray-100 rounded-r-md">Action</th>
    </tr>
  </thead>
  <tbody>
    {#each posts.data.filter(x => x.status == "draft") as post, i}
      <tr class:bg-gray-200={i%2==0}>
        <td class="pl-2 py-2 text-center">{post.title}</td>
        <td class="px-4 py-2 text-center">{post.category}</td>
        <td class="pr-4 py-2 grid grid-cols-2 gap-1">
          <a href="{`/edit-article/${post.id}`}"><iconify-icon class="text-amber-600 text-2xl hover:bg-gray-300" icon="lucide:edit"></iconify-icon></a>
          <button on:click={() => updateData(post)}><iconify-icon class="text-red-500 text-2xl hover:bg-gray-300" icon="ic:outline-delete"></iconify-icon></button>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
