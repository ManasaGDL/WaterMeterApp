import { Text, View, TextInput, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import CustomButton from '../components/CustomButton';
import { formatLabel } from '../utilities/utilities';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileAvailable, setProfileAvailable] = useState(false);

  const [userFields, setUserFields] = useState({
    community_name: '',
    location: '',
    block: '',
    floor: '',
    flat: '',
    occupant_type: '',
    owner_name: '',
    owner_phone: '',
    tenant_name: '',
    tenant_phone: '',
  });

  const floors = ['G', '1', '2', '3', '4', '5'];
  
  const generateFlatNumbers = (start, end) => {
    const flats = [];
    for (let i = start; i <= end; i++) {
      flats.push(i);
    }
    return flats;
  };

  const loadUserDetails = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@userDetails');
      if (jsonValue != null) {
        setProfileAvailable(true);
        setUserFields(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.error('Error loading user details:', e);
    }
  };

  useEffect(() => {
    loadUserDetails();
  }, [isEditing]);

  useEffect(() => {
    if (!profileAvailable) setIsEditing(true);
  }, [profileAvailable]);

  const handleInputChange = (key, value) => {
    setUserFields({ ...userFields, [key]: value });
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const clearData = async () => {
    try {
      await AsyncStorage.removeItem('@userDetails');
      setUserFields({
        community_name: '',
        location: '',
        block: '',
        floor: '',
        flat: '',
        occupant_type: '',
        owner_name: '',
        owner_phone: '',
        tenant_name: '',
        tenant_phone: '',
      });
      setProfileAvailable(false);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to clear data from AsyncStorage:', error);
    }
  };

  const storeUserDetails = async () => {
    try {
      const jsonValue = JSON.stringify(userFields);
      await AsyncStorage.setItem('@userDetails', jsonValue);
      setIsEditing(false);
    } catch (e) {
      console.error('Error storing user details:', e);
    }
  };

  return (
    <ScrollView>
      <View className="m-10 text-emerald-700">
        {!profileAvailable ? (
          <CustomButton
            title="Add Profile"
            handlePress={() => {
              storeUserDetails();
              setProfileAvailable(true);
            }}
          />
        ) : isEditing ? (
          <CustomButton
            title="Save Profile"
            handlePress={() => {
              storeUserDetails();
              setIsEditing(false);  // Save and exit edit mode
            }}
          />
        ) : (
          <CustomButton title="Edit Profile" handlePress={toggleEditMode} />
        )}
        {profileAvailable && <CustomButton title="Clear" customStyles="mt-3" handlePress={clearData} />}
      </View>

      <View className="bg-white rounded-lg pl-1 shadow-lg p-4">
        {Object.keys(userFields).map((detail, index) => {
          const formattedName = formatLabel(detail);

          if (detail === 'block' || detail === 'floor' || detail === 'flat') return null;

          if (detail !== 'occupant_type') {
            return (
              <View key={detail}>
                {((!['tenant_name', 'tenant_phone'].includes(detail)) ||
                  userFields['occupant_type'] === 'Tenant') && (
                  <View key={detail} className="mb-2">
                    <Text className="text-xs font-semibold text-gray-600 mb-1">{formattedName}</Text>
                    <TextInput
                      className="border border-gray-300 rounded-lg p-2 text-base"
                      value={userFields[detail]}
                      editable={isEditing}  // Only editable in edit mode
                      onChangeText={(value) => handleInputChange(detail, value)}
                    />
                  </View>
                )}
              </View>
            );
          } else {
            return (
              <View key={detail} className="mb-2">
                <Text className="text-xs font-semibold text-gray-600 mb-1">{formattedName}</Text>
                <View className="border border-gray-300 rounded-lg h-12">
                  <Picker
                    selectedValue={userFields.occupant_type}
                    enabled={isEditing}  // Only editable in edit mode
                    onValueChange={(itemValue) => handleInputChange('occupant_type', itemValue)}
                  >
                    <Picker.Item label="Owner" value="Owner" />
                    <Picker.Item label="Tenant" value="Tenant" />
                  </Picker>
                </View>
              </View>
            );
          }
        })}

        <View className="flex-row justify-between mb-4">
          <View className="flex-1 pr-2">
            <Text className="text-xs font-semibold text-gray-600">Block</Text>
            <View className="border border-gray-300 rounded-lg h-12">
              <Picker
                selectedValue={userFields.block}
                enabled={isEditing}  // Only editable in edit mode
                onValueChange={(itemValue) => handleInputChange('block', itemValue)}
              >
                <Picker.Item label="A" value="A" />
                <Picker.Item label="B" value="B" />
              </Picker>
            </View>
          </View>

          <View className="flex-1 pr-2">
            <Text className="text-xs font-semibold text-gray-600">Floor</Text>
            <View className="border border-gray-300 rounded-lg h-12">
              <Picker
                selectedValue={userFields.floor}
                enabled={isEditing}  // Only editable in edit mode
                onValueChange={(itemValue) => handleInputChange('floor', itemValue)}
              >
                {floors.map(floor => (
                  <Picker.Item key={floor} label={floor} value={floor} />
                ))}
              </Picker>
            </View>
          </View>

          <View className="flex-1 pr-2">
            <Text className="text-xs font-semibold text-gray-600">Flat</Text>
            <View className="border border-gray-300 rounded-lg h-12">
              <Picker
                selectedValue={userFields.flat}
                enabled={isEditing}  // Only editable in edit mode
                onValueChange={(itemValue) => handleInputChange('flat', itemValue)}
              >
                {generateFlatNumbers(1, 24).map(flat => (
                  <Picker.Item key={flat} label={flat.toString()} value={flat.toString()} />
                ))}
              </Picker>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;
