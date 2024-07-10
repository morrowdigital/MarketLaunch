import { XStack, styled } from 'tamagui';

const TableRowRaw = styled(XStack, {
  padding: '$4',
  paddingVertical: '$2',
  backgroundColor: '$colorB',
});

const TableRowClickable = styled(TableRowRaw, {
  cursor: 'pointer',
});

type Props = Omit<React.ComponentProps<typeof XStack>, 'cursor'>;

export function TableRow(props: Props) {
  if (props.onPress) {
    return <TableRowClickable {...props} />;
  } else {
    return <TableRowRaw {...props} />;
  }
}
