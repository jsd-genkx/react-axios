import React from "react";
import Posts from "./components/Posts";

const App = () => {
	return (
		<div className="container max-w-xl p-4 mx-auto">
			<h1 className="mb-4 text-3xl font-bold text-blue-800">Posts</h1>
			<Posts />
		</div>
	);
};

export default App;
