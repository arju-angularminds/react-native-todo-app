import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  Modal,
  Pressable,
  TextInput,
  Alert,
} from "react-native";
import { Card, Dialog, Icon, Input } from "@rneui/base";
import React, { useState } from "react";

export default function App() {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [singleUser, setSingleUser] = useState({});
  const [userData, setUserData] = useState([
    {
      id: 1,
      name: "Smith",
      email: "Smith@gmail.com",
      occupation: "Frontend Developer",
    },
    {
      id: 2,
      name: "Johnson",
      email: "Johnson@gmail.com",
      occupation: "Backend Developer",
    },
    {
      id: 3,
      name: "Williams",
      email: "Williams@gmail.com",
      occupation: "Backend Developer",
    },
    {
      id: 4,
      name: "Brown",
      email: "Brown@gmail.com",
      occupation: "Web Desiner",
    },
    {
      id: 5,
      name: "Jones",
      email: "Jones@gmail.com",
      occupation: "QA",
    },
    {
      id: 6,
      name: "Miller",
      email: "Miller@gmail.com",
      occupation: "Manager",
    },
    {
      id: 7,
      name: "Davis",
      email: "Davis@gmail.com",
      occupation: "HR",
    },
    {
      id: 8,
      name: "Garcia",
      email: "Garcia@gmail.com",
      occupation: "HR",
    },
  ]);

  const setFormData = (value, name) => {
    let tempData = { ...singleUser };
    tempData[name] = value;
    setSingleUser(tempData);
  };

  const submitFormData = () => {
    if (!singleUser?.name) {
      alert("Please Enter Name");
      return;
    } else if (!singleUser?.email) {
      alert("Please Enter Email");
      return;
    } else if (!singleUser?.occupation) {
      alert("Please Enter Occupation");
      return;
    } else {
      if (modalType === "add") {
        let tempArr = [...userData];
        tempArr.unshift({ ...singleUser, id: Math.random() });
        setUserData(tempArr);
      } else {
        let findInd = userData.findIndex(
          (x) => x?.id === Number(singleUser?.id)
        );
        if (findInd !== -1) {
          let tempArr = [...userData];
          tempArr[findInd] = singleUser;
          setUserData(tempArr);
        }
      }
      setSingleUser({});
      setDialogVisible(false);
      setModalType("add");
    }
  };

  const deleteUserData = (arrayInd) => {
    Alert.alert("Delete Data", "Are you sure you want to delete this data", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          let tempArr = [...userData];
          tempArr.splice(arrayInd, 1);
          setUserData(tempArr);
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.appTitle}><Text style={styles.appTitleText}>USER LIST</Text></View>
        <View style={styles.addButtonView}>
          <Button
            style={styles.cursorPtr}
            title="Add User"
            onPress={() => {
              setModalType("add");
              setDialogVisible(true);
            }}
          />
        </View>
        {userData.map((data, index) => (
          <Card key={index}>
            <View style={styles.cardTitle}>
              <View>
                <Text style={styles.cardTitleName}>{data?.name}</Text>
              </View>
              <View style={styles.flexDirRow}>
                <View>
                  <Icon
                    raised
                    name="edit"
                    type="font-awesome"
                    color="green"
                    size={20}
                    onPress={() => {
                      setModalType("edit");
                      setDialogVisible(true);
                      setSingleUser(data);
                    }}
                  />
                </View>
                <View>
                  <Icon
                    raised
                    name="trash"
                    type="font-awesome"
                    color="#f50"
                    size={20}
                    onPress={() => deleteUserData(index)}
                  />
                </View>
              </View>
            </View>
            <Card.Divider />
            <View>
              <Text style={styles.fontSz16}>
                Email: <Text style={styles.fontSz15WithGry}> {data.email}</Text>
              </Text>
              <Text style={styles.fontSz16}>
                Occupation:{" "}
                <Text style={styles.fontSz15WithGry}>{data.occupation}</Text>
              </Text>
            </View>
          </Card>
        ))}
        <StatusBar style="auto" />
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={false}
            visible={dialogVisible}
            onRequestClose={() => {
              setDialogVisible(false);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>
                  {modalType === "add" ? "Add User" : "Update User"}
                </Text>

                <View style={styles.margin5}>
                  <Text style={styles.labelText}>Name</Text>
                  <TextInput
                    placeholder="Enter User Name"
                    style={styles.textInput}
                    value={singleUser?.name}
                    onChangeText={(e) => setFormData(e, "name")}
                  />
                </View>
                <View style={styles.margin5}>
                  <Text style={styles.labelText}>Email</Text>
                  <TextInput
                    placeholder="Enter User Email"
                    style={styles.textInput}
                    value={singleUser?.email}
                    onChangeText={(e) => setFormData(e, "email")}
                  />
                </View>
                <View style={styles.margin5}>
                  <Text style={styles.labelText}>Occupation</Text>
                  <TextInput
                    placeholder="Enter User Occupation"
                    style={styles.textInput}
                    value={singleUser?.occupation}
                    onChangeText={(e) => setFormData(e, "occupation")}
                  />
                </View>
                <View style={styles.footer}>
                  <Button
                    title={modalType === "add" ? "Add" : "Update"}
                    onPress={() => submitFormData()}
                  />
                  <Button
                    title="Cancel"
                    onPress={() => {setDialogVisible(false); setModalType('add'); setSingleUser({})}}
                  />
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  appTitle: {
    marginTop: 20,
    flexDirection: 'row',
    alignSelf: 'center'
  },
  appTitleText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#32a852',
    textDecorationLine: 'underline'
  },
  addButtonView: {
    alignSelf: "flex-end",
    paddingRight: 13,
    marginTop: 10,
  },
  cardTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitleName: {
    fontSize: 28,
    fontWeight: "700",
  },
  flexDirRow: {
    flexDirection: "row",
  },
  cursorPtr: {
    cursor: "pointer",
  },
  fontSz16: {
    fontSize: 16,
  },
  fontSz15WithGry: {
    fontSize: 15,
    color: "gray",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.7,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 25,
    fontWeight: "700",
  },
  labelText: {
    fontSize: 18,
    fontWeight: "600",
  },
  textInput: {
    fontSize: 18,
    borderWidth: 2,
    borderColor: "gray",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    width: 250,
  },
  margin5: {
    margin: 5,
  },
  footer: {
    gap: 4,
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 10,
  },
});
