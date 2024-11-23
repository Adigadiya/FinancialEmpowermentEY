import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/colors';
import { STRINGS } from '../constants/strings';
import { FONTS } from '../constants/fonts';
import { SIZES } from '../constants/sizes';

const PlannerScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background }}>
    <Text style={{ fontSize: FONTS.sizeLarge, color: COLORS.text, fontWeight: 'bold' }}>
      {STRINGS.plannerTitle}
    </Text>
    <TouchableOpacity
      style={{
        backgroundColor: COLORS.secondary,
        padding: SIZES.medium,
        borderRadius: SIZES.radiusLarge,
        marginTop: SIZES.large,
      }}
    >
      <Text style={{ color: COLORS.white, fontSize: FONTS.sizeMedium }}>
        Start Planning Your Budget
      </Text>
    </TouchableOpacity>
  </View>
);

export default PlannerScreen;
