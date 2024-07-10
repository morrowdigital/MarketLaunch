import dynamic from 'next/dynamic';
import { getTokenValue } from 'tamagui';
import { useEffect } from 'react';

const Editor = dynamic(() => import('react-draft-wysiwyg').then((mod) => mod.Editor), {
  ssr: false,
});

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useRichTextEditorPresenter } from './rich-text-editor.presenter';
import { observer } from 'mobx-react-lite';

type Props = {
  text: string;
  onChangeText: (html: string) => void;
};

export const RichTextEditor = observer(function RichTextEditor({ text, onChangeText }: Props) {
  const { editorState, setText, handleEditorStateChange } = useRichTextEditorPresenter();

  const padding = getTokenValue('$space.4');
  const color = getTokenValue('$color.blue5dark');
  const backgroundColor = getTokenValue('$color.gray2light');

  useEffect(() => {
    setText(text);
  }, [setText, text]);

  return (
    <Editor
      editorState={editorState}
      wrapperStyle={{ width: '100%' }}
      editorStyle={{ color, padding, height: 250, backgroundColor }}
      onEditorStateChange={handleEditorStateChange(onChangeText)}
    />
  );
});
