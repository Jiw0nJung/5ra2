package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"strconv"
	"time"

	"github.com/hyperledger/fabric/core/chaincode/shim"
	sc "github.com/hyperledger/fabric/protos/peer"
)

type SmartContract struct {
}

type UserInfo struct {
	User         string `json:"user"`
	Car          string `json:"car"`
	Menufacturer string `json:"menufacturer"`
	Datas        []Data `json:"datas"`
}
type Data struct {
	Env   []Environment `json:"environment"`
	Radar []RadarSensor `json:"radar"`
	Lidar []LidarSensor `json:"lidar"`
	// Mpc - Movement Preceding Collision
	// Toc - Type Of Collision
}

type Environment struct {
	Weather           string `json:"weather"`
	Lighting          string `json:"lighting"`
	RoadwaySurface    string `json:"roadwaysurface"`
	RoadwayConditions string `json:"roadwayconditions"`
	Mpc               string `json:"mpc"`
	Toc               string `json:"toc"`
	// Mpc - Movement Preceding Collision
	// Toc - Type Of Collision
}

type RadarSensor struct {
	Sensor1 string `json:"sensor1"`
	Sensor2 string `json:"sensor2"`
	Sensor3 string `json:"sensor3"`
}

type LidarSensor struct {
	Sensor1 string `json:"sensor1"`
	Sensor2 string `json:"sensor2"`
	Sensor3 string `json:"sensor3"`
}

func (s *SmartContract) Init(APIstub shim.ChaincodeStubInterface) sc.Response {
	return shim.Success(nil)
}

func (s *SmartContract) Invoke(APIstub shim.ChaincodeStubInterface) sc.Response {

	function, args := APIstub.GetFunctionAndParameters()

	if function == "addUser" {
		return s.addUser(APIstub, args)
	} else if function == "addAccidents" {
		return s.addAccidents(APIstub, args)
	} else if function == "viewAccidents" {
		return s.viewAccidents(APIstub, args)
	} else if function == "getHistoryForUser" {
		return s.getHistoryForUser(APIstub, args)
	}
	return shim.Error("Invalid Smart Contract function name.")
}

func (s *SmartContract) addUser(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 3 {
		return shim.Error("fail!")
	}
	var user = UserInfo{User: args[0], Car: args[1], Menufacturer: args[2]}
	userAsBytes, _ := json.Marshal(user)
	APIstub.PutState(args[0], userAsBytes)

	return shim.Success(nil)
}

func (s *SmartContract) addAccidents(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {
	if len(args) != 13 {
		return shim.Error("Incorrect number of arguments. Expecting 13")
	}
	// getState User
	userAsBytes, err := APIstub.GetState(args[0])
	if err != nil {
		jsonResp := "\"Error\":\"Failed to get state for " + args[0] + "\"}"
		return shim.Error(jsonResp)
	} else if userAsBytes == nil { // no State! error
		jsonResp := "\"Error\":\"User does not exist: " + args[0] + "\"}"
		return shim.Error(jsonResp)
	}
	// state ok
	user := UserInfo{}
	err = json.Unmarshal(userAsBytes, &user)
	if err != nil {
		return shim.Error(err.Error())
	}

	var data = Data{}
	var env = Environment{Weather: args[1], Lighting: args[2], RoadwaySurface: args[3], RoadwayConditions: args[4], Mpc: args[5], Toc: args[6]}
	var radarsensor = RadarSensor{Sensor1: args[7], Sensor2: args[8], Sensor3: args[9]}
	var lidarsensor = LidarSensor{Sensor1: args[10], Sensor2: args[11], Sensor3: args[12]}

	data.Env = append(data.Env, env)
	data.Radar = append(data.Radar, radarsensor)
	data.Lidar = append(data.Lidar, lidarsensor)
	user.Datas = append(user.Datas, data)

	userAsBytes, err = json.Marshal(user)

	APIstub.PutState(args[0], userAsBytes)

	return shim.Success([]byte("data is updated"))
}

func (s *SmartContract) viewAccidents(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	UserAsBytes, _ := APIstub.GetState(args[0])
	return shim.Success(UserAsBytes)
}

func (s *SmartContract) getHistoryForUser(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) < 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	userName := args[0]

	fmt.Printf("- start getHistoryForUser: %s\n", userName)

	resultsIterator, err := APIstub.GetHistoryForKey(userName)
	if err != nil {
		return shim.Error(err.Error())
	}
	defer resultsIterator.Close()

	// buffer is a JSON array containing historic values for the user
	var buffer bytes.Buffer
	buffer.WriteString("[")

	bArrayMemberAlreadyWritten := false
	for resultsIterator.HasNext() {
		response, err := resultsIterator.Next()
		if err != nil {
			return shim.Error(err.Error())
		}

		if bArrayMemberAlreadyWritten == true {
			buffer.WriteString(",")
		}
		buffer.WriteString("{\"TxId\":")
		buffer.WriteString("\"")
		buffer.WriteString(response.TxId)
		buffer.WriteString("\"")

		buffer.WriteString(", \"Value\":")

		if response.IsDelete {
			buffer.WriteString("null")
		} else {
			buffer.WriteString(string(response.Value))
		}

		buffer.WriteString(", \"Timestamp\":")
		buffer.WriteString("\"")
		buffer.WriteString(time.Unix(response.Timestamp.Seconds, int64(response.Timestamp.Nanos)).String())
		buffer.WriteString("\"")

		buffer.WriteString(", \"IsDelete\":")
		buffer.WriteString("\"")
		buffer.WriteString(strconv.FormatBool(response.IsDelete))
		buffer.WriteString("\"")

		buffer.WriteString("}")
		bArrayMemberAlreadyWritten = true
	}
	buffer.WriteString("]")

	fmt.Printf("- getHistoryForUser returning:\n%s\n", buffer.String())

	return shim.Success(buffer.Bytes())
}

func main() {

	err := shim.Start(new(SmartContract))
	if err != nil {
		fmt.Printf("Error creating new Smart Contract: %s", err)
	}
}
