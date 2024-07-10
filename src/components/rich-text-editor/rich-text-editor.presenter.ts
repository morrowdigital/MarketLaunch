import { EditorState, RawDraftContentState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

import { injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';

import { Injectables } from '~/utils/inversifyJS/injectables';
import { useDependency } from '~/utils/inversifyJS/use-dependency';

// Library needs to be imported this way because of issues with next/dynamic
// https://github.com/jpuri/html-to-draftjs/issues/78
// eslint-disable-next-line @typescript-eslint/no-var-requires
const htmlToDraft = typeof window === 'object' && require('html-to-draftjs').default;

@injectable()
export class RichTextEditorPresenter {
  constructor() {
    makeAutoObservable(this);
  }

  private _rawContentState?: RawDraftContentState;

  private setRawContentState = (text: string) => {
    this._rawContentState = {
      entityMap: {},
      blocks: [
        {
          key: '637gr',
          text,
          type: 'unstyled',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
      ],
    };
  };

  get rawContentState() {
    return this._rawContentState;
  }

  private _editorState?: EditorState;

  setEditorState = (state: EditorState) => {
    this._editorState = state;
  };

  handleEditorStateChange = (callback: (text: string) => void) => {
    return (state: EditorState) => {
      this._editorState = state;
      callback(this.contentHTML);
    };
  };

  get editorState() {
    return this._editorState;
  }

  setText = (text: string) => {
    const { contentBlocks, entityMap } = htmlToDraft(text);
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);

    this.setRawContentState(text);
    this.setEditorState(EditorState.createWithContent(contentState));
  };

  get contentHTML() {
    if (this.editorState) return draftToHtml(convertToRaw(this.editorState?.getCurrentContent()));
    else return '';
  }
}

export const useRichTextEditorPresenter = () =>
  useDependency<RichTextEditorPresenter>(Symbol.for(Injectables.RichTextEditorPresenter));
