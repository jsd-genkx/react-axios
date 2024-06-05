import React, { useState } from "react";

const Post = ({ post, onDelete, onEdit }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editedTitle, setEditedTitle] = useState(post.title);
	const [editedBody, setEditedBody] = useState(post.body);

	const handleSave = () => {
		onEdit(post.id, editedTitle, editedBody);
		setIsEditing(false);
	};

	return (
		<div className="p-4 bg-blue-200 border border-blue-800 rounded shadow-md">
			{isEditing ? (
				<>
					<input
						type="text"
						value={editedTitle}
						onChange={(e) => setEditedTitle(e.target.value)}
						className="w-full p-2 mb-2 text-black"
					/>
					<textarea
						value={editedBody}
						onChange={(e) => setEditedBody(e.target.value)}
						className="w-full p-2 mb-2 text-black"
					/>
					<button
						onClick={handleSave}
						className="px-4 py-1 mr-2 text-white bg-green-700 rounded hover:bg-green-500"
					>
						Save
					</button>
					<button
						onClick={() => setIsEditing(false)}
						className="px-4 py-1 text-white bg-gray-500 rounded hover:bg-gray-700"
					>
						Cancel
					</button>
				</>
			) : (
				<>
					<h2 className="text-xl font-bold">{post.title}</h2>
					<p className="my-4">{post.body}</p>
					<div className="flex justify-end gap-2 mb-4">
						<button
							onClick={() => setIsEditing(true)}
							className="px-4 py-2 mr-2 text-white bg-blue-800 rounded hover:bg-blue-600"
						>
							Edit
						</button>
						<button
							onClick={() => onDelete(post.id)}
							className="px-4 py-2 text-white bg-orange-600 rounded hover:bg-orange-400"
						>
							Delete
						</button>
					</div>
				</>
			)}
		</div>
	);
};

export default Post;
