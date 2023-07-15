import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const { id } = params;
	const posts = await fetch(`http://127.0.0.1:1234/article/${id}`);
	const data = await posts.json();
	// console.log(data);
	return {
		data
	};
};
