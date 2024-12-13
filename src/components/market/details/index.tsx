import { Text, View } from "react-native";
import { IconPhone, IconMapPin, IconTicket } from "@tabler/icons-react-native";

import { Info } from "../info";

import { s } from "./styles";

export interface DetailsProps {
  name: string;
  description: string;
  address: string;
  phone: string;
  coupons: number;
  rules: {
    id: string;
    description: string;
  }[];
}

interface Props {
  data: DetailsProps;
}

export function Details({ data }: Props) {
  return (
    <View style={s.container}>
      <Text style={s.name}>{data.name}</Text>
      <Text style={s.description}>{data.description}</Text>

      <View style={s.group}>
        <Text style={s.title}>Informações</Text>

        <Info
          description={`${data.coupons} cupons disponíveis`}
          icon={IconTicket}
        />
        <Info description={data.address} icon={IconMapPin} />
        <Info description={data.phone} icon={IconPhone} />
      </View>

      <View style={s.group}>
        <Text style={s.title}>Regulamento</Text>
        {data.rules.map((item) => (
          <Text key={item.id} style={s.rule}>
            {`\u2022 ${item.description}`}
          </Text>
        ))}
      </View>
    </View>
  );
}
