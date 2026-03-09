import Businesslist from '@/components/home/Businesslist';
import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import Categorytlist from '../../components/home/categorylist';
import Header from '../../components/home/header';
import Slider from '../../components/home/slider';

export default function home() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f5f5f5' }}
      contentInsetAdjustmentBehavior="automatic"
      bounces={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      >
        <Header />
        <Slider />
        <Categorytlist />
        <Businesslist />

        {/* slider
        category
        busisness list */}
      </ScrollView>
    )
  }
