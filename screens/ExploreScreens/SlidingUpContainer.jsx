import React, { useRef, useState, useCallback } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Animated,
  Platform,
  Dimensions,
} from "react-native";
import SlidingUpPanel from "rn-sliding-up-panel";
import ClinicCard from "../../components/ClinicCard";
import { colors } from "../../utils/colors";

const ios = Platform.OS === "ios";
const { height } = Dimensions.get("window");

const SlidingUpContainer = ({ clinicsData, noOfCards }) => {
  const deviceHeight = height - 300;
  const draggableRange = { top: deviceHeight, bottom: deviceHeight * 0.35 };
  const panelRef = useRef(null);
  const scrollViewRef = useRef(null);
  const [lastScrollY, setLastScrollY] = useState(true);
  const [onTop, setOnTop] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const [allowDragging, setAllowDragging] = useState(true);
  const [showShadow, setShowShadow] = useState(false);
  const [bounces, setBounces] = useState(false);
  const [panelPositionVal, setPanelPositionVal] = useState(
    new Animated.Value(draggableRange.bottom)
  );

  const onMomentumDragEnd = useCallback(
    (value) => {
      if (value === draggableRange.top) {
        setScrollEnabled(true);
        setAllowDragging(false);
        setOnTop(true);
        scrollViewRef.current?.scrollTo({ y: 1, animated: true });
      }
    },
    [draggableRange.top]
  );

  const onMomentumScrollEnd = (event) => {
    if (event.nativeEvent.contentOffset.y === 0) setAllowDragging(true);
  };

  const onDragStart = (_, gestureState) => {
    if (gestureState.vy > 0 && scrollEnabled) {
      // setScrollEnabled(false);
      panelRef.current?.show({
        toValue: draggableRange.bottom,
        velocity: ios ? 3 : 2.3,
      });
    }
  };

  const handleScroll = (event) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;

    // setLastScrollY(currentScrollY);
    if (currentScrollY > 1) {
      setOnTop(false);
    }
    if (currentScrollY > 10) {
      setBounces(true);
    } else if (currentScrollY < 9) {
      setBounces(false);
    }
    if (currentScrollY === 0 && onTop) {
      Animated.spring(panelPositionVal, {
        toValue: draggableRange.bottom,
        useNativeDriver: false,
        speed: 1, // Lower is slower
        bounciness: 1, // Lower is less bouncy
      }).start();
      setAllowDragging(true);
      // setScrollEnabled(false);
    } else if (currentScrollY === 0 && !onTop) {
      setAllowDragging(true);
      setScrollEnabled(false);
    }
    if (currentScrollY > 2) {
      setShowShadow(true);
    } else {
      setShowShadow(false);
    }
  };

  return (
    <SlidingUpPanel
      ref={panelRef}
      animatedValue={panelPositionVal}
      draggableRange={draggableRange}
      snappingPoints={[draggableRange.top, draggableRange.bottom]}
      backdropOpacity={0}
      showBackdrop={false}
      height={deviceHeight}
      allowDragging={allowDragging}
      onMomentumDragEnd={onMomentumDragEnd}
      onDragStart={onDragStart}
    >
      <View style={styles.panelContent}>
        <View
          style={[
            styles.panelHandleContainer,
            showShadow && {
              shadowColor: colors.Neutrals500,
              shadowOpacity: 0.8,
              shadowRadius: 12,
              elevation: 12,
            },
          ]}
        >
          <View style={styles.panelHandle} />
        </View>

        <ScrollView
          nestedScrollEnabled={true}
          ref={scrollViewRef}
          onScroll={handleScroll}
          contentContainerStyle={{ minHeight: height - 300 }}
          scrollEnabled={scrollEnabled}
          onMomentumScrollEnd={onMomentumScrollEnd}
          bounces={bounces}
          showsVerticalScrollIndicator={false}
        >
          {clinicsData.map((item, index) => (
            <ClinicCard key={index} index={index} {...item} />
          ))}
        </ScrollView>
      </View>
    </SlidingUpPanel>
  );
};

const styles = StyleSheet.create({
  panelContent: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.White,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
  },
  panelHandleContainer: {
    paddingVertical: 10,
    backgroundColor: colors.White,
  },
  panelHandle: {
    width: 40,
    height: 6,
    backgroundColor: colors.BaseBlack,
    borderRadius: 3,
    alignSelf: "center",
  },
});

export default SlidingUpContainer;
