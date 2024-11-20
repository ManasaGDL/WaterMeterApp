import * as React from 'react';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { DataTable } from 'react-native-paper';
import { Text } from 'react-native-paper';



const ConsumptionTable = () => {
  const [page, setPage] = useState(0); // Pagination page
  const [itemsPerPage, setItemsPerPage] = useState(10); // Items per page
const [ data , setData]= useState([{ month: 'Sep', latestTS: '1/9/24', latestKL: '20500', previousTS: '1/8/24', previousKL: '15000', consumption: '599' },
    { month: 'Aug', latestTS: '1/8/24', latestKL: '15000', previousTS: '1/7/24', previousKL: '12000', consumption: '678' },
    // Add more rows to test pagination
    { month: 'Jul', latestTS: '1/7/24', latestKL: '11000', previousTS: '1/6/24', previousKL: '9000', consumption: '450' }])
  // Example data (you can replace this with your actual data source)
 

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, data.length);

  return (
    <ScrollView horizontal>
      <View>
        {/* Main Columns */}
        <DataTable >
          <DataTable.Header>
          <DataTable.Title  style={{  paddingHorizontal:0 }}>
           <Text className = "font-psemibold"> Mon</Text>
            </DataTable.Title>

            {/* Merging the "Latest" Column */}
            <View className =" flex-row  justify-center items-center font-pbold px-3">
              <Text className="w-auto text-center font-psemibold text-xs ">Latest</Text>
              {/* style={{ width: 110, textAlign: 'center' }}  */}
            </View>

            {/* Merging the "Previous" Column */}
            <View className =" flex-row ml-10 flex-1 justify-center items-center font-pbold">
              <Text  className="w-auto text-center font-psemibold text-xs">Previous</Text>
            </View>

            <DataTable.Title style={{ width: 100, paddingHorizontal: 28 }}>
                <Text className="font-psemibold">Usage(KL)</Text></DataTable.Title>
          </DataTable.Header>

          {/* Sub Columns (TS and KL) */}
          <DataTable.Row >
            <DataTable.Cell style={{ width: 40, paddingHorizontal: 0 }}></DataTable.Cell>

            {/* Sub-columns for Latest */}
            <DataTable.Cell style={{ width: 50, paddingHorizontal: 10, textAlign:"center"}}><Text className="text-xs text-center font-psemibold">ToR</Text></DataTable.Cell>
            <DataTable.Cell style={{ width: 50, paddingHorizontal: 10 }}><Text className="text-xs font-psemibold">KL</Text></DataTable.Cell>

            {/* Sub-columns for Previous */}
            <DataTable.Cell style={{ width: 50, paddingHorizontal: 10 }}><Text className="text-xs font-psemibold">ToR</Text></DataTable.Cell>
            <DataTable.Cell style={{ width: 60, paddingHorizontal: 10 }}><Text className="text-xs font-psemibold">KL</Text></DataTable.Cell>

            <DataTable.Cell style={{ width: 50, paddingHorizontal: 0 }}></DataTable.Cell>
          </DataTable.Row>

          {/* Data Rows (Paginated) */}
          {data.map((item, index) => 
           { 
           return <DataTable.Row key={index} >
              <DataTable.Cell style={{ width: 60, paddingHorizontal: 0 }}>{item.month}</DataTable.Cell>
              <DataTable.Cell style={{ width: 60, paddingHorizontal: 0 }}>
                <Text>{item.latestTS}</Text>
              </DataTable.Cell>
              <DataTable.Cell style={{ width: 60, paddingHorizontal: 0 }}>{item.latestKL}</DataTable.Cell>
              <DataTable.Cell style={{ width: 60, paddingHorizontal: 0 }}>
                <Text>{item.previousTS}</Text>
              </DataTable.Cell>
              <DataTable.Cell style={{ width: 60, paddingHorizontal: 0 }}>{item.previousKL}</DataTable.Cell>
              <DataTable.Cell style={{ width: 80, paddingHorizontal: 0 }}>{item.consumption}</DataTable.Cell>
            </DataTable.Row>
           }
          )}

          {/* Pagination Controls */}
          <DataTable.Pagination
           style={{ textAlign:"center",justifyContent:"center",alignItems:"center"}}
            page={page}
            numberOfPages={Math.ceil(data.length / itemsPerPage)}
            onPageChange={(page) => setPage(page)}
            label={`${parseInt(from + 1)}-${parseInt(to)} of ${data.length}`}
          />
        </DataTable>
      </View>
    </ScrollView>
  );
};

export default ConsumptionTable;
