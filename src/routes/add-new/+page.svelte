<script>
  import { redirect } from '@sveltejs/kit';
  import { goto } from '$app/navigation';

  let title,category,content;

  let titleWarning = "", categoryWarning="", contentWarning = "";
  let data = {};
  $: {
    data.title = title
    data.category = category
    data.content = content
  }

  const validateData = () => {
    let res = true
    if (title.length < 20) {
      titleWarning = "minimum 20 characters long"
      res = false
    }
    if (category.length < 3) {
      categoryWarning = "minimum 3 characters long"
      res = false
    }
    if (content.length < 200) {
      contentWarning = "minimum 200 characters long"
      res = false
    }
    return res
  }

  const post = async (opt) => {
    titleWarning = ""
    categoryWarning = ""
    contentWarning = ""
    if (!validateData()) {
      return
    }
    data.status = opt
    let path = "/all-post/published"
    if (opt == "draft") {
      path = "/all-post/drafts"
    }
    let res = await postData("http://127.0.0.1:1234/article", data)
    // console.log(res.status)
    // console.log(res.statusText)
    if (res.status == 200) {
      goto(path, { replaceState: true }) 
    }
  }

  const postData = async (url = "", data = {}) => {

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), 
  });
  
  return response;
}
</script>

<div class="container mx-auto max-w-4xl mt-24 border-2 border-black rounded-lg p-4 shadow-lg bg-gray-700">
  <form>
    <div class="mb-6">
      <label for="title" class="block mb-2 text-sm font-medium text-white">Title</label>
      <input bind:value={title} type="title" id="title" class="border text-sm rounded-lg block w-full p-2.5 bg-gray-100 border-gray-600 placeholder-gray-400 text-black focus:ring" placeholder="Title" required>
      <p class="text-red-500 pl-2">{titleWarning}</p>
    </div>
    <div class="mb-6">
      <label for="category" class="block mb-2 text-sm font-medium text-white">Category</label>
      <input bind:value={category} id="category" class=" border text-sm rounded-lg block w-full p-2.5 bg-gray-100 border-gray-600 placeholder-gray-400 text-black focus:ring" placeholder="Category" required>
      <p class="text-red-500 pl-2">{categoryWarning}</p>
    </div>
    <div class="mb-6">      
      <label for="content" class="block mb-2 text-sm font-medium text-white">Content</label>
      <textarea bind:value={content} id="content" rows="4" class="block p-2.5 w-full text-sm rounded-lg border bg-gray100 border-gray-600 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500" placeholder="Content" required></textarea>
      <p class="text-red-500 pl-2">{contentWarning}</p>
    </div>
    <div class="flex justify-center gap-x-4">
      <button on:click={() => post("publish")} class="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center bg-green-500 hover:bg-green-700 focus:ring-green-800">Publish</button>
      <button on:click={() => post("draft")} class="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center bg-yellow-500 hover:bg-yellow-700 focus:ring-yellow-800">Draft</button>
    </div>
  </form>
</div>
