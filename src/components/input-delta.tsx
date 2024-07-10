import { InputSimple } from '~/components/input-simple';
import { ComponentProps, useRef, useState } from 'react';
import { SpinnerThemed } from '~/components/spinner-themed';

type Props = ComponentProps<typeof InputSimple> & {
  onBlurValueChange?: (value: string | undefined) => Promise<void>;
};

/** TextInput for async submit value immediately on blur
 * Provide the display value as usual: value={text}
 * When the user focuses the input, the value is copied to a local state
 * When the user blurs the input, the local state is submitted to the onBlurValueChange async callback
 * When the callback finishes, the TextInput reverts back to displaying the value from props
 * */

export function InputDelta(props: Props) {
  const [delta, setDelta] = useState<string | undefined>(props.value);
  const focusRef = useRef(false);
  const [displaySource, setDisplaySource] = useState<'props' | 'delta'>('props');
  const [isSending, setIsSending] = useState(false);

  const onFocusLocal: typeof props.onFocus = (e) => {
    setDelta(props.value);
    focusRef.current = true;
    setDisplaySource('delta');
    props.onFocus?.(e);
  };

  const onBlurLocal: typeof props.onBlur = async (e) => {
    focusRef.current = false;
    props.onBlur?.(e);
    if (delta !== props.value) {
      try {
        setIsSending(true);
        await props.onBlurValueChange?.(delta);
      } finally {
        setIsSending(false);
        if (!focusRef.current) {
          // only revert to props value if the user hasn't focused the input again
          // while the value is async submitting
          setDisplaySource('props');
        }
      }
    }
  };

  const onChangeTextLocal: typeof props.onChangeText = (text) => {
    if (focusRef.current) {
      setDelta(text);
    }
    props.onChangeText?.(text);
  };

  const displayValue = displaySource === 'delta' ? delta : props.value;

  return (
    <>
      <InputSimple
        {...props}
        onFocus={onFocusLocal}
        onBlur={onBlurLocal}
        value={displayValue}
        onChangeText={onChangeTextLocal}
      />
      {/*TODO: need better styling here */}
      {isSending && <SpinnerThemed />}
    </>
  );
}
