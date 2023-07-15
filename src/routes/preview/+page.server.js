import { error } from '@sveltejs/kit';

export const load = async ({ fetch }) => {
	const posts = await fetch('http://127.0.0.1:1234/article/5/1/published');
	const data = await posts.json();
	// console.log(data);
	return {
		data
	};
};
