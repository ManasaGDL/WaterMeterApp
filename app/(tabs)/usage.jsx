import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { DataTable } from 'react-native-paper';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Octicons from '@expo/vector-icons/Octicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import GaugeComponent from 'react-gauge-component'; // Ensure compatibility

const dummyData = [
  { month: "August", year: "2024", usage: 8100, flat_no: "A516" },
  { month: "September", year: "2024", usage: 9051, flat_no: "A-516" }
];

const Usage = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
  const previousMonthDate = new Date(currentDate.setMonth(currentDate.getMonth() - 1));
  const previousMonth = previousMonthDate.toLocaleString('default', { month: 'long' });

  const currentData = dummyData.find(data => data.month === currentMonth);
  const previousData = dummyData.find(data => data.month === previousMonth);

  const displayData = currentData || previousData || dummyData[0]; 

  const difference = (currentData?.usage || 0) - (previousData?.usage || 0);
  const differenceColor = difference >= 0 ? 'text-green-500' : 'text-red-500';

  const averages = [
    { label: 'Global Avg', image: <AntDesign name="earth" size={18} color="black" />, value: 9050, color: 'blue' },
    { label: 'Community Avg', value: 8025, image: <MaterialIcons name="apartment" size={18} color="black" />, color: 'orange' },
    { label: 'Low Avg', image: <MaterialIcons name="apartment" size={18} color="black" />, value: 4080, color: 'green' },
    { label: "Com_high", value: 30000, color: 'red' },
    { label: "Com_high", value: 30000, color: 'pink' }
  ];

  const sortedAverages = averages.sort((a, b) => a.value - b.value);
  const totalRange = sortedAverages[sortedAverages.length - 1].value - sortedAverages[0].value;

  const labels = sortedAverages.map((avg, index) => {
    const startValue = index === 0 ? 0 : sortedAverages[index - 1].value;
    const endValue = avg.value;
    const percentage = totalRange > 0 ? ((endValue - 0) / totalRange) * 100 : 0; 
    return {
      name: avg.label,
      labelColor: avg.color,
      activeBarColor: avg.color,
    };
  });

  

  return (
    <View style={styles.container}>
      <View style={styles.dataTableContainer}>
        <DataTable style={styles.dataTable}>
          <DataTable.Header>
            <DataTable.Title>
              <View style={styles.flexRow}>
                <Text style={styles.flatText}>
                  <FontAwesome5 name="home" size={14} color="black" />
                  {"   "}{dummyData[0].flat_no}
                </Text>
              </View>
            </DataTable.Title>
            <DataTable.Title>
              <View style={styles.flexEnd}>
                <Text style={[styles.differenceText, { color: differenceColor }]}>
                  <Octicons name="diff-removed" size={14} color="black" /> {difference}{" "}L
                </Text>
              </View>
            </DataTable.Title>
          </DataTable.Header>

          {dummyData.map((row, index) => (
            <DataTable.Row style={styles.row} key={index}>
              <DataTable.Cell style={styles.cell}>
                <Text style={styles.rowText}>{" "}{row.month.slice(0, 3)}</Text>
              </DataTable.Cell>
              <DataTable.Cell style={styles.cell}>
                <Text>{" "}{row.usage} L</Text>
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </View>

      <View style={styles.speedometerContainer}>
        <View style={styles.averageContainer}>
          {averages.map((avg, index) => (
            avg.label !== "Com_high" && (
              <View style={styles.averageCard} key={index}>
                <View style={styles.averageContent}>
                  <Text style={styles.nicknameText}>
                    {avg.image}
                    {avg.label}
                  </Text>
                  <Text style={[styles.valueText, { color: avg.color }]}>{avg.value}</Text>
                </View>
              </View>
            )
          ))}
        </View>

        <View>
          {/* <GaugeComponent 
          value={100}
            arc={{
              subArcs: [
                { limit: 20, color: '#EA4228', showTick: true },
                { limit: 40, color: '#F58B19', showTick: true },
                { limit: 60, color: '#F5CD19', showTick: true },
                { limit: 100, color: '#5BE12C', showTick: true },
              ]
            }}
            // value={displayData ? displayData?.usage : 0} 
          /> */}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dataTableContainer: {
    height: '40%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  dataTable: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  flatText: {
    flex: 1,
  },
  flexEnd: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  differenceText: {
    textAlign: 'right',
  },
  row: {
    fontWeight: '600',
  },
  cell: {
    paddingVertical: 3,
    paddingHorizontal: 7,
  },
  rowText: {
    fontWeight: '600',
  },
  speedometerContainer: {
    height: '60%',
    backgroundColor: 'white',
  },
  averageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 8,
  },
  averageCard: {
    width: '30%',
    padding: 4,
  },
  averageContent: {
    backgroundColor: 'lightgray',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nicknameText: {
    fontSize: 10,
  },
  valueText: {
    fontSize: 10,
    fontWeight: '600',
  },
  speedometerWrapper: {
    height: '75%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  minMaxContainer: {
    position: 'absolute',
    bottom: 50,
    left: 60,
    right: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  minText: {
    color: 'gray',
    fontSize: 12,
    textAlign: 'left',
  },
  maxText: {
    color: 'gray',
    fontSize: 12,
    textAlign: 'right',
  },
  centerTextContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -15 }, { translateY: 0 }],
    alignItems: 'center',
  },
  centerText: {
    color: 'black',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default Usage;
