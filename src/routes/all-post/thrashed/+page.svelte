 <script>
	export let data;
  const posts = data;

  const deleteData = async (id) => {
  let url = `http://localhost:1234/article/${id}`
  const response = await fetch(url, {
    method: "DELETE",
  });
  if (response.status == 204) {
    posts.data = posts.data.filter(x => x.id != id)
  }
  return response;
}
</script>

 <table class="table-auto mx-auto">
  <thead>
    <tr class="bg-gray-400">
      <th class="pl-2 py-2 text-gray-100 rounded-l-md">Title</th>
      <th class="px-2 py-2 text-gray-100">Category</th>
      <th class="pr-2 py-2 text-gray-100 rounded-r-md">Action</th>
    </tr>
  </thead>
  <tbody>
    {#each posts.data.filter(x => x.status == "thrash") as post, i}
      <tr class:bg-gray-200={i%2==0}>
        <td class="pl-2 py-2 text-center">{post.title}</td>
        <td class="px-4 py-2 text-center">{post.category}</td>
        <td class="pr-4 py-2 grid grid-cols-2 gap-1">
          <a href="{`/edit-article/${post.id}`}"><iconify-icon class="text-amber-600 text-2xl hover:bg-gray-300" icon="lucide:edit"></iconify-icon></a>
          <button on:click={() => deleteData(post.id)}><iconify-icon class="text-red-500 text-2xl hover:bg-gray-300" icon="ic:outline-delete"></iconify-icon></button>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
