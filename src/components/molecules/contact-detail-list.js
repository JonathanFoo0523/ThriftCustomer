import React from 'react';
import {ContactDetailButton} from '../atoms/contact-detail-button';
import {Line} from '../atoms/line';
import {Linking, View} from 'react-native';

const iconMap = {
  primary: 'phone-outline',
  website: 'web',
  email: 'email-outline',
  whatsapp: 'whatsapp',
};

const urlScheme = {
  primary: 'tel:',
  website: 'https:',
  email: 'mailto:',
  whatsapp: 'whatsapp://send?phone=',
};

export function ContactDetailList({contact}) {
  const {primary, ...others} = contact;
  return (
    <>
      <ContactDetailButton
        value={primary}
        iconName="phone-outline"
        onPress={() => Linking.openURL(getURL('primary', primary))}
      />
      {/*
      {() => {
        for (let other in others) {
            console.log(other);
          let elems = [];
          elems.push(
            <>
              <Line thickness={1} color="lightgrey" style={{alignSelf: 'center', width: '95%'}} />
              <ContactDetailButton value={contact[other]} iconName="web" />
            </>,
          );
          return elems;
        }
      }} */}
      {Object.keys(others).map((k, i) => (
        <View key={k}>
          <Line thickness={1} color="lightgrey" style={{alignSelf: 'center', width: '95%', marginVertical: 3}} />
          <ContactDetailButton
            value={contact[k]}
            iconName={iconMap[k]}
            onPress={() => Linking.openURL(getURL(k, contact[k]))}
          />
        </View>
      ))}
    </>
  );
}

function getURL(key, value) {
  return urlScheme[key] + value;
}
