import React from 'react';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import ButtonList, { toButtonEntries } from '../components/ButtonList';

class Components extends React.PureComponent<NavigationStackScreenProps> {
  render() {
    return <ButtonList navigation={this.props.navigation} entries={buttonEntries} />;
  }
}

const buttonEntries = toButtonEntries([
  'BannerSlider',
  'ButtonGroup',
  'Cards',
  'Checkboxes',
  'ColumnLayouts',
  'DoubleChoices',
  'Floating button layout',
  'Form components',
  'IconGroups',
  'ListItems',
  'Modal',
  'Notifications',
  'Onboarding',
  'PaymentPanel',
  'ProfileHeaders',
  'PurchasePanel',
  'RadioButtons',
  'SelectionHeaders',
  'Status',
]);

export default Components;
