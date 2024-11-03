import { MaterialIcons } from "@expo/vector-icons";
import { View, Text, TouchableOpacity} from "react-native";

const { ColorsPalette } = require("@/constants/colors.tsx");

export default function PracticeResult() {
    
    return (
        <View>
            <Text> FEEDBACK</Text>
            <View>
                <MaterialIcons name="star" size={40} color={ColorsPalette.PrimaryColorLight} />
                <MaterialIcons name="star" size={40} color={ColorsPalette.PrimaryColorLight} />
                <MaterialIcons name="star-border" size={40} color={ColorsPalette.PrimaryColorLight} />
            </View>
            <Text>Breakdown</Text>
            <View>
                <Text>Fluency</Text>
                <View>
                <MaterialIcons name="star" size={40} color={ColorsPalette.PrimaryColorLight} />
                <MaterialIcons name="star" size={40} color={ColorsPalette.PrimaryColorLight} />
                <MaterialIcons name="star" size={40} color={ColorsPalette.PrimaryColorLight} />
                </View>
            </View>
            <View>
                <Text>Delivery</Text>
                <View>
                <MaterialIcons name="star" size={40} color={ColorsPalette.PrimaryColorLight} />
                <MaterialIcons name="star" size={40} color={ColorsPalette.PrimaryColorLight} />
                <MaterialIcons name="star" size={40} color={ColorsPalette.PrimaryColorLight} />
                </View>
            </View>
            <View>
                <Text>Language</Text>
                <View>
                <MaterialIcons name="star" size={40} color={ColorsPalette.PrimaryColorLight} />
                <MaterialIcons name="star" size={40} color={ColorsPalette.PrimaryColorLight} />
                <MaterialIcons name="star" size={40} color={ColorsPalette.PrimaryColorLight} />
                </View>
            </View>
            <View>
                <Text>Topic</Text>
                <View>
                <MaterialIcons name="star" size={40} color={ColorsPalette.PrimaryColorLight} />
                <MaterialIcons name="star" size={40} color={ColorsPalette.PrimaryColorLight} />
                <MaterialIcons name="star-border" size={40} color={ColorsPalette.PrimaryColorLight} />
                </View>
            </View>
            <View>
                <Text>Overall Points</Text>
                <Text>100</Text>
            </View>
            <View>
                <TouchableOpacity>
                    <Text> View Transcripts</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text> Try Again</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text> Home</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}