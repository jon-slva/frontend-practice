import { useEffect, useRef } from 'react';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { history } from '@codemirror/history';
import { defaultKeymap } from '@codemirror/commands';
import { javascript } from '@codemirror/lang-javascript';

const Questions = () => {
	const editorRef = useRef();

	useEffect(() => {
		if (!editorRef.current) return;
		console.log(editorRef.current)
		new EditorView({
			state: EditorState.create({
				doc: '',
				extensions: [
					history(),
					keymap.of([
						...defaultKeymap,
					]),
					javascript(),
				],
			}),
			parent: editorRef.current,
		});
	}, []);

	return (
		<main>
			<h1>Questions</h1>
			<div ref={editorRef} style={{ height: '300px' }}></div>
		</main>
	);
};

export default Questions;