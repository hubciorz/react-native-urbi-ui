import React from 'react';
import {
  ImageRequireSource,
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { PageIndicator } from '../molecules/PageIndicator';
import { colors } from '../utils/colors';
import { onIOS, windowWidth } from '../utils/const';
import { ScaledImage } from './ScaledImage';

export const bannerHeight = 116;

type BannerSliderPanelProps = {
  pages: BannerSlideProps[];
  onPress?: (key: number) => any;
  onPageChange?: (selectedIndex: number) => any;
};

type BannerSliderPanelState = {
  scrollViewWidth: number;
  selectedPage: number;
  imageHeight: number;
};

export interface BannerSlideProps {
  url: ImageRequireSource | string;
  name: string;
  id: string;
}
const styles = StyleSheet.create({
  Container: {
    alignSelf: 'stretch',
  },
  Wrapper: {
    flex: 1,
    backgroundColor: colors.secondary,
    paddingBottom: 0, // this is included in the PageIndicator molecule
    shadowColor: colors.shadowBorder,
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 1,
  } as ViewStyle,
  Content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export class BannerSlider extends React.PureComponent<
  BannerSliderPanelProps,
  BannerSliderPanelState
> {
  constructor(props: BannerSliderPanelProps) {
    super(props);
    this.state = { scrollViewWidth: windowWidth, selectedPage: 0, imageHeight: 0 };
    this.onLayout = this.onLayout.bind(this);
    this.onMomentumScrollEnd = this.onMomentumScrollEnd.bind(this);
    this.curryWithPage = this.curryWithPage.bind(this);
    this.onSetHeight = this.onSetHeight.bind(this);
  }

  onLayout(e: LayoutChangeEvent) {
    const scrollViewWidth = e.nativeEvent.layout.width;
    this.setState({ scrollViewWidth });
  }

  onMomentumScrollEnd(e: NativeSyntheticEvent<NativeScrollEvent>) {
    const selectedPage = Math.floor(e.nativeEvent.contentOffset.x / this.state.scrollViewWidth);
    this.setState({ selectedPage });
    if (this.props.onPageChange) {
      this.props.onPageChange(selectedPage);
    }
  }

  curryWithPage = (index: number) => () => (this.props.onPress ? this.props.onPress(index) : null);

  onSetHeight(newHeight: number) {
    // we want the slider to be as tall as the tallest of the slides it contains
    if (newHeight > this.state.imageHeight) {
      this.setState({ imageHeight: newHeight });
    }
  }

  render() {
    // tslint:disable:jsx-no-multiline-js
    return (
      <View style={[styles.Container, { height: this.state.imageHeight }]} elevation={2}>
        <View style={styles.Wrapper}>
          <View style={styles.Content}>
            <ScrollView
              onLayout={this.onLayout}
              snapToAlignment="end"
              snapToInterval={this.state.scrollViewWidth}
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={this.onMomentumScrollEnd}
              decelerationRate="fast"
              overScrollMode={onIOS ? undefined : 'never'}
              scrollEnabled={!(onIOS && this.props.pages.length === 1)}
              horizontal
            >
              {this.props.pages.map((s, i) => (
                <TouchableWithoutFeedback onPress={this.curryWithPage(i)} key={`page-${i}`}>
                  <ScaledImage
                    uri={s.url}
                    width={this.state.scrollViewWidth}
                    onSetHeight={this.onSetHeight}
                  />
                </TouchableWithoutFeedback>
              ))}
            </ScrollView>
          </View>
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: 10,
            left: 0,
            right: 0,
          }}
        >
          <PageIndicator pages={this.props.pages.length} selectedPage={this.state.selectedPage} />
        </View>
      </View>
    );
  }
}
