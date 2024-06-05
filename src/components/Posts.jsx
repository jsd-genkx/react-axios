import React, { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Post from "./Post";

const API_URL = "https://jsonplaceholder.typicode.com/posts?_start=0&_limit=5";

const Posts = () => {
	const [posts, setPosts] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [newTitle, setNewTitle] = useState("");
	const [newBody, setNewBody] = useState("");

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const response = await axios.get(API_URL);
				setPosts(response.data);
			} catch (error) {
				console.error("Error fetching posts:", error);
			}
		};

		fetchPosts();
	}, []);

	const handleDelete = (id) => {
		setPosts(posts.filter((post) => post.id !== id));
	};

	const handleEdit = (id, title, body) => {
		setPosts(
			posts.map((post) => (post.id === id ? { ...post, title, body } : post))
		);
	};

	const handleAddPost = () => {
		const newPost = {
			userId: 1,
			id: uuidv4(),
			title: newTitle,
			body: newBody,
		};
		setPosts([newPost, ...posts]);
		setNewTitle("");
		setNewBody("");
	};

	const filteredPosts = posts.filter(
		(post) =>
			post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			post.body.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div className="container p-4 mx-auto">
			<input
				type="text"
				placeholder="Search posts"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				className="w-full p-2 mb-4 border border-blue-800 rounded"
			/>
			<div className="p-4 mb-4 bg-blue-100 border border-blue-800 rounded">
				<h2 className="mb-2 text-xl font-bold">Add New Post</h2>
				<input
					type="text"
					placeholder="Title"
					value={newTitle}
					onChange={(e) => setNewTitle(e.target.value)}
					className="w-full p-2 mb-2 border border-blue-800 rounded"
				/>
				<textarea
					placeholder="Body"
					value={newBody}
					onChange={(e) => setNewBody(e.target.value)}
					className="w-full p-2 mb-2 border border-blue-800 rounded"
				/>
				<button
					onClick={handleAddPost}
					className="px-4 py-2 text-white bg-blue-800 rounded hover:bg-blue-600"
				>
					Add Post
				</button>
			</div>
			<div className="grid gap-4">
				{filteredPosts.map((post) => (
					<Post
						key={post.id}
						post={post}
						onDelete={handleDelete}
						onEdit={handleEdit}
					/>
				))}
			</div>
		</div>
	);
};

export default Posts;
