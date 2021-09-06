import React, {Children, useState} from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';

export interface Day {
  label: string;
  value: string;
}
const days: Day[] = [
  { label: 'Sunday', value: '0' },
  { label: 'Monday', value: '1' },
  { label: 'Tuesday', value: '2' },
  { label: 'Wednesday', value: '3' },
  { label: 'Thursday', value: '4' },
  { label: 'Friday', value: '5' },
  { label: 'Saturday', value: '6' },
]

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: "wrap",
    borderWidth: 2,
  },
  pressableView: {
    padding: 5,
  },
  pressable: {
    borderRadius: 8,
    padding: 6,
    overflow: 'hidden',
    borderWidth: 1,
  },
  textStyle: {
    color: "#000",
    fontWeight: "bold",
    textAlign: "center"
  },
})

export type DayPickerProps = {
  daysSelected?: boolean[];
  pressDisabled?: boolean;
  setDays?(pressed: boolean[]): void;
}

const DayPicker: React.FC<DayPickerProps> = ({daysSelected, pressDisabled, setDays}) => {
  const [pressed, setPressed] = useState(daysSelected ? daysSelected : new Array(7).fill(false));

 const setOnPress = (i: any) => {
   console.log(i);
    pressed[i] = !pressed[i];
    setPressed(pressed);
    if(setDays) {
      setDays(pressed);
    }
  }

  const getStyleOnButtonPress = (pressed: boolean[]) => {
    return [{
      backgroundColor: (pressed ? '#ADD8E6' : 'white')
    }, styles.pressable];
  }

  return (
  <View style={styles.container}>
      {
        days.map(function(day, i){
         return (<View key={i} style={styles.pressableView}>
           <Pressable onPress={event => setOnPress(i)}
           disabled={pressDisabled}
           style={() => getStyleOnButtonPress(pressed[i])}>
             <Text style={styles.textStyle}>{day.label}</Text>
           </Pressable>
         </View>)
       })
     }
  </View>
);
}

export default DayPicker;
