import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import IconButtonRegular from 'src/molecules/buttons/iconButtons/IconButtonRegular';
import IconToggle from 'src/molecules/buttons/toggles/IconToggle';

type FilterButton = { id: string; icon: string; active?: boolean };

type FilterGroupProps = {
  filterButtons: FilterButton[];
  onFilterToggle: (id: string, active: boolean) => void;
  onSettingsClicked: () => void;
  style?: ViewStyle;
  managed?: boolean; // whether the state of filters is managed through props
};

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: 12,
    paddingBottom: 12,
    height: 68,
  } as ViewStyle,
});

const buttons = (props: FilterGroupProps) =>
  props.filterButtons.map((b) => (
    <IconToggle
      key={`filterButton-${b.id}`}
      id={b.id}
      icon={b.icon}
      active={b.active || false}
      setActive={props.onFilterToggle}
      managed={props.managed}
    />
  ));

const FilterGroup = (props: FilterGroupProps) => {
  const maxWidth = props.filterButtons.length * (40 + 28) + 40 /* taxi */ + 16 * 2 /* padding */;
  return (
    <View
      // tslint:disable-next-line:jsx-no-multiline-js
      style={[styles.Wrapper, props.style, { maxWidth }]}
    >
      {buttons(props)}
      <IconButtonRegular buttonStyle="primary" icon="taxi" onPress={props.onSettingsClicked} />
    </View>
  );
};

export default React.memo(FilterGroup);