import React, { useEffect, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

interface QuestionEditorProps {
    initialValue: string;
    onEditorChange: (content: string) => void;
}

const QuestionEditor: React.FC<QuestionEditorProps> = ({ initialValue, onEditorChange }) => {
    const editorRef = useRef<any>(null);

    useEffect(() => {
    }, [editorRef.current]);

    return (
        <div className="question-editor">
            <Editor
                apiKey="qtarwjm37c97e5qe8m1eyibtt6isze85twzt950jm8r9vkw3"
                onInit={(editor: any) => {
                    editorRef.current = editor;
                }}
                value={initialValue}
                onEditorChange={onEditorChange}
                init={{
                    height: 200,
                    menubar: false,
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount',
                        'directionality' // Added directionality plugin
                    ],
                    toolbar: 'undo redo | formatselect | ' +
                        'bold italic underline | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | ltr rtl | help', // Added ltr/rtl buttons
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px; direction: ltr; }', // Added direction: ltr
                    directionality: 'ltr' // Force left-to-right as default
                }}
            />
        </div>
    );
};

export default QuestionEditor;