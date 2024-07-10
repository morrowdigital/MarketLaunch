import { TermsContentItem } from '~/types/model';
import { Fragment } from 'react';
import { BodyText } from '~/components/body-text';

export function TermsContentElement(props: { item: TermsContentItem }) {
  return (
    <Fragment>
      {props.item.title && (
        <BodyText bold marginTop={20}>
          {props.item.title}
        </BodyText>
      )}
      {props.item.body && <BodyText marginTop={10}>{props.item.body}</BodyText>}
    </Fragment>
  );
}
